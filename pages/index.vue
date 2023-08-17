<template>
  <div v-if="fetchingProducts">Loading...</div>
  <div v-else>
    <div v-for="item in cartContents">
      <p>{{ item.name }} {{ item.amount }}</p>
    </div>
    <div v-for="item in products">
      <p>{{ item.name }} {{ item.availableAmount }}</p>
      <button @click="addItemToCart(item, 1)">Add to cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/server/api/products";

import {
  products,
  fetchProducts,
  fetchingProducts,
  productListError,
} from "@/store/products";
import { cartContents, addToCart } from "@/store/cart";

const addItemToCart = (item: Product, amount = 1) => {
  try {
    addToCart(item, amount);
    console.log(products);
  } catch (error) {
    console.error(error);
  }
};

useHead({
  title: "Product listing",
});

onBeforeMount(() => {
  fetchProducts();
});
</script>
