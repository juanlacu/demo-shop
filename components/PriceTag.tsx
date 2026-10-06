import { formatPrice } from "@/lib/pricing";

export function PriceTag({ amount }: { amount: number }) {
  return <span className="price">{formatPrice(amount)}</span>;
}
