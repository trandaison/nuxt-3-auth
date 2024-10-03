# Changelog

## v0.1.6

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.1.5...v0.1.6)

### 🩹 Fixes

- User is missing in global server side middleware ([82c8029](https://github.com/trandaison/nuxt-3-auth/commit/82c8029))

### 💅 Refactors

- Remove useCookie hook from AuthService ([073dc6e](https://github.com/trandaison/nuxt-3-auth/commit/073dc6e))

### 📖 Documentation

- Update type of accessToken from function to property ([471f92b](https://github.com/trandaison/nuxt-3-auth/commit/471f92b))

### 🏡 Chore

- Remove unused imports ([8f3d674](https://github.com/trandaison/nuxt-3-auth/commit/8f3d674))
- Update version @nuxt/module-builder ([b46e631](https://github.com/trandaison/nuxt-3-auth/commit/b46e631))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))

## v0.1.5

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.1.4...v0.1.5)

### 🩹 Fixes

- TypeError: Headers constructor ([4aad9d4](https://github.com/trandaison/nuxt-3-auth/commit/4aad9d4))

### 🏡 Chore

- Update types ([7b3e850](https://github.com/trandaison/nuxt-3-auth/commit/7b3e850))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))

## v0.1.4

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.1.1...v0.1.4)

### 🚀 Enhancements

- Add custom header to fetch instance ([5af577d](https://github.com/trandaison/nuxt-3-auth/commit/5af577d))
- Support refresh token by header ([a995442](https://github.com/trandaison/nuxt-3-auth/commit/a995442))

### 📖 Documentation

- Add docs for fetch custom header ([abe0c8c](https://github.com/trandaison/nuxt-3-auth/commit/abe0c8c))
- Update docs for routes options ([4cd60f4](https://github.com/trandaison/nuxt-3-auth/commit/4cd60f4))

### 🏡 Chore

- Update type of routes in options ([ccbbb73](https://github.com/trandaison/nuxt-3-auth/commit/ccbbb73))
- Update nuxt version ([ff278e3](https://github.com/trandaison/nuxt-3-auth/commit/ff278e3))
- Correct version in package.json ([fcc7b02](https://github.com/trandaison/nuxt-3-auth/commit/fcc7b02))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))
- Tuyen <songtuyen97@gmail.com>

## v0.1.1

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.16...v0.1.1)

### 🚀 Enhancements

- Support any type of token ([13a7e75](https://github.com/trandaison/nuxt-3-auth/commit/13a7e75))

### 📖 Documentation

- Add maxAge for token/refresh token ([1f7cc90](https://github.com/trandaison/nuxt-3-auth/commit/1f7cc90))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))

## v0.1.0

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.16...v0.1.0)

### 🚀 Enhancements

- Support any type of token ([13a7e75](https://github.com/trandaison/nuxt-3-auth/commit/13a7e75))

### 📖 Documentation

- Add maxAge for token/refresh token ([1f7cc90](https://github.com/trandaison/nuxt-3-auth/commit/1f7cc90))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))

## v0.0.16

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.15...v0.0.16)

### 🩹 Fixes

- Define type for user does nothing #13 ([#13](https://github.com/trandaison/nuxt-3-auth/issues/13))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))

## v0.0.15

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.14...v0.0.15)

### 🏡 Chore

- Update package versions ([5fa60af](https://github.com/trandaison/nuxt-3-auth/commit/5fa60af))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))

## v0.0.14

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.13...v0.0.14)

### 🩹 Fixes

- Auto logout on api retry error ([df04a7e](https://github.com/trandaison/nuxt-3-auth/commit/df04a7e))

### ❤️ Contributors

- Le Tuan Kiet <kietlt1@nal.vn>

## v0.0.13

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.12...v0.0.13)

### 🩹 Fixes

- Missing options in retry requests ([cb1bc7e](https://github.com/trandaison/nuxt-3-auth/commit/cb1bc7e))
- Incorrect redirect path ([170266c](https://github.com/trandaison/nuxt-3-auth/commit/170266c))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))

## v0.0.12

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.11...v0.0.12)

### 🩹 Fixes

- Retry on GET request not working ([27d8de2](https://github.com/trandaison/nuxt-3-auth/commit/27d8de2))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))

## v0.0.11

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.10...v0.0.11)

### 🩹 Fixes

- Fix error not redirect to login when refresh token failed ([64ab35d](https://github.com/trandaison/nuxt-3-auth/commit/64ab35d))
- Fix error missing authentication headers after refresh and retry ([524ff0f](https://github.com/trandaison/nuxt-3-auth/commit/524ff0f))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))

## v0.0.10

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.9...v0.0.10)

### 🩹 Fixes

- Fix retry request missing FormData params ([794ee8a](https://github.com/trandaison/nuxt-3-auth/commit/794ee8a))

### 📖 Documentation

- Fix dead links ([6828769](https://github.com/trandaison/nuxt-3-auth/commit/6828769))

### 🏡 Chore

- Upgrade packages to latest version ([5afa1d3](https://github.com/trandaison/nuxt-3-auth/commit/5afa1d3))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))

## v0.0.9

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.7...v0.0.9)

### 🩹 Fixes

- Add missing imports (and use stub mode to prevent in future) ([4142fe1](https://github.com/trandaison/nuxt-3-auth/commit/4142fe1))
- Fix error  is not defined ([6fc7dcd](https://github.com/trandaison/nuxt-3-auth/commit/6fc7dcd))

### 🏡 Chore

- Update build.config.ts ([c6ff88b](https://github.com/trandaison/nuxt-3-auth/commit/c6ff88b))
- **release:** V0.0.8 ([dc7f344](https://github.com/trandaison/nuxt-3-auth/commit/dc7f344))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))
- Daniel Roe ([@danielroe](http://github.com/danielroe))

## v0.0.8

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.7...v0.0.8)

### 🩹 Fixes

- Add missing imports (and use stub mode to prevent in future) ([4142fe1](https://github.com/trandaison/nuxt-3-auth/commit/4142fe1))
- Fix error  is not defined ([6fc7dcd](https://github.com/trandaison/nuxt-3-auth/commit/6fc7dcd))

### 🏡 Chore

- Update build.config.ts ([c6ff88b](https://github.com/trandaison/nuxt-3-auth/commit/c6ff88b))

### ❤️ Contributors

- Trandaison ([@trandaison](http://github.com/trandaison))
- Daniel Roe ([@danielroe](http://github.com/danielroe))

## v0.0.7

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.6...v0.0.7)

## v0.0.6

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.5...v0.0.6)

## v0.0.5

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.4...v0.0.5)

## v0.0.4

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.3...v0.0.4)

## v0.0.3

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.2...v0.0.3)

## v0.0.2

[compare changes](https://github.com/trandaison/nuxt-3-auth/compare/v0.0.1...v0.0.2)

## v0.0.1

