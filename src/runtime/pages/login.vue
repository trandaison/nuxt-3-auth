<script setup lang="ts">
import { definePageMeta } from '#imports';

definePageMeta({
  title: 'title.login',
  auth: 'guest',
});
</script>

<template>
  <div>
    <div class="w-full max-w-80 mx-auto">
      <h1 class="text-center mb-5">
        Login
      </h1>
      <authenticator
        :credentials="{ email: '', password: '', remember_me: true }"
      />
    </div>
  </div>
</template>
