<template>
  <tr class="bg-white dark:bg-gray-800">
    <th
      scope="row"
      class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
    >
      <div class="flex items-center">
        <div class="h-28 w-28 mr-8 flex justify-center bg-white rounded-md">
          <img
            :src="product.img"
            :alt="product.name"
            class="rounded-sm object-cover h-28"
          />
        </div>
        <div>
          <p class="text-xl font-medium mb-4">{{ product.name }}</p>
          <button
            type="button"
            class="text-xs font-normal text-red-800 dark:text-red-600 hover:text-red-600 dark:hover:text-red-800"
            @click="removeFromCart(product)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="inline w-3.5 h-3.5 align-middle"
            >
              <path
                d="M21 5L19 12H7.37671M20 16H8L6 3H3M13.5 3V9M13.5 3L11.5 5M13.5 3L15.5 5M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            Remove from cart
          </button>
        </div>
      </div>
    </th>
    <td class="px-6 py-4">
      {{ amount }} &times; &euro;{{ product.price.toFixed(2) }}
    </td>
    <td class="px-6 py-4">
      <div class="">
        &euro;{{ (amount * product.price).toFixed(2) }}
        <button>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5 pl-4"
          >
            <path
              d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 3L13.5 5.5M13.5 5.5L16 8M13.5 5.5L16 3M13.5 5.5L11 8M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { Product } from "server/api/products";

import { removeFromCart } from "@/store/cart";

const props = defineProps<{
  product: Product;
  amount: number;
}>();
</script>
