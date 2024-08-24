<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <h1>404</h1>
    <h2>Страница не найдена! 😱</h2>

    <RouterLink to="/">Вернуться на главную</RouterLink>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  & h1 {
    font-size: calc($font-size-large * 5);
    background-color: white;
    color: map-get($map: $UI-color, $key: "text-404");
    border-radius: $border-radius-large;
  }

  & a::before {
    content: "👉";
    margin-right: toRem(5);
  }
}

/* 900px */
@include responsiveness(tablet-landscape) {
}

/* 1200px */
@include responsiveness(desktop) {
}
</style>
