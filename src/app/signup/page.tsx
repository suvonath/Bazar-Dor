'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('সবগুলো ঘর সঠিকভাবে পূরণ করুন');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('পাসওয়ার্ড মিলছে না');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      toast.success('অ্যাকাউন্ট তৈরি সফল হয়েছে! লগইন করুন।');
      setLoading(false);
      router.push('/signin');
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    toast.success(`${provider} দিয়ে সাইন আপ সফল হয়েছে!`);
    router.push('/');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-xs text-gray-500 mb-6">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">নাম</label>
            <input
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেইল</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              type="password"
              placeholder="আবার লিখুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-xs px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium text-xs py-3 rounded-xl transition shadow-sm mt-2 disabled:opacity-50"
          >
            {loading ? 'প্রসেসিং হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-xs text-gray-400 bg-white px-2">অথবা</div>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="w-full border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 py-2.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            🔍 Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('GitHub')}
            className="w-full border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 py-2.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            🐙 GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-5">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="text-green-600 font-semibold hover:underline">সাইন ইন করুন</Link>
        </p>

        <Link href="/" className="inline-block text-xs text-gray-400 hover:text-gray-600 mt-3">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}