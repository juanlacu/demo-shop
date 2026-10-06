import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { CartLink } from "@/components/CartLink";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mateando",
  description: "Todo para tu mate, con envío a todo el país.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="header">
          <Link href="/" className="brand">
            🧉 Mateando
          </Link>
          <CartLink />
        </header>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
