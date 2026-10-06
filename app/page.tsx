import { ProductCard } from "@/components/ProductCard";
import { listProducts } from "@/lib/products";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const products = listProducts(q);

  return (
    <>
      <h1>Todo para tu mate</h1>
      <form className="search" action="/">
        <input name="q" defaultValue={q} placeholder="Buscar mates, termos, yerba…" aria-label="Buscar" />
        <button type="submit">Buscar</button>
      </form>
      {products.length === 0 ? (
        <p className="muted">No encontramos nada para “{q}”. Probá con otra palabra.</p>
      ) : (
        <ul className="grid">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
