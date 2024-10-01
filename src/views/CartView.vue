<template>
  <div>
    <h1
      class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800"
    >
      Your Cart
    </h1>
    <div
      v-if="cart.length === 0"
      class="text-center py-8 text-gray-500 text-lg sm:text-xl"
    >
      Your cart is empty
    </div>
    <div v-else>
      <div
        v-for="item in cart"
        :key="item._id"
        class="flex flex-col sm:flex-row items-center border-b border-gray-200 py-4"
      >
        <img
          :src="item.image"
          :alt="item.name"
          class="h-24 w-24 object-cover rounded-lg mb-4 sm:mb-0"
        />
        <div class="sm:ml-4 flex-grow text-center sm:text-left">
          <h2 class="font-bold text-lg text-gray-800">{{ item.name }}</h2>
          <p class="text-indigo-600 font-semibold">
            ${{ item.price.toFixed(2) }}
          </p>
        </div>
        <div class="flex items-center mt-4 sm:mt-0">
          <button
            @click="decreaseQuantity(item)"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-l transition duration-300"
          >
            -
          </button>
          <span class="px-4 py-1 bg-gray-100">{{ item.quantity }}</span>
          <button
            @click="increaseQuantity(item)"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-r transition duration-300"
          >
            +
          </button>
        </div>
        <button
          @click="removeItem(item._id)"
          class="mt-4 sm:mt-0 sm:ml-4 text-red-500 hover:text-red-700 transition duration-300"
        >
          Remove
        </button>
      </div>
      <div class="mt-8 text-right">
        <p class="text-xl sm:text-2xl font-bold text-gray-800">
          Total:
          <span class="text-indigo-600">${{ cartTotal.toFixed(2) }}</span>
        </p>
        <button
          @click="checkout"
          class="mt-4 w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useProductStore } from "../stores/productStore";

const productStore = useProductStore();

const cart = computed(() => productStore.cart);
const cartTotal = computed(() => productStore.cartTotal);

function decreaseQuantity(item) {
  if (item.quantity > 1) {
    productStore.updateCartItemQuantity(item._id, item.quantity - 1);
  } else {
    productStore.removeFromCart(item._id);
  }
}

function increaseQuantity(item) {
  productStore.updateCartItemQuantity(item._id, item.quantity + 1);
}

function removeItem(productId) {
  productStore.removeFromCart(productId);
}

function checkout() {
  console.log("Proceeding to checkout");
}
</script>
