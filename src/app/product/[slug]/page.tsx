'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [products, setProducts] = useState<any[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch products filtered by category using the instructor's API endpoint structure
    fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${resolvedParams.slug}`)
      .then((res) => res.json())
      .then((data) => {
        const productList = Array.isArray(data) ? data : data.products || data.data || [];
        
        // Fallback filter if backend returns all products
        const filtered = productList.filter((p: any) => {
          const catSlug = (p.categorySlug || p.category || p.slug || '').toLowerCase();
          const targetSlug = resolvedParams.slug.toLowerCase();
          return catSlug.includes(targetSlug) || targetSlug.includes(catSlug);
        });

        setProducts(filtered.length > 0 ? filtered : productList);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch category metadata
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
        
        {/* Category Header Card (Matches First Image) */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl border border-gray-100">
            {categoryInfo?.icon || categoryInfo?.categoryIcon || '🍚'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {categoryInfo?.nameBn || categoryInfo?.name || resolvedParams.slug}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Product Count & Grid Section */}
        <div>
          <p className="text-xs text-gray-500 mb-4">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.slug || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
              <p className="text-gray-500 text-sm mb-4">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</p>
              <Link href="/" className="bg-[#009951] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-green-700 transition">
                হোম পেজে ফিরে যান
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}