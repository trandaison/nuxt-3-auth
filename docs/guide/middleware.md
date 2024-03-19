# Middleware

By default, this module provides a built-in middleware named `auth` to handle authentication between pages.

## Usage

- Protected page

```vue
<!-- /pages/admin.vue -->

<script lang="ts" setup>
definePageMeta({ auth: true });
</script>
```

- Guest page

```vue
<!-- /pages/register.vue -->

<script lang="ts" setup>
definePageMeta({ auth: 'guest' });
</script>
```

Auth module provides option `auth` in `PageMeta`, the value of this option can be:

- `true` The page requires login before accessing. If not logged in, it will be redirected to the path of the [login page](#).
- `false` The page does not require login, users can access whether they are logged in or not.
- `guest` The page requires not to login, for example the login page, the register page. If logged in, accessing these pages will be redirected to the path of the [logout page](#).
- `undefined` similar to `auth = false`.
