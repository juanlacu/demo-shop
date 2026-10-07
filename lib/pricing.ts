// Cart totals. Amounts are whole Argentine pesos and always come from the
// catalog, never from the client.
import { getProduct } from "./products.ts";

export const SHIPPING_COST = 4_500;
// Promo: free shipping on orders from $50.000.
export const FREE_SHIPPING_FROM = 50_000;

export type CartLine = {
  productId: string;
  quantity: number;
};

export type Quote = {
  subtotal: number;
  shipping: number;
  total: number;
};

export function quote(lines: CartLine[]): Quote {
  const subtotal = lines.reduce((sum, line) => {
    const product = getProduct(line.productId);
    if (!product) throw new Error(`Unknown product: ${line.productId}`);
    return sum + product.price * line.quantity;
  }, 0);
  const shipping = subtotal === 0 || subtotal > FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  return { subtotal, shipping, total: subtotal + shipping };
}

const PESOS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return PESOS.format(amount);
}
