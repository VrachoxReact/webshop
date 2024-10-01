<template>
  <div class="cart-view">
    <h2>Your Cart</h2>
    <div v-if="cart.length === 0">Your cart is empty</div>
    <div v-else>
      <div v-for="item in cart" :key="item._id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="cart-item-image" />
        <div class="cart-item-details">
          <h3>{{ item.name }}</h3>
          <p>Price: ${{ item.price.toFixed(2) }}</p>
          <div class="quantity-control">
            <button @click="decreaseQuantity(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
          </div>
        </div>
        <button @click="removeItem(item._id)" class="remove-button">
          Remove
        </button>
      </div>
      <div class="cart-total">
        <h3>Total: ${{ cartTotal.toFixed(2) }}</h3>
      </div>
      <button @click="checkout" class="checkout-button">
        Proceed to Checkout
      </button>
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
  // Implement checkout logic
  console.log("Proceeding to checkout");
}
</script>

<style scoped>
.cart-view {
  max-width: 800px;
  margin: 0 auto;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.cart-item-details {
  flex-grow: 1;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.remove-button,
.checkout-button {
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
}

.checkout-button {
  background-color: #4caf50;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
}
</style>
