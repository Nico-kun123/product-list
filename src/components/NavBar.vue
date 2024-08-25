<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <!-- Проверка на текущую страницу -->
    <RouterLink v-if="$route.path === '/'" class="active" to="/">{{
      "Главная".toUpperCase()
    }}</RouterLink>
    <RouterLink v-else to="/">{{ "Главная".toUpperCase() }}</RouterLink>

    <RouterLink v-if="$route.path === '/about'" class="active" to="/about">{{
      "О сайте".toUpperCase()
    }}</RouterLink>
    <RouterLink v-else to="/about">{{ "О сайте".toUpperCase() }} </RouterLink>
  </nav>
  <hr />
</template>

<style lang="scss" scoped>
nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: toRem(16) auto 0 auto;
  height: toRem(40);

  font-size: $font-size-small;
  gap: toRem(48);
  margin-right: toRem(20);
  margin-left: toRem(20);

  & a {
    color: map-get($UI-color, "navbar-link");
    padding-bottom: toRem(18);
    font-weight: $font-weight-medium;
    -webkit-transition: $transition-duration-fast $transition-easing-3;
    -o-transition: $transition-duration-fast $transition-easing-3;
    transition: $transition-duration-fast $transition-easing-3;

    &:not(.active):hover {
      color: map-get($UI-color, "navbar-link-hover");
    }
  }

  & .active {
    font-weight: $font-weight-bold;
    color: map-get($map: $UI-color, $key: "navbar-link-active");
  }
}

/* 900px */
@include responsiveness(tablet-landscape) {
  nav {
    font-size: $font-size-normal;
    gap: toRem(100);
  }
}

/* 1200px */
@include responsiveness(desktop) {
  nav {
    font-size: $font-size-large;
  }
}
</style>
