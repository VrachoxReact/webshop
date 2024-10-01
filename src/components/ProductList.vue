<template>
  <div class="product-list">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="product-grid">
      <div v-for="product in products" :key="product._id" class="product-card">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price.toFixed(2) }}</p>
        <router-link :to="{ path: `/product/${product._id}` }"
          >View Details</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "../stores/productStore";

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});

const { products, loading, error } = productStore;
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.product-card img {
  max-width: 100%;
  height: auto;
}
</style>
