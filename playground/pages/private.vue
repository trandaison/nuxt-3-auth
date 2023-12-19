<script setup>
import { definePageMeta } from '#imports';

definePageMeta({ auth: true });
</script>

<template>
  <div>
    <p>
      This page is private, you can only see it if you are logged in.
    </p>
  </div>
</template>

<style scoped>
.links {
  display: flex;
  gap: 1rem;
}
</style>
