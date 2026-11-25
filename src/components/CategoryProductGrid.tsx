"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { toBn } from "@/lib/products";
import PriceCard from "./PriceCard";

type SortKey = "default" | "low" | "high";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "low", label: "দাম: কম থেকে বেশি" },
  { value: "high", label: "দাম: বেশি থেকে কম" },
];

const CategoryProductGrid = ({ products }: { products: Product[] }) => {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    // Numeric comparison — Bengali digits in `today` are already numbers,
    // so sorting never depends on string ordering.
    if (sort === "low") {
      return [...products].sort((a, b) => a.today - b.today);
    }

    if (sort === "high") {
      return [...products].sort((a, b) => b.today - a.today);
    }

    return products;
  }, [products, sort]);

  return (
    <>
      <div className="flex items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3">
        <label htmlFor="sort" className="text-sm text-gray-500">
          সাজান:
        </label>

        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-9 text-sm text-gray-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          >
            <path d="m6 8 4 4 4-4" />
          </svg>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {sorted.length ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((product) => (
            <PriceCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p aria-hidden="true" className="text-5xl">
            🛒
          </p>
          <p className="mt-4 text-lg font-bold text-gray-800">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </p>
          <p className="mt-1 text-sm text-gray-500">
            অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </>
  );
};

export default CategoryProductGrid;
