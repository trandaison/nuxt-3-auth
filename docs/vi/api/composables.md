# Composables

## `useAuth`

```ts
const auth = useAuth();
```

`useAuth()` Trả về một [$auth](/vi/api/$auth) instance. Bạn có thể truy cập vào các property và method của `$auth` thông qua composable này, ví dụ như `user`, `loggedIn`.

```ts
const { user, loggedIn } = auth;
```

### Interface

```ts
interface AuthService {
  config: AuthConfig;
  httpService: HttpService;
  storage: AuthStorage;
  readonly user: Ref<User | null>;
  readonly store: Store<'auth', State, Getters, Actions>;
  readonly redirectPath: string;
  readonly accessToken: string | null | undefined;
  readonly refreshToken: string | null | undefined;
  readonly loggedIn: Ref<boolean>;
  readonly hasTokens: boolean;
  readonly isSessionExpired: boolean;
  readonly isSessionEnd: boolean;
  readonly isPersistent: boolean;
  login<T = unknown>(
    credentials: Record<string, unknown>,
    options?: { sessionOnly?: boolean }
  ): Promise<T>;
  fetchUser<T = unknown>(): Promise<T>;
  logout(callApi?: boolean): Promise<void>;
  refreshTokens<T = unknown>(): Promise<T>;
  setReferer(url: string | null): void;
}
```

## `useLogin`

```ts
const {
  credentials,
  pending,
  errorMsg,
  error,
  login,
  resetError
} = useLogin({
  credentials: { email: '', password: '' },
});
```

### `UseLoginOptions`

Composable `useLogin` nhận vào một object options với các thuộc tính như sau:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `redirectPath` | `(auth: Auth) => RawLocation \| RawLocation \| undefined` | `'/'` | Đường dẫn chuyển hướng sau khi login. Có thể sử dụng callback với tham số đầu vào là object [$auth](/vi/api/$auth) và trả về một `RawLacation` |
| `credentials` | `any` | `{}` | Object chứa thông tin đăng nhập. |
| `persistent` | `boolean \| undefined` | `true` | Set `true` để ghi nhớ phiên đăng nhập. |
| `invalidErrorMessage` | `string \| undefined` | `'Invalid login credentials'` | Message lỗi khi đăng nhập không thành công. |
| `otherErrorMessage` | `string \| undefined` | `'An error has occurred'` | Message lỗi khi đăng nhập gặp lỗi không xác định. |

### Return value

| Property | Type | Description |
| --- | --- | --- |
| `credentials` | `Ref<any>` | Chứa thông tin đăng nhập. |
| `persistent` | `Ref<boolean>` | Dùng cho checkbox "Ghi nhớ đăng nhập". |
| `errorMsg` | `ComputedRef<string \| null>` | Message lỗi. |
| `error` | `Ref<any>` | Object lỗi chứa lỗi khi đăng nhập thất bại |
| `pending` | `Ref<boolean>` | Có giá trị `true` khi đang thực hiện đăng nhập. |
| `resetError` | `() => void` | Dùng để clear giá trị của ref `error`. |
| `login` | `() => Promise<any>` | Hàm handle login, trả về giá trị của hàm [login](/vi/api/$auth#login), nhận 2 tham số đầu vào như sau: <br /> - `params?: Record<string, unknown>`: thông tin đăng nhập, nếu không truyền vào sẽ sử dụng thông tin trong ref `credentials`. <br /> - `{ sessionOnly }: { sessionOnly?: boolean } = {}`: Set `sessionOnly = true` nếu không "remember me". |

### Interfaces

```ts
useLogin = (options: UseLoginOptions = {}): UseLoginReturns;

interface UseLoginOptions {
  redirectPath?: RawLocation;
  credentials?: any;
  persistent?: boolean;
  invalidErrorMessage?: string;
  otherErrorMessage?: string;
}

type UseLoginReturns = {
  credentials: Ref<any>;
  persistent: Ref<boolean>;
  errorMsg: ComputedRef<string | null>;
  error: Ref<any>;
  pending: Ref<boolean>;
  resetError: () => void;
  login: (
    params?: Record<string, unknown>,
    { sessionOnly }?: { sessionOnly?: boolean }
  ) => Promise<any>;
}
```

## `useLogout`

```ts
const useLogout = (redirectPath: RawLocation = '/') => {
  errorMsg,
  pending,
  doLogout,
}
```

### Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `redirectPath` | `RawLocation` | `'/'` | Đường dẫn chuyển trang sau khi logout. |

### Return values

| Property | Type | Description |
| --- | --- | --- |
| `errorMsg` | `ComputedRef<string \| null>` | Message lỗi. |
| `pending` | `Ref<boolean>` | Có giá trị `true` khi đang thực hiện logout. |
| `doLogout` | `() => void` | Hàm handle logout. |
