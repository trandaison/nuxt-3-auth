# Composables

## `useAuth`

```ts
const auth = useAuth();
```

`useAuth()` returns an [$auth](/api/$auth) instance. You can use it to access the properties and methods of the `$auth` instance such as `user`, `loggedIn`, etc.

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

Composable `useLogin` takes an options object with the following properties:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `redirectPath` | `(auth: Auth) => RawLocation \| RawLocation \| undefined` | `'/'` | The path to redirect to after login. You can use a callback with the input parameter as the [$auth object](/api/$auth) and return a `RawLocation`. |
| `credentials` | `any` | `{}` | An object containing login information. |
| `persistent` | `boolean \| undefined` | `true` | Set `true` to remember the login session. |
| `invalidErrorMessage` | `string \| undefined` | `'Invalid login credentials'` | The error message when login fails due to invalid credentials. |
| `otherErrorMessage` | `string \| undefined` | `'An error has occurred'` | The error message when login encounters an unspecified error. |

### Return value

| Property | Type | Description |
| --- | --- | --- |
| `credentials` | `Ref<any>` | Contains login information. |
| `persistent` | `Ref<boolean>` | Used for the "Remember Me" checkbox. |
| `errorMsg` | `ComputedRef<string \| null>` | Error message. |
| `error` | `Ref<any>` | Error object containing errors when login fails. |
| `pending` | `Ref<boolean>` | Has a value of `true` when logging in is in progress. |
| `resetError` | `() => void` | Used to clear the value of the `error` ref. |
| `login` | `() => Promise<any>` | Login handler function, returns the value of the [login function](/api/$auth#login), takes two parameters as follows: <br /> - `params?: Record<string, unknown>`: login information, if not passed, it will use the information in the `credentials` ref. <br /> - `{ sessionOnly }: { sessionOnly?: boolean } = {}`: Set `sessionOnly = true` if not "remember me". |

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
| `redirectPath` | `RawLocation` | `'/'` | The redirect path after logout |

### Return values

| Property | Type | Description |
| --- | --- | --- |
| `errorMsg` | `ComputedRef<string \| null>` | The error message |
| `pending` | `Ref<boolean>` | Value is `true` when performing the logout request |
| `doLogout` | `() => void` | The execution function |
