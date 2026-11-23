import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signOutAction, updateProfileAction } from "@/app/actions/auth";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "আমার প্রোফাইল | বাজার দর",
};

const LogoutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5M21 12H9" />
  </svg>
);

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string; error?: string }>;
}) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { updated, error } = await searchParams;

  return (
    <main className="flex-1 bg-[#f7f9f5]">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- avatar URL can come from any auth provider
                <img
                  src={user.image}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-700">
                  {user.name.slice(0, 1)}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-gray-900">
                  {user.name}
                </p>
                <p className="truncate text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <form action={signOutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <LogoutIcon />
                সাইন আউট
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-bold text-gray-900">তথ্য</h2>

          <form action={updateProfileAction} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={user.name}
                placeholder="আপনার নাম"
                className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-700 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-green-800"
            >
              আপডেট
            </button>
          </form>

          {updated ? (
            <p className="mt-3 text-sm text-green-700">
              প্রোফাইল আপডেট হয়েছে।
            </p>
          ) : null}

          {error ? (
            <p className="mt-3 text-sm text-red-600">নাম লিখুন।</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
