# Middleware

Mặc định module cung cấp một middleware tên `auth` để kiểm soát quyền quyền truy cập giữa các trang.

## Sử dụng

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

Auth module cung cấp option `auth` trong `PageMeta`, giá trị của option này có thể là:

- `true` Trang được yêu cầu login trước khi truy cập. Nếu chưa login sẽ bị chuyển hướng tới đường dẫn của [trang login](#).
- `false` Trang không yêu cầu login, user login hay không đều có thể truy cập.
- `guest` Trang yêu cầu không login, ví dụ trang login, trang register. Nếu đã login thì truy cập những trang này sẽ bị chuyển hướng tới đường dẫn của trang [trang logout](#).
- `undefined` tương tự `auth = false`.
