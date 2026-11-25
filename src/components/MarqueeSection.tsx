import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import type { Product } from "@/lib/products";
import { fetchProducts, formatPct, formatPrice, unitName } from "@/lib/products";

const toneClass = (dir: Product["change"]["dir"]) => {
  if (dir === "up") return "text-emerald-600";
  if (dir === "down") return "text-red-500";
  return "text-gray-400";
};

const arrow = (dir: Product["change"]["dir"]) => {
  if (dir === "up") return "▲";
  if (dir === "down") return "▼";
  return "—";
};

const MarqueeSection = async () => {
  const products = await fetchProducts();

  if (products.length === 0) {
    return null;
  }

  return (
    <MarqueeText direction="right" duration={19}>
      <div className="flex gap-8 border-y border-gray-200 py-2">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-2">
            <span aria-hidden="true">{product.image}</span>

            <span>{product.nameBn}</span>

            <span>
              ৳{formatPrice(product.today)} টাকা/{unitName(product.unit)}
            </span>

            <span className={toneClass(product.change.dir)}>
              {arrow(product.change.dir)}
            </span>

            <span className={toneClass(product.change.dir)}>
              {formatPct(product.change.pct)}
            </span>
          </div>
        ))}
      </div>
    </MarqueeText>
  );
};

export default MarqueeSection;
