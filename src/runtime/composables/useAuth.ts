import { useNuxtApp } from '#imports';

export function useAuth() {
  const { $auth } = useNuxtApp();

  return $auth;
}
