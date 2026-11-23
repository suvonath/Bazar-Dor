import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice, unitLabel } from "@/lib/products";
import ChangeBadge from "./ChangeBadge";

const PriceCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-green-300 hover:shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-50 text-2xl ring-1 ring-gray-100"
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
          {formatPrice(product.today)} টাকা
        </p>

        <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
      </div>
    </Link>
  );
};

export default PriceCard;
