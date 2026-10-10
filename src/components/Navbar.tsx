'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  // Simulated logged in state for demonstration
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const categories = [
    { name: 'চাল', slug: 'chal', icon: '🍚' },
    { name: 'ডাল', slug: 'dal', icon: '🫘' },
    { name: 'তেল', slug: 'tel', icon: '🫙' },
    { name: 'সবজি', slug: 'sobji', icon: '🥬' },
    { name: 'মাছ', slug: 'mach', icon: '🐟' },
    { name: 'মাংস', slug: 'mangsho', icon: '🍗' },
    { name: 'ডিম-দুধ', slug: 'dim-dudh', icon: '🥚' },
    { name: 'মসলা', slug: 'mosla', icon: '🌶️' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Row: Logo, Title, Date, and Auth/Profile */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-green-600 text-white p-2 rounded-xl flex items-center justify-center text-xl shadow-sm">
            🛒
          </div>
          <div>
            <Link href="/" className="font-bold text-xl text-gray-900 tracking-tight">
              বাজার দর
            </Link>
            <p className="text-xs text-gray-500">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
          </div>
        </div>

        {/* Auth / Profile Area */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl transition text-xs font-semibold text-gray-800"
            >
              <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-[10px]">
                👤
              </span>
              <span>Rezwan</span>
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-700 hover:text-green-600 px-3 py-1.5 transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Middle Row: Category Links */}
      <nav className="border-t border-gray-100 py-2 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 flex gap-6 overflow-x-auto text-sm scrollbar-none">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 font-medium whitespace-nowrap px-3 py-1 rounded-lg transition ${
                  isActive
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Price Ticker Marquee */}
      <div className="bg-gray-100 border-y border-gray-200 py-2 overflow-hidden whitespace-nowrap text-xs text-gray-700">
        <div className="inline-flex gap-8 animate-marquee">
          <span className="flex items-center gap-1">
            🍚 স্বর্ণমাছি চাল ১৪৮ টাকা/কেজি <span className="text-red-600 font-semibold">▲ ২.১%</span>
          </span>
          <span className="flex items-center gap-1">
            🫘 মিনিকেট চাল ৯৯ টাকা/কেজি <span className="text-green-600 font-semibold">▼ ২.৯%</span>
          </span>
          <span className="flex items-center gap-1">
            🥔 বাটিম সাইজ চাল ৬৬ টাকা/কেজি <span className="text-red-600 font-semibold">▲ ৩.১%</span>
          </span>
          <span className="flex items-center gap-1">
            🫘 মসুর ডাল ১৪২ টাকা/কেজি <span className="text-red-600 font-semibold">▲ ২.৯%</span>
          </span>
        </div>
      </div>
    </header>
  );
}