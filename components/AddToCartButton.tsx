"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

export function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);

  return (
    <button
      className="primary"
      onClick={() => {
        addToCart(productId);
        setAdded(true);
      }}
    >
      {added ? "Agregado ✓" : "Agregar al carrito"}
    </button>
  );
}
