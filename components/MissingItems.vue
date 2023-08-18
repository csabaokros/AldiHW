<template>
  <div
    class="m-5 p-4 rounded-md bg-gray-50 text-gray-600 text-center dark:bg-gray-700 dark:text-gray-400 w-full"
  >
    <slot id="body">
      <p class="mb-4">{{ message }}</p>
      <p>
        <NuxtLink
          v-if="link"
          :to="link.url"
          class="text-teal-400 hover:text-teal-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:text-teal-500 dark:hover:text-teal-600"
          >{{ link.text }}</NuxtLink
        >
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message?: string;
  link?: {
    text: string;
    url: string;
  };
}>();
</script>
