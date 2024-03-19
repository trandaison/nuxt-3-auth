# Usage

## Authen trên pages

Để yêu cầu đăng nhập cho một trang bất kỳ, bạn chỉ cần khai báo page meta `auth` cho trang đó bằng cách sử dụng hàm `definePageMeta`:

```vue{4}
<script setup>
  // pages/admin.vue

  definePageMeta({ auth: true });
</script>
```

Như vậy, khi truy cập vào trang `/admin`, nếu chưa đăng nhập, bạn sẽ được chuyển hướng đến trang `/login`. Sau khi đăng nhập thành công, bạn sẽ được chuyển hướng lại trang `/admin`.

:::tip
Xem thêm về meta `auth` tại [Middleware](/vi/guide/middleware.html#middleware).

Xem thêm thông tin hướng dẫn về login tại mục [Guide > Login](/vi/guide/login) và logout tại mục [Guide > Logout](/vi/guide/logout).
:::

## Authen trên API calls

Một khi đã đăng nhập thành công, module sẽ tự động gắn access token vào header của mọi request API (nếu token tồn tại), bạn không cần phải thực hiện thêm bất cứ thao tác nào.

Trong một số trường hợp, bạn có thể sẽ muốn gọi API mà không đính kèm access token vào header, trong trường hợp này bạn có thể truyền vào option `auth: false` khi thực hiện gọi API như sau:

```ts{3}
$fetch('/users', {
  method: 'GET',
  auth: false
})
```

Option `auth` nhận các giá trị sau:

| Giá trị | Mô tả | Tự động kèm Access token trong headers | Tự động refresh token |
| --- | --- | --- | --- |
| `true` | Dùng cho những API requests yêu cầu **phải đăng nhập**.<br>Access token (nếu có) sẽ được đính kèm vào request header, nếu request bị lỗi `401 Unauthorized`, module sẽ tự động thực hiện refresh token và thử lại request 1 lần, nếu vẫn bị lỗi `401 Unauthorized` lần thứ 2, module sẽ tự động chuyển hướng đến trang `/login`. | <div style="text-align: center">✅</div> | <div style="text-align: center">✅</div> |
| `false` | Dùng cho những API requests yêu cầu **KHÔNG đăng nhập**.<br>**Access token dù tồn tại cũng sẽ không được đính kèm vào request header** khi thực hiện request. Do đó, nếu request bị lỗi `401 Unauthorized`, module sẽ **không thực hiện refresh token** mà chuyển hướng đến trang `/login` ngay lập tức. | <div style="text-align: center">❌</div> | <div style="text-align: center">❌</div> |
| `'optional'` | Dùng cho những API requests **có hoặc không** yêu cầu phải đăng nhập.<br>Access token (nếu có) sẽ được đính kèm vào request header, tuy nhiên nếu request bị lỗi `401 Unauthorized`, module sẽ **không thực hiện refresh token** mà chuyển hướng đến trang `/login` ngay lập tức. | <div style="text-align: center">✅</div> | <div style="text-align: center">❌</div> |

## Interception và refresh token

Mặc định, module sẽ tự động thực hiện refresh token khi gọi API và nhận được response lỗi `401 Unauthorized`.

Trong trường hợp bạn muốn chủ động refresh access token, bạn có thể gọi hàm `refreshTokens` của `$auth` như sau:

```ts
const { $auth } = useNuxtApp();
try {
  await $auth.refreshTokens();
} catch (error) {
  // handle error
}
```

Lưu ý rằng trong trường hợp refresh token không thành công, hàm `refreshTokens` sẽ gọi `logout(false)` và trả về một object lỗi, bạn cần phải catch lỗi này.
