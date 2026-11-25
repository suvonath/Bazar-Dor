import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { updateProfileAction } from "@/app/actions/auth";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "তথ্য আপডেট | বাজার দর",
};

const BackIcon = () => (
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
    <path d="m15 18-6-6 6-6" />
  </svg>
);

/** Update Information route — reached from the "তথ্য আপডেট করুন" button. */
export default async function UpdateProfilePage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in?reason=protected");
  }

  return (
    <main className="flex-1 bg-[#f7f9f5]">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-green-700"
        >
          <BackIcon />
          আমার প্রোফাইল
        </Link>

        <h1 className="mt-4 text-xl font-bold text-gray-900">
          তথ্য আপডেট করুন
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          নিচের ঘরে আপনার নাম লিখে আপডেট করুন।
        </p>

        <form
          action={updateProfileAction}
          className="mt-6 rounded-xl border border-gray-200 bg-white p-6"
        >
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

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800"
            >
              তথ্য আপডেট করুন
            </button>
            <Link
              href="/profile"
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              বাতিল
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
