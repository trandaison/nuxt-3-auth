# Prerequisites

## API server

Currently, this module supports login via API, so you need to have an API server to handle the login process meeting the following requirements:

- Have a login API, which responds with an access token and a refresh token.
- Have a refresh token API, which responds with a new access token and a new refresh token.
- Have a logout API, which deletes the access token and refresh token.
- Have a user information retrieval API, which responds with user information.
- Access token and Refresh token are JWT tokens.

## Nuxt App

There are several other factors you need to consider when using this module in your project:

- Tokens are stored in cookies.
- Login sessions and user information are stored in Pinia store.
- This module uses [`ofetch`](https://github.com/unjs/ofetch) for API communication (by default on Nuxt 3), so interceptors are attached to `$fetch` by default. If you use axios or another library for API calls, you need to manually add corresponding interceptors for that library.
