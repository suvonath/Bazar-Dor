import type { Product } from "@/lib/products";
import PriceCard from "./PriceCard";

interface PriceSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  direction?: "up" | "down";
  products: Product[];
}

const PriceSection = ({
  id,
  title,
  subtitle,
  direction,
  products,
}: PriceSectionProps) => {
  const rising = direction === "up";

  return (
    <section id={id} className="mt-8 scroll-mt-6">
      <h2 className="flex items-center gap-1.5 text-xl font-bold text-gray-900">
        {direction ? (
          <span
            aria-hidden="true"
            className={rising ? "text-red-500" : "text-emerald-600"}
          >
            {rising ? "▲" : "▼"}
          </span>
        ) : null}
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      ) : null}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <PriceCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PriceSection;
