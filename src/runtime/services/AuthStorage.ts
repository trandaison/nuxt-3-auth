import { jwtDecode } from "jwt-decode";
import { storeToRefs } from "pinia";
import type { AuthConfig, User, AuthTokens } from "../../types";
import { useAuthStore } from "../store/auth";
import UniversalCookie from '../utils/UniversalCookie';

export default class AuthStorage {
  private authConfig;
  private config;
  private cookieOptions: any = { path: "/" };
  public cookie;
  public authStore;

  static ACCESS_TOKEN_STORAGE_KEY = "auth.access_token";
  static REFRESH_TOKEN_STORAGE_KEY = "auth.refresh_token";
  static ACCESS_TOKEN_EXP_KEY = "auth.access_token_expiration";
  static REFRESH_TOKEN_EXP_KEY = "auth.refresh_token_expiration";
  static FLAG_PERSISTENT_KEY = "auth.persistent";
  static PERSISTENT_VALUE_TRUE = "yes";
  static PERSISTENT_VALUE_FALSE = "no";
  static REDIRECT_KEY = "auth.redirect";

  constructor({ authConfig, pinia }: { authConfig: AuthConfig, pinia: any }) {
    this.authConfig = authConfig;
    this.config = authConfig.cookie;
    this.cookieOptions.secure = this.config.ssl;
    this.cookieOptions.domain = this.config.domain;
    this.cookieOptions.path = this.config.path;
    this.authStore = useAuthStore(pinia);
    this.cookie = new UniversalCookie();
  }

  get referer() {
    return this.cookie.getCookie(AuthStorage.REDIRECT_KEY) ?? null;
  }

  set referer(url: string | null) {
    this.cookie.setCookie(AuthStorage.REDIRECT_KEY, url, this.cookieOptions);
  }

  get accessToken() {
    if (this.isAccessTokenExpired()) return null;

    return this.cookie.getCookie(AuthStorage.ACCESS_TOKEN_STORAGE_KEY) ?? null;
  }

  set accessToken(value: string | null) {
    const cookieOptions = value
    ? { ...this.cookieOptions, maxAge: this.cookieMaxAge("token", value) }
    : this.cookieOptions;
    // Set value
    this.cookie.setCookie(AuthStorage.ACCESS_TOKEN_STORAGE_KEY, value, cookieOptions);

    // Set expiration
    if (value == null) {
      this.cookie.setCookie(AuthStorage.ACCESS_TOKEN_EXP_KEY, null, this.cookieOptions);
    } else {
      const accessTokenMaxAge = this.cookieMaxAge("token", value);
      const accessTokenExpiration = this.maxAgeToDate(accessTokenMaxAge).getTime();
      this.cookie.setCookie(
        AuthStorage.ACCESS_TOKEN_EXP_KEY,
        String(accessTokenExpiration),
        { ...this.cookieOptions, maxAge: this.accessTokenMaxAge(value) }
      );
    }
  }

  accessTokenMaxAge(token?: string) {
    const accessToken = token ?? this.accessToken;
    return accessToken ? this.cookieMaxAge("token", accessToken) : -1;
  }

  get refreshToken() {
    if (this.isRefreshTokenExpired()) return null;

    return this.cookie.getCookie(AuthStorage.REFRESH_TOKEN_STORAGE_KEY) ?? null;
  }

  set refreshToken(value: string | null) {
    const cookieOptions = value
      ? {
          ...this.cookieOptions,
          maxAge: this.cookieMaxAge("refreshToken", value),
        }
      : this.cookieOptions;
    // Set value
    this.cookie.setCookie(AuthStorage.REFRESH_TOKEN_STORAGE_KEY, value, cookieOptions);

    // Set expiration
    if (value == null) {
      this.cookie.setCookie(AuthStorage.REFRESH_TOKEN_EXP_KEY, null, this.cookieOptions);
    } else {
      const refreshTokenMaxAge = this.cookieMaxAge("refreshToken", value);
      const refreshTokenExpiration = this.maxAgeToDate(refreshTokenMaxAge).getTime();
      this.cookie.setCookie(
        AuthStorage.REFRESH_TOKEN_EXP_KEY,
        String(refreshTokenExpiration),
        { ...this.cookieOptions, maxAge: this.refreshTokenMaxAge(value) }
      );
    }
  }

  refreshTokenMaxAge(token?: string) {
    const refreshToken = token ?? this.refreshToken;
    return refreshToken ? this.cookieMaxAge("refreshToken", refreshToken) : -1;
  }

  get accessTokenExpiration() {
    return Number(this.cookie.getCookie(AuthStorage.ACCESS_TOKEN_EXP_KEY)) ?? null;
  }

  get refreshTokenExpiration() {
    return Number(this.cookie.getCookie(AuthStorage.REFRESH_TOKEN_EXP_KEY)) ?? null;
  }

  get persistent() {
    return this.cookie.getCookie(AuthStorage.FLAG_PERSISTENT_KEY) ?? null;
  }

  set persistent(value: string | null) {
    const maxAge = Math.max(
      this.accessTokenMaxAge(),
      this.refreshTokenMaxAge(),
    );
    this.cookie.setCookie(AuthStorage.FLAG_PERSISTENT_KEY, value, { ...this.cookieOptions, maxAge });
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
    this.accessToken = token;
    this.refreshToken = refresh_token;
  }

  setUser(user: User | null) {
    this.authStore.setUser(user);
  }

  resetAuth() {
    this.accessToken = null;
    this.refreshToken = null;
    this.persistent = null;
    this.referer = null;
    this.authStore.setUser(null);
  }

  setPersistent(value: boolean | null) {
    const cookieValue = value
      ? AuthStorage.PERSISTENT_VALUE_TRUE
      : AuthStorage.PERSISTENT_VALUE_FALSE;

    const maxAge = Math.max(
      this.cookieMaxAge("token"),
      this.cookieMaxAge("refreshToken")
    );
    const cookieOptions = { ...this.cookieOptions, maxAge };
    this.cookie.setCookie(AuthStorage.FLAG_PERSISTENT_KEY, cookieValue, cookieOptions);
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
