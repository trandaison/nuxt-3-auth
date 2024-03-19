# Authenticator

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string \| undefined` | `''` | The form title |
| `labelEmail` | `string \| undefined` | `'Email'` |  |
| `labelPassword` | `string \| undefined` | `'Password'` |  |
| `placeholderEmail` | `string \| undefined` | `'Enter your email'` |  |
| `placeholderPassword` | `string \| undefined` | `'Enter your password'` |  |
| `invalidErrorMessage` | `string \| undefined` | `'Invalid login credentials'` | The error message when login failure |
| `otherErrorMessage` | `string \| undefined` | `'An error has occurred'` | Error message when an indeterminate error occurred |
| `feedbackSessionExpiredMessage` | `string \| undefined` | `'Login session has expired.\nPlease login again to continue.'` | Error message when the login session has expired |
| `feedbackUnauthorizedMessage` | `string \| undefined` | `'Please login to continue.'` | The feedback message when the user is redirected to the login page. |
| `btnSubmit` | `string \| undefined` | `'Login'` |  |
| `credentials` | `any \| undefined` | `() => ({})` | The initial values of [`credentials`](/api/$auth#login) which contains the login credentials |
| `css` | `boolean \| undefined` | `true` | Set `false` to turn off default css on the login form |

## Slots

![](/images/login_form_slots.png)

| Name | Props | Description |
| --- | --- | --- |
| `title` | `undefined` | The title of the form |
| `feedback` | `undefined` | Error messsage/Feedback message |
| `append` | `{ credentials: any }` | The bottom of the form, you might need this slot for the "remember me" feature |
| `submit` | `{ pending: boolean }` | Submit button |
