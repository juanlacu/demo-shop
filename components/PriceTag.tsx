import { formatPrice } from "@/lib/pricing";

type Props = {
  amount: number;
  compareAt?: number;
};

export function PriceTag({ amount, compareAt }: Props) {
  return (
    <span className="price">
      {compareAt !== undefined && compareAt > amount && (
        <s className="muted">{formatPrice(compareAt)}</s>
      )}{" "}
      {formatPrice(amount)}
    </span>
  );
}
