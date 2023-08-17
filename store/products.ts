import type { Product } from "server/api/products";
import { ref } from "vue";

export const fetchProducts = async () => {
  fetchingProducts.value = true;
  try {
    products.value = await $fetch("/api/products");
  } catch (error: any) {
    productListError.value = error.message;
    products.value = [];
    console.log(error);
  }
  fetchingProducts.value = false;
};

export const products = ref<Product[]>([]);
export const fetchingProducts = ref<boolean>(false);
export const productListError = ref<string>("");

export function adjustStock(product: Product, by: number): boolean {
  const productToReduce = products.value.find((item) => item.id === product.id);
  if (!productToReduce) throw new Error("UNKNOWN_PRODUCT");
  if (by > 0 && product.minOrderAmount > by) throw new Error("TOO_FEW_ADDED");
  if (productToReduce.availableAmount < by) throw new Error("TOO_MANY_ADDED");
  productToReduce.availableAmount -= by;
  return true;
}
