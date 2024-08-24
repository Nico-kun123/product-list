<script>
import { defineComponent, ref, computed } from "vue";
import ProductItem from "./ProductItem.vue";
import useProductStore from "../stores/productStore";

export default defineComponent({
  components: {
    ProductItem,
  },
  setup() {
    const { products, deleteProduct, editProduct } = useProductStore();
    const filter = ref("");
    const sortKey = ref("name");
    const currentPage = ref(1);
    const itemsPerPage = 20;

    const filteredProducts = computed(() =>
      products.value.filter((product) =>
        product.integration.includes(filter.value)
      )
    );

    const sortedProducts = computed(() =>
      [...filteredProducts.value].sort((a, b) =>
        a[sortKey.value].localeCompare(b[sortKey.value])
      )
    );

    const paginatedProducts = computed(() =>
      sortedProducts.value.slice(
        (currentPage.value - 1) * itemsPerPage,
        currentPage.value * itemsPerPage
      )
    );

    const totalPages = computed(() =>
      Math.ceil(sortedProducts.value.length / itemsPerPage)
    );

    /**
     * Starts the editing process for a given product.
     *
     * @param {Object} product - The product to be edited.
     * @return {void} No return value, edits the product internally.
     */
    function startEditing(product) {
      //   editProduct(product);
      alert("TODO: Написать функцию редактирования");
    }

    /**
     * Navigates to the next page in the product list pagination.
     *
     * @return {void} No return value, updates currentPage ref internally.
     */
    function nextPage() {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    }

    /**
     * Decrements the current page value if it is greater than 1.
     *
     * @return {void}
     */
    function prevPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }

    /**
     * Sorts the product list by the specified key.
     *
     * @param {string} key - The key to sort by (either "name" or "seller")
     * @return {void} No return value, updates the sort key and active sort buttons internally.
     */
    function sortBy(key) {
      sortKey.value = key;

      if (key === "name") {
        document.getElementById("sort-name").classList.add("active");
        document.getElementById("sort-seller").classList.remove("active");
      } else {
        document.getElementById("sort-seller").classList.add("active");
        document.getElementById("sort-name").classList.remove("active");
      }
    }

    /**
     * Deletes a product by its ID.
     *
     * @param {number} id - The ID of the product to delete.
     * @return {void} This function does not return anything.
     */
    function deleteProductHandler(id) {
      deleteProduct(id);
    }

    return {
      filter,
      currentPage,
      paginatedProducts,
      totalPages,
      startEditing,
      deleteProductHandler,
      nextPage,
      prevPage,
      sortBy,
    };
  },
});
</script>

<template>
  <div class="product-list">
    <input
      v-model="filter"
      placeholder="Filter by integration (Reels or Stories)"
    />
    <div class="product-list__filters">
      <button id="sort-name" @click="sortBy('name')">Sort by name</button>
      <button id="sort-seller" @click="sortBy('seller')">Sort by seller</button>
    </div>
    <div class="product-list__items-wrapper">
      <div v-for="(product, index) in paginatedProducts" :key="product.id">
        <ProductItem
          :product="product"
          @edit="startEditing(product)"
          @delete="deleteProductHandler(product.id)"
        />
      </div>
    </div>
    <div class="product-list__pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
      <span>Страница №{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Вперёд
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-list {
  display: flex;
  flex-direction: column;
  //   gap: 10px;

  &__filters {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 25px;
    height: 40px;
    width: 100%;

    & p {
      margin: 0 15px;
    }

    & button {
      margin-left: 0;
      font-size: $font-size-small;
    }
  }
  &__items-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;

    transition: $transition-duration-normal $transition-easing-3;

    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 50px;
  }
  &__pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    position: static;
    bottom: 0;
  }

  & input {
    width: 100%;
    max-width: 700px;
    margin: 25px auto;
  }
}

.active {
  font-weight: bold;
  background-color: map-get($map: $UI-color, $key: "btn-bg-hover");
  color: map-get($map: $UI-color, $key: "text-black");

  &:hover {
    background-color: map-get($map: $UI-color, $key: "btn-bg-hover");
  }
}

/* 900px */
@include responsiveness(tablet-landscape) {
  .product-list {
    &__items-wrapper {
      display: flex;
      //   justify-content: left;
      align-items: center;
      flex-direction: row;
      //   gap: 10px;
      flex-wrap: wrap;
    }
  }
}

/* 1200px */
@include responsiveness(desktop) {
}
</style>
