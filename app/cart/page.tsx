"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { checkout, type CheckoutResult } from "@/app/checkout/actions";
import { CART_EVENT, clearCart, readCart, removeFromCart } from "@/lib/cart";
import { formatPrice, quote, type CartLine } from "@/lib/pricing";
import { getProduct } from "@/lib/products";

export default function CartPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [result, setResult] = useState<CheckoutResult | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const sync = () => setLines(readCart());
    sync();
    window.addEventListener(CART_EVENT, sync);
    return () => window.removeEventListener(CART_EVENT, sync);
  }, []);

  function confirm() {
    startTransition(async () => {
      const outcome = await checkout(lines);
      setResult(outcome);
      if (outcome.ok) clearCart();
    });
  }

  if (result?.ok) {
    return (
      <div className="notice">
        <h1>¡Gracias por tu compra!</h1>
        <p>
          Pedido <strong>#{result.orderId}</strong> por {formatPrice(result.total * 100)}.
        </p>
        <Link href="/">Seguir comprando</Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <>
        <h1>Carrito</h1>
        <p className="muted">
          Tu carrito está vacío. <Link href="/">Ver el catálogo</Link>
        </p>
      </>
    );
  }

  const totals = quote(lines);

  return (
    <>
      <h1>Carrito</h1>
      <ul className="cart-lines">
        {lines.map((line) => {
          const product = getProduct(line.productId);
          if (!product) return null;
          return (
            <li key={line.productId}>
              <span>
                {product.emoji} {product.name} × {line.quantity}{" "}
                <button className="link-button" onClick={() => removeFromCart(line.productId)}>
                  Quitar
                </button>
              </span>
              <span>{formatPrice(product.price * line.quantity * 100)}</span>
            </li>
          );
        })}
      </ul>

      <div className="totals">
        <div>
          <span>Subtotal</span>
          <span>{formatPrice(totals.subtotal * 100)}</span>
        </div>
        <div>
          <span>Envío</span>
          <span>{totals.shipping === 0 ? "Gratis" : formatPrice(totals.shipping * 100)}</span>
        </div>
        <div className="total">
          <span>Total</span>
          <span>{formatPrice(totals.total * 100)}</span>
        </div>
      </div>

      {result && !result.ok && <p className="error">{result.error}</p>}
      <button className="primary" onClick={confirm} disabled={pending}>
        {pending ? "Confirmando…" : "Confirmar compra"}
      </button>
    </>
  );
}
