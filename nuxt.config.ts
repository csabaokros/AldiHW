// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    app: {
      PRODUCT_LIST_ENDPOINT: process.env.PRODUCT_LIST_ENDPOINT,
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  vite: {
    optimizeDeps: { exclude: ["fsevents"] },
  },
});
