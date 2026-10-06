import assert from "node:assert/strict";
import { test } from "node:test";
import { SHIPPING_COST, formatPrice, quote } from "../lib/pricing.ts";

test("an empty cart costs nothing", () => {
  assert.deepEqual(quote([]), { subtotal: 0, shipping: 0, total: 0 });
});

test("quotes catalog prices times quantity plus shipping", () => {
  const result = quote([
    { productId: "yerba-1kg", quantity: 2 },
    { productId: "bombilla-pico-loro", quantity: 1 },
  ]);
  assert.equal(result.subtotal, 6_200 * 2 + 7_800);
  assert.equal(result.shipping, SHIPPING_COST);
  assert.equal(result.total, result.subtotal + SHIPPING_COST);
});

test("rejects products that are not in the catalog", () => {
  assert.throws(() => quote([{ productId: "nope", quantity: 1 }]), /Unknown product/);
});

test("formats whole pesos", () => {
  assert.match(formatPrice(18_500), /^\$\s?18\.500$/);
});
