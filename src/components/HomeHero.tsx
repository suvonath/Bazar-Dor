import Image from "next/image";
import Link from "next/link";

const HomeHero = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <section className="grid items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 md:grid-cols-[1fr_auto]">
      <div>
        <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
          {date}
        </span>

        <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-3 max-w-xl leading-relaxed text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দাম পরিবর্তন এক জায়গায়।
        </p>

        <Link
          href="#সব-পণ্য"
          className="mt-6 inline-flex rounded-lg bg-green-700 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-green-800"
        >
          সব দাম দেখুন
        </Link>
      </div>

      <Image
        src="/bazar-hero.png"
        alt="ফল ও সবজির ঝুড়ি"
        width={315}
        height={263}
        preload
        className="mx-auto h-auto w-full max-w-[240px]"
      />
    </section>
  );
};

export default HomeHero;
