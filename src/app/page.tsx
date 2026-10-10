'use client';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.api-store.workers.dev/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7F2] pb-16">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        
        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৫
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a
              href="#sob-ponyo"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition shadow-sm text-sm"
            >
              সব পণ্য দেখুন
            </a>
          </div>
          <div className="text-7xl md:text-9xl bg-green-50 p-8 rounded-2xl flex items-center justify-center">
            🧺
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">তথ্য লোড হচ্ছে...</div>
        ) : (
          <>
            {/* Top Risers */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-red-600">▲</span> আজ দাম বেড়েছে
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.filter(p => p.changeType === 'up').slice(0, 6).map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>

            {/* Top Fallers */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-600">▼</span> আজ দাম কমেছে
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.filter(p => p.changeType === 'down').slice(0, 6).map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>

            {/* All Products */}
            <div id="sob-ponyo" className="pt-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
                <p className="text-xs text-gray-500">মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}