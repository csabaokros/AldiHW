<template>
  <div class="p-4 dark:bg-gray-800 min-h-screen">
    <Header page-title="Cart"></Header>
    <main class="container mx-auto p-4 lg:max-w-[760px]">
      <div class="relative overflow-x-auto">
        <table
          v-if="cartContents.length"
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-white uppercase bg-teal-400 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3 rounded-l-lg">Product name</th>
              <th scope="col" class="px-6 py-3">Quantity</th>
              <th scope="col" class="px-6 py-3 rounded-r-lg">Price</th>
            </tr>
          </thead>
          <tbody>
            <CartLine
              v-for="product in cart"
              :product="product[0]"
              :amount="product[1]"
            ></CartLine>
          </tbody>
          <tfoot>
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="px-6 py-3 text-base" colspan="2">
                <div class="inline-flex items-center justify-center w-full">
                  <hr
                    class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"
                  />
                </div>
              </th>
              <td class="px-6 py-3">&euro;{{ total.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
        <div
          class="flex justify-between items-center"
          v-if="cartContents.length"
        >
          <NuxtLink
            to="/products"
            type="button"
            class="text-gray-700 hover:text-gray-500 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:text-gray-200 dark:hover:text-gray-400"
          >
            <svg
              class="w-5 h-5 mr-2 inline"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9995 14V17.6C14.9995 18.4401 14.9995 18.8601 14.836 19.181C14.6922 19.4632 14.4628 19.6927 14.1805 19.8365C13.8596 20 13.4396 20 12.5995 20H7.39953C6.55945 20 6.13941 20 5.81854 19.8365C5.5363 19.6927 5.30683 19.4632 5.16302 19.181C4.99953 18.8601 4.99953 18.4401 4.99953 17.6V10M18.9995 10V20M4.99953 16H14.9995M5.5573 4.88446L3.57841 8.84223C3.38673 9.22559 3.29089 9.41727 3.31391 9.57308C3.33401 9.70914 3.40927 9.8309 3.52197 9.90973C3.65104 10 3.86534 10 4.29395 10H19.7051C20.1337 10 20.348 10 20.4771 9.90973C20.5898 9.8309 20.665 9.70914 20.6851 9.57308C20.7082 9.41727 20.6123 9.22559 20.4206 8.84223L18.4418 4.88446C18.2812 4.5634 18.201 4.40287 18.0812 4.28558C17.9753 4.18187 17.8477 4.10299 17.7076 4.05465C17.5491 4 17.3696 4 17.0107 4H6.98838C6.62942 4 6.44994 4 6.29149 4.05465C6.15136 4.10299 6.02374 4.18187 5.91784 4.28558C5.79809 4.40287 5.71783 4.5634 5.5573 4.88446Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            Back to shopping
          </NuxtLink>
          <button
            type="button"
            class="text-white bg-teal-400 hover:bg-teal-300 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-teal-500 dark:hover:bg-teal-600 focus:outline-none dark:focus:ring-teal-800 mt-4 disabled:opacity-50"
          >
            <svg
              class="w-5 h-5 mr-2 inline"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9H21M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Place order
          </button>
        </div>
        <div class="flex justify-center" v-else>
          <div
            class="m-5 p-4 rounded-md bg-gray-50 text-gray-600 text-center dark:bg-gray-700 dark:text-gray-400"
          >
            <p class="mb-4">You have not added anything to your cart yet.</p>
            <p>
              <NuxtLink
                to="/products"
                class="text-teal-400 hover:text-teal-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:text-teal-500 dark:hover:text-teal-600"
                >Go back to shopping</NuxtLink
              >
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { cart, cartContents } from "@/store/cart";

const total = computed(() => {
  return cartContents.value.reduce((total, currentLine): number => {
    total += currentLine.price * currentLine.amount;
    return total;
  }, 0);
});
</script>
