<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';

import { useLogin } from '../composables/useLogin';
import { AuthStatus } from '../utils';

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

const isSessionExpired = computed(() => status.value === AuthStatus.Expired);
const isUnauthorized = computed(() => status.value === AuthStatus.Unauthorized);

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
      <h1
        v-if="title"
        class="title"
      >
        {{ title }}
      </h1>
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
      >
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
      >
    </div>
    <slot
      name="append"
      v-bind="{ credentials }"
    />

    <div class="text-center">
      <slot
        name="submit"
        v-bind="{ pending }"
      >
        <button
          type="submit"
          :disabled="pending"
          class="btn-submit"
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
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    line-height: 1.5;
    background-color: #fff;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    outline: none;
    font-size: inherit;

    &:focus {
      border-color: #03963b;
    }
  }

  .title {
    text-align: center;
  }

  .form-item {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
      line-height: 1.5;
      color: #606266;
    }
  }

  .btn-submit {
    padding: 0.5625rem 2rem;
    font-size: inherit;
    line-height: 1.5;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    outline: none;
    border: none;
    background-color: #03963b;
    color: #fff;

    &:hover {
      background-color: #1fb659;
    }

    &:active {
      background-color: #1aa653;
    }

    &:disabled {
      opacity: 0.65;
      pointer-events: none;
      cursor: not-allowed;
    }
  }

  .text-center {
    text-align: center;
  }

  .feedback {
    font-size: inherit;
    line-height: 1.5;
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    text-align: center;
    color: #fff;

    &--info {
      color: #777b83;
      background-color: rgba(#777b83, 0.1);
    }

    &--warning {
      color: #e6a23c;
      background-color: rgba(#e6a23c, 0.1);
    }

    &--error {
      color: #f56c6c;
      background-color: rgba(#f56c6c, 0.1);
    }
  }
}
</style>
