import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { Auth } from "./services/Auth";

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
