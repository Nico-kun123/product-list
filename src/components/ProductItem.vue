<script>
import { defineComponent } from "vue";

// icons
import DeleteProductIcon from "./icons/deleteProductIcon.vue";
import EditProductIcon from "./icons/editProductIcon.vue";

export default defineComponent({
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  components: { DeleteProductIcon, EditProductIcon },
});
</script>

<template>
  <div class="product-item">
    <h3>Товар: '{{ product.name }}'</h3>
    <p>Продавец: '{{ product.seller }}'</p>
    <p>Интеграция: '{{ product.integration }}'</p>
    <div class="product-item__actions">
      <EditProductIcon @click="$emit('edit', product)" />
      <!-- <button @click="$emit('edit', product)">Редактировать</button> -->
      <DeleteProductIcon @click="$emit('delete', product)" />
      <!-- <button @click="$emit('delete', product)">Удалить</button> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-item {
  border: 1px solid white;
  min-width: 200px;
  min-height: 200px;
  border-radius: $border-radius-medium;
  padding: 0 5px;

  transition: $transition-duration-normal $transition-easing-3;

  &__actions {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center;
    gap: 10px;
    margin-bottom: 5px;

    position: absolute;
    bottom: 5px;
    right: 5px;
  }
}

/* 900px */
@include responsiveness(tablet-landscape) {
}

/* 1200px */
@include responsiveness(desktop) {
}
</style>
