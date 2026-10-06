import assert from "node:assert/strict";
import { test } from "node:test";
import { getProduct, listProducts } from "../lib/products.ts";

test("search matches name and description, ignoring case", () => {
  assert.deepEqual(listProducts("TERMO").map((p) => p.id), ["termo-acero", "matera-cuero"]);
});

test("an empty search returns the whole catalog", () => {
  assert.equal(listProducts("  ").length, listProducts().length);
});

test("unknown ids return undefined", () => {
  assert.equal(getProduct("nope"), undefined);
});
