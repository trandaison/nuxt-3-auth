# Usage

## Authentication on pages

To require authentication for any page, you simply need to declare the `auth` page meta for that page using the `definePageMeta` function:

```vue{4}
<script setup>
  // pages/admin.vue

  definePageMeta({ auth: true });
</script>
```

So, when accessing the `/admin` page, if not logged in, you will be redirected to the `/login` page. After successfully logging in, you will be redirected back to the `/admin` page.

:::tip
See more about the `auth` meta at [Middleware](/guide/middleware.html#middleware).

Find more guidance on login in the [Guide > Login](/guide/login) section and logout in the [Guide > Logout](/guide/logout) section.
:::

## Authentication on API calls

Once logged in successfully, the module will automatically attach the access token to the header of every API request (if the token exists), so you don't need to perform any additional actions.

In some cases, you may want to call an API without attaching the access token to the header. In this case, you can pass the `auth: false` option when making the API call as follows:

```ts{3}
$fetch('/users', {
  method: 'GET',
  auth: false
})
```

The `auth` option accepts the following values:

| Value | Description | Automatically attach Access token in headers | Automatically refresh token |
| --- | --- | --- | --- |
| `true` | Used for API requests requiring **mandatory authentication**.<br>The access token (if any) will be attached to the request header. If the request returns a `401 Unauthorized` error, the module will automatically refresh the token and retry the request once. If still unauthorized after the second attempt, the module will automatically redirect to the `/login` page. | <div style="text-align: center">✅</div> | <div style="text-align: center">✅</div> |
| `false` | Used for API requests **not requiring authentication**.<br>**Even if an access token exists, it will not be attached to the request header**. Therefore, if the request returns a `401 Unauthorized` error, the module **will not refresh the token** but immediately redirect to the `/login` page. | <div style="text-align: center">❌</div> | <div style="text-align: center">❌</div> |
| `'optional'` | Used for API requests **with or without** authentication requirements.<br>The access token (if any) will be attached to the request header. However, if the request returns a `401 Unauthorized` error, the module **will not refresh the token** but immediately redirect to the `/login` page. | <div style="text-align: center">✅</div> | <div style="text-align: center">❌</div> |

## Interception and refresh token

By default, the module will automatically refresh the token when making API calls and receiving a `401 Unauthorized` response.

In case you want to actively refresh the access token, you can call the `refreshTokens` function of `$auth` as follows:

```ts
const { $auth } = useNuxtApp();
try {
  await $auth.refreshTokens();
} catch (error) {
  // handle error
}
```

Note that in case the refresh token fails, the `refreshTokens` function will call `logout(false)` and return an error object, which you need to catch.
