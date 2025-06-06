import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { Auth } from "./services/Auth";

declare module "#app" {
  interface NuxtApp {
    $auth: Auth;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $auth: Auth;
  }
}

export default defineNuxtPlugin({
  name: "auth",
  async setup(nuxtApp) {
    const {
      public: { auth },
    } = useRuntimeConfig();
    // @ts-ignore
    const authService = new Auth($fetch, nuxtApp.$pinia);
    if (auth.useGlobalFetch) {
      globalThis.$fetch = authService.$fetch as any;
    }

    return {
      provide: {
        auth: authService,
      },
    };
  },
});
