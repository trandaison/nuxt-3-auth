# Các câu hỏi thường gặp

## `$fetch` không tự động refresh access token khi hết hạn mặc hoặc có refresh access token nhưng không retry lại request dù mọi cài đặt đều đúng?

Trước hết, nếu bạn sử dụng hàm global `$fetch`, hãy chắc chắn rằng bạn đã set cài đặt `auth.useGlobalFetch: true` trong `nuxt.config.js`.

Nếu bạn sử dụng `$fetch` thông qua `$auth`, hãy chắc chắn rằng bạn có sử dụng option `auth: true` khi gọi `$fetch`.

```ts
const auth = useAuth();
awit auth.$fetch('/api/me', { auth: true });
```

::: tip
Xem thêm về [$auth.$fetch](/vi/api/$auth#fetch) và [auth.useGlobalFetch](/vi/api/options#useglobalfetch).
:::
