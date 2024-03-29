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

```js{3}
modules: [
  '@pinia/nuxt',
  '@trandaison/nuxt-3-auth',
  '@nuxtjs/i18n',
],
```

:::tip
Vì module `@trandaison/nuxt-3-auth` có sử dụng Pinia nên module `@pinia/nuxt` cần phải khai báo trước `@trandaison/nuxt-3-auth`.
:::

:::tip
Module `@nuxtjs/i18n` (nếu có) nên khai báo sau module `@trandaison/nuxt-3-auth` sẽ đảm bảo các built-in pages (login, logout) họat động đầy đủ với các localize khác nhau.

Xem thêm về cách tích hợp với module i18n tại [API > Options > useI18n](/vi/api/options#usei18n)
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
