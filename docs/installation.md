# Installation

Cài đặt module:

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

Khai báo module trong file `nuxt.config.ts`

```js{4}
modules: [
  '@pinia/nuxt',
  '@nuxtjs/i18n',
  '@trandaison/nuxt-3-auth',
],
```

:::tip
Vì module `@trandaison/nuxt-3-auth` có sử dụng Pinia nên module `@pinia/nuxt` cần phải khai báo trước `@trandaison/nuxt-3-auth`.
:::

# Configurations

Thêm option `auth` vào `nuxt.config.ts`:

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
Xem đầy đủ các options tại [API > Options](#)
:::
