<script>
// Vue stuff
import { defineComponent, ref } from "vue";

// Компоненты
import ProductForm from "../components/ProductForm.vue";
import ProductList from "../components/ProductList.vue";

// Stores
import productStore from "../stores/productStore";

export default defineComponent({
  components: {
    ProductForm,
    ProductList,
  },
  setup() {
    const { products, addProduct, editProduct } = productStore();
    const productToEdit = ref(null);

    /**
     * Обрабатывает сохранение товара (редактирование или добавление нового).
     *
     * @param {Object} product - Товар, который нужно сохранить.
     * @return {void}
     */
    function productSaveHandler(product) {
      if (productToEdit.value) {
        editProduct(products.value.indexOf(productToEdit.value), product);
        productToEdit.value = null;
      } else {
        addProduct(product);
      }
    }

    /**
     * Указывает, что нужно редактировать товар.
     *
     * @param {Object} product - Товар, который нужно редактировать.
     * @return {void}
     */
    function setProductToEdit(product) {
      productToEdit.value = product;
    }

    return {
      productToEdit,
      productSaveHandler,
      setProductToEdit,
    };
  },
});
</script>

<template>
  <main>
    <h1>Список товаров</h1>
    <ProductForm :productToEdit="productToEdit" @save="productSaveHandler" />
    <ProductList @edit="setProductToEdit" />
  </main>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
}

/* 900px */
@include responsiveness(tablet-landscape) {
}

/* 1200px */
@include responsiveness(desktop) {
}
</style>
