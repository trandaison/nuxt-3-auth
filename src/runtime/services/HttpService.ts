import type { $Fetch, FetchContext } from "ofetch";
import { navigateTo, useNuxtApp, useRoute, useRouter } from "#imports";
import { useLocalizeRoute } from "#build/useLocalizeRoute.mjs";
import { middleTruncate, HTTP_STATUS_UNAUTHORIZED, AuthStatus } from "../utils";
import type { AuthConfig, AuthService } from "../../types";

export default class HttpService {
  public $fetch!: $Fetch;
  private nuxtApp;
  private route;
  private router;
  private loginRoute;

  constructor(
    $fetch: $Fetch,
    private $configs: AuthConfig,
    private $auth: AuthService
  ) {
    this.nuxtApp = useNuxtApp();
    this.route = useRoute();
    this.router = useRouter();
    const { localeRoute } = useLocalizeRoute();
    this.loginRoute = localeRoute({ name: this.$configs.routes.login.name });
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

      onRequest: this.onRequest.bind(this),

      onResponse: async (context) => {
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
          const { token } = await this.$auth.refreshTokens();
          const opts = this.cloneOptions(options);
          opts.headers = opts.headers || {};
          (opts.headers as any)[headerName] = `${type} ${token}`;
          await this.$fetch(request, {
            ...opts,
            auth: false,
            retry: false,
            onResponse(ctx) {
              Object.assign(context, ctx);
            },
          });
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

  private onRequest(context: FetchContext) {
    const { options } = context;
    const { headerName, type } = this.$configs.token;
    options.headers = (options.headers || {}) as Record<string, string>;
    const authOption = options.auth ?? true;
    if (authOption !== false && this.$auth.accessToken) {
      options.headers[headerName] = `${type} ${this.$auth.accessToken}`;
    } else {
      options.headers[headerName] = "";
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
    const loginPath = this.router.resolve({
      name: this.loginRoute.name!,
      query: { status },
    });
    return this.nuxtApp.runWithContext(() => navigateTo(loginPath));
  }

  private cloneOptions<T>(options: T) {
    return (Object.keys(options as object) as (keyof T)[]).reduce(
      (opts, key) => {
        const value = options[key];
        if (!value || typeof value === "function") return opts;

        return { ...opts, [key]: value };
      },
      {} as T
    );
  }
}
