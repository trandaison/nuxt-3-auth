<script lang="ts" setup>
const { $auth } = useNuxtApp();
const { user, loggedIn } = $auth;
</script>

<template>
  <div>
    <h1 v-if="loggedIn">
      Wellcome back, <strong>{{ user!.name }}</strong>
    </h1>
    <h1 v-else>
      Hi guest!
    </h1>
    <p>
      This home page is public, both <b>guests</b> and <b>logged in users</b> can see it.
    </p>
    <p>
      Go the <nuxt-link to="/private">private page</nuxt-link> to see a private page.
    </p>
  </div>
</template>
