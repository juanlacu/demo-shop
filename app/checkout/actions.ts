"use server";

import { randomUUID } from "node:crypto";
import { quote, type CartLine } from "@/lib/pricing";

export type CheckoutResult =
  | { ok: true; orderId: string; total: number }
  | { ok: false; error: string };

// Charges the prices stored in the cart, so a price change does not affect
// carts that were already filled.
export async function checkout(lines: CartLine[]): Promise<CheckoutResult> {
  if (lines.length === 0) {
    return { ok: false, error: "El carrito está vacío." };
  }
  if (lines.some((line) => !Number.isInteger(line.quantity) || line.quantity < 1)) {
    return { ok: false, error: "Hay cantidades inválidas en el carrito." };
  }

  const { total } = quote(lines);
  return { ok: true, orderId: randomUUID().slice(0, 8), total };
}
