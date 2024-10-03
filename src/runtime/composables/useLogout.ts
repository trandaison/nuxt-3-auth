import type { RawLocation } from '@intlify/vue-router-bridge/lib/index.js';
import { ref } from 'vue';
import { navigateTo, useNuxtApp, useRuntimeConfig } from "#imports";
import { useLocalizeRoute } from "#build/useLocalizeRoute.mjs";

export const useLogout = (redirectPath: RawLocation = "/") => {
  const pending = ref(false);
  const errorMsg = ref("");
  const { $auth } = useNuxtApp();
  const {
    public: { auth: authConfig },
  } = useRuntimeConfig();
  const { localeRoute } = useLocalizeRoute();

  const redirectRoute = localeRoute(
    authConfig.redirect.logout || redirectPath || "/"
  );

  const doLogout = () => {
    return $auth
      .logout()
      .then(() => {
        navigateTo(redirectRoute, { replace: true });
      })
      .catch((error) => {
        errorMsg.value = error.data.message;
      })
      .finally(() => (pending.value = false));
  };

  return {
    errorMsg,
    pending,
    doLogout,
  };
};
