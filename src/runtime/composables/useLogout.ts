import type { RawLocation } from '@intlify/vue-router-bridge';
import { ref } from 'vue';
import { useNuxtApp, useRuntimeConfig, navigateTo } from 'nuxt/app';

export const useLogout = (redirectPath: RawLocation = '/') => {
  const pending = ref(false);
  const errorMsg = ref('');
  const { $auth } = useNuxtApp();
  const {
    public: { auth: authConfig },
  } = useRuntimeConfig();

  const redirectRoute = authConfig.redirect.logout ?? redirectPath ?? '/';

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
