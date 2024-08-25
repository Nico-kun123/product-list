import { ref, computed } from "vue";
// import { defineStore } from "pinia";

export default function useProductStore() {
  const products = ref([]);

  /**
   * Добавляет новый товар в localStorage
   *
   * @param {Object} product - product object
   * @returns {void}
   */
  function addProduct(product) {
    product.id = Date.now();
    products.value.push(product);
    saveToLocalStorage();
  }

  /**
   * Редактирует товар.
   *
   * @param {Number} index - ID товара.
   * @param {Object} updatedProduct - Объект с обновленными данными
   * @returns {void}
   */
  function editProduct(index, updatedProduct) {
    products.value[index] = updatedProduct;
    saveToLocalStorage();
    alert("Product updated successfully! ✅");
  }

  /**
   * Удаляет товар из localStorage
   *
   * @param {Number} id - ID товара
   * @returns {void}
   */
  function deleteProduct(id) {
    products.value = products.value.filter((product) => product.id !== id);
    saveToLocalStorage();
    alert("Product deleted successfully! ✅");
  }

  /**
   * Загружает данные из localStorage
   *
   * @returns {void}
   */
  function loadFromLocalStorage() {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      products.value = JSON.parse(storedProducts);
    }
  }

  /**
   * Сохраняет данные в localStorage
   *
   * @returns {void}
   */
  function saveToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products.value));
    window.location.reload();
  }

  // Загружаем данные из localStorage
  loadFromLocalStorage();

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
  };
}
