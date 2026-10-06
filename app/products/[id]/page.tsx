import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { PriceTag } from "@/components/PriceTag";
import { getProduct } from "@/lib/products";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <article>
      <div className="emoji large">{product.emoji}</div>
      <h1>{product.name}</h1>
      <p className="muted">{product.description}</p>
      <p>
        <PriceTag amount={product.price} compareAt={product.listPrice} />
      </p>
      <AddToCartButton productId={product.id} />

      <h2>Reseñas</h2>
      {product.reviews.length === 0 ? (
        <p className="muted">Todavía no hay reseñas.</p>
      ) : (
        <ul className="reviews">
          {product.reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.author}</strong> · {"★".repeat(review.rating)}
              <p>{review.text}</p>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
