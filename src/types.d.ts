import type { Store } from '@pinia/nuxt/dist/runtime/composables';
import type { Ref } from 'vue';
import type { Actions, Getters, State } from './runtime/store/auth';
import HttpService from './runtime/services/HttpService';
import AuthStorage from './runtime/services/AuthStorage';

declare module "#app" {
  interface PageMeta {
    auth: AuthPageMeta;
  }
}

declare module "ofetch" {
  interface FetchOptions {
    auth?: AuthFetchOption;
  }
}

export interface EndpointOption {
  url: string;
  method?: string;
  property?: string;
}

export interface AuthEndpointOptions {
  baseUrl: string;
  login: EndpointOption;
  logout: EndpointOption;
  refresh: EndpointOption;
  user: EndpointOption;
  signup: EndpointOption;
}

export interface AuthRouteRaw {
  path: string;
  file: string;
  name?: string;
}

export interface TokenOptions {
  headerName: string;
  type: string;
  property: string;
}

export interface RefreshTokenOptions {
  paramName: string;
  property: string;
}

export interface CookieOptions {
  ssl: boolean;
  maxAge: number;
}

export interface MiddlewareOptions {
  global: boolean;
}

export interface RedirectOptions {
  login: string;
  logout: string;
  home: string;
}

export interface AuthConfig {
  endpoints: AuthEndpointOptions;
  token: TokenOptions;
  refreshToken: RefreshTokenOptions;
  redirect: RedirectOptions;
  cookie: CookieOptions;
  middleware: MiddlewareOptions;
  rewriteRedirects: boolean;
  routes: Record<string, AuthRouteRaw>;
  debug: boolean;
  plugins: string[];
  useGlobalFetch: boolean;
}

export interface AuthOptions {
  endpoints?: Partial<AuthEndpointOptions>;
  token?: Partial<TokenOptions>;
  refreshToken?: Partial<RefreshTokenOptions>;
  cookie?: Partial<CookieOptions>;
  middleware: MiddlewareOptions;
  redirect?: Partial<RedirectOptions>;
  rewriteRedirects?: boolean;
  routes?: Record<string, AuthRouteRaw>;
  debug?: boolean;
  plugins?: string[];
  useGlobalFetch?: boolean;
}

export type AuthTokens = { token: string; refresh_token: string };

export interface User {
  [key: string]: any;
}

export interface AuthService {
  config: AuthConfig;
  httpService: HttpService;
  storage: AuthStorage;
  readonly user: Ref<User | null>;
  readonly store: Store<'auth', State, Getters, Actions>;
  readonly redirectPath: string;
  readonly accessToken: string | null | undefined;
  readonly refreshToken: string | null | undefined;
  readonly loggedIn: Ref<boolean>;
  readonly hasTokens: boolean;
  readonly isSessionExpired: boolean;
  readonly isSessionEnd: boolean;
  readonly isPersistent: boolean;
  login<T = unknown>(
    credentials: Record<string, unknown>,
    options?: { sessionOnly?: boolean }
  ): Promise<T>;
  fetchUser<T = unknown>(): Promise<T>;
  logout(callApi?: boolean): Promise<void>;
  refreshTokens<T = unknown>(): Promise<T>;
  setReferer(url: string | null): void;
}

export type AuthStatus = 'unauthorized' | 'expired';

export type AuthPageMeta = 'guest' | boolean;

export type AuthFetchOption = "optional" | boolean;
