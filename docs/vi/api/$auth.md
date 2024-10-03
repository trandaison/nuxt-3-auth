# `$auth` instance

Module này đã inject sẵn một `$auth` instance vào nuxt app, nghĩa là bạn có thể access vào instance này ở bất cứ đâu thông qua một trong số các cách dưới đây (tùy vào ngữ cảnh sử dụng):

- Với setup script, middleware, pluggin,...

```ts
const { $auth } = useNuxtApp();
// or
const auth = useAuth();
```

- Hoặc với Options API

```ts
this.$auth;

context.$auth;
```

:::danger
`$auth` instance không phải là một `Reactive` object, nghĩa là bạn không nên truy xuất các thuộc tính bên trong `$auth` instance (ví dụ `$auth.user`, `$auth.loggedIn`) một cách trực tiếp trong `template` của component, nếu không khi giá trị của các thuộc tính này thay đổi thì `template` sẽ không được re-render.

Ví dụ component của bạn cần hiển thị tên của `user` đang login, bạn nên destruct `user` ra khỏi `$auth` instance hoặc tạo một computed và sử dụng `user` như một `Reactive` object.

✅ Do

```vue
<script setup lang="ts">
const { $auth } = useNuxtApp();
const { user } = $auth;
</script>

<template>
  <div>{{ user?.name }}</div>
</template>
```

❌ Do NOT

```vue
<script setup lang="ts">
const { $auth } = useNuxtApp();
</script>

<template>
  <div>{{ $auth.user?.name }}</div>
</template>
```
:::

## Attributes

### `user`

```ts
user: Ref<User> | null;
```

object chứa thông tin user đang đăng nhập trong pinia store. Nếu chưa đăng nhập giá trị trả về là `null`.

```ts
const { $auth } = useNuxtApp();
const { user } = $auth;
```

### `store`

```ts
store: Store;
```

object pinia store của auth module.

### `redirectPath`

```ts
redirectPath: string | null;
```

Đường dẫn redirect sau khi đăng nhập thành công.

### `loggedIn`

```ts
loggedIn: Ref<boolean>;
```

Là một `Ref` có giá trị `true` khi đã log in, ngược lại có giá trị `false`.

```ts
const { $auth } = useNuxtApp();
const { loggedIn } = $auth;
```
### `isPersistent`

```ts
isPersistent: boolean;
```

Có giá trị `true` khi phiên đăng nhập có sử dụng "Ghi nhớ đăng nhập".

### `config`

```ts
config: AuthConfig;
```

Chứa object config của `auth` được cài đặt trong `nuxt.config.ts`.

### `httpService`

```ts
httpService: HttpService;
```

Chứa instance của `HttpService`.

### `storage`

```ts
storage: AuthStorage;
```

Chứa instance của `AuthStorage`.

### `$fetch`

```ts
$fetch: $Fetch;
```

Chứa instance của `$fetch` được tạo ra từ [ofetch](https://github.com/unjs/ofetch).

Instance này mặc định được thiết lập sẵn một số cài đặt như:
- Tự động thêm access token vào header của request.
- Tự động refresh token khi request trả về lỗi `401 Unauthorized`, sau đó retry lại request.
- Debug log nếu set [option debug](/vi/api/options.html#debug) là `true`.

### `accessToken`

```ts
accessToken: string | null;
```

Chứa giá trị của access token, trả về `null` nếu chưa đăng nhập hoặc token đã hết hạn.

### `refreshToken`

```ts
refreshToken: string | null;
```

Chứa giá trị của refesh token, trả về `null` nếu chưa đăng nhập hoặc token đã hết hạn.

### `hasTokens`

```ts
hasTokens: boolean;
```

Có giá trị `true` khi có token trong cookie và token còn hạn sử dụng (bất kể access token hoặc refresh token).

### `isSessionExpired`

```ts
isSessionExpired: boolean;
```

Có giá trị `true` khi user đã log in nhưng **access token đã hết hạn** nhưng **refresh token vẫn còn hạn sử dụng**.

### `isSessionEnd`

```ts
isSessionEnd: boolean;
```

Có giá trị `true` khi cả access token và refresh token đều đã hết hạn.

## Methods

### `login`

```ts
function login<T = unknown>(
  credentials: Record<string, unknown>,
  { sessionOnly = false } = {}
): Promise<T>;
```

Hàm `login` hiện login với thông tin login trong `credentials`.

```ts
const { $auth } = useNuxtApp();

function onSubmit() {
  $auth.login(
    { email: 'user@example.com', password: 'abc' },
    { sessionOnly: true }
  );
}
```

Option `sessionOnly = true` dùng trong trường hợp không ghi nhớ session đăng nhập tức là người dùng sẽ phải login lại sau khi tắt trình duyệt hoặc khi refresh token bị hết hạn.

### `fetchUser`

```ts
function fetchUser<T = User>(): Promise<T>;
```

Thực hiện fetch lại data của user đang được login và cập nhật vào Store. Nếu không thành công sẽ throw ra lỗi.

```ts
const { $auth } = useNuxtApp();
$auth
  .fetchUser()
  .then((user) => console.log(user))
  .catch((error) => console.log('Failed to fetch user', error));
```

### `logout`

```ts
function logout(callApi: boolean = true): Promise<void>;
```

```ts
const { $auth } = useNuxtApp();
$auth.logout();
```

Thực hiện logout. Truyền vào `callApi = false` để logout phía client-side only.

### `refreshTokens`

```ts
function refreshTokens<T = unknown>(): Promise<T>;
```

Thực hiện refresh access token. Nếu không thành công sẽ throw ra lỗi.

```ts
const { $auth } = useNuxtApp();
$auth
  .refreshTokens()
  .then((tokens) => console.log(tokens))
  .catch((error) => console.log('Failed to refresh tokens', error));
```

### `setReferer`

```ts
function setReferer(url: string | null): void;
```
