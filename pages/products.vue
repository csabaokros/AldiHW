<template>
  <div class="p-4 dark:bg-gray-800 min-h-screen">
    <Header page-title="Product listing">
      <CartComponent></CartComponent>
    </Header>
    <main class="container mx-auto p-4">
      <div class="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <template v-if="fetchingProducts">
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder class="invisible lg:visible"></CardPlaceholder>
          <CardPlaceholder class="invisible lg:visible"></CardPlaceholder>
          <CardPlaceholder class="invisible xl:visible"></CardPlaceholder>
          <CardPlaceholder class="invisible xl:visible"></CardPlaceholder>
        </template>
        <template v-else-if="products.length">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          ></ProductCard>
        </template>
      </div>
      <div
        v-if="!fetchingProducts && products.length === 0"
        class="flex justify-center"
      >
        <MissingItems>
          <p class="mb-4">No products to show</p>
          <p>
            <a
              @click="fetchProducts"
              class="text-teal-400 hover:text-teal-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:text-teal-500 dark:hover:text-teal-600 cursor-pointer"
              >Try again</a
            >
          </p>
        </MissingItems>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/server/api/products";

import { products, fetchProducts, fetchingProducts } from "@/store/products";

useHead({
  title: "Product listing",
});

onBeforeMount(() => {
  if (!products.value.length) fetchProducts();
});
</script>
