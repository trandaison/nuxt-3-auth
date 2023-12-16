<script lang="ts" setup>
import { definePageMeta } from '#imports';
import { onMounted } from 'vue';
import { useLogout } from '../composables/useLogout';

definePageMeta({
  auth: true,
  layout: 'empty',
});

const { doLogout } = useLogout();

onMounted(() => doLogout());
</script>

<template>
  <div class="logout-wrapper">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="30px"
      height="30px"
      viewBox="0 0 30 30"
      class="lds-ring"
    >
      <circle
        cx="15"
        cy="15"
        fill="none"
        r="13"
        stroke="#b7b7b7"
        stroke-width="2"
        stroke-linecap="round"
        transform="rotate(216.567 15 15)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 15 15;320 15 15;720 15 15"
          keyTimes="0;0.5;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          calcMode="linear"
          values="0 80; 70 80; 00 80"
          keyTimes="0;0.5;1"
          dur="1"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.logout-wrapper {
  height: calc(100vh - 32px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
