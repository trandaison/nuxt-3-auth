import type { RawLocation, RouteLocation } from '@intlify/vue-router-bridge';
import { useNuxtApp, useRouter } from "nuxt/app";

export function useLocalizeRoute() {
  const router = useRouter();

  return (routeRaw: RawLocation | RouteLocation) => router.resolve(routeRaw);
}

// export function useLocalizeRoute() {
//   const nuxtApp = useNuxtApp();
//   const { $i18n } = nuxtApp;
//   const router = useRouter();

//   const prefixLocalOnPath = (path: string, locale: string) => {
//     if (locale === ($i18n as any).fallbackLocale.value) return path;

//     return path.startsWith(`/${locale}`) ? path : `/${locale}${path}`;
//   };

//   return (to: RawLocation | RouteLocation) => {
//     const locale = ($i18n as any).locale.value;

//     if (typeof to === 'string') {
//       return router.resolve(prefixLocalOnPath(to, locale));
//     }

//     return router.resolve({
//       ...to,
//       path: prefixLocalOnPath((to as RouteLocation).path, locale),
//     });
//   };
// }
