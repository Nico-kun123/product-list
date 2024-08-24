<script setup>
// Vue stuff
import { RouterView } from "vue-router";

// Компоненты
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header>
    <NavBar v-if="$route.meta.showNavbar === true" />
  </header>

  <RouterView />
</template>

<style scoped lang="scss"></style>
