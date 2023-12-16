import {
  defineNuxtPlugin,
  useRuntimeConfig,
  addRouteMiddleware,
} from 'nuxt/app';
import { Auth } from "./services/Auth";
import authMiddleware from "./middleware/auth";

declare module "#app" {
  interface NuxtApp {
    $auth: Auth;
  }
}

declare module "nuxt/dist/app/nuxt" {
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
  return {
    provide: {
      auth: authService,
    },
  };
});
