<template>
  <div>
    <h1
      class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800"
    >
      Our Products
    </h1>
    <div v-if="loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"
      ></div>
    </div>
    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">{{ error }}</span>
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
    >
      <div
        v-for="product in products"
        :key="product._id"
        class="bg-white shadow-md sm:shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-48 sm:h-56 object-cover"
        />
        <div class="p-4">
          <h2 class="font-bold text-lg sm:text-xl mb-2 text-gray-800">
            {{ product.name }}
          </h2>
          <p class="text-indigo-600 text-base sm:text-lg font-semibold mb-4">
            ${{ product.price.toFixed(2) }}
          </p>
          <router-link
            :to="{ name: 'product-details', params: { id: product._id } }"
            class="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "../stores/productStore";

const productStore = useProductStore();
const { products, loading, error } = storeToRefs(productStore);

onMounted(() => {
  productStore.fetchProducts();
});
</script>
