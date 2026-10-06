// Cart totals. Amounts are whole Argentine pesos and always come from the
// catalog, never from the client.
import { getProduct } from "./products.ts";

export const SHIPPING_COST = 4_500;

export type CartLine = {
  productId: string;
  quantity: number;
};

type Coupon = { kind: "percent"; value: number } | { kind: "fixed"; value: number };

const COUPONS: Record<string, Coupon> = {
  MATE10: { kind: "percent", value: 10 },
  BIENVENIDA: { kind: "fixed", value: 5_000 },
};

function findCoupon(code: string): Coupon | undefined {
  const key = code.trim().toUpperCase();
  return Object.hasOwn(COUPONS, key) ? COUPONS[key] : undefined;
}

export function isValidCoupon(code: string): boolean {
  return findCoupon(code) !== undefined;
}

function discountFor(subtotal: number, code: string): number {
  const coupon = findCoupon(code);
  if (!coupon) return 0;
  const amount =
    coupon.kind === "percent" ? Math.round((subtotal * coupon.value) / 100) : coupon.value;
  return Math.min(amount, subtotal);
}

export type Quote = {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

export function quote(lines: CartLine[], couponCode = ""): Quote {
  const subtotal = lines.reduce((sum, line) => {
    const product = getProduct(line.productId);
    if (!product) throw new Error(`Unknown product: ${line.productId}`);
    return sum + product.price * line.quantity;
  }, 0);
  const discount = discountFor(subtotal, couponCode);
  const shipping = subtotal === 0 ? 0 : SHIPPING_COST;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}

const PESOS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return PESOS.format(amount);
}
