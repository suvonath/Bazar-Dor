/** `animate-pulse` building blocks shared by the route-level loading.tsx files. */
const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={`animate-pulse rounded-lg bg-gray-200 ${className}`}
  />
);

/** Placeholder matching the PriceCard layout. */
export const PriceCardSkeleton = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-4">
    <div className="flex items-start gap-3">
      <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
    <Skeleton className="mt-4 h-3 w-16" />
    <div className="mt-2 flex items-center justify-between gap-2">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-5 w-14" />
    </div>
  </div>
);

/** Grid of card placeholders (6 items = one Home/Category block). */
export const CardGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: count }, (_, index) => (
      <PriceCardSkeleton key={index} />
    ))}
  </div>
);

export default Skeleton;
