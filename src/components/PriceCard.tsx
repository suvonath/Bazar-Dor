import type { Product } from "@/lib/products";
import { formatPct, formatPrice, unitLabel } from "@/lib/products";

const PriceCard = ({ product }: { product: Product }) => {
  const { dir } = product.change;
  const rising = dir === "up";

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-2xl ring-1 ring-gray-100"
        >
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-gray-900">{product.nameBn}</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {unitLabel(product.unit)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-gray-500">আজকের দাম</p>

      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="text-lg font-bold text-gray-900">
          ৳{formatPrice(product.today)} টাকা
        </p>

        <span
          className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${
            rising
              ? "bg-red-50 text-red-600"
              : dir === "down"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          <span aria-hidden="true">
            {rising ? "▲" : dir === "down" ? "▼" : "—"}
          </span>
          {formatPct(product.change.pct)}
        </span>
      </div>
    </article>
  );
};

export default PriceCard;
