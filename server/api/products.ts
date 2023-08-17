import Error from "@/server/errors";

export type Product = {
  id: string;
  name: string;
  img: string;
  availableAmount: number;
  minOrderAmount: number;
  price: number;
};

export default defineEventHandler(async (event): Promise<Product[]> => {
  const { PRODUCT_LIST_ENDPOINT } = useRuntimeConfig().app;

  if (!PRODUCT_LIST_ENDPOINT)
    throw Error(500, "Please supply endpoint for product list");

  try {
    return await $fetch(PRODUCT_LIST_ENDPOINT);
  } catch (error) {
    console.error(error);
    throw Error(500, "Could not fetch product list");
  }
});
