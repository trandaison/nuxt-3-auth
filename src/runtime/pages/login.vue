<script setup lang="ts">
import { definePageMeta } from '#imports';

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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
