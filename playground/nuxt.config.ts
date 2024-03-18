export default defineNuxtConfig({
  experimental: {
    appManifest: false,
  },
  modules: ["@pinia/nuxt", "../src/module"],
  auth: {
    endpoints: {
      baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      login: {
        url: "/login",
        method: "POST",
        property: "data",
      },
      logout: { url: "/logout", method: "DELETE" },
      refresh: {
        url: "/refresh_tokens",
        method: "POST",
        property: "data",
      },
      user: {
        url: "/me",
        method: "GET",
        property: "data",
      },
      signup: { url: "/signup", method: "POST" },
    },
    token: {
      headerName: "Authorization",
      type: "Bearer",
      property: "token",
    },
    refreshToken: {
      paramName: "token",
      property: "refresh_token",
    },
    cookie: {
      ssl: process.env.NUXT_ENABLE_HTTPS === "true",
    },
    middleware: {
      global: true,
    },
    redirect: {
      login: "/login",
      logout: "/",
      home: "/",
    },
    rewriteRedirects: true,
    socialProviders: {
      google: {
        url: "/login/google",
        method: "POST",
        clientId:
          "97014807593-2qdqtf6tojqh5n10fj6868s6g5eh2fv7.apps.googleusercontent.com",
      },
    },
  },
  devtools: { enabled: true },
});
