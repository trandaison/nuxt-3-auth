# frequently asked questions

## Why `$fetch` does not automatically refresh the access token when it expires or has a refresh access token but does not retry the request even though all settings are correct?

First of all, if you are using the global `$fetch` function, make sure you have set the `auth.useGlobalFetch: true` option in `nuxt.config.js`.

If you are using `$fetch` through `$auth`, make sure you are using the `auth: true` option when calling `$fetch`.

```ts
const auth = useAuth();
awit auth.$fetch('/api/me', { auth: true });
```

::: tip
See more about [auth.fetch](/api/$auth#fetch) and [auth.useGlobalFetch](/api/options#useglobalfetch).
:::
