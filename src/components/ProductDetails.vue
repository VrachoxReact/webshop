<template>
  <div v-if="product" class="product-details">
    <img :src="product.image" :alt="product.name" />
    <h2>{{ product.name }}</h2>
    <p>Price: ${{ product.price.toFixed(2) }}</p>
    <p>{{ product.description }}</p>
    <button @click="addToCart(product)">Add to Cart</button>
  </div>
  <div v-else>Loading product details...</div>
</template>

<script setup>
import { computed } from "vue";
import { useProductStore } from "../stores/productStore";
import { useRoute } from "vue-router";

const route = useRoute();
const productStore = useProductStore();

const product = computed(() => {
  return productStore.products.find((p) => p._id === route.params.id);
});

function addToCart(product) {
  productStore.addToCart(product);
}
</script>

<style scoped>
.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.product-details img {
  max-width: 100%;
  height: auto;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
