import { beforeEach, describe, expect, test } from "vitest";
import { ref } from "vue";

import { products, adjustStock } from "./products";
import type { Product } from "server/api/products";

describe("Product list", async () => {
  beforeEach(async () => {
    products.value = [
      {
        id: "62863b689c1bcb9946a0c8ac",
        name: "Bolts",
        img: "https://media.gettyimages.com/photos/bolts-and-nuts-picture-id175425827?s=2048x2048",
        availableAmount: 1000,
        minOrderAmount: 20,
        price: 0.2,
      },
    ];
  });
  test("...should reduce stock with valid amount", () => {
    const [product] = products.value;
    const availableBefore = product.availableAmount;
    const amount = 100;
    const success = adjustStock(product, amount);
    expect(success).toBe(true);
    expect(products.value[0].availableAmount + amount).toBe(availableBefore);
  });
  test("...should reject adjusting a non-existing product", () => {
    const product: Product = {
      id: "non-existing",
      name: "non-existing",
      img: "",
      availableAmount: 1,
      minOrderAmount: 1,
      price: 1,
    };
    const amount = 100;
    expect(() => adjustStock(product, amount)).to.throw("UNKNOWN_PRODUCT");
  });
});
