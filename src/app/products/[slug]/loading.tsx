import Skeleton from "@/components/Skeleton";

/** Loading state for /products/[slug] while the detail data fetches. */
export default function ProductLoading() {
  return (
    <main className="flex-1 bg-[#f0f5f1]" role="status">
      <span className="sr-only">পণ্যের বিস্তারিত লোড হচ্ছে...</span>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Breadcrumb */}
        <Skeleton className="h-3 w-64" />

        {/* Summary */}
        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-5 w-32 rounded-full" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
            <Skeleton className="h-28 w-36 self-start rounded-xl" />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <Skeleton className="h-5 w-36" />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((stat) => (
              <div key={stat} className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Market table */}
        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <Skeleton className="h-5 w-48" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }, (_, row) => (
              <Skeleton key={row} className="h-9 w-full" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
