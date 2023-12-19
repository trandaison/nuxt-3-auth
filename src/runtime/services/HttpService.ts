import type { $Fetch, FetchContext } from 'ofetch';
import { callWithNuxt } from '#app';
import { middleTruncate, HTTP_STATUS_UNAUTHORIZED, AuthStatus } from "../utils";
import type { AuthConfig, AuthService } from '../../types';

export default class HttpService {
  public $fetch!: $Fetch;
  private nuxtApp;
  private route;
  private router;

  constructor(
    $fetch: $Fetch,
    private $configs: AuthConfig,
    private $auth: AuthService
  ) {
    this.nuxtApp = useNuxtApp();
    this.route = useRoute();
    this.router = useRouter();
    this.setup($fetch);
  }

  private setup($fetch: $Fetch) {
    const { baseUrl } = this.$configs.endpoints;
    const { headerName, type } = this.$configs.token;

    this.$fetch = $fetch.create({
      baseURL: baseUrl,

      headers: {
        Accept: "application/json",
      },

      onRequest: ({ options }) => {
        options.headers = (options.headers || {}) as Record<string, string>;
        const authOption = options.auth ?? true;
        // options.auth = true or 'optional'
        if (authOption !== false && this.$auth.accessToken) {
          options.headers[headerName] = `${type} ${this.$auth.accessToken}`;
        } else {
          options.headers[headerName] = "";
        }
      },

      onResponseError: async (context) => {
        this.debugResponse(context);
        const { response, options, request } = context;
        const isUnauthorized = response.status === HTTP_STATUS_UNAUTHORIZED;
        if (!isUnauthorized) return;

        // Only retry on requests that have options.auth = true
        if (options.auth !== true) return;

        if (!this.$auth.refreshToken) {
          await this.onAuthFailure(AuthStatus.Unauthorized);
          return;
        }

        try {
          await this.$auth.refreshTokens();
          options.headers = (options.headers || {}) as Record<string, string>;
          options.headers[headerName] = `${type} ${this.$auth.accessToken}`;
          const retryResponse = await this.$fetch(request, options);
          context.error = undefined;
          context.response = retryResponse;
        } catch {
          await this.onAuthFailure(AuthStatus.Expired);
        }
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
    const loginPath = this.router.resolve({
      name: this.$configs.routes.login.name,
      query: { status },
    });
    return callWithNuxt(this.nuxtApp, navigateTo, [loginPath]);
  }
}
