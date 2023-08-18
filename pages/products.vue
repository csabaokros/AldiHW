<template>
  <div class="dark:bg-gray-800">
    <Header
      class="flex justify-between"
      page-title="Product listing"
      :sticky="true"
    >
      <Cart></Cart>
    </Header>
    <main class="container mx-auto p-4">
      <div class="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <template v-if="fetchingProducts">
          <CardPlaceholder></CardPlaceholder>
          <CardPlaceholder></CardPlaceholder>
        </template>
        <template v-else>
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          ></ProductCard>
        </template>
      </div>
    </main>
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

useHead({
  title: "Product listing",
});

onBeforeMount(() => {
  if (!products.value.length) fetchProducts();
});
</script>
