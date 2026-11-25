import Link from "next/link";

/** Friendly Bengali 404 for unknown routes and invalid [slug] lookups. */
const NotFound = () => {
  return (
    <main className="flex-1 bg-[#f7f9f5]">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
        <span aria-hidden="true" className="text-6xl">
          🔍
        </span>

        <p className="mt-6 text-7xl font-bold leading-none text-green-700">
          ৪০৪
        </p>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          দুঃখিত, এই পাতাটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
          আপনি যে লিংকটি খুঁজছেন সেটি নেই, ভুল হয়েছে বা সরিয়ে ফেলা
          হয়েছে। হোম পেজে গিয়ে আবার চেষ্টা করুন।
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
