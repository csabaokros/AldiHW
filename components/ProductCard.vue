<template>
  <div>
    <div class="">
      <div class="relative text-center flex justify-center bg-white rounded-lg">
        <img :src="product.img" class="h-96 object-cover rounded-lg" />
        <div
          class="absolute top-4 left-4 bg-slate-50 rounded-md p-1 px-2 dark:bg-slate-600 dark:text-white"
        >
          <h2 class="text-xl font-semibold text-slate-90">
            {{ product.name }}
          </h2>
        </div>
        <div class="absolute top-4 right-4" v-if="product.minOrderAmount > 1">
          <span
            class="bg-gray-100 text-gray-600 text-sm font-medium mr-2 px-2.5 py-1 rounded dark:bg-grey-200 dark:text-white cursor-default"
            >{{ product.minOrderAmount }} or more</span
          >
        </div>
        <div class="absolute bottom-4 left-4" v-if="qtyInCart">
          <span
            class="bg-teal-100 text-teal-600 text-sm font-medium mr-2 px-2.5 py-1 rounded dark:bg-teal-500 dark:text-white cursor-default"
            ><svg
              class="w-3.5 h-3.5 inline"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12.6111L8.92308 17.5L20 6.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ qtyInCart }} in cart</span
          >
        </div>
      </div>
    </div>
    <div class="px-2 pt-2 pb-0 flex justify-between items-center">
      <div class="w-1/2">
        <label
          for="amount"
          class="mb-2 text-sm text-gray-500 dark:text-gray-400"
          >Quantity</label
        >
        <input
          type="number"
          name="amount"
          id="amount"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-800 focus:border-teal-800 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white w-24 out-of-range:border-red-500"
          placeholder="Amount"
          required
          :min="product.minOrderAmount"
          :max="product.availableAmount"
          v-model="amount"
        />
      </div>
      <div class="w-1/2">
        <div class="text-right">
          <span class="text-4xl font-semibold leading-none dark:text-white"
            >&euro;{{ totalPrice }}</span
          >
          <br />
          <span class="text-xs text-gray-500 dark:text-gray-400"
            >{{ validAmount ? amount : 0 }} &times; &euro;{{
              product.price.toFixed(2)
            }}
          </span>
        </div>
      </div>
    </div>
    <p class="px-2 pt-1 h-4 text-xs text-red-800">
      <span v-if="!validAmount"
        >Please type a number between {{ product.minOrderAmount }} and
        {{ product.availableAmount }}</span
      >
    </p>
    <div class="px-2">
      <button
        type="button"
        class="text-white bg-teal-400 hover:bg-teal-300 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-teal-500 dark:hover:bg-teal-600 focus:outline-none dark:focus:ring-teal-800 w-full mt-4 disabled:opacity-50"
        :disabled="!validAmount"
        @click="addProductToCart"
      >
        <svg
          v-if="added"
          class="w-5 h-5 mr-2 inline animate-ping"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12.6111L8.92308 17.5L20 6.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          v-else
          viewBox="0 0 902.86 902.86"
          xml:space="preserve"
          class="w-5 h-5 mr-2 inline fill-current"
        >
          <g>
            <g>
              <path
                d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
              />
              <path
                d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
			S619.162,694.432,619.162,716.897z"
              />
            </g>
          </g>
        </svg>
        Add to cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "server/api/products";
import { addToCart, cart } from "@/store/cart";

const props = defineProps<{
  product: Product;
}>();

const amount = ref(0);
const added = ref(false);

let timeOut: ReturnType<typeof setTimeout>;

const qtyInCart = computed<number>(() => {
  if (!cart.has(props.product)) return 0;
  return cart.get(props.product)!;
});

const totalPrice = computed(() => {
  if (!validAmount.value) return 0;
  return (amount.value * props.product.price).toFixed(2);
});

const validAmount = computed(() => {
  return (
    amount.value > 0 &&
    amount.value >= props.product.minOrderAmount &&
    amount.value <= props.product.availableAmount
  );
});

const addProductToCart = () => {
  try {
    addToCart(props.product, amount.value);
    added.value = true;
    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      added.value = false;
    }, 500);
  } catch (error: any) {}
};

onMounted(() => {
  amount.value = props.product.minOrderAmount;
});
</script>
