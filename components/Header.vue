<template>
  <header
    class="sticky top-0 flex justify-between p-3 pb-1 mb-6 w-full bg-white z-50 dark:bg-gray-800"
  >
    <div class="flex dark:text-slate-200">
      <NuxtLink to="/products">
        <svg
          class="w-10 h-10 mr-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 9.77728V16.1998C5 17.88 5 18.7201 5.32698 19.3618C5.6146 19.9263 6.07354 20.3852 6.63803 20.6729C7.27976 20.9998 8.11984 20.9998 9.8 20.9998H14.2C15.8802 20.9998 16.7202 20.9998 17.362 20.6729C17.9265 20.3852 18.3854 19.9263 18.673 19.3618C19 18.7201 19 17.88 19 16.1998V4.99983M21 11.9998L15.5668 5.96381C14.3311 4.59104 13.7133 3.90466 12.9856 3.65126C12.3466 3.4287 11.651 3.42875 11.0119 3.65141C10.2843 3.90491 9.66661 4.59139 8.43114 5.96433L3 11.9998"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </NuxtLink>
      <h1 class="text-4xl font-bold">{{ pageTitle }}</h1>
    </div>
    <slot />
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{ pageTitle: string }>();
</script>
