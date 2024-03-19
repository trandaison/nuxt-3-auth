# `$auth` instance

This module has injected a `$auth` instance into the Nuxt app, meaning you can access this instance anywhere through one of the following methods (depending on the context of use):

- With setup script, middleware, plugin,...

```ts
const { $auth } = useNuxtApp();
// or
const auth = useAuth();
```

- Or with Options API

```ts
this.$auth;

context.$auth;
```

:::danger
The `$auth` instance is not a `Reactive` object, meaning you should not directly access properties within the `$auth` instance (e.g., `$auth`.user, `$auth.loggedIn`) in the `template` of a component, as the `template` will not be re-rendered when the values of these properties change.

For example, if your component needs to display the name of the logged-in user, you should destructure `user` from the `$auth` instance or create a computed property and use the `user` as a Reactive object.

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

An object containing information about the logged-in user in the pinia store. Returns `null` if not logged in.

```ts
const { $auth } = useNuxtApp();
const { user } = $auth;
```

### `store`

```ts
store: Store;
```

The pinia store object of the auth module.

### `redirectPath`

```ts
redirectPath: string | null;
```

The redirect path after successful login.

### `accessToken`

```ts
accessToken: string | null | undefined;
```

Contains the value of the access token, returns `null` if not logged in or the token has expired.

### `refreshToken`

```ts
refreshToken: string | null | undefined;
```

Contains the value of the refresh token, returns `null` if not logged in or the token has expired.

### `loggedIn`

```ts
loggedIn: Ref<boolean>;
```

A Ref with a value of `true` when logged in, otherwise `false`.

```ts
const { $auth } = useNuxtApp();
const { loggedIn } = $auth;
```

### `hasTokens`

```ts
hasTokens: boolean;
```

Has a value of `true` when there are tokens in the cookie and the tokens are still valid (either access token or refresh token).

### `isSessionExpired`

```ts
isSessionExpired: boolean;
```

Has a value of `true` when the user is **logged in but the access token has expired** while **the refresh token is still valid**.

### `isSessionEnd`

```ts
isSessionEnd: boolean;
```

Has a value of `true` when both the access token and refresh token have expired.

### `isPersistent`

```ts
isPersistent: boolean;
```

Has a value of `true` when the login session is persistent (Remember Me feature).

### `config`

```ts
config: AuthConfig;
```

Contains the config object of the `auth` set in `nuxt.config.ts`.

### `httpService`

```ts
httpService: HttpService;
```

Contains an instance of `HttpService`.

### `storage`

```ts
storage: AuthStorage;
```

Contains an instance of `AuthStorage`.

### `$fetch`

```ts
$fetch: $Fetch;
```

Contains an instance of `$fetch` created from [ofetch](https://github.com/unjs/ofetch).

By default, this instance has the following features:
- Automatically attach the access token to the request header.
- Automatically refresh the access token if it has expired (when the request returns a 401 status code), then retry the request.
- Debug log if the [debug option](/api/options.html#debug) is set to `true`.

## Methods

### `login`

```ts
function login<T = unknown>(
  credentials: Record<string, unknown>,
  { sessionOnly = false } = {}
): Promise<T>;
```

This function is used to log in a user. The `credentials` object should contain the user's email and password.

```ts
const { $auth } = useNuxtApp();

function onSubmit() {
  $auth.login(
    { email: 'user@example.com', password: 'abc' },
    { sessionOnly: true }
  );
}
```

The `sessionOnly` option is used to determine whether the user's session should be remembered. If `sessionOnly` is set to `true`, the user will have to log in again after closing the browser or when the refresh token has expired.

### `fetchUser`

```ts
function fetchUser<T = User>(): Promise<T>;
```

This function is used to fetch the user's information. If there is an error, it will throw the error, don't forget to catch it.

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

This function is used to log out. Pass `callApi = false` to log out client-side only.

### `refreshTokens`

```ts
function refreshTokens<T = unknown>(): Promise<T>;
```

This function is used to refresh the access token and refresh token. If there is an error, it will throw the error, don't forget to catch it.

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
