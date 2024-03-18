<script setup lang="ts">
import { definePageMeta } from '#imports';
import GoogleSignInButton from '../components/GooogleSignInButton.vue';

definePageMeta({
  title: 'title.login',
  auth: 'guest',
});
</script>

<template>
  <div>
    <div class="login-container">
      <authenticator
        title="Login"
        :credentials="{ email: '', password: '', remember_me: true }"
      />

      <div class="social-login">
        <GoogleSignInButton />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.social-login {
  margin-top: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
