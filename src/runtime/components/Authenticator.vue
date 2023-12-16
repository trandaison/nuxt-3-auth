<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';

import { useLogin } from '../composables/useLogin';

type Props = {
  title?: string;
  labelEmail?: string;
  labelPassword?: string;
  placeholderEmail?: string;
  placeholderPassword?: string;
  invalidErrorMessage?: string;
  otherErrorMessage?: string;
  feedbackSessionExpiredMessage?: string;
  feedbackUnauthorizedMessage?: string;
  btnSubmit?: string;
  credentials?: any;
  css?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  title: '',
  labelEmail: 'Email',
  labelPassword: 'Password',
  placeholderEmail: 'Enter your email',
  placeholderPassword: 'Enter your password',
  invalidErrorMessage: 'Invalid login credentials',
  otherErrorMessage: 'An error has occurred',
  feedbackSessionExpiredMessage:
    'Login session has expired.\nPlease login again to continue.',
  feedbackUnauthorizedMessage: 'Please login to continue.',
  btnSubmit: 'Login',
  credentials: () => ({}),
  css: true,
});

const { credentials, pending, errorMsg, error, login, resetError } = useLogin({
  credentials: props.credentials,
});
const route = useRoute();
const status = ref<string | null>(String(route.query.status) ?? null);

const isSessionExpired = computed(() => status.value === '440');
const isUnauthorized = computed(() => status.value === '401');

const feedbackMessage = computed(() => {
  if (errorMsg.value) return errorMsg.value;

  if (isSessionExpired.value) return props.feedbackSessionExpiredMessage;

  if (isUnauthorized.value) return props.feedbackUnauthorizedMessage;

  return '';
});

const feedbackType = computed(() => {
  if (errorMsg.value) return 'error';

  if (isSessionExpired.value) return 'info';

  if (isUnauthorized.value) return 'warning';

  return 'info';
});

const dissmiss = () => {
  resetError();
  status.value = null;
};
</script>

<template>
  <form
    ref="form"
    method="post"
    class="authenticator"
    :class="css ? 'css-on' : 'css-off'"
    @submit.prevent="() => login(credentials, { sessionOnly: false })"
  >
    <slot name="title">
      <h1 v-if="title">{{ title }}</h1>
    </slot>

    <slot
      name="feedback"
      v-bind="{ error, type: feedbackType, message: feedbackMessage, dissmiss }"
    >
      <transition name="fade">
        <div
          v-if="feedbackMessage"
          :class="`feedback feedback--${feedbackType}`"
        >
          {{ feedbackMessage }}
        </div>
      </transition>
    </slot>

    <div class="form-item">
      <label for="email">{{ labelEmail }}</label>
      <input
        id="email"
        v-model="credentials.email"
        class="input-email"
        autocomplete="off"
        :placeholder="placeholderEmail"
      />
    </div>
    <div class="form-item">
      <label for="password">{{ labelPassword }}</label>
      <input
        id="password"
        v-model="credentials.password"
        class="input-password"
        type="password"
        autocomplete="off"
        :placeholder="placeholderPassword"
      />
    </div>
    <slot name="append" v-bind="{ credentials }" />

    <div class="text-center">
      <slot name="submit">
        <button
          type="submit"
          :disabled="pending"
          class="btn-submit el-button el-button--primary"
        >
          {{ btnSubmit }}
        </button>
      </slot>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.css-on {
  input {
    --el-input-inner-height: calc(var(--el-input-height, 32px) - 2px);

    padding: 1px 11px;
    background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
    background-image: none;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    transition: var(--el-transition-box-shadow);
    transform: translateZ(0);
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
      inset;
    width: 100%;
    color: var(--el-input-text-color, var(--el-text-color-regular));
    font-size: inherit;
    height: var(--el-input-inner-height);
    line-height: var(--el-input-inner-height);
    outline: none;
    border: none;
    box-sizing: border-box;
  }

  label {
    display: inline-flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 0 0 auto;
    font-size: var(--el-form-label-font-size);
    color: var(--el-text-color-regular);
    height: 32px;
    line-height: 32px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }

  button {
    &[disabled] {
      opacity: 0.65;
      pointer-events: none;
    }
  }

  .form-item {
    & + .form-item {
      /* @apply mt-4; */
    }
  }

  .feedback {
    /* @apply text-center whitespace-pre-wrap mb-2; */

    &--error {
      /* @apply text-red-600; */
    }

    &--warning,
    &--info {
      /* @apply text-gray-600; */
    }
  }
}
</style>
