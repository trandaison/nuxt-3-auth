# Nuxt 3 Authentication Module

Module này được thiết kế dựa trên ý tưởng của [nuxt/auth-module](https://auth.nuxtjs.org/) nhưng hỗ trợ cho Nuxt 3.

Từ phiên bản 3 trở lên, mặc định Nuxt sử dụng [`ofetch`](https://github.com/unjs/ofetch) cho việc giao tiếp với API thông qua `$fetch` và `useFetch`. Auth module cũng không ngoại lệ, sử dụng `$fetch` cho việc gọi API và [`pinia`](https://pinia.vuejs.org/) làm store quản lý session đăng nhập.

Ngoài ra module cũng cung cấp sẵn một middleware `auth` để kiểm tra trạng thái đăng nhập của người dùng, một component `Authentication` là form đăng nhập. Trang `/login` và `/logout` mặc định cũng được cung cấp sẵn, cùng nhiều composition api khác hỗ trợ cho việc đăng nhập, đăng xuất, lấy thông tin người dùng, refresh token, ...
