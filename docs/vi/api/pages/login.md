# Page login

## `status` query

Khi bị chuyển hướng tới trang login, module sẽ tự động thêm query `status` vào URL để xác định trạng thái hiện tại của trang login. Có 2 giá trị có thể của `status`:

- `"unauthorized"`: trạng thái bị chuyển hướng đến trang login do 1 trong 2 nguyên nhân sau:
  - Chưa đăng nhập.
  - Cả access token và refresh token đều đã hết hạn.
- `"session-expired"`: trạng thái bị chuyển hướng đến trang login do access token đã hết hạn, mặc dù refresh token vẫn còn hạn sử dụng nhưng có lỗi xảy ra khi thực hiện refresh token.
