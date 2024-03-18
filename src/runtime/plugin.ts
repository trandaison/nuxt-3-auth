import { defineNuxtPlugin, useRuntimeConfig, addRouteMiddleware } from "#app";
import { Auth } from "./services/Auth";
import authMiddleware from "./middleware/auth";

declare module "#app" {
  interface NuxtApp {
    $auth: Auth;
  }
}

declare module "vue" {
  interface NuxtApp {
    $auth: Auth;
  }
}

export default defineNuxtPlugin(() => {
  const {
    public: { auth },
  } = useRuntimeConfig();
  addRouteMiddleware("auth", authMiddleware, { ...auth.middleware });
  // @ts-ignore
  const authService = new Auth($fetch);
  if (auth.useGlobalFetch) {
    globalThis.$fetch = authService.$fetch;
  }

  return {
    provide: {
      auth: authService,
    },
  };
});
