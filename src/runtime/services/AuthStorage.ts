import jwtDecode from "jwt-decode";
import { useCookie } from "#imports";
import { storeToRefs } from "pinia";
import type { AuthConfig, User, AuthTokens } from "../../types";
import { useAuthStore } from "../store/auth";

export default class AuthStorage {
  private authConfig;
  private config;
  private cookieOptions: any = { path: "/" };
  public authStore;
  public referer;
  public accessTokenCookie;
  public refreshTokenCookie;
  public accessTokenExpiration;
  public refreshTokenExpiration;
  public persistent;

  static ACCESS_TOKEN_STORAGE_KEY = "auth.access_token";
  static REFRESH_TOKEN_STORAGE_KEY = "auth.refresh_token";
  static ACCESS_TOKEN_EXP_KEY = "auth.access_token_expiration";
  static REFRESH_TOKEN_EXP_KEY = "auth.refresh_token_expiration";
  static FLAG_PERSISTENT_KEY = "auth.persistent";
  static PERSISTENT_VALUE_TRUE = "yes";
  static PERSISTENT_VALUE_FALSE = "no";
  static REDIRECT_KEY = "auth.redirect";

  constructor({ authConfig }: { authConfig: AuthConfig }) {
    this.authConfig = authConfig;
    this.config = authConfig.cookie;
    this.cookieOptions.secure = this.config.ssl;
    this.cookieOptions.domain = this.config.domain;
    this.cookieOptions.path = this.config.path;

    this.referer = useCookie(AuthStorage.REDIRECT_KEY);
    this.accessTokenCookie = useCookie<string | null>(
      AuthStorage.ACCESS_TOKEN_STORAGE_KEY,
      this.cookieOptions
    );
    this.refreshTokenCookie = useCookie<string | null>(
      AuthStorage.REFRESH_TOKEN_STORAGE_KEY,
      this.cookieOptions
    );
    this.accessTokenExpiration = useCookie<number | null>(
      AuthStorage.ACCESS_TOKEN_EXP_KEY,
      this.cookieOptions
    ).value;
    this.refreshTokenExpiration = useCookie<number | null>(
      AuthStorage.REFRESH_TOKEN_EXP_KEY,
      this.cookieOptions
    ).value;
    this.persistent = useCookie<string | null>(
      AuthStorage.FLAG_PERSISTENT_KEY,
      {
        expires: undefined,
      }
    );
    this.authStore = useAuthStore();
  }

  accessToken() {
    return this.isAccessTokenExpired() ? null : this.accessTokenCookie.value;
  }

  refreshToken() {
    return this.isRefreshTokenExpired() ? null : this.refreshTokenCookie.value;
  }

  accessTokenExpires() {
    return this.accessTokenExpiration
      ? new Date(this.accessTokenExpiration)
      : null;
  }

  refreshTokenExpires() {
    return this.refreshTokenExpiration
      ? new Date(this.refreshTokenExpiration)
      : null;
  }

  isAccessTokenExpired() {
    const accessTokenExp = this.accessTokenExpires();
    if (!accessTokenExp) return true;

    return accessTokenExp < new Date();
  }

  isRefreshTokenExpired() {
    const refreshTokenExp = this.refreshTokenExpires();
    if (!refreshTokenExp) return true;

    return refreshTokenExp < new Date();
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
    const accessTokenMaxAge = this.cookieMaxAge("token", token);
    const refreshTokenMaxAge = this.cookieMaxAge("refreshToken", refresh_token);

    this.accessTokenCookie = useCookie<string | null>(
      AuthStorage.ACCESS_TOKEN_STORAGE_KEY,
      { ...this.cookieOptions, maxAge: accessTokenMaxAge }
    );
    this.refreshTokenCookie = useCookie<string | null>(
      AuthStorage.REFRESH_TOKEN_STORAGE_KEY,
      { ...this.cookieOptions, maxAge: refreshTokenMaxAge }
    );

    const accessTokenExpiration = useCookie<number | null>(
      AuthStorage.ACCESS_TOKEN_EXP_KEY,
      { ...this.cookieOptions, maxAge: accessTokenMaxAge }
    );
    const refreshTokenExpiration = useCookie<number | null>(
      AuthStorage.REFRESH_TOKEN_EXP_KEY,
      { ...this.cookieOptions, maxAge: refreshTokenMaxAge }
    );

    this.accessTokenExpiration = this.maxAgeToDate(accessTokenMaxAge).getTime();
    this.refreshTokenExpiration =
      this.maxAgeToDate(refreshTokenMaxAge).getTime();

    accessTokenExpiration.value = this.accessTokenExpiration;
    refreshTokenExpiration.value = this.refreshTokenExpiration;

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

    const maxAge = Math.max(
      this.cookieMaxAge("token"),
      this.cookieMaxAge("refreshToken")
    );
    const cookieOptions = { ...this.cookieOptions, maxAge };

    this.persistent = useCookie<string | null>(
      AuthStorage.FLAG_PERSISTENT_KEY,
      cookieOptions
    );
    this.persistent.value = cookieValue;
  }

  private cookieMaxAge(tokenType: "token" | "refreshToken", token?: string) {
    try {
      if (!token) throw new Error("Token is not provided");

      const decoded = jwtDecode<{ exp: number }>(token);
      return decoded.exp - Math.ceil(Date.now() / 1000);
    } catch {
      return this.authConfig[tokenType].maxAge || this.config.maxAge;
    }
  }

  private maxAgeToDate(maxAge: number) {
    return new Date(Date.now() + maxAge * 1000);
  }
}
