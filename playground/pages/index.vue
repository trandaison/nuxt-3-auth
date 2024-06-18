<script lang="ts" setup>
const { $auth } = useNuxtApp();
const { user, loggedIn } = $auth;
const localeRoute = useLocaleRoute();

const fetched = ref(false);
const error = ref<any>(false);

function fetchUser() {
  fetched.value = false;
  $auth.fetchUser()
    .then(() => {
      error.value = false;
    })
    .catch((err) => {
      error.value = err;
      console.error(err);
    })
    .finally(() => {
      fetched.value = true;
    });
}
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
      Go the <nuxt-link :to="localeRoute('/private')">
        private page
      </nuxt-link> to see a private page.
    </p>
    <p>
      Or fetch user to see if the token is attached to the request: <button @click="fetchUser">
        Fetch user
      </button>
    </p>
    <pre v-if="fetched">{{ JSON.stringify(error ? error : user, null, 2) }}</pre>
  </div>
</template>

<style>
button {
  background-color: #03963b;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #1fb659;
}

button:active {
  background-color: #1aa653;
}
</style>
