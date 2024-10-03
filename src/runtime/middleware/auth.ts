/* eslint-disable consistent-return */
import type { RouteLocationNormalized } from 'vue-router';
import { navigateTo, useNuxtApp, useRuntimeConfig } from "#imports";
import { useLocalizeRoute } from "#build/useLocalizeRoute.mjs";
import { AuthStatus } from "../utils";

export default async function authMiddleware(to: RouteLocationNormalized) {
  const nuxtApp = useNuxtApp();
  const { auth: authMeta } = to.meta;
  const { $auth } = nuxtApp;
  const {
    public: { auth: authConfig },
  } = useRuntimeConfig();
  const { localeRoute } = useLocalizeRoute();

  const loginPath = authConfig.redirect.login ?? "/login";
  const loginRoute = localeRoute({
    path: loginPath,
    query: { status: AuthStatus.Unauthorized },
  });
  const homePath = localeRoute(authConfig.redirect.home ?? "/");

  const isLoggedIn = $auth.hasTokens;
  const isSessionEnd = $auth.isSessionEnd;
  const isSessionExpired = $auth.isSessionExpired;
  const isGuestAuth = authMeta === "guest";
  const isAuthRequired = authMeta === true;
  const isAuthDefined = authMeta && !isLoggedIn;
  const shouldSetReferer = String(authMeta) !== "guest" && isLoggedIn;
  const isCurrentRouteLogin = String(to.name) === String(loginRoute?.name);

  if (isLoggedIn && !$auth.isPersistent) {
    $auth.logout(false);
    return navigateTo(to);
  }

  if (isGuestAuth) {
    if (isLoggedIn) {
      return navigateTo(homePath);
    }
    return;
  }

  if (isLoggedIn) {
    const refreshAccessToken = async () => {
      if (isSessionExpired) await $auth.refreshTokens();
    };
    const fetchUser = async () => {
      if (!$auth.user.value) await $auth.fetchUser();
    };

    try {
      await refreshAccessToken();
      await fetchUser();
    } catch (error) {
      if (isSessionEnd) $auth.logout(false);
      if (isAuthRequired) {
        if (shouldSetReferer) $auth.setReferer(to.fullPath);
        return nuxtApp.runWithContext(() =>
          navigateTo(
            localeRoute({
              path: loginPath,
              query: { status: AuthStatus.Expired },
            })?.fullPath
          )
        );
      }
    }
  }

  if (isAuthDefined && !isCurrentRouteLogin) {
    $auth.setReferer(to.fullPath);
    return nuxtApp.runWithContext(() => navigateTo(loginRoute?.fullPath));
  }
}
