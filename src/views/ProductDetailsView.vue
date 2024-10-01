<template>
  <div
    v-if="product"
    class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
  >
    <div class="md:flex">
      <div class="md:flex-shrink-0">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-64 md:h-full md:w-64 object-cover"
        />
      </div>
      <div class="p-4 sm:p-6 md:p-8">
        <div
          class="uppercase tracking-wide text-sm text-indigo-600 font-semibold"
        >
          {{ product.name }}
        </div>
        <p class="mt-2 text-gray-600">{{ product.description }}</p>
        <div class="mt-4 flex items-center">
          <span class="text-gray-600">Price:</span>
          <span class="ml-2 text-xl sm:text-2xl font-bold text-indigo-600"
            >${{ product.price.toFixed(2) }}</span
          >
        </div>
        <button
          @click="addToCart(product)"
          class="mt-6 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-8">
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"
    ></div>
  </div>
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
