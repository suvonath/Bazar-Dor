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
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-[400px]">
          <h1 className="text-center text-2xl font-bold text-gray-900">
            সাইন ইন
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তথ্য ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>

          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
            <AuthForm mode="sign-in" error={error} />
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            <Link href="/" className="hover:text-green-700">
              ← গেস্ট হিসেবে দেখুন
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
