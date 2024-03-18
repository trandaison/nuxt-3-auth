import type { $Fetch } from 'ofetch';
import { get, set } from 'lodash-es';
import { useRuntimeConfig } from "#imports";
import type {
  AuthConfig,
  AuthEndpointOptions,
  AuthService,
  SocialLoginProviders,
  User,
} from "../../types";
import AuthStorage from './AuthStorage';
import HttpService from './HttpService';
import type { Store } from 'pinia';
import type { Actions, Getters, State } from '../store/auth';

export class Auth implements AuthService {
  public config!: AuthConfig;
  public httpService!: HttpService;
  public storage!: AuthStorage;
  private loginPromise: Promise<unknown> | null = null;
  private fetchUserPromise: Promise<unknown> | null = null;
  private logoutPromise: Promise<unknown> | null = null;
  private refreshTokensPromise: Promise<unknown> | null = null;

  constructor($fetch: $Fetch) {
    const {
      public: { auth },
    } = useRuntimeConfig();
    this.config = auth;
    this.httpService = new HttpService($fetch, this.config, this);
    this.storage = new AuthStorage({ authConfig: auth });
  }

  get user() {
    return this.storage.user;
  }

  get store(): Store<"auth", State, Getters, Actions> {
    return this.storage.authStore;
  }

  get redirectPath() {
    let redirectPath = this.config.redirect.home ?? "/";

    if (this.config.rewriteRedirects && this.storage.referer.value) {
      redirectPath = this.storage.referer.value;
    }

    return redirectPath;
  }

  get accessToken() {
    return this.storage.accessToken;
  }

  get refreshToken() {
    return this.storage.refreshToken;
  }

  get loggedIn() {
    return this.storage.loggedIn;
  }

  get hasTokens() {
    const { refreshToken, accessToken } = this.storage;
    return !!(refreshToken || accessToken);
  }

  get isSessionExpired() {
    const { accessToken, refreshToken } = this.storage;
    return !!(refreshToken && !accessToken);
  }

  get isSessionEnd() {
    const { accessToken, refreshToken } = this.storage;
    return !!(accessToken && refreshToken);
  }

  get isPersistent() {
    return this.storage.persistent != null;
  }

  get $fetch() {
    return this.httpService.$fetch;
  }

  async login<T = unknown>(
    credentials: Record<string, unknown>,
    options: { sessionOnly?: boolean } = {}
  ): Promise<T> {
    try {
      this.loginPromise ??= this.httpService.call<T>(
        this.config.endpoints.login.method,
        this.config.endpoints.login.url,
        credentials
      );
      const res = await this.loginPromise;
      const data = await this.handlePostAuthenticate(res, options);
      return data;
    } catch (error) {
      this.logout(false);
      return Promise.reject(error);
    } finally {
      this.loginPromise = null;
    }
  }

  async socialLogin<T = unknown>(
    provider: keyof SocialLoginProviders,
    credentials: any,
    options: { sessionOnly?: boolean } = {}
  ) {
    try {
      this.loginPromise ??= this.httpService.call<T>(
        this.config.socialProviders[provider].method,
        this.config.socialProviders[provider].url,
        this.buildPayload(provider, credentials)
      );
      const res = await this.loginPromise;
      const data = await this.handlePostAuthenticate(res, options);
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
        { auth: true }
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
          this.config.endpoints.logout.url
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

  async refreshTokens<T = unknown>(): Promise<T> {
    try {
      const { refreshToken } = this.storage;
      this.refreshTokensPromise ??= this.httpService.call<T>(
        this.config.endpoints.refresh.method,
        this.config.endpoints.refresh.url,
        { [this.config.refreshToken.paramName]: refreshToken }
      );
      const res = await this.refreshTokensPromise;
      const data = this.getProperty(res, "refresh");
      const token = this.getToken(data, "token");
      const refresh_token = this.getToken(data, "refreshToken");
      this.storage.setAuth({ token, refresh_token });
      return data;
    } catch (error) {
      this.logout(false);
      return Promise.reject(error);
    } finally {
      this.refreshTokensPromise = null;
    }
  }

  setReferer(url: string | null) {
    this.storage.setReferer(url);
  }

  protected getProperty(
    response: any,
    key: Exclude<keyof AuthEndpointOptions, "baseUrl">
  ) {
    const { property } = this.config.endpoints[key];
    return property ? get(response, property) : response;
  }

  protected buildPayload(
    key:
      | Exclude<keyof AuthEndpointOptions, "baseUrl">
      | keyof SocialLoginProviders,
    data: any
  ) {
    const { property } =
      this.config.endpoints[
        key as Exclude<keyof AuthEndpointOptions, "baseUrl">
      ] || this.config.socialProviders[key as keyof SocialLoginProviders];
    return property ? set({}, property, data) : data;
  }

  protected getToken(data: any, type: "token" | "refreshToken") {
    const { property } = this.config[type];
    return get(data, property);
  }

  protected async handlePostAuthenticate<T = unknown>(
    res: T,
    options: { sessionOnly?: boolean } = {}
  ) {
    const { sessionOnly = false } = options;
    const data = this.getProperty(res, "login");
    const token = this.getToken(data, "token");
    const refresh_token = this.getToken(data, "refreshToken");
    this.storage.setAuth({ token, refresh_token });
    this.storage.setPersistent(!sessionOnly);
    await this.fetchUser();
    this.setReferer(null);
    return data;
  }
}
