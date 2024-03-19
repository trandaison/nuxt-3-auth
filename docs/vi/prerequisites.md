# Prerequisites

## API server

Hiện tại module này hỗ trợ việc đăng nhập thông qua API, do đó bạn cần phải có một API server để xử lý việc đăng nhập đáp ứng các yêu cầu sau:

- Có API login, response trả về access token và refresh token.
- Có API refresh token, response trả về access token mới và refresh token mới.
- Có API logout, xóa access token và refresh token.
- Có API lấy thông tin user, response trả về thông tin user.
- Access token và Refresh token là JWT tokens.

## Nuxt App
Có một số yếu tố khác bạn cần cân nhắc khi sử dụng module này trong dự án của mình:

- Tokens được lưu trữ trong cookie.
- Phiên đăng nhập và thông tin người dùng được lưu trữ trong store Pinia.
- Module này sử dụng [`ofetch`](https://github.com/unjs/ofetch) cho việc giao tiếp với API (mặc định trên Nuxt 3), do đó các interceptor đang được gắn cho `$fetch` một cách mặc định. Nếu bạn xử dụng axios hoặc một thư viện khác cho việc gọi API, bạn cần phải tự thêm các interceptor tương ứng cho thư viện đó.
