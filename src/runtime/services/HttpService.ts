import { useLocalizeRoute } from "#build/useLocalizeRoute.mjs";
import { navigateTo, useNuxtApp, useRoute } from "#imports";
import type { $Fetch, FetchContext, FetchOptions } from "ofetch";
import type { AuthConfig, AuthService } from "../../types";
import { AuthStatus, HTTP_STATUS_UNAUTHORIZED, middleTruncate } from "../utils";

export default class HttpService {
  public $fetch!: $Fetch;
  private nuxtApp;
  private route;
  private loginRoute;
  private headerName: string;
  private tokenType: string;

  constructor(
    $fetch: $Fetch,
    private $configs: AuthConfig,
    private $auth: AuthService
  ) {
    this.headerName = this.$configs.token.headerName.toLowerCase();
    this.tokenType = this.$configs.token.type;
    this.nuxtApp = useNuxtApp();
    this.route = useRoute();
    const { localeRoute } = useLocalizeRoute();
    this.loginRoute = localeRoute({ name: this.$configs.routes.login.name });
    this.setup($fetch);
  }

  private setup($fetch: $Fetch) {
    const { baseUrl } = this.$configs.endpoints;

    this.$fetch = $fetch.create({
      baseURL: baseUrl,

      headers: {
        Accept: "application/json",
      },

      onRequest: this.onRequest.bind(this),

      onResponse: async (context) => {
        this.debugResponse(context);
        const { response, options, request } = context;
        const isUnauthorized = response.status === HTTP_STATUS_UNAUTHORIZED;
        if (!isUnauthorized) return;

        // Only retry on requests that have options.auth = true
        if (options.auth !== true) return;

        const refreshToken = this.$auth.refreshToken();
        if (!refreshToken) {
          await this.onAuthFailure(AuthStatus.Unauthorized);
          return;
        }

        const { token } = await this.$auth.refreshTokens().catch(() => ({

          token: undefined
        }))

        if (!token) {
          this.onAuthFailure(AuthStatus.Expired)
          return;
        }

        const retryOptions = this.buildRetryOptions(options, token);
        await this.$fetch(request, {
          ...retryOptions,
          onResponse(ctx) {
            Object.assign(context, ctx);
          },
        });
      },
    });
  }

  async call<T>(
    method = "GET",
    path = "",
    data: Record<string, any> | undefined = undefined,
    extras = {}
  ): Promise<T> {
    const res: T = await this.$fetch(path, {
      baseURL: this.$configs.endpoints.baseUrl,
      method,
      ...{ [method.toLowerCase() === "get" ? "query" : "body"]: data },
      ...extras,
    });

    return res;
  }

  private onRequest({ options }: FetchContext) {
    options.headers = new Headers(options.headers);
    const authOption = options.auth ?? true;
    const token = this.$auth.accessToken();
    if (authOption !== false && token) {
      options.headers.set(this.headerName, this.getTokenEntry(token));
    } else {
      options.headers.delete(this.headerName);
    }
  }

  private debugResponse({ response, options, request }: FetchContext) {
    if (response == null) return;

    const previewResponse =
      typeof response._data === "string"
        ? middleTruncate(response._data)
        : response._data;
    /* eslint-disable */
    if (process.server) {
      console.log(
        `\x1B[2m[${new Date().toLocaleString()}]\x1B[0m`,
        `🚀 \x1b[35m[${options.method?.toUpperCase() || "GET"}]\x1B[0m`,
        request,
        response.status < 300
          ? "\x1b[32m✅"
          : response.status < 400
            ? "\x1b[33m👉"
            : response.status < 500
              ? "\x1b[31m❌"
              : "\x1b[31m❗️",
        response.status,
        "\x1B[0m"
      );
      console.log(previewResponse);
    } else if (this.$configs.debug) {
      console.log(
        `[${new Date().toLocaleTimeString()}]`,
        `🚀 [${options.method?.toUpperCase() || "GET"}]`,
        request,
        response.status < 300
          ? "✅"
          : response.status < 400
            ? "👉"
            : response.status < 500
              ? "❌"
              : "❗️",
        response.status,
        previewResponse
      );
    }
    /* eslint-enable */
  }

  private onAuthFailure(status = AuthStatus.Expired) {
    const {
      fullPath: referer,
      meta: { auth: authMeta },
    } = this.route;
    this.$auth.logout(false);
    if (authMeta !== "guest") {
      this.$auth.setReferer(referer);
    }
    return this.nuxtApp.runWithContext(() =>
      navigateTo({ ...this.loginRoute, query: { status } })
    );
  }

  private buildRetryOptions(options: FetchOptions, token: string) {
    const headers = new Headers(options.headers);
    headers.set(this.headerName, this.getTokenEntry(token));
    return {
      baseURL: options.baseURL,
      body: options.body,
      headers,
      method: options.method,
      params: options.params,
      query: options.query,
      responseType: options.responseType,
      ignoreResponseError: options.ignoreResponseError,
      parseResponse: options.parseResponse,
      duplex: options.duplex,
      timeout: options.timeout,
      auth: true,
      retry: false as const,
    };
  }

  private getTokenEntry(token: string) {
    return `${this.tokenType} ${token}`;
  }
}
