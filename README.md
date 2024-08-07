# Nuxt 3 auth Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A simple authentication module for Nuxt 3

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/@trandaison/nuxt-3-auth?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 🤝 &nbsp;Compatible with pinia, nuxtjs/i18n, ofetch.
- 🚀 &nbsp;Built in pages and compositions.
- ⚙️ &nbsp;Support refresh tokens

## Quick Setup

1. Add `@trandaison/nuxt-3-auth` dependency to your project

```bash
# Using pnpm
pnpm add -D @trandaison/nuxt-3-auth

# Using yarn
yarn add --dev @trandaison/nuxt-3-auth

# Using npm
npm install --save-dev @trandaison/nuxt-3-auth
```

2. Add `@trandaison/nuxt-3-auth` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@trandaison/nuxt-3-auth'
  ]
})
```

That's it! You can now use Nuxt 3 auth Module in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@trandaison/nuxt-3-auth/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@trandaison/nuxt-3-auth

[npm-downloads-src]: https://img.shields.io/npm/dm/@trandaison/nuxt-3-auth.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@trandaison/nuxt-3-auth

[license-src]: https://img.shields.io/npm/l/@trandaison/nuxt-3-auth.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@trandaison/nuxt-3-auth

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
