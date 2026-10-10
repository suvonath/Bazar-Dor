'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  emoji: string;
  unit: string;
  currentPrice: number;
  changePercentage: number;
  changeType: 'up' | 'down' | 'flat';
}

const categoryNames: Record<string, { name: string; icon: string }> = {
  chal: { name: 'চাল', icon: '🍚' },
  dal: { name: 'ডাল', icon: '🫘' },
  tel: { name: 'তেল', icon: '🫙' },
  sobji: { name: 'সবজি', icon: '🥬' },
  mach: { name: 'মাছ', icon: '🐟' },
  mangsho: { name: 'মাংস', icon: '🍗' },
  'dim-dudh': { name: 'ডিম-দুধ', icon: '🥚' },
  mosla: { name: 'মসলা', icon: '🌶️' },
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.slug;
  const categoryInfo = categoryNames[categorySlug] || { name: categorySlug, icon: '🛒' };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');

  useEffect(() => {
    fetch('https://api.api-store.workers.dev/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data.products || []).filter(
          (p: Product) => p.categorySlug === categorySlug || p.category.toLowerCase() === categoryInfo.name
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categorySlug, categoryInfo.name]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'low-to-high') return a.currentPrice - b.currentPrice;
    if (sortOption === 'high-to-low') return b.currentPrice - a.currentPrice;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F5F7F2] py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Category Header Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl bg-gray-50 p-3 rounded-2xl border border-gray-100">
              {categoryInfo.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{categoryInfo.name}</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {/* Sorting Dropdown Control */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex justify-between items-center mb-6">
          <span className="text-xs text-gray-500 font-medium">
            মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
          </span>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-xs text-gray-600 font-medium">সাজান:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* Product Cards List or Skeleton/Empty State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white p-5 rounded-xl border border-gray-200 animate-pulse h-32"></div>
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 my-8">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">এই ক্যাটেগরিতে কোনো পণ্য পাওয়া যায়নি</h3>
            <p className="text-xs text-gray-500 mb-6">অন্য কোনো ক্যাটেগরি চেষ্টা করে দেখুন অথবা হোম পেজে ফিরে যান।</p>
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