'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface MarketData {
  marketName: string;
  division: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

interface ProductDetails {
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
  description?: string;
  markets?: MarketData[];
}

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.api-store.workers.dev/api/bazardor/products`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.products?.find((p: ProductDetails) => p.slug === resolvedParams.slug);
        setProduct(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F2] py-12 flex justify-center items-center">
        <div className="text-gray-500 font-medium">পণ্যটির বিস্তারিত তথ্য লোড হচ্ছে...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F7F2] py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">পণ্যটি পাওয়া যায়নি</h2>
        <Link href="/" className="bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Calculate prices if market data exists
  const minPrice = product.markets?.length
    ? Math.min(...product.markets.map((m) => m.minPrice))
    : product.currentPrice;
  const maxPrice = product.markets?.length
    ? Math.max(...product.markets.map((m) => m.maxPrice))
    : product.currentPrice;
  const avgPrice = product.markets?.length
    ? Math.round(product.markets.reduce((acc, m) => acc + m.avgPrice, 0) / product.markets.length)
    : product.currentPrice;

  return (
    <div className="min-h-screen bg-[#F5F7F2] py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-green-600">হোম</Link>
          <span>›</span>
          <Link href={`/category/${product.categorySlug}`} className="hover:text-green-600">{product.category}</Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        {/* Header Summary Box */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="text-5xl bg-gray-50 p-4 rounded-2xl border border-gray-100">{product.emoji}</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-xs text-gray-500 mt-1">{product.unit} - {product.category}</p>
              <p className="text-xs text-gray-600 mt-2">
                গতকালের তুলনায় আজ দাম {product.changeType === 'up' ? 'বেড়েছে' : 'কমেছে'} {product.changePercentage}%
              </p>
            </div>
          </div>

          <div className="bg-green-50/60 border border-green-100 p-4 rounded-xl text-right min-w-[180px]">
            <span className="text-xs text-gray-500 block">আজকের দাম</span>
            <span className="text-2xl font-black text-gray-900">{product.currentPrice}</span>
            <span className="text-xs text-gray-600 font-medium block">টাকা / {product.unit.replace('প্রতি ', '')}</span>
            <span className={`text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded ${
              product.changeType === 'up' ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'
            }`}>
              {product.changeType === 'up' ? '▲' : '▼'} {product.changePercentage}%
            </span>
          </div>
        </div>

        {/* Price Summary Cards */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <span className="text-xs text-gray-500 font-medium block mb-1">সর্বনিম্ন দাম</span>
              <div className="text-2xl font-extrabold text-green-600">{minPrice} টাকা</div>
              <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে কম দামের বাজার</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <span className="text-xs text-gray-500 font-medium block mb-1">সর্বোচ্চ দাম</span>
              <div className="text-2xl font-extrabold text-red-500">{maxPrice} টাকা</div>
              <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে বেশি দামের বাজার</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200">
              <span className="text-xs text-gray-500 font-medium block mb-1">গড় দাম</span>
              <div className="text-2xl font-extrabold text-gray-800">{avgPrice} টাকা</div>
              <span className="text-[11px] text-gray-400 mt-1 block">{product.unit}-এর হিসাব</span>
            </div>
          </div>
        </div>

        {/* Market Price Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">বাজার</th>
                  <th className="py-3.5 px-6 font-semibold">বিভাগ</th>
                  <th className="py-3.5 px-6 font-semibold">সর্বনিম্ন</th>
                  <th className="py-3.5 px-6 font-semibold">সর্বোচ্চ</th>
                  <th className="py-3.5 px-6 font-semibold">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {product.markets && product.markets.length > 0 ? (
                  product.markets.map((m, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-6 font-medium text-gray-900">{m.marketName}</td>
                      <td className="py-4 px-6 text-gray-500">{m.division}</td>
                      <td className="py-4 px-6 font-semibold text-green-600">{m.minPrice} টাকা</td>
                      <td className="py-4 px-6 font-semibold text-red-500">{m.maxPrice} টাকা</td>
                      <td className="py-4 px-6 font-bold text-gray-800">{m.avgPrice} টাকা</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      কোনো বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}