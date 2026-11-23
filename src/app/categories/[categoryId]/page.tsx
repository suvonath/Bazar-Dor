
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProductGrid";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const [categoryRes, productsRes] = await Promise.all([
    fetch(`${API_URL}/categories`, {
      next: { revalidate: 300 },
    }),
    fetch(`${API_URL}/products?category=${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    }),
  ]);

  if (!categoryRes.ok || !productsRes.ok) {
    throw new Error("Failed to fetch category data");
  }

  const categories: Category[] = await categoryRes.json();
  const products: Product[] = await productsRes.json();

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f0f5f1]">
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Category Header */}
        <section className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/80 p-4">
          <span className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-2xl">
            {category.icon}
          </span>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {category.nameBn}
            </h1>

            <p className="text-xs text-gray-500">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের বাজারদর ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Products */}
        <div className="mt-4">
          <CategoryProducts products={products} />
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
