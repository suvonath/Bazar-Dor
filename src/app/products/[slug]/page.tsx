import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import {
  fetchProductBySlug,
  formatAvg,
  formatPrice,
  getPriceSummary,
  unitLabel,
  unitName,
} from "@/lib/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: "পণ্য পাওয়া যায়নি | বাজার দর",
    };
  }

  return {
    title: `${product.nameBn} | বাজার দর`,
    description: `${product.nameBn} (${unitLabel(
      product.unit
    )}) — আজকের বাজারদর, সর্বনিম্ন-সর্বোচ্চ এবং বাজারভিত্তিক দাম।`,
  };
}

const ProductPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const summary = getPriceSummary(product);

  const stats = [
    {
      label: "সর্বনিম্ন দাম",
      value: summary.min,
      arrow: "▼",
      tone: "text-emerald-600",
      note: "সব বাজারের মধ্যে সর্বনিম্ন",
    },
    {
      label: "সর্বোচ্চ দাম",
      value: summary.max,
      arrow: "▲",
      tone: "text-red-500",
      note: "সব বাজারের মধ্যে সর্বোচ্চ",
    },
    {
      label: "গড় দাম",
      value: summary.average,
      arrow: "",
      tone: "text-emerald-700",
      note: "সব বাজারের গড়",
    },
  ];

  return (
    <main className="flex-1 bg-[#f0f5f1]">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500"
        >
          <Link href="/" className="transition-colors hover:text-green-700">
            হোম
          </Link>
          <span aria-hidden="true">›</span>
          <Link
            href={`/categories/${product.category}`}
            className="transition-colors hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-gray-700">{product.nameBn}</span>
        </nav>

        <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-50 text-4xl ring-1 ring-gray-100"
              >
                {product.image}
              </span>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.nameBn}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {unitLabel(product.unit)}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  সর্বনিম্ন-সর্বোচ্চ: {formatPrice(summary.min)} –{" "}
                  {formatPrice(summary.max)} টাকা
                </p>
              </div>
            </div>

            <div className="flex min-w-[132px] flex-col items-center self-start rounded-xl bg-gray-50 px-4 py-3 text-center ring-1 ring-gray-100 sm:self-auto">
              <p className="text-[11px] text-gray-500">আজকের দাম</p>
              <p className="mt-1 text-3xl font-bold leading-none text-gray-900">
                {formatPrice(product.today)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                টাকা / {unitName(product.unit)}
              </p>
              <div className="mt-2">
                <ChangeBadge
                  dir={product.change.dir}
                  pct={product.change.pct}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

          <div className="mt-4 grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="py-4 first:pt-0 sm:px-5 sm:py-0 sm:first:pl-0 sm:last:pr-0"
              >
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p
                  className={`mt-2 flex items-baseline gap-1 text-xl font-bold ${stat.tone}`}
                >
                  {stat.arrow ? (
                    <span className="text-xs" aria-hidden="true">
                      {stat.arrow}
                    </span>
                  ) : null}
                  {formatPrice(stat.value)}
                  <span className="text-sm font-medium">টাকা</span>
                </p>
                <p className="mt-1 text-[11px] text-gray-400">{stat.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-xs text-gray-500">
                  <th scope="col" className="rounded-l-lg px-4 py-3 font-medium">
                    বাজার
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    বিভাগ
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    সর্বনিম্ন
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    সর্বোচ্চ
                  </th>
                  <th scope="col" className="rounded-r-lg px-4 py-3 font-medium">
                    গড়
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market) => (
                  <tr
                    key={`${market.division}-${market.market}`}
                    className="border-t border-gray-100"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {market.market}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {market.division}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatPrice(market.min)} টাকা
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatPrice(market.max)} টাকা
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatAvg(market.min, market.max)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductPage;
