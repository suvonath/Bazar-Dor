"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { toBn } from "@/lib/products";
import PriceCard from "./PriceCard";

type SortKey = "high" | "low" | "name";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "high", label: "সর্বোচ্চ" },
  { value: "low", label: "সর্বনিম্ন" },
  { value: "name", label: "নাম অনুযায়ী" },
];

const CategoryProductGrid = ({ products }: { products: Product[] }) => {
  const [sort, setSort] = useState<SortKey>("high");

  const sorted = useMemo(() => {
    const copy = [...products];

    if (sort === "low") {
      return copy.sort((a, b) => a.today - b.today);
    }

    if (sort === "name") {
      return copy.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));
    }

    return copy.sort((a, b) => b.today - a.today);
  }, [products, sort]);

  return (
    <>
      <div className="flex items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3">
        <label htmlFor="sort" className="text-sm text-gray-500">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(event) => setSort(event.target.value as SortKey)}
          className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm text-gray-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {sorted.length ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((product) => (
            <PriceCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।
        </p>
      )}
    </>
  );
};

export default CategoryProductGrid;
