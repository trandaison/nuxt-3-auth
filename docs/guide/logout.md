# Logout

By default, this module provides a built-in logout page at `/logout`. Therefore, using it is also very simple, just use the `NuxtLink` component to create a link to the logout page as follows:

```vue
<template>
  <nuxt-link :to="{ name: 'logout' }">Logout</nuxt-link>
</template>
```

In addition, you can also handle logout through the `useLogout` composable as follows:

```vue
<script lang="ts" setup>
const { doLogout } = useLogout();
</script>

<template>
  <button @click="doLogout()">Logout</button>
</template>
```

:::tip
See more about `useLogout` in the [API > Composables](/api/composables#uselogout)
:::
