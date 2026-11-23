import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryProductGrid from "@/components/CategoryProductGrid";
import { fetchCategory, fetchProductsByCategory } from "@/lib/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategory(slug);

  return {
    title: category
      ? `${category.nameBn} | বাজার দর`
      : "ক্যাটাগরি | বাজার দর",
  };
}

const CategoryPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    fetchCategory(slug),
    fetchProductsByCategory(slug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <main className="flex-1 bg-[#f0f5f1]">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <section className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/80 p-4">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl ring-1 ring-gray-100"
          >
            {category.icon}
          </span>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {category.nameBn}
            </h1>

            <p className="mt-0.5 text-xs text-gray-500">
              এই ক্যাটাগরির সব পণ্য দেখানো হচ্ছে
            </p>
          </div>
        </section>

        <div className="mt-4">
          <CategoryProductGrid products={products} />
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
