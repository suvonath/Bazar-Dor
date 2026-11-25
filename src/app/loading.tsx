import Skeleton, { CardGridSkeleton } from "@/components/Skeleton";

/** Root loading state — shown while the Home page product data streams in. */
export default function HomeLoading() {
  return (
    <main className="flex-1 bg-[#f7f9f5]" role="status">
      <span className="sr-only">পণ্যের দাম লোড হচ্ছে...</span>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        {/* Hero */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="mt-5 h-9 w-2/3 max-w-md" />
          <Skeleton className="mt-4 h-4 w-full max-w-xl" />
          <Skeleton className="mt-2 h-4 w-3/4 max-w-lg" />
          <Skeleton className="mt-6 h-10 w-36" />
        </div>

        {/* Sections */}
        {[0, 1, 2].map((section) => (
          <div key={section} className="mt-8">
            <Skeleton className="h-6 w-48" />
            <div className="mt-4">
              <CardGridSkeleton />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
