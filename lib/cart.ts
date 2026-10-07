// Browser-side cart persisted in localStorage. Each line keeps the price the
// customer saw when adding the product.
import type { CartLine } from "./pricing.ts";

const STORAGE_KEY = "demo-shop-cart";
export const CART_EVENT = "cart-change";

export function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(productId: string, price: number): void {
  const lines = readCart();
  const line = lines.find((item) => item.productId === productId);
  if (line) line.quantity += 1;
  else lines.push({ productId, quantity: 1, price });
  writeCart(lines);
}

export function removeFromCart(productId: string): void {
  writeCart(readCart().filter((item) => item.productId !== productId));
}

export function clearCart(): void {
  writeCart([]);
}
