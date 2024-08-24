import { ref, computed } from "vue";
// import { defineStore } from "pinia";

export default function useProductStore() {
  const products = ref([]);

  function addProduct(product) {
    product.id = Date.now();
    products.value.push(product);
    saveToLocalStorage();
  }

  function editProduct(index, updatedProduct) {
    products.value[index] = updatedProduct;
    saveToLocalStorage();
    alert("Product updated successfully! ✅");
  }

  function deleteProduct(id) {
    products.value = products.value.filter((product) => product.id !== id);
    saveToLocalStorage();
    alert("Product deleted successfully! ✅");
  }

  function loadFromLocalStorage() {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      products.value = JSON.parse(storedProducts);
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products.value));
    window.location.reload();
  }

  loadFromLocalStorage();

  return {
    products,
    addProduct,
    editProduct,
    deleteProduct,
  };
}
