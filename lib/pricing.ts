// Cart totals. Amounts are whole Argentine pesos.
export const SHIPPING_COST = 4_500;

export type CartLine = {
  productId: string;
  quantity: number;
  // Unit price when the product was added, so the customer pays what they saw.
  price: number;
};

export type Quote = {
  subtotal: number;
  shipping: number;
  total: number;
};

export function quote(lines: CartLine[]): Quote {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const shipping = subtotal === 0 ? 0 : SHIPPING_COST;
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
