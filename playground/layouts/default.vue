<script lang="ts" setup>
import { useNuxtApp } from '#imports';

const { $auth } = useNuxtApp();
const { loggedIn } = $auth;

const localeRoute = useLocaleRoute();
</script>

<template>
  <div id="__layout">
    <nav>
      <nuxt-link :to="localeRoute('/')">
        <h1>Nuxt-3-Auth module</h1>
      </nuxt-link>
      <ul>
        <li>
          <nuxt-link :to="localeRoute('/')">
            Home
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localeRoute('/private')">
            Private
          </nuxt-link>
        </li>
        <li v-if="loggedIn">
          <nuxt-link :to="localeRoute('/logout')">
            Logout
          </nuxt-link>
        </li>
        <li v-else>
          <nuxt-link :to="localeRoute('/login')">
            Login
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <main>
      <slot />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: system-ui;
  margin: 0;
  padding: 0;
  font-size: 16px;
  background-color: #efefef;
}
a {
  color: #03963b;
}
a:hover {
  color: #1fb659;
}
</style>

<style scoped>
#__layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

nav {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fff;
}

nav h1 {
  margin: 0;
}

nav > a {
  color: inherit;
  text-decoration: none;
}

nav ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
main {
  padding: 1rem;
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  background-color: #fff;
  flex: 1;
}
</style>
