import { createRequire } from "module";
import { defineConfig } from "vitepress";

const require = createRequire(import.meta.url);
const pkg = require("vitepress/package.json");

// https://vitepress.dev/reference/site-config
export const vi = defineConfig({
  title: "Nuxt 3 Auth Module",
  description: "A simple authentication module for Nuxt 3",
  lang: "vi",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    nav: [
      { text: "Hướng dẫn", link: "/vi/guide/login" },
      { text: "API Reference", link: "/vi/api/options" },
    ],

    sidebar: [
      {
        text: "Giới thiệu",
        items: [
          { text: "Bắt đầu", link: "/vi/getting-started" },
          { text: "Các yêu cầu", link: "/vi/prerequisites" },
          { text: "Cài đặt", link: "/vi/installation" },
          { text: "Sử dụng", link: "/vi/usage" },
        ],
      },
      {
        text: "Hướng dẫn",
        items: [
          { text: "Login", link: "/vi/guide/login" },
          { text: "Logout", link: "/vi/guide/logout" },
          { text: "Middleware", link: "/vi/guide/middleware" },
          { text: "HTTP Request", link: "/vi/guide/http-request" },
          { text: "Typescript", link: "/vi/guide/typescript" },
          { text: "Câu hỏi thường gặp", link: "/vi/guide/faq" },
        ],
      },
      {
        text: "API",
        items: [
          {
            text: "Options",
            link: "/vi/api/options",
            items: [
              { text: "endpoints", link: "/vi/api/options#endpoints" },
              { text: "token", link: "/vi/api/options#token" },
              { text: "refreshToken", link: "/vi/api/options#refreshtoken" },
              { text: "redirect", link: "/vi/api/options#redirect" },
              { text: "cookie", link: "/vi/api/options#cookie" },
              { text: "middleware", link: "/vi/api/options#middleware" },
              {
                text: "rewriteRedirects",
                link: "/vi/api/options#rewriteredirects",
              },
              { text: "routes", link: "/vi/api/options#routes" },
              { text: "debug", link: "/vi/api/options#debug" },
              { text: "plugins", link: "/vi/api/options#plugins" },
              {
                text: "useGlobalFetch",
                link: "/vi/api/options#useglobalfetch",
              },
              { text: "useI18n", link: "/vi/api/options#usei18n" },
            ],
          },
          {
            text: "Composables",
            link: "/vi/api/composables",
            items: [
              { text: "useAuth", link: "/vi/api/composables#useauth" },
              { text: "useLogin", link: "/vi/api/composables#uselogin" },
              { text: "useLogout", link: "/vi/api/composables#uselogout" },
              // { text: "useRefresh", link: "/vi/api/composables#userefresh" },
              // { text: "useUser", link: "/vi/api/composables#useuser" },
              // { text: "useMiddleware", link: "/vi/api/composables#usemiddleware" },
            ],
          },
          {
            text: "$auth",
            link: "/vi/api/$auth",
            items: [
              { text: "user", link: "/vi/api/$auth#user" },
              { text: "store", link: "/vi/api/$auth#store" },
              { text: "redirectPath", link: "/vi/api/$auth#redirectpath" },
              { text: "accessToken", link: "/vi/api/$auth#accesstoken" },
              { text: "refreshToken", link: "/vi/api/$auth#refreshtoken" },
              { text: "loggedIn", link: "/vi/api/$auth#loggedin" },
              { text: "hasTokens", link: "/vi/api/$auth#hastokens" },
              {
                text: "isSessionExpired",
                link: "/vi/api/$auth#issessionexpired",
              },
              { text: "isSessionEnd", link: "/vi/api/$auth#issessionend" },
              { text: "isPersistent", link: "/vi/api/$auth#ispersistent" },
              { text: "config", link: "/vi/api/$auth#config" },
              { text: "httpService", link: "/vi/api/$auth#httpservice" },
              { text: "storage", link: "/vi/api/$auth#storage" },
              { text: "$fetch", link: "/vi/api/$auth#fetch" },
              { text: "login", link: "/vi/api/$auth#login" },
              { text: "fetchUser", link: "/vi/api/$auth#fetchuser" },
              { text: "logout", link: "/vi/api/$auth#logout" },
              { text: "refreshTokens", link: "/vi/api/$auth#refreshtokens" },
              { text: "setReferer", link: "/vi/api/$auth#setreferer" },
            ],
          },
          {
            text: "Components",
            items: [
              {
                text: "Authenticator",
                link: "/vi/api/components/authenticator",
                items: [
                  {
                    text: "Props",
                    link: "/vi/api/components/authenticator#props",
                  },
                  {
                    text: "Slots",
                    link: "/vi/api/components/authenticator#slots",
                  },
                ],
              },
            ],
          },
          {
            text: "Pages",
            items: [
              {
                text: "Login",
                link: "/vi/api/pages/login",
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/trandaison/nuxt-3-auth" },
    ],

    search: {
      provider: "local",
    },
  },

  outDir: "../../nuxt-3-auth-docs",
});
