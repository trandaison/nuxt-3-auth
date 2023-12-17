import defu from "defu";
import {
  defineNuxtModule,
  addPlugin,
  addComponent,
  createResolver,
} from "@nuxt/kit";
import type { AuthOptions, AuthConfig } from "./types";

declare module "@nuxt/schema" {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      auth: AuthConfig;
    };
  }
  interface NuxtConfig {
    auth?: AuthOptions;
  }
  interface NuxtOptions {
    auth?: AuthOptions;
  }
}

const resolver = createResolver(import.meta.url);

export default defineNuxtModule<AuthOptions>({
  meta: {
    name: "auth-module",
    configKey: "auth",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    endpoints: {
      baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      login: {
        url: "/login",
        method: "POST",
        property: "",
      },
      logout: { url: "/logout", method: "DELETE" },
      refresh: {
        url: "/refresh_tokens",
        method: "POST",
        property: "",
      },
      user: {
        url: "/me",
        method: "GET",
        property: "",
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
      ssl: false,
      maxAge: 365 * 24 * 60 * 60,
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
    routes: {
      login: {
        name: "login",
        file: resolver.resolve("./runtime/pages/login.vue"),
        path: "/login",
      },
      logout: {
        name: "logout",
        path: "/logout",
        file: resolver.resolve("./runtime/pages/logout.vue"),
      },
    },
    debug: false,
    plugins: [],
    useGlobalFetch: true,
  },
  setup(moduleOptions, nuxt) {
    nuxt.options.runtimeConfig.public.auth = defu(
      nuxt.options.runtimeConfig.public.auth,
      { ...moduleOptions }
    );

    // Auto register components
    nuxt.hook("components:dirs", (dirs) => {
      dirs.push({
        path: resolver.resolve("./runtime/components"),
      });
    });

    // Auto register composables
    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolver.resolve("./runtime/composables"));
    });

    // Auto register components
    addComponent({
      name: "Authenticator",
      filePath: resolver.resolve("./runtime/components/Authenticator.vue"),
    });

    // Auto register pages
    nuxt.hook("pages:extend", (pages) => {
      const { routes } = nuxt.options.runtimeConfig.public.auth;
      (Object.keys(routes) as Array<keyof typeof routes>).forEach((name) => {
        const route = routes[name];
        pages.push({ ...route, name: route.name || name });
      });
    });

    addPlugin(resolver.resolve("./runtime/plugin.ts"));

    // Register auth plugins
    const { plugins } = nuxt.options.runtimeConfig.public.auth;
    plugins.forEach((plugin) => {
      addPlugin(resolver.resolve(plugin));
    });

    // Pinia store modules are auto imported
  },
});
