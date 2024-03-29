# Installation

Install the module:

::: code-group

```pnpm
pnpm install @trandaison/nuxt-3-auth
```
```yarn
yarn add @trandaison/nuxt-3-auth
```
```npm
npm install @trandaison/nuxt-3-auth
```

:::

Declare the module in the `nuxt.config.ts` file:

```js{3}
modules: [
  '@pinia/nuxt',
  '@trandaison/nuxt-3-auth',
  '@nuxtjs/i18n',
],
```

:::tip
Since the `@trandaison/nuxt-3-auth` module utilizes Pinia, the `@pinia/nuxt` module needs to be declared before `@trandaison/nuxt-3-auth`.
:::

:::tip
The `@nuxtjs/i18n` module (if present) should be declared after the `@trandaison/nuxt-3-auth` module to ensure that the built-in pages (login, logout) work properly with different localizations.

See more about integrating with the i18n module at [API > Options > useI18n](/api/options#useI18n)
:::

# Configurations

Add the `auth` option to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  // ... other options
  auth: {
    endpoints: {
      baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      login: { url: '/login', method: 'POST', property: 'data' },
      logout: { url: '/logout', method: 'DELETE' },
      refresh: { url: '/refresh_tokens', method: 'POST', property: 'data' },
      user: { url: '/me', method: 'GET', property: 'data' },
    },
    token: {
      headerName: 'Authorization',
      type: 'Bearer',
    },
    refreshToken: {
      paramName: 'token',
    },
  },
},
```

:::tip
See the full list of options at [API > Options](/api/options)
:::
