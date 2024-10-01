import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
    loading: false,
    error: null,
    cart: [],
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        // Fetch users as a base for our products
        const usersResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const users = usersResponse.data;

        // Fetch posts to use as product descriptions
        const postsResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const posts = postsResponse.data;

        // Combine users and posts to create dummy products
        this.products = users.map((user, index) => ({
          _id: user.id.toString(),
          name: user.name,
          price: Math.floor(Math.random() * 100) + 10, // Random price between 10 and 109
          description: posts[index].body,
          image: `https://picsum.photos/seed/${user.id}/200/300`, // Random image based on user id
        }));
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    addToCart(product) {
      const existingItem = this.cart.find((item) => item._id === product._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      const index = this.cart.findIndex((item) => item._id === productId);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    updateCartItemQuantity(productId, quantity) {
      const item = this.cart.find((item) => item._id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
  getters: {
    cartTotal: (state) => {
      return state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    cartItemCount: (state) => {
      return state.cart.reduce((count, item) => count + item.quantity, 0);
    },
  },
});
