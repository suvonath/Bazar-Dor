'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '../lib/auth-client';

interface Category {
  id?: string;
  name?: string;
  nameBn?: string;
  categoryName?: string;
  slug?: string;
  categorySlug?: string;
  categoryIcon?: string;
  icon?: string;
  emoji?: string;
}

interface Product {
  id?: string;
  slug?: string;
  name?: string;
  nameBn?: string;
  price?: string | number;
  today?: number;
  unit?: string;
  change?: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
  changePercentage?: number;
  changeType?: 'up' | 'down' | 'flat';
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [tickerItems, setTickerItems] = useState<Product[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetch('https://openapi.programming-hero.com/api/bazardor/categories')
      .then((res) => res.json())
      .then((data) => {
        const catList = Array.isArray(data) ? data : data.categories || data.data || [];
        setCategories(catList);
      })
      .catch((err) => console.error('Failed to load categories', err));

    fetch('https://openapi.programming-hero.com/api/bazardor/products')
      .then((res) => res.json())
      .then((data) => {
        const prodList = Array.isArray(data) ? data : data.products || data.data || [];
        setTickerItems(prodList.slice(0, 8));
      })
      .catch((err) => console.error('Failed to load products', err));
  }, []);

  const handleSignOut = async () => {
    try {
      setDropdownOpen(false);
      await authClient.signOut();
      toast.success('সফলভাবে সাইন আউট হয়েছে');
      router.push('/signin');
    } catch {
      toast.error('সাইন আউট করতে সমস্যা হয়েছে');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#009951] flex items-center justify-center text-white shadow-sm">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.89-2-2-2z" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-gray-950 text-lg tracking-tight block leading-snug">বাজার দর</span>
            <span className="text-[10px] text-gray-500 font-medium block">মঙ্গলবারে, ৬ অক্টোবর, ২০২৬</span>
          </div>
        </Link>

        {/* Dynamic User Profile / Dropdown */}
        <div className="flex items-center relative" ref={dropdownRef}>
          {isPending ? (
            <div className="h-9 w-28 bg-gray-100 animate-pulse rounded-2xl"></div>
          ) : session?.user ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 p-1.5 pr-2.5 rounded-2xl transition border border-transparent hover:border-gray-200 focus:outline-none"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User Avatar'}
                    className="w-9 h-9 rounded-xl object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-[#009951] text-white flex items-center justify-center font-bold text-sm">
                    {session.user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <span className="text-xs font-semibold text-gray-800">
                  {session.user.name || session.user.email?.split('@')[0]}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-4 z-50 space-y-3 transition-all animate-in fade-in zoom-in-95 duration-150">
                  <div className="border-b border-gray-100 pb-3">
                    <p className="text-sm font-bold text-gray-900">{session.user.name || 'ইউজার'}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition"
                    >
                      <span>👤</span>
                      <span>আমার প্রোফাইল</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition text-left"
                    >
                      <span>↪</span>
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signin" className="text-xs font-semibold text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg transition">
                সাইন ইন
              </Link>
              <Link href="/signup" className="bg-[#009951] hover:bg-green-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition shadow-sm">
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Categories Row (Left Aligned with Active State) */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start gap-3 overflow-x-auto py-2.5 scrollbar-none text-xs font-semibold text-gray-700">
          {categories.length > 0 ? (
            categories.map((cat, idx) => {
              const categoryTitle = cat.nameBn || cat.name || cat.categoryName || 'ক্যাটাগরি';
              const categoryIcon = cat.categoryIcon || cat.icon || cat.emoji || '📦';
              const slug = cat.slug || cat.id || cat.categorySlug || 'chal';
              const isActive = pathname === `/category/${slug}`;

              return (
                <Link
                  key={idx}
                  href={`/category/${slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                    isActive
                      ? 'bg-[#009951] text-white font-bold shadow-sm'
                      : 'hover:text-[#009951] hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm">{categoryIcon}</span>
                  <span>{categoryTitle}</span>
                </Link>
              );
            })
          ) : (
            <span className="text-gray-400 text-xs py-1">ক্যাটাগরি লোড হচ্ছে...</span>
          )}
        </div>
      </div>

      {/* Price Ticker Bar */}
      <div className="border-t border-gray-100 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 overflow-x-auto py-2 text-[11px] scrollbar-none">
          {tickerItems.length > 0 ? (
            tickerItems.map((item, idx) => {
              const title = item.nameBn || item.name || 'পণ্য';
              const priceVal = item.today || item.price || 0;
              const unitText = item.unit ? `/${item.unit}` : '/কেজি';
              const isUp = item.change?.dir === 'up' || item.changeType === 'up';
              const isDown = item.change?.dir === 'down' || item.changeType === 'down';
              const pct = item.change?.pct ?? item.changePercentage ?? 0;

              return (
                <div key={idx} className="flex items-center gap-1.5 whitespace-nowrap font-medium text-gray-700">
                  <span className="text-gray-400 text-[9px]">⚪</span>
                  <span>{title}</span>
                  <span className="text-gray-900 font-semibold">{priceVal} টাকা{unitText}</span>
                  {isUp && <span className="text-red-500 font-semibold">▲ {pct}%</span>}
                  {isDown && <span className="text-green-600 font-semibold">▼ {pct}%</span>}
                  {!isUp && !isDown && <span className="text-gray-500 font-semibold">— 0.0%</span>}
                </div>
              );
            })
          ) : (
            <span className="text-gray-400 text-xs py-0.5">বাজার দর লোড হচ্ছে...</span>
          )}
        </div>
      </div>
    </header>
  );
}