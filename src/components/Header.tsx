import Link from "next/link";
import { Suspense } from "react";
import Navlinks from "./Navlinks";
import MarqueeSection from "./MarqueeSection";
import { getSessionUser } from "@/lib/auth";

const BasketIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M4 9h16l-1.4 8.6a2 2 0 0 1-2 1.7H7.4a2 2 0 0 1-2-1.7L4 9Z" />
    <path d="m8.5 9 2.2-4.5M15.5 9l-2.2-4.5" />
    <path d="M9.5 13v3M14.5 13v3" />
  </svg>
);

const ChevronDown = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-gray-500"
    aria-hidden="true"
  >
    <path d="m6 8 4 4 4-4" />
  </svg>
);

const Header = async () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
  const user = await getSessionUser();

  return (
    <header className="bg-white">
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
              <BasketIcon />
            </span>
            <span>
              <span className="block text-xl font-bold leading-tight text-gray-900">
                বাজার দর
              </span>
              <span className="block text-xs text-gray-500">{date}</span>
            </span>
          </Link>

          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-gray-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                {user.name.slice(0, 1)}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {user.name}
              </span>
              <ChevronDown />
            </Link>
          ) : (
            <nav aria-label="Authentication" className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-green-700"
              >
                সাইন ইন
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-800"
              >
                সাইন আপ
              </Link>
            </nav>
          )}
        </div>
      </div>

      <Suspense fallback={<div className="h-11" />}>
        <Navlinks />
      </Suspense>

      <Suspense fallback={<div className="h-10" />}>
        <MarqueeSection />
      </Suspense>
    </header>
  );
};

export default Header;
