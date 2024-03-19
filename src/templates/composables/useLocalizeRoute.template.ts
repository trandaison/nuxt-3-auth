export function generate({ useI18n = false }) {
  const importStatements = useI18n
    ? 'import { useLocaleRoute } from "#imports";'
    : 'import { useRouter } from "vue-router";';

  const routerDeclaration = useI18n ? "//" : "const router = useRouter();";

  const localeRouteFunction = useI18n
    ? "const localeRoute = useLocaleRoute();"
    : "const localeRoute = (rawRoute) => router.resolve(rawRoute);";

  return `${importStatements}

export function useLocalizeRoute() {
  ${routerDeclaration}
  ${localeRouteFunction}

  const localePath = (rawRoute) =>
    localeRoute(rawRoute)?.fullPath ?? null;

  return {
    localeRoute,
    localePath,
  };
}
`;
}
