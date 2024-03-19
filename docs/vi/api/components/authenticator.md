# Authenticator

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string \| undefined` | `''` | Tiêu đề của form |
| `labelEmail` | `string \| undefined` | `'Email'` |  |
| `labelPassword` | `string \| undefined` | `'Password'` |  |
| `placeholderEmail` | `string \| undefined` | `'Enter your email'` |  |
| `placeholderPassword` | `string \| undefined` | `'Enter your password'` |  |
| `invalidErrorMessage` | `string \| undefined` | `'Invalid login credentials'` | Error message dùng để hiển thị trong trường hợp login không thành công. |
| `otherErrorMessage` | `string \| undefined` | `'An error has occurred'` | Error message dùng để hiển thị trong trường hợp lỗi khác không xác định được. |
| `feedbackSessionExpiredMessage` | `string \| undefined` | `'Login session has expired.\nPlease login again to continue.'` | Message hiển thị khi login session bị hết hạn. |
| `feedbackUnauthorizedMessage` | `string \| undefined` | `'Please login to continue.'` | Message hiển thị khi bị chuyển hướng đến trang login. |
| `btnSubmit` | `string \| undefined` | `'Login'` |  |
| `credentials` | `any \| undefined` | `() => ({})` | Giá trị khởi tạo của object [`credentials`](/vi/api/$auth#login) chứa thông tin đăng nhập. |
| `css` | `boolean \| undefined` | `true` | Bật CSS mặc định trên form login hay không. Set `false` để tắt CSS và tự custom CSS riêng. |

## Slots

![](/images/login_form_slots.png)

| Name | Props | Description |
| --- | --- | --- |
| `title` | `undefined` | Tiêu đề của form |
| `feedback` | `undefined` | Hiển thị message lỗi |
| `append` | `{ credentials: any }` | Vị trí cuối form, hữu ích trong trường hợp bạn muốn thêm checkbox "Ghi nhớ đăng nhập" |
| `submit` | `{ pending: boolean }` | Button submit của form |
