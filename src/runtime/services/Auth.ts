import type { $Fetch } from 'ofetch';
import { get } from 'lodash-es';
import { useRuntimeConfig } from "#imports";
import type {
  AuthConfig,
  AuthEndpointOptions,
  AuthService,
  User,
} from "../../types";
import AuthStorage from "./AuthStorage";
import HttpService from "./HttpService";
import type { Store } from "pinia";
import type { Ref } from "vue";
import type { Actions, Getters, State } from "../store/auth";

export class Auth implements AuthService {
  public config!: AuthConfig;
  public httpService!: HttpService;
  public storage!: AuthStorage;
  private loginPromise: Promise<unknown> | null = null;
  private fetchUserPromise: Promise<unknown> | null = null;
  private logoutPromise: Promise<unknown> | null = null;
  private refreshTokensPromise: Promise<unknown> | null = null;

  constructor($fetch: $Fetch, pinia: any) {
    const {
      public: { auth },
    } = useRuntimeConfig();
    this.config = auth;
    this.httpService = new HttpService($fetch, this.config, this);
    this.storage = new AuthStorage({ authConfig: auth, pinia });
  }

  get user(): Ref<User | null> {
    return this.storage.user;
  }

  get store(): Store<"auth", State, Getters, Actions> {
    return this.storage.authStore;
  }

  get redirectPath() {
    let redirectPath = this.config.redirect.home ?? "/";

    if (this.config.rewriteRedirects && this.storage.referer) {
      redirectPath = this.storage.referer;
    }

    return redirectPath;
  }

  get accessToken() {
    return this.storage.accessToken;
  }

  get refreshToken() {
    return this.storage.refreshToken;
  }

  get loggedIn(): Ref<boolean> {
    return this.storage.loggedIn;
  }

  get hasTokens() {
    return !!(this.storage.refreshToken || this.storage.accessToken);
  }

  get isSessionExpired() {
    return !!(this.storage.refreshToken && !this.storage.accessToken);
  }

  get isSessionEnd() {
    return !!(this.storage.accessToken && this.storage.refreshToken);
  }

  get isPersistent() {
    return this.storage.persistent != null;
  }

  get $fetch() {
    return this.httpService.$fetch;
  }

  async login<T = unknown>(
    credentials: Record<string, unknown>,
    { sessionOnly = false } = {}
  ): Promise<T> {
    try {
      this.loginPromise ??= this.httpService.call<T>(
        this.config.endpoints.login.method,
        this.config.endpoints.login.url,
        credentials,
        { headers: new Headers({ ...this.config.endpoints.login.headers }) }
      );
      const res = await this.loginPromise;
      const data = this.getProperty(res, "login");
      const token = this.getToken(data, "token");
      const refresh_token = this.getToken(data, "refreshToken");
      this.storage.setAuth({ token, refresh_token });
      this.storage.setPersistent(!sessionOnly);
      await this.fetchUser();
      this.setReferer(null);
      return data;
    } catch (error) {
      this.logout(false);
      return Promise.reject(error);
    } finally {
      this.loginPromise = null;
    }
  }

  async fetchUser<T = User>(): Promise<T> {
    try {
      this.fetchUserPromise ??= this.httpService.call<T>(
        this.config.endpoints.user.method,
        this.config.endpoints.user.url,
        undefined,
        {
          auth: true,
          headers: new Headers({ ...this.config.endpoints.user.headers }),
        }
      );
      const res = await this.fetchUserPromise;
      const data = this.getProperty(res, "user");
      this.storage.setUser(data);
      return data;
    } catch (error) {
      this.logout(false);
      return Promise.reject(error);
    } finally {
      this.fetchUserPromise = null;
    }
  }

  async logout(callApi = true): Promise<void> {
    try {
      if (callApi) {
        this.logoutPromise ??= this.httpService.call<unknown>(
          this.config.endpoints.logout.method,
          this.config.endpoints.logout.url,
          undefined,
          { headers: new Headers({ ...this.config.endpoints.logout.headers }) }
        );
        await this.logoutPromise;
      }
    } catch {
      // ignore
    } finally {
      this.logoutPromise = null;
      this.storage.resetAuth();
    }
  }

  async refreshTokens() {
    try {
      const body = this.buildRefreshBody();
      const headers = this.buildRefreshHeaders();

      this.refreshTokensPromise ??= this.httpService.call(
        this.config.endpoints.refresh.method,
        this.config.endpoints.refresh.url,
        body,
        { headers }
      );
      const res = await this.refreshTokensPromise;
      const data = this.getProperty(res, "refresh");
      const token = this.getToken(data, "token") as string;
      const refresh_token = this.getToken(data, "refreshToken") as string;
      this.storage.setAuth({ token, refresh_token });
      return { token, refresh_token };
    } catch (error) {
      this.logout(false);
      return Promise.reject(error);
    } finally {
      this.refreshTokensPromise = null;
    }
  }

  setReferer(url: string | null) {
    this.storage.referer = url;
  }

  protected getProperty(
    response: any,
    key: Exclude<keyof AuthEndpointOptions, "baseUrl">
  ) {
    const { property } = this.config.endpoints[key];
    return property ? get(response, property) : response;
  }

  protected getToken(data: any, type: "token" | "refreshToken") {
    const { property } = this.config[type];
    return get(data, property);
  }

  private buildRefreshBody() {
    const { paramName, type } = this.config.refreshToken;
    return type === "param"
      ? { [paramName]: this.storage.refreshToken }
      : undefined;
  }

  private buildRefreshHeaders() {
    const headers = { ...this.config.endpoints.refresh.headers };
    if (this.config.refreshToken.type !== "param") {
      headers[this.config.refreshToken.paramName] = `${
        this.config.token.type
      } ${this.storage.refreshToken}`.trim();
    }
    return new Headers(headers);
  }
}
