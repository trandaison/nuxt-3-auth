# Options

The top level of the `auth` options in `nuxt.config.js` looks like this:

```ts
{
  auth: {
    endpoints: object,
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

## `endpoints`

An object containing information about the endpoints for authentication.

### `baseUrl`

```ts
baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
```

The base URL of the API used for authentication.

### `login`

```ts
login: {
  url: '/login',
  method: 'POST',
  property: '',
}
```

An object containing information about the API login endpoint.

- `url`: Path of the API login.
- `method`: Method of the API login.
- `property`: The name of the property containing the response data from the API.

For example, if your API login has a response object like this:

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

Then you need to set `property` to `data.tokens`.

### `logout`

```ts
logout: { url: '/logout', method: 'DELETE' }
```

An object containing information about the API logout endpoint.

- `url`: Path of the API logout.
- `method`: Method of the API logout.

### `refresh`

```ts
refresh: {
  url: '/refresh_tokens',
  method: 'POST',
  property: '',
}
```

An object containing information about the API refresh token endpoint.

- `url`: Path of the API refresh token.
- `method`: Method of the API refresh token.
- `property`: The name of the property containing the response data from the API.

For example, if your API refresh tokens have a response object like this:

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

Then you need to set `property` to `data.tokens`.

### `user`

```ts
user: {
  url: '/me',
  method: 'GET',
  property: '',
}
```

An object containing information about the API fetch user info endpoint.

- `url`: Path of the API fetch user info.
- `method`: Method of the API fetch user info.
- `property`: The name of the property containing the response data from the API.

For example, if your API fetch user info has a response object like this:

```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

Then you need to set `property` to `data`.

## `token`

```ts
token: {
  headerName: 'Authorization',
  type: 'Bearer',
  property: 'token',
  maxAge: 365 * 24 * 60 * 60, // 1 year
}
```

- `headerName` The name of the header containing the token.
- `type` The type of token.
- `property` The name of the token key in the response object from the login and refresh token API. In the [example above](#login), `property` has a value of `token`.
- `maxAge` The maximum age of the token in seconds. If the token is a JWT, the module will use the `exp` claim to calculate the expiration time. If the token is not a JWT, the module will use this `maxAge` value or the `cookie.maxAge` value to calculate the expiration time.

## `refreshToken`

```ts
refreshToken: {
  paramName: 'token',
  property: 'refresh_token',
  maxAge: 365 * 24 * 60 * 60, // 1 year
}
```

- `paramName` The name of the parameter containing the refresh token in the request body.
- `property` The name of the property containing the refresh token in the response object from the login and refresh token API. In the [example above](#login), `property` has a value of `refresh_token`.
- `maxAge` The maximum age of the refresh token in seconds. If the refresh token is a JWT, the module will use the `exp` claim to calculate the expiration time. If the refresh token is not a JWT, the module will use this `maxAge` value or the `cookie.maxAge` value to calculate the expiration time.

:::tip
This module requires the login and refresh token API to return the same property containing the refresh token.
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

- `ssl` Set `true` to enable `Secure` flag for cookies (recommended if possible).
- `maxAge` The maximum age of the cookie in seconds. The default value is 1 year. Make sure the value is larger than the `maxAge` of both access token and refresh token.
- `domain` The domain of the cookie. If not set, the cookie will be set to the domain of the current page.
- `path` The path of the cookie. The default value is `/`.

## `middleware`

```ts
middleware: {
  global: true,
}
```

- `global` set to `false` to disable the built-in middleware `auth` that handles authentication between pages.

## `redirect`

```ts
redirect: {
  login: '/login',
  logout: '/',
  home: '/',
}
```

- `login` The path to redirect to when the user is not logged in but trying to access pages that have meta `auth = true`.
- `logout` The path to redirect to after the user logs out.
- `home` The path to redirect to after the user logs in. This is also the path to redirect to when the user is logged in but trying to access pages that have meta `auth = 'guest'`. Note that [`rewriteRedirects`](#rewriteredirects) will override this path.

## `rewriteRedirects`

```ts
rewriteRedirects: boolean = true;
```

Set `true` to rewrite the `home` redirect path to the path of the page that the user was trying to access before being redirected to the login page.

## `routes`

Register authentication pages including `login` and `logout`. By default, these pages are located at `/login` and `/logout`. You can re-register the path for these pages here.

### `login`

```ts
login: {
  name: 'login',
  file: resolve(__dirname, './pages/login.vue'),
  path: '/login',
}
```

- `name` The name of the route.
- `file` The path to the page component file.
- `path` The path on the URL.

### `logout`

```ts
logout: {
  name: 'logout',
  path: '/logout',
  file: resolve(__dirname, './pages/logout.vue'),
}
```

- `name` The name of the route.
- `file` The path to the page component file.
- `path` The path on the URL.

## `debug`

```ts
debug: boolean = false;
```

Set `true` to enable debug mode. This will log the module's internal state to the console.

## `plugins`

```ts
plugins: string[] = [];
```

An array of paths to the plugins that you want to use with this module.

## `useGlobalFetch`

```ts
useGlobalFetch: boolean = true;
```

By default, this module sets up a global fetch function to use with the `$fetch` composable. Set `useGlobalFetch = false` to disable this feature.
You still can use the `$fetch` instance of the module through `$auth.$fetch()`.

```ts
const $auth = useNuxtApp();
const { $fetch } = $auth;

$fetch('https://example.com/api/users');
```

## `useI18n`

```ts
useI18n: boolean = false;
```

Set `useI18n = true` if you have integrated the [nuxtjs/i18n](https://i18n.nuxtjs.org/) module in your project. When you do this, the paths for redirects will be created through the `useLocalePath` and `useLocaleRoute` compositions of i18n, helping to localize the paths when redirecting.
