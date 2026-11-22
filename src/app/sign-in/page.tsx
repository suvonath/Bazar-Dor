import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "সাইন ইন | বাজার দর",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getSessionUser();

  if (user) {
    redirect("/");
  }

  const { error } = await searchParams;

  return (
    <main className="flex-1 bg-[#f7f9f5]">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mx-auto max-w-md">
          <h1 className="text-center text-2xl font-bold text-gray-900">
            সাইন ইন করুন
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500">
            আপনার অ্যাকাউন্টে প্রবেশ করে সব বিস্তারিত দাম দেখুন।
          </p>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
            <AuthForm mode="sign-in" error={error} />
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            <Link href="/" className="hover:text-green-700">
              ← গেস্ট হিসেবে দেখুন
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
