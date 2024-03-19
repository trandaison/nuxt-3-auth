# Login

By default, this module provides a built-in login page at `/login`. In addition, the module also provides a few ways below to customize a custom login page in case the built-in login page does not meet your needs.

## Using composable

The Auth module provides a composable named `useLogin` to handle login:

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

Next, you need a login form, for example a minimal login form as below:

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

Where:

- `credentials` is a `ref`, the initial value is passed through the `credentials` option of the `useLogin` composable. In this case, `credentials` is an object with 2 properties `email` and `password`, both are empty.
- `login` is a handler function used for login submit.
- `pending` is `true` when calling the login API.
- `errorMsg` contains the error message.
- `persistent` is used for the remember login feature, set `true` to remember login.

:::tip
See more about `useLogin` in the [API > Composables](/api/composables#uselogin)
:::

## Using component `Authenticator`

This module provides a component named `Authenticator` which is auto imported.

This component provides a simple built-in login form, you just need to pass `credentials` as an object with 2 properties `email` and `password` as below.

```vue
// pages/login.vue

<template>
  <Authenticator :credentials="{ email: '', password: '' }" />
</template>
```

The default login form looks like this:

![](/images/login_form.png)

To disable the default CSS, you can pass `css` prop with `false`, then customize the component's CSS yourself.

```vue
<Authenticator :css="false" />
```

:::tip
See more about `Authenticator` in the [API > Components](/api/components/authenticator)
:::
