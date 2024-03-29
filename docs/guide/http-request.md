# HTTP Request

This module provides a simple way to make HTTP requests. It is based on the [`ofetch`](https://github.com/unjs/ofetch) library.

To make a request, you can use the `$fetch` method provided by the `$auth`.

```ts
const auth = useAuth();
await auth.$fetch('/api/books');
```

`$auth.$fetch` use the [nuxt $fetch](https://nuxt.com/docs/api/utils/dollarfetch) under the hood, so you can use all the options provided by the nuxt fetch method. Plus, it adds one more option `auth` to make authenticated requests.

```ts
const auth = useAuth();
await auth.$fetch('/api/me', {
  auth: true
});
```

`auth` option allow theses values:

| Value | Description | Attach Access Token | Refresh access token | Retry request |
| --- | --- | --- | --- | --- |
| **`'auto'`** | ✅ | ❌ | ❌ | Make authenticated request if possible but doesn't refresh access token when token expires |
| `true` | ✅ | ✅ | ✅ | Make authenticated request and refresh token then retry if the response status is `401` |
| `false` | ❌ | ❌ | ❌ | Make normal request |

:::tip
By default, the [useGlobalFetch](/api/options.html#useglobalfetch) option is set to `true`, so the global `$fetch` is overridden by `$auth.$fetch`.

In case you want to use the default Nuxt `$fetch`, set `useGlobalFetch: false` in the [options](/options).
:::
