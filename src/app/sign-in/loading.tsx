import Skeleton from "@/components/Skeleton";

/** Loading state for the sign-in route. */
export default function SignInLoading() {
  return (
    <main className="flex-1 bg-[#f7f9f5]" role="status">
      <span className="sr-only">সাইন ইন পাতা লোড হচ্ছে...</span>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-[400px]">
          <Skeleton className="mx-auto h-7 w-36" />
          <Skeleton className="mx-auto mt-3 h-4 w-72" />

          <div className="mt-8 space-y-4 rounded-xl border border-gray-200 bg-white p-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
