"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CART_EVENT, readCart } from "@/lib/cart";

export function CartLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(readCart().reduce((sum, line) => sum + line.quantity, 0));
    sync();
    window.addEventListener(CART_EVENT, sync);
    return () => window.removeEventListener(CART_EVENT, sync);
  }, []);

  return <Link href="/cart">🛒 Carrito ({count})</Link>;
}
