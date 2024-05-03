import type { RawLocation } from "@intlify/vue-router-bridge/lib/index.js";
import { ref, computed } from "vue";
import { navigateTo, useNuxtApp } from "#imports";
import { useLocalizeRoute } from "#build/useLocalizeRoute.mjs";
import type { AuthService } from "../../types";

export interface UseLoginOptions {
  redirectPath?: RawLocation | ((auth: AuthService) => RawLocation);
  credentials?: any;
  persistent?: boolean;
  invalidErrorMessage?: string;
  otherErrorMessage?: string;
}

export const useLogin = ({
  redirectPath = "/",
  credentials: initials,
  persistent: initialPersistent = true,
  invalidErrorMessage = "Invalid login credentials",
  otherErrorMessage = "An error has occurred",
}: UseLoginOptions = {}) => {
  const { $auth } = useNuxtApp();
  const { localeRoute } = useLocalizeRoute();
  const credentials = ref({ ...initials });
  const persistent = ref(initialPersistent);
  const pending = ref(false);
  const error = ref<any>(null);

  const errorMsg = computed(() => {
    const status = error.value?.status;
    const isInvalid = Number.isInteger(status) && status >= 400 && status < 500;
    if (isInvalid || error.value === true) {
      return invalidErrorMessage;
    }

    return error.value ? otherErrorMessage : null;
  });

  const resetError = () => {
    error.value = null;
  };

  const invalid = computed(() => {
    return Object.keys(credentials.value as object).some(
      (entry) => String((credentials.value as any)[entry] ?? "") === ""
    );
  });

  const login = (
    params?: Record<string, unknown>,
    { sessionOnly }: { sessionOnly?: boolean } = {}
  ) => {
    if (invalid.value) {
      error.value = true;
      return Promise.resolve();
    }

    pending.value = true;
    resetError();

    const payload = params ?? credentials.value;
    const options = { sessionOnly: sessionOnly ?? !persistent.value };
    const redirectRoute = getRedirectPath();

    function getRedirectPath() {
      return typeof redirectPath === "function"
        ? redirectPath($auth)
        : localeRoute($auth.redirectPath || redirectPath || "/");
    }

    return $auth
      .login(payload, options)
      .then(async (res) => {
        await navigateTo(redirectRoute, { replace: true });
        return res;
      })
      .catch((_error) => {
        error.value = _error;
      })
      .finally(() => (pending.value = false));
  };

  return {
    credentials,
    persistent,
    errorMsg,
    error,
    pending,
    resetError,
    login,
  };
};
