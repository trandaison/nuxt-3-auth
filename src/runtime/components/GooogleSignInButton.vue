<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useNuxtApp, useRuntimeConfig } from '#imports';
import { GOOGLE_ACCOUNT_CLIENT_URL } from '../utils/config';

const scriptId = '__gapi';
const btn = ref<HTMLDivElement | null>(null);
const { $auth } = useNuxtApp();
const {
  public: { auth: authConfig },
} = useRuntimeConfig();

onMounted(createScript);

onUnmounted(() => {
  const script = document.getElementById(scriptId);
  if (script) {
    script.remove();
  }
});

function createScript() {
  const script = document.createElement('script');
  script.id = scriptId;
  script.src = GOOGLE_ACCOUNT_CLIENT_URL;
  script.async = true;
  script.onload = onload;
  document.body.appendChild(script);
}

function onload() {
  if (!btn.value) return;

  const { clientId: client_id } = authConfig.socialProviders.google;
  window.google.accounts.id.initialize({
    client_id,
    callback: handleCredentialResponse
  });
  window.google.accounts.id.renderButton(
    btn.value,
    { theme: "outline", size: "large", type: 'standard' }  // customization attributes
  );
  // window.google.accounts.id.prompt(); // also display the One Tap dialog
}

function handleCredentialResponse(response) {
  $auth.loginWith('google', response);
}
</script>

<template>
  <div ref="btn">
    <!-- <div
      id="g_id_onload"
      data-client_id="97014807593-2qdqtf6tojqh5n10fj6868s6g5eh2fv7.apps.googleusercontent.com"
      data-auto_prompt="false"
      data-context="signin"
      data-ux_mode="popup"
      data-login_uri="login"
      data-itp_support="true"
    />

    <div
      class="g_id_signin"
      data-type="standard"
      data-shape="rectangular"
      data-theme="filled_blue"
      data-text="signin_with"
      data-size="large"
      data-logo_alignment="left"
    /> -->
  </div>
</template>
