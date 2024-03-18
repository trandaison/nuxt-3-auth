import { useLocaleRoute } from "#imports";
import type { RouteLocationRaw } from "vue-router";

export function useLocalizeRoute() {
  //
  const localeRoute = useLocaleRoute();

  const localePath = (rawRoute: RouteLocationRaw) =>
    localeRoute(rawRoute)?.fullPath ?? null;

  return {
    localeRoute,
    localePath,
  };
}
