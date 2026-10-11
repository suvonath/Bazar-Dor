'use client';

import { Suspense, useState, useEffect, use } from 'react';
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';

type CategoryParams = {
  slug: string;
};

// Updated Product interface to match ProductCard expectations
type Product = {
  id?: string | number;
  slug: string;
  name: string;
  nameBn: string;
  unit: string;
  today: number;
  currentPrice?: number;
  image?: string;
  categoryIcon?: string;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
  [key: string]: any;
};

type CategoryInfo = {
  id?: string;
  slug?: string;
  categorySlug?: string;
  name?: string;
  nameBn?: string;
  icon?: string;
  categoryIcon?: string;
};

type CategoryPageContentProps = {
  params: Promise<CategoryParams>;
};

function CategoryPageContent({ params }: CategoryPageContentProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<
    'default' | 'low-to-high' | 'high-to-low'
  >('default');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategoryData() {
      setLoading(true);

      try {
        const encodedSlug = encodeURIComponent(slug);

        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(
            `https://openapi.programming-hero.com/api/bazardor/products?category=${encodedSlug}`,
            { signal: controller.signal }
          ),
          fetch(
            'https://openapi.programming-hero.com/api/bazardor/categories',
            { signal: controller.signal }
          ),
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch category data');
        }

        const [productsData, categoriesData] = await Promise.all([
          productsResponse.json(),
          categoriesResponse.json(),
        ]);

        const rawProductList = Array.isArray(productsData)
          ? productsData
          : productsData.products ?? productsData.data ?? [];

        // Normalize products to match Product type safely
        const normalizedProducts: Product[] = rawProductList.map((p: any) => ({
          ...p,
          slug: p.slug || 'product',
          name: p.name || 'পণ্য',
          nameBn: p.nameBn || p.name || 'পণ্য',
          unit: p.unit || 'কেজি',
          today: Number(p.today || p.currentPrice || p.price || 0),
          change: {
            dir: p.change?.dir || p.changeType || 'flat',
            pct: Number(p.change?.pct || p.changePercentage || 0),
          },
        }));

        const categoryList = Array.isArray(categoriesData)
          ? categoriesData
          : categoriesData.categories ?? categoriesData.data ?? [];

        const normalizedSlug = slug.toLowerCase();

        const foundCategory = categoryList.find((category: CategoryInfo) => {
          const categorySlug =
            category.slug ??
            category.id ??
            category.categorySlug ??
            '';

          return categorySlug.toLowerCase() === normalizedSlug;
        });

        setProducts(normalizedProducts);
        setCategoryInfo(foundCategory ?? null);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        console.error('Error loading category:', error);
        setProducts([]);
        setCategoryInfo(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchCategoryData();

    return () => {
      controller.abort();
    };
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = a.today;
    const priceB = b.today;

    if (sortOption === 'low-to-high') {
      return priceA - priceB;
    }

    if (sortOption === 'high-to-low') {
      return priceB - priceA;
    }

    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F2] py-12 flex justify-center items-center">
        <p className="text-gray-500 text-xs font-medium animate-pulse">
          পণ্যসমূহ লোড হচ্ছে...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7F2] py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Category Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl border border-gray-100">
              {categoryInfo?.icon ||
                categoryInfo?.categoryIcon ||
                '🛒'}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {categoryInfo?.nameBn ||
                  categoryInfo?.name ||
                  slug}
              </h1>

              <p className="text-xs text-gray-500 mt-1">
                {sortedProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {/* Sorting Controls */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">
            মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
          </span>

          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-xs text-gray-600 font-medium"
            >
              সাজান:
            </label>

            <select
              id="sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(
                  event.target.value as
                    | 'default'
                    | 'low-to-high'
                    | 'high-to-low'
                )
              }
              className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">
                দাম: কম থেকে বেশি
              </option>
              <option value="high-to-low">
                দাম: বেশি থেকে কম
              </option>
            </select>
          </div>
        </div>

        {/* Product List or Empty State */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.slug ?? index}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <div className="text-5xl mb-3">🔍</div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              এই ক্যাটেগরিতে কোনো পণ্য পাওয়া যায়নি
            </h3>

            <p className="text-xs text-gray-500 mb-6">
              অন্য কোনো ক্যাটেগরি চেষ্টা করে দেখুন অথবা হোম পেজে ফিরে যান।
            </p>

            <Link
              href="/"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CategoryPage({
  params,
}: CategoryPageContentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F7F2] py-12 flex justify-center items-center">
          <p className="text-gray-500 text-xs font-medium animate-pulse">
            পণ্যসমূহ লোড হচ্ছে...
          </p>
        </div>
      }
    >
      <CategoryPageContent params={params} />
    </Suspense>
  );
}