# Nuxt 3 Authentication Module

Module này được thiết kế dựa trên ý tưởng của [nuxt/auth-module](https://auth.nuxtjs.org/) nhưng hỗ trợ cho Nuxt 3.

Từ phiên bản 3 trở lên, mặc định Nuxt sử dụng [`ofetch`](https://github.com/unjs/ofetch) cho việc giao tiếp với API thông qua `$fetch` và `useFetch`. Auth module cũng không ngoại lệ, sử dụng `$fetch` cho việc gọi API và [`pinia`](https://pinia.vuejs.org/) làm store quản lý session đăng nhập.

# Prerequisites

Hiện tại module này hỗ trợ việc đăng nhập thông qua API, do đó bạn cần phải có một API server để xử lý việc đăng nhập đáp ứng các yêu cầu sau:
- Có API login, response trả về access token và refresh token.
- Có API refresh token, response trả về access token mới và refresh token mới.
- Có API logout, xóa access token và refresh token.
- Có API lấy thông tin user, response trả về thông tin user.
- Access token và Refresh token là JWT tokens, được lưu trữ trong cookie.

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

# Usage

Để yêu cầu đăng nhập cho một trang bất kỳ, bạn chỉ cần khai báo page meta `auth` cho trang đó bằng cách sử dụng hàm `definePageMeta`:

```vue
<script setup>
  // pages/admin.vue

  definePageMeta({ auth: true });
</script>
```

Như vậy, khi truy cập vào trang `/admin`, nếu chưa đăng nhập, bạn sẽ được chuyển hướng đến trang `/login`. Sau khi đăng nhập thành công, bạn sẽ được chuyển hướng lại trang `/admin`.

:::tip
Xem thêm về meta `auth` tại [Middleware](http://localhost:5173/guide/middleware.html#middleware).

Xem thêm thông tin hướng dẫn về login tại mục [Guide > Login](/guide/login) và logout tại mục [Guide > Logout](/guide/logout).
:::
