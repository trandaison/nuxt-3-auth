# Page login

## `status` query

When redirected to the login page, the module will automatically add the `status` query to the URL to determine the current state of the login page. There are 2 possible values of `status`:

- `"unauthorized"`: the state of being redirected to the login page due to 1 of 2 reasons:
  - Not logged in.
  - Both access token and refresh token have expired.
- `"session-expired"`: the state of being redirected to the login page due to the access token having expired, even though the refresh token is still valid, but an error occurred when refreshing the token.
