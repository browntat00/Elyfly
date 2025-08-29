import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elyfly — Faux Flowers, Real Compliments",
  description: "Hand‑designed vases paired with forever‑bloom florals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
