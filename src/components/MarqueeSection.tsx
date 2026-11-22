
import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import type { Product } from "@/lib/products";

const MarqueeSection = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  return (
    <MarqueeText direction="right" duration={19}>
      <div className="flex gap-8 border-y border-gray-200 py-2">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-2">
            <span>{product.image}</span>

            <span>{product.nameBn}</span>

            <span>৳{product.today}/kg</span>

            {product.change.dir === "up" ? (
              <span className="text-red-500">▲</span>
            ) : product.change.dir === "down" ? (
              <span className="text-emerald-600">▼</span>
            ) : null}

            <span
              className={
                product.change.dir === "up"
                  ? "text-red-500"
                  : "text-emerald-600"
              }
            >
              {product.change.pct}%
            </span>
          </div>
        ))}
      </div>
    </MarqueeText>
  );
};

export default MarqueeSection;
