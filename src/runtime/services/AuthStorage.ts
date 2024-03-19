import dayjs from 'dayjs/esm';
import { jwtDecode } from 'jwt-decode';
import { storeToRefs } from "pinia";
import type { AuthConfig, User, AuthTokens } from "../../types";
import { useAuthStore } from "../store/auth";

export default class AuthStorage {
  private config;
  private cookieOptions: any = { path: "/" };
  public authStore;
  public referer;
  public accessTokenCookie;
  public refreshTokenCookie;
  public persistent;

  static ACCESS_TOKEN_STORAGE_KEY = "auth.access_token";
  static REFRESH_TOKEN_STORAGE_KEY = "auth.refresh_token";
  static FLAG_PERSISTENT_KEY = "auth.persistent";
  static PERSISTENT_VALUE_TRUE = "yes";
  static PERSISTENT_VALUE_FALSE = "no";
  static REDIRECT_KEY = "auth.redirect";

  constructor({ authConfig }: { authConfig: AuthConfig }) {
    this.config = authConfig.cookie;
    this.cookieOptions.secure = this.config.ssl;
    this.cookieOptions.expires = this.cookieExp();

    this.referer = useCookie(AuthStorage.REDIRECT_KEY);
    this.accessTokenCookie = useCookie<string | null>(
      AuthStorage.ACCESS_TOKEN_STORAGE_KEY,
      this.cookieOptions
    );
    this.refreshTokenCookie = useCookie<string | null>(
      AuthStorage.REFRESH_TOKEN_STORAGE_KEY,
      this.cookieOptions
    );
    this.persistent = useCookie<string | null>(
      AuthStorage.FLAG_PERSISTENT_KEY,
      {
        expires: undefined,
      }
    );
    this.authStore = useAuthStore();
  }

  get accessToken() {
    return this.isAccessTokenExpired ? null : this.accessTokenCookie.value;
  }

  get refreshToken() {
    return this.isRefreshTokenExpired ? null : this.refreshTokenCookie.value;
  }

  get accessTokenExpires() {
    if (!this.accessTokenCookie.value) return null;

    const decoded = jwtDecode<{ exp: number }>(this.accessTokenCookie.value);
    return new Date(decoded.exp * 1000);
  }

  get refreshTokenExpires() {
    if (!this.refreshTokenCookie.value) return null;

    const decoded = jwtDecode<{ exp: number }>(this.refreshTokenCookie.value);
    return new Date(decoded.exp * 1000);
  }

  get isAccessTokenExpired() {
    if (!this.accessTokenExpires) return true;

    return this.accessTokenExpires < new Date();
  }

  get isRefreshTokenExpired() {
    if (!this.refreshTokenExpires) return true;

    return this.refreshTokenExpires < new Date();
  }

  get user() {
    const { user } = storeToRefs(this.authStore);
    return user;
  }

  get loggedIn() {
    const { loggedIn } = storeToRefs(this.authStore);
    return loggedIn;
  }

  setAuth({ token, refresh_token }: AuthTokens) {
    this.accessTokenCookie.value = token;
    this.refreshTokenCookie.value = refresh_token;
  }

  setUser(user: User | null) {
    this.authStore.setUser(user);
  }

  setReferer(url: string | null) {
    this.referer.value = url;
  }

  resetAuth() {
    this.accessTokenCookie.value = null;
    this.refreshTokenCookie.value = null;
    this.persistent.value = null;
    this.referer.value = null;
    this.authStore.setUser(null);
  }

  /**
   * NOTE: Do not call this method when setting the tokens.
   * `useCookie` only works during setup or Lifecycle Hooks.
   * https://nuxt.com/docs/api/composables/use-cookie
   * This method is only called when the user performs a login (in setup context).
   * Otherwise, `useCookie` might not work.
   */
  setPersistent(value: boolean) {
    const cookieValue = value
      ? AuthStorage.PERSISTENT_VALUE_TRUE
      : AuthStorage.PERSISTENT_VALUE_FALSE;

    const cookieOptions = {
      ...this.cookieOptions,
      expires: value ? this.cookieExp() : undefined,
    };

    this.persistent = useCookie<string | null>(
      AuthStorage.FLAG_PERSISTENT_KEY,
      cookieOptions
    );
    this.persistent.value = cookieValue;
  }

  private cookieExp() {
    if (this.config.maxAge === null) return undefined;

    return dayjs().add(this.config.maxAge, "second").toDate();
  }
}
