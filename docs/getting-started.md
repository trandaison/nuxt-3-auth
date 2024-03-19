# Nuxt 3 Authentication Module

This module is designed based on the concept of [nuxt/auth-module](https://auth.nuxtjs.org/) but with support for Nuxt 3.

Starting from version 3 and above, Nuxt by default utilizes [`ofetch`](https://github.com/unjs/ofetch) for API communication via `$fetch` and `useFetch`. The Auth module follows suit, employing `$fetch` for API calls and [`pinia`](https://pinia.vuejs.org/) for managing login sessions.

Additionally, the module provides a built-in `auth` middleware to check the user's login status, an `Authentication` component serving as the login form. Default routes `/login` and `/logout` are also provided along with various composition APIs to support functionalities such as login, logout, user information retrieval, token refreshing, and more.
