import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";
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

const EditIcon = () => (
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
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

export default async function ProfilePage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in?reason=protected");
  }

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

        {/* Spec: an update button that takes the user to another route. */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-bold text-gray-900">তথ্য</h2>
          <p className="mt-1 text-sm text-gray-500">
            আপনার নামপরিবর্তন করতে আপডেট পাতায় যান।
          </p>

          <Link
            href="/profile/update"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800"
          >
            <EditIcon />
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </main>
  );
}
