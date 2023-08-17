import { beforeAll, describe, expect, test } from "vitest";

import { cart, addToCart, removeFromCart, cartContents } from "./cart";
import { products } from "./products";
import { Product } from "server/api/products";

describe("Cart", async () => {
  beforeAll(async () => {
    products.value = [
      {
        id: "62863b689c1bcb9946a0c8ac",
        name: "Bolts",
        img: "https://media.gettyimages.com/photos/bolts-and-nuts-picture-id175425827?s=2048x2048",
        availableAmount: 1000,
        minOrderAmount: 20,
        price: 0.2,
      },
      {
        id: "62863b689c1bcb9946a0c8ae",
        name: "Screws",
        img: "https://media.gettyimages.com/photos/self-tapping-screw-isolated-on-white-background-picture-id1216049122?s=2048x2048",
        availableAmount: 1000,
        minOrderAmount: 40,
        price: 0.1,
      },
    ];
  });
  test("...should successfully add a valid product", () => {
    const [product] = products.value;
    addToCart(product, 20);
    expect(cart.size).toBe(1);
  });
  test("...should reject adding too small amount", () => {
    const [product] = products.value;
    expect(() => addToCart(product, product.minOrderAmount - 1)).to.throw(
      `TOO_FEW_ADDED`
    );
  });
  test("...should reject adding too large amount", () => {
    const [product] = products.value;
    expect(() => addToCart(product, 1001)).to.throw(`TOO_MANY_ADDED`);
  });
  test("...should successfully remove a valid product", () => {
    const [product] = products.value;
    removeFromCart(product, 20);
    expect(cart.size).toBe(0);
  });
  test("...should reject removing the amount, if too few would remain", () => {
    const [product] = products.value;
    addToCart(product, product.minOrderAmount);
    expect(() => removeFromCart(product, 1)).to.throw(`TOO_FEW_REMAIN`);
  });
  test("...should remove the product if no amount is given", () => {
    const [product] = products.value;
    removeFromCart(product);
    expect(cart.size).toBe(0);
  });
  test("...should reject adding an invalid product", () => {
    const product: Product = {
      id: "non-existing",
      name: "non-existing",
      img: "",
      availableAmount: 1,
      minOrderAmount: 1,
      price: 1,
    };
    expect(() => addToCart(product, 1)).to.throw(`UNKNOWN_PRODUCT`);
  });
  test("...should reject removing a non-exising product", () => {
    const product: Product = {
      id: "non-existing",
      name: "non-existing",
      img: "",
      availableAmount: 1,
      minOrderAmount: 1,
      price: 1,
    };
    expect(() => removeFromCart(product, 1)).to.throw(
      `NO_SUCH_PRODUCT_IN_CART`
    );
  });
});
