# HTTP request

Module này cung cấp một cách đơn giản để thực hiện các HTTP request sử dụng thư viện [`ofetch`](https://github.com/unjs/ofetch).

Để thực hiện một request, bạn có thể sử dụng phương thức `$fetch` được cung cấp bởi `$auth`.

```ts
const auth = useAuth();
await auth.$fetch('/api/books');
```

`$auth.$fetch` sử dụng [nuxt $fetch](https://nuxt.com/docs/api/utils/dollarfetch) bên dưới, vì vậy bạn có thể sử dụng tất cả các tùy chọn được cung cấp bởi phương thức fetch của nuxt. Ngoài ra, có thêm một tùy chọn nữa là `auth` để thực hiện các request được xác thực.

```ts
const auth = useAuth();
await auth.$fetch('/api/me', {
  auth: true
});
```

Tùy chọn `auth` cho phép các giá trị sau:

| Giá trị | Mô tả | Đính kèm Access Token | Làm mới access token | Thử lại request |
| --- | --- | --- | --- | --- |
| **`'auto'`** | ✅ | ❌ | ❌ | Thực hiện request xác thực nếu có thể nhưng không làm mới access token khi token hết hạn |
| `true` | ✅ | ✅ | ✅ | Thực hiện request xác thực và làm mới token sau đó thử lại nếu trạng thái phản hồi là `401` |
| `false` | ❌ | ❌ | ❌ | Thực hiện request bình thường |

::: tip
Mặc định, option [useGlobalFetch](/vi/api/options.html#useglobalfetch) được thiết lập là `true`, do đó global `$fetch` được override bởi `$auth.$fetch`.

Trong trường hợp bạn muốn sử dụng `$fetch` mặc định của Nuxt, hãy thiết lập `useGlobalFetch: false` trong [options](/options).
:::
