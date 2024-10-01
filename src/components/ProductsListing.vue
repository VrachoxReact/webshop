<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("/api/products");
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Products</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="border p-4 rounded"
      >
        <h3 class="font-bold">{{ product.name }}</h3>
        <p>{{ product.price }}</p>
        <button class="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
