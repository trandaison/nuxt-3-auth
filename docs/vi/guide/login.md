# Login

Mặc định module này cung cấp một buit-in login page ở đường dẫn `/login`.
Ngoài ra module cũng cung cấp một số cách thức dưới đây để custom một trang login riêng trong trường hợp trang login buit-in không phù hợp với nhu cầu của bạn.

## Sử dụng composable

Auth module cung cấp một composable tên `useLogin` để handle việc login:

```ts
const {
  credentials,
  persistent: rememberMe,
  pending,
  login,
  errorMsg,
} = useLogin({
  credentials: {
    email: '',
    password: '',
  },
  persistent: true,
});
```

Tiếp theo bạn cần một form login, ví dụ một form login tối giản như bên dưới:

```vue
<template>
  <form @submit.prevent="login()">
    <p>{{ errorMsg }}</p>
    <input v-model="credentials.email" type="email" /> <br />
    <input v-model="credentials.password" type="password" /> <br />
    <input v-model="credentials.rememberMe" type="checkbox" /> Remember Me
    <br />
    <button :disabled="pending" type="submit">Login</button>
  </form>
</template>
```

Trong đó:

- `credentials` là một `ref`, giá trị khởi tạo được truyền vào qua option `credentials` của composable `useLogin`. Trong trường hợp này thì `credentials` là một object có 2 thuộc tính là `email` và `password`, đều có giá trị rỗng.
- `login` là hàm handler dùng cho submit login.
- `pending` Có giá trị true khi đang thực hiện gọi API login.
- `errorMsg` Chứa message lỗi
- `persistent` Dùng cho chức năng ghi nhớ đăng nhập, set `true` để ghi nhớ đăng nhập.

:::tip
Xem thêm về `useLogin` trong phần [API > Composables](/vi/api/composables#uselogin)
:::

## Sử dụng component `Authenticator`

Module này cung cấp một component có tên `Authenticator` được auto import sẵn.

Component này cung cấp sẵn một form login đơn giản, bạn chỉ cần truyền vào `credentials` là một object có 2 thuộc tính là `email` và `password` như bên dưới.

```vue
// pages/login.vue

<template>
  <Authenticator :credentials="{ email: '', password: '' }" />
</template>
```

Giao diện của `Authenticator` như hình bên dưới

![](/images/login_form.png)

Để custom lại giao diện, bạn có thể style lại cho các css class của component. Thậm chí bạn có thể tắt hẳn css của component bằng cách truyền vào prop `css` với giá trị là `false`.

```vue
<Authenticator :css="false" />
```

:::tip
Xem thêm về `Authenticator` trong phần [API > Pages/Components](/vi/api/components/authenticator)
:::
