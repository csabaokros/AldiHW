import type { Product } from "server/api/products";
import { reactive, computed } from "vue";

import { adjustStock } from "./products";

export type CartItem = {
  name: string;
  img: string;
  amount: number;
};

export const cart = reactive(new Map<Product, number>());

export const addToCart = (
  product: Product,
  amount: number = 1
): typeof cart => {
  try {
    adjustStock(product, amount);
  } catch (error) {
    throw error;
  }

  if (!cart.has(product)) return cart.set(product, amount);
  const inCartAmount = cart.get(product)!;
  return cart.set(product, inCartAmount + amount);
};

export const removeFromCart = (
  product: Product,
  amount?: number
): typeof cart => {
  if (!cart.has(product)) throw new Error("NO_SUCH_PRODUCT_IN_CART");
  const inCartAmount = cart.get(product)!;
  if (!amount || inCartAmount === amount) {
    cart.delete(product);
    return cart;
  }
  if (inCartAmount < amount) throw new Error("REMOVING_TOO_MANY");
  if (inCartAmount - amount < product.minOrderAmount)
    throw new Error("TOO_FEW_REMAIN");
  try {
    adjustStock(product, amount * -1);
  } catch (error) {
    throw error;
  }
  return cart.set(product, inCartAmount - amount);
};

export const cartContents = computed<CartItem[]>((): CartItem[] => {
  const cartItems = [];
  for (const item of cart.entries()) {
    const { name, img } = item[0];
    const amount = item[1];
    cartItems.push({
      name,
      img,
      amount,
    });
  }
  return cartItems;
});
