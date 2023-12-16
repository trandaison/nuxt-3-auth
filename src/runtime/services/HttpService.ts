import type { $Fetch } from 'ofetch';
import type { PublicRuntimeConfig } from 'nuxt/schema';
import { useRuntimeConfig } from '#app';
import { middleTruncate } from '../utils';
import type { AuthConfig, AuthService } from '../../types';

export default class HttpService {
  private $fetch!: $Fetch;
  private $publicConfig!: PublicRuntimeConfig;

  constructor(
    $fetch: $Fetch,
    private $configs: AuthConfig,
    private $auth: AuthService
  ) {
    this.$publicConfig = useRuntimeConfig().public;
    this.setup($fetch);
    globalThis.$fetch = this.$fetch;
  }

  private setup($fetch: $Fetch) {
    const { baseUrl } = this.$configs.endpoints;
    const { headerName, type } = this.$configs.token;

    this.$fetch = $fetch.create({
      baseURL: baseUrl,

      headers: {
        Accept: 'application/json',
      },

      onRequest: ({ options }) => {
        options.headers = (options.headers || {}) as Record<string, string>;
        const isAuthRequired = options.auth ?? true;
        if (isAuthRequired && this.$auth.accessToken) {
          options.headers[headerName] = `${type} ${this.$auth.accessToken}`;
        } else {
          options.headers[headerName] = '';
        }
      },

      onResponse: ({ request, options, response }) => {
        const previewResponse =
          typeof response._data === 'string'
            ? middleTruncate(response._data)
            : response._data;
        /* eslint-disable */
        if (process.server) {
          console.log(
            `\x1B[2m[${new Date().toLocaleString()}]\x1B[0m`,
            `🚀 \x1b[35m[${options.method?.toUpperCase() || 'GET'}]\x1B[0m`,
            request,
            response.status < 300
              ? '\x1b[32m✅'
              : response.status < 400
              ? '\x1b[33m👉'
              : response.status < 500
              ? '\x1b[31m❌'
              : '\x1b[31m❗️',
            response.status,
            '\x1B[0m'
          );
          console.log(previewResponse);
        } else if (this.$publicConfig.debugOn) {
          console.log(
            `[${new Date().toLocaleTimeString()}]`,
            `🚀 [${options.method?.toUpperCase() || 'GET'}]`,
            request,
            response.status < 300
              ? '✅'
              : response.status < 400
              ? '👉'
              : response.status < 500
              ? '❌'
              : '❗️',
            response.status,
            previewResponse
          );
        }
        /* eslint-enable */
      },
    });
  }

  async call<T>(
    method = 'GET',
    path = '',
    data: Record<string, any> | undefined = undefined,
    extras = {}
  ): Promise<T> {
    const res: T = await this.$fetch(path, {
      baseURL: this.$configs.endpoints.baseUrl,
      method,
      ...{ [method.toLowerCase() === 'get' ? 'query' : 'body']: data },
      ...extras,
    });

    return res;
  }
}
