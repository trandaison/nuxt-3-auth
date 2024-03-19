# Logout

Mặc định module này cung cấp một trang logout buit-in ở đường dẫn `/logout`.
Do đó việc sử dụng cũng hết sức đơn giản, chỉ cần sử dụng component `NuxtLink` để tạo một link đến trang logout như sau:

```vue
<template>
  <nuxt-link :to="{ name: 'logout' }">Logout</nuxt-link>
</template>
```

Ngoài ra bạn cũng có thể handle việc logout thông qua composable `useLogout` như sau:

```vue
<script lang="ts" setup>
const { doLogout } = useLogout();
</script>

<template>
  <button @click="doLogout()">Logout</button>
</template>
```

:::tip
Xem thêm về `useLogout` trong phần [API > Composables](/vi/api/composables#uselogout)
:::
