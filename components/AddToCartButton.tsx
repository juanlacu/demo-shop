"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

export function AddToCartButton({ productId, price }: { productId: string; price: number }) {
  const [added, setAdded] = useState(false);

  return (
    <button
      className="primary"
      onClick={() => {
        addToCart(productId, price);
        setAdded(true);
      }}
    >
      {added ? "Agregado ✓" : "Agregar al carrito"}
    </button>
  );
}
