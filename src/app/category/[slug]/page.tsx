'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [products, setProducts] = useState<any[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');

  useEffect(() => {
    setLoading(true);

    // Fetch products by category endpoint from instructor's spec
    fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${resolvedParams.slug}`)
      .then((res) => res.json())
      .then((data) => {
        const productList = Array.isArray(data) ? data : data.products || data.data || [];
        setProducts(productList);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch categories metadata for title and emoji icon
    fetch('https://openapi.programming-hero.com/api/bazardor/categories')
      .then((res) => res.json())
      .then((data) => {
        const catList = Array.isArray(data) ? data : data.categories || data.data || [];
        const found = catList.find((c: any) => 
          (c.slug || c.id || c.categorySlug || '').toLowerCase() === resolvedParams.slug.toLowerCase()
        );
        setCategoryInfo(found || null);
      });
  }, [resolvedParams.slug]);

  // Challenge C1: Sort logic handling Bengali numerals/prices correctly numerically
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = Number(a.today || a.currentPrice || 0);
    const priceB = Number(b.today || b.currentPrice || 0);
    if (sortOption === 'low-to-high') return priceA - priceB;
    if (sortOption === 'high-to-low') return priceB - priceA;
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F2] py-12 flex justify-center items-center">
        <p className="text-gray-500 text-xs font-medium animate-pulse">পণ্যসমূহ লোড হচ্ছে...</p>
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
              {categoryInfo?.icon || categoryInfo?.categoryIcon || '🛒'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {categoryInfo?.nameBn || categoryInfo?.name || resolvedParams.slug}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                {sortedProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {/* Sorting Control Bar (Challenge C1 Requirement) */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex justify-between items-center">
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

        {/* Product Cards List or Empty State */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.slug || product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
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