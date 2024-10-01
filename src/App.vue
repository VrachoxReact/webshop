<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row justify-between items-center">
          <router-link
            to="/"
            class="text-2xl sm:text-3xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-300 mb-4 sm:mb-0"
            >E-Shop</router-link
          >
          <nav class="space-x-4">
            <router-link
              to="/"
              class="text-gray-600 hover:text-indigo-600 transition duration-300"
              >Home</router-link
            >
            <router-link
              to="/cart"
              class="relative text-gray-600 hover:text-indigo-600 transition duration-300"
            >
              Cart
              <span
                v-if="cartItemCount > 0"
                class="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                {{ cartItemCount }}
              </span>
            </router-link>
          </nav>
        </div>
      </div>
    </header>
    <main class="flex-grow container mx-auto px-4 py-6 sm:py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="bg-gray-800 text-white mt-8">
      <div class="container mx-auto px-4 py-4 sm:py-6 text-center">
        <p>&copy; 2023 E-Shop. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useProductStore } from "./stores/productStore";

const productStore = useProductStore();
const cartItemCount = computed(() => productStore.cartItemCount);

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
