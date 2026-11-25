import Skeleton, { CardGridSkeleton } from "@/components/Skeleton";

/** Loading state for /categories/[slug] while category + products fetch. */
export default function CategoryLoading() {
  return (
    <main className="flex-1 bg-[#f0f5f1]" role="status">
      <span className="sr-only">ক্যাটাগরির পণ্য লোড হচ্ছে...</span>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Category header */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/80 p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
        </div>

        {/* Sort bar */}
        <div className="mt-4 flex items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-8 w-44" />
        </div>

        <Skeleton className="mt-4 h-4 w-52" />

        {/* Product grid */}
        <div className="mt-4">
          <CardGridSkeleton />
        </div>
      </div>
    </main>
  );
}
