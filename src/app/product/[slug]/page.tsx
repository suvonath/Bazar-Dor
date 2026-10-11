'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface MarketData {
  marketName?: string;
  market?: string;
  division?: string;
  minPrice?: number | string;
  min_price?: number | string;
  maxPrice?: number | string;
  max_price?: number | string;
  avgPrice?: number | string;
  avg_price?: number | string;
  price?: number | string;
}

interface ProductDetails {
  id: string;
  name: string;
  nameBn?: string;
  slug: string;
  category: string;
  categorySlug: string;
  emoji?: string;
  image?: string;
  categoryIcon?: string;
  unit: string;
  currentPrice?: number | string;
  today?: number | string;
  price?: number | string;
  changePercentage?: number;
  changeType?: 'up' | 'down' | 'flat';
  change?: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
  description?: string;
  markets?: MarketData[];
}

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://openapi.programming-hero.com/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => {
        const productList = Array.isArray(data) ? data : data.products || data.data || [];
        const found = productList.find((p: ProductDetails) => p.slug === resolvedParams.slug);
        setProduct(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7F2] py-12 flex justify-center items-center">
        <p className="text-gray-500 text-xs font-medium animate-pulse">পণ্যটির বিস্তারিত তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F7F2] py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">পণ্যটি পাওয়া যায়নি</h2>
        <Link href="/" className="bg-[#009951] text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition text-xs font-semibold">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const productName = product.nameBn || product.name || 'পণ্য';
  const productPrice = Number(product.today || product.currentPrice || product.price || 0);
  const productEmoji = product.emoji || product.image || product.categoryIcon || '🛒';
  const unitText = product.unit ? product.unit : 'কেজি';

  // Safely parse markets list to guarantee numbers (Prevents NaN)
  const validMarkets = (product.markets || []).map((m: MarketData) => {
    const parsedMin = Number(m.minPrice ?? m.min_price ?? m.price ?? productPrice);
    const parsedMax = Number(m.maxPrice ?? m.max_price ?? m.price ?? productPrice);
    const parsedAvg = Number(m.avgPrice ?? m.avg_price ?? m.price ?? productPrice);

    return {
      marketName: m.marketName || m.market || 'বাজার',
      division: m.division || 'ঢাকা',
      minPrice: isNaN(parsedMin) ? productPrice : parsedMin,
      maxPrice: isNaN(parsedMax) ? productPrice : parsedMax,
      avgPrice: isNaN(parsedAvg) ? productPrice : parsedAvg,
    };
  });

  // Calculate min, max, avg prices safely
  const rawMin = validMarkets.length > 0 ? Math.min(...validMarkets.map((m) => m.minPrice)) : productPrice;
  const rawMax = validMarkets.length > 0 ? Math.max(...validMarkets.map((m) => m.maxPrice)) : productPrice;
  const rawAvg = validMarkets.length > 0 
    ? Math.round(validMarkets.reduce((acc, m) => acc + m.avgPrice, 0) / validMarkets.length) 
    : productPrice;

  // Final NaN Protection
  const safeMin = isNaN(rawMin) ? productPrice : rawMin;
  const safeMax = isNaN(rawMax) ? productPrice : rawMax;
  const safeAvg = isNaN(rawAvg) ? productPrice : rawAvg;

  // Change Percentage calculation
  const isUp = product.changeType === 'up' || product.change?.dir === 'up';
  const isDown = product.changeType === 'down' || product.change?.dir === 'down';
  const pct = product.changePercentage ?? product.change?.pct ?? 0;

  return (
    <div className="min-h-screen bg-[#F5F7F2] py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#009951] transition">হোম</Link>
          <span>›</span>
          <Link href={`/category/${product.categorySlug || 'chal'}`} className="hover:text-[#009951] transition">
            {product.category || 'চাল'}
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{productName}</span>
        </nav>

        {/* Header Summary Box */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-center w-20 h-20 shrink-0">
              {productEmoji}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{productName}</h1>
              <p className="text-xs text-gray-500 mt-1">প্রতি {unitText} · {product.category || 'চাল'}</p>
              <p className="text-xs text-gray-600 mt-2">
                গতকালের তুলনায় আজ দাম {isUp ? 'বেড়েছে' : isDown ? 'কমেছে' : 'একই আছে'} {pct}%
              </p>
            </div>
          </div>

          <div className="bg-green-50/60 border border-green-100 p-4 rounded-xl text-right min-w-[180px] w-full md:w-auto">
            <span className="text-xs text-gray-500 block">আজকের দাম</span>
            <span className="text-2xl font-black text-gray-900">{productPrice}</span>
            <span className="text-xs text-gray-600 font-medium block">টাকা / {unitText}</span>
            <span className={`text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded ${
              isUp ? 'text-red-600 bg-red-100' : isDown ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
            }`}>
              {isUp ? '▲' : isDown ? '▼' : '—'} {pct}%
            </span>
          </div>
        </div>

        {/* Price Summary Cards (Fixes NaN) */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <span className="text-xs text-gray-500 font-medium block mb-1">সর্বনিম্ন দাম</span>
              <div className="text-2xl font-extrabold text-[#009951]">{safeMin} টাকা</div>
              <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে কম দামের বাজার</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <span className="text-xs text-gray-500 font-medium block mb-1">সর্বোচ্চ দাম</span>
              <div className="text-2xl font-extrabold text-red-500">{safeMax} টাকা</div>
              <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে বেশি দামের বাজার</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <span className="text-xs text-gray-500 font-medium block mb-1">গড় দাম</span>
              <div className="text-2xl font-extrabold text-gray-800">{safeAvg} টাকা</div>
              <span className="text-[11px] text-gray-400 mt-1 block">{unitText}-এর হিসাব</span>
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
                  <th className="py-3.5 px-6 font-semibold">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {validMarkets.length > 0 ? (
                  validMarkets.map((m, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-6 font-medium text-gray-900">{m.marketName}</td>
                      <td className="py-4 px-6 text-gray-500">{m.division}</td>
                      <td className="py-4 px-6 font-semibold text-[#009951]">{m.minPrice} টাকা</td>
                      <td className="py-4 px-6 font-semibold text-red-500">{m.maxPrice} টাকা</td>
                      <td className="py-4 px-6 font-bold text-gray-800">{m.avgPrice} টাকা</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400 text-xs">
                      কোনো বাজারভিত্তিক তথ্য পাওয়া যায়নি।
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