import Link from "next/link";
import type { Product } from "@/lib/products";
import { PriceTag } from "./PriceTag";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="card">
      <div className="emoji">{product.emoji}</div>
      <h2>{product.name}</h2>
      <PriceTag amount={product.price} />
    </Link>
  );
}
