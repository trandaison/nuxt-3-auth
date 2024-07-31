# Options

Top level của `auth` options trong `nuxt.config.js` như sau:

```ts
{
  auth: {
    endpoints: object,
    headers: object,
    token: object,
    refreshToken: object,
    redirect: object,
    cookie: object,
    middleware: object,
    rewriteRedirects: boolean,
    routes: object,
    debug: boolean,
    plugins: string[],
    useGlobalFetch: boolean,
    useI18n: boolean,
  }
}
```

## `headers`

Object chứa các headers sẽ được gửi cùng với các request được tạo ra bởi [`$fetch`](/api/$auth.html#fetch).

Option này sẽ hữu ích khi bạn cần gửi custom header trong mọi request, ví dụ như gửi client id, hoặc set content type.

```ts
headers: {
  'Content-Type': 'application/json',
  'Cache-Control': 'max-age=604800',
}
```

## `endpoints`

object chứa thông tin các endpoint cho việc authen.

### `baseUrl`

```ts
endpoints: {
  baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
}
```

Base URL của API dùng cho authen.

### `login`

```ts
endpoints: {
  login: {
    url: '/login',
    method: 'POST',
    property: '',
    headers: undefined,
  }
}
```

Object chứa thông tin của endpoint API login.

- `url`: Path của API login.
- `method`: Phương thức của API login.
- `property`: Tên thuộc tính chứa data response từ API.
- `headers`: Các headers sẽ được gửi cùng với request login.

Ví dụ API login của bạn có object response như sau:

```json
{
  "data": {
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

Thì bạn cần set `property` là `data.tokens`.

### `logout`

```ts
endpoints: {
  logout: {
    url: '/logout',
    method: 'DELETE',
    headers: undefined
  }
}
```

Object chứa thông tin của endpoint API logout.

- `url`: Path của API logout.
- `method`: Phương thức của API logout.
- `headers`: Các headers sẽ được gửi cùng với request logout.

### `refresh`

```ts
endpoints: {
  refresh: {
    url: '/refresh_tokens',
    method: 'POST',
    property: '',
    headers: undefined,
  }
}
```

Object chứa thông tin của endpoint API refresh token.

- `url`: Path của API refresh token.
- `method`: Phương thức của API refresh token.
- `property`: Tên thuộc tính chứa data response từ API.
- `headers`: Các headers sẽ được gửi cùng với request refresh token.

Ví dụ API refresh tokens của bạn có object response như sau:

```json
{
  "data": {
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

Thì bạn cần set `property` là `data.tokens`.

### `user`

```ts
endpoints: {
  user: {
    url: '/me',
    method: 'GET',
    property: '',
    headers: undefined,
  }
}
```

Object chứa thông tin của endpoint API fetch user info.

- `url`: Path của API fetch user info.
- `method`: Phương thức của API fetch user info.
- `property`: Tên thuộc tính chứa data response từ API.
- `headers`: Các headers sẽ được gửi cùng với request fetch user info.

Ví dụ API fetch user info của bạn có object response như sau:

```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

Thì bạn cần set `property` là `data`.

## `token`

```ts
token: {
  headerName: 'Authorization',
  type: 'Bearer',
  property: 'token',
  maxAge: 365 * 24 * 60 * 60, // 1 year
}
```

- `headerName` Tên header đính kèm access token khi gọi API.
- `type` Tên loại token.
- `property` Tên key của token dùng để đọc vào object response từ api login. Như trong [ví dụ ở trên](#login) thì `property` có giá trị là `access_token`.
- `maxAge` Set giá trị `max-age` cho access token. Nếu token là JWT thì maxAge sẽ được sử dụng để tính toán dựa trên thời gian hết hạn của token. Ngược lại, giá trị `maxAge` này hoặc option `cookie.maxAge` sẽ được sử dụng để tính toán thời gian hết hạn của token.

## `refreshToken`

```ts
refreshToken: {
  paramName: 'token',
  property: 'refresh_token',
  maxAge: 365 * 24 * 60 * 60, // 1 year
}
```

- `paramName` Tên của param khi gọi API refresh token.
- `property` Tên key của token dùng để đọc vào object response từ api login & refresh token. Như trong [ví dụ ở trên](#login) thì `property` có giá trị là `refresh_token`.
- `maxAge` Set giá trị `max-age` cho refresh token. Nếu token là JWT thì maxAge sẽ được sử dụng để tính toán dựa trên thời gian hết hạn của token. Ngược lại, giá trị `maxAge` này hoặc option `cookie.maxAge` sẽ được sử dụng để tính toán thời gian hết hạn của token.

:::tip
Hiện tại module này yêu cầu API login và refresh token trả về cùng một property chứa refresh token.
:::

## `cookie`

```ts
cookie: {
  ssl: false,
  maxAge: 365 * 24 * 60 * 60, // 1 year
  domain: '',
  path: '/',
}
```

- `ssl` Set `true` to enable `Secure` flag for cookies (khuyến khích sử dụng nếu có thể).
- `maxAge` Set giá trị `max-age` cho cookies. Hãy đảm bảo giá trị `maxAge` lớn hơn hoặc bằng thời gian expires của access token và refresh token.
- `domain` Tên domain của cookie.
- `path` Đường dẫn của cookie.

## `middleware`

```ts
middleware: {
  global: true,
}
```

- `global` Set giá trị `false` để tắt global middleware `'auth'`.

## `redirect`

```ts
redirect: {
  login: '/login',
  logout: '/',
  home: '/',
}
```

- `login` Đường dẫn tới trang login. Khi truy cập trang có page meta `auth = true` mà chưa login sẽ bị chuyển hướng đến trang này.
- `logout` Đường dẫn tới trang sau khi logout.
- `home` Đường dẫn tới trang sau khi login. [`rewriteRedirects`](#rewriteredirects) sẽ override đường dẫn này. Hoặc trong trường hợp người dùng đã login nhưng đang thực hiện truy cập đến các trang có page meta `auth = 'guest'` (ví dụ trang login) thì sẽ bị chuyển hướng đến đường dẫn này.

## `rewriteRedirects`

```ts
rewriteRedirects: boolean = true;
```

- Set `true` để bật chức năng chuyển hướng đến trang đã truy cập trước đó trước khi bị chuyển hướng đến trang login thay vì bị chuyển hướng đến `redirect.home`.

## `routes`

Đăng ký các page authentication bao gồm `login` và `logout`. Mặc định các page này nằm ở đường dẫn `/login` và `/logout`. Bạn có thể đăng ký lại path cho các page này ở đây.

### `login`

```ts
routes: {
  login: {
    name: 'login',
    file: resolve(__dirname, './pages/login.vue'),
    path: '/login',
  }
}
```

- `name` Tên của route.
- `file` Đường dẫn tới file page component.
- `path` Đường dẫn trên URL.

### `logout`

```ts
routes: {
  logout: {
    name: 'logout',
    path: '/logout',
    file: resolve(__dirname, './pages/logout.vue'),
  }
}
```

- `name` Tên của route.
- `file` Đường dẫn tới file page component.
- `path` Đường dẫn trên URL.

## `debug`

```ts
debug: boolean = false;
```

Set `true` để bật chế độ debug, ở chế độ debug, các response từ API sẽ được log ra console.

## `plugins`

```ts
plugins: string[] = [];
```

Nếu bạn có plugin nào cần sử dụng `$auth` thì bạn có thể đăng ký ở đây.

## `useGlobalFetch`

```ts
useGlobalFetch: boolean = true;
```

Mặc định module này sẽ setup các interceptors trên global `$fetch`. Nếu bạn muốn tắt chức năng này thì bạn có thể set `useGlobalFetch` là `false` và sử dụng `$fetch` instance của module thông qua `$auth`.

```ts
const $auth = useNuxtApp();
const { $fetch } = $auth;

$fetch('https://example.com/api/users');
```

## `useI18n`

```ts
useI18n: boolean = false;
```

Set `useI18n = true` nếu bạn có tích hợp module [nuxtjs/i18n](https://i18n.nuxtjs.org/) trong dự án, khi đó các đường dẫn để redirect sẽ được tạo ra qua các composition `useLocalePath` và `useLocaleRoute` của i18n, giúp localize các đường dẫn khi redirect.
