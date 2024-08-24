<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    productToEdit: {
      type: Object,
      default: null,
    },
  },
  emits: ["save"],
  setup(props, { emit }) {
    const localProduct = ref({
      name: "",
      seller: "",
      integration: "reels",
    });

    const isEditing = ref(false);

    // Следим за изменениями в props
    watch(
      () => props.productToEdit,
      (newProduct) => {
        if (newProduct) {
          localProduct.value = { ...newProduct };
          isEditing.value = true;
        } else {
          resetForm();
          isEditing.value = false;
        }
      },
      { immediate: true }
    );

    /**
     * Сохраняет товар, вызывая событие "save" с текущим значением товара, а затем сбрасывает форму.
     *
     * @return {void}
     */
    function saveProduct() {
      try {
        validateForm();
        alert(isEditing.value ? "Product updated! ✅" : "Product saved! ✅");

        // emit("save", { ...localProduct.value });

        if (isEditing.value) {
          emit("update-product", { ...localProduct.value });
        } else {
          emit("save", { ...localProduct.value });
        }

        resetForm();
      } catch (error) {
        alert(error.message);
        return;
      }
    }

    /**
     * Осуществляет валидацию формы.
     *
     * @throws {Error} - Ошибка валидации
     * @return {void}
     */
    function validateForm() {
      if (!localProduct.value.name.trim()) {
        throw new Error("Name is required! ❌");
      } else if (localProduct.value.name.length > 20) {
        throw new Error("Name must be less than 20 characters! ❌");
      }

      if (!localProduct.value.seller.trim()) {
        throw new Error("Seller is required! ❌");
      } else if (localProduct.value.seller.length > 20) {
        throw new Error("Seller must be less than 20 characters! ❌");
      }
    }

    /**
     * Очистка формы до значений по умолчанию.
     *
     * @return {void}
     */
    function resetForm() {
      localProduct.value = {
        name: "",
        seller: "",
        integration: "reels",
      };
      isEditing.value = false;
    }

    return {
      localProduct,
      isEditing,
      saveProduct,
      resetForm,
    };
  },
});
</script>

<template>
  <fieldset class="product-form">
    <!-- <h2>{{ isEditing ? "Редактирование" : "Добавить товар" }}</h2> -->

    <label>*Название товара:</label>
    <input v-model="localProduct.name" placeholder="Название" autofocus />

    <label>*Продавец:</label>
    <input v-model="localProduct.seller" placeholder="Продавец" />

    <label>*Интеграция:</label>
    <select v-model="localProduct.integration">
      <option value="reels">Reels</option>
      <option value="stories">Stories</option>
    </select>

    <button @click="saveProduct" type="submit">
      {{ isEditing ? "Сохранить изменения" : "Добавить товар" }}
    </button>
  </fieldset>
  <br />
</template>

<style scoped lang="scss">
.product-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  margin: auto;

  & h2 {
    align-self: center;
  }
}

/* 900px */
@include responsiveness(tablet-landscape) {
}

/* 1200px */
@include responsiveness(desktop) {
}
</style>
