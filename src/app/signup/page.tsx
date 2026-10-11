'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '../../lib/auth-client';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        toast.error(error.message || 'অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে');
        setLoading(false);
        return;
      }

      toast.success('অ্যাকাউন্ট তৈরি সফল হয়েছে!');
      router.push('/');
    } catch {
      toast.error('একটি ত্রুটি ঘটেছে');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    await authClient.signIn.social({
      provider,
      callbackURL: '/',
    });
  };

  return (
    <div className="min-h-[75vh] md:min-h-[50vh] xl:min-h-[80vh] bg-[#f2f3f7] flex flex-col items-center justify-center py-0 px-4">
      <div className="max-w-md w-full space-y-3">
        
        {/* Title & Subtitle Outside Card */}
        <div className="text-center space-y-0.5">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-xs text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm space-y-3">
          <form onSubmit={handleSubmit} className="space-y-2.5 text-left">
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">নাম</label>
              <input
                type="text"
                placeholder="যেমন: রহিম উদ্দিন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">ইমেইল</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input
                type="password"
                placeholder="আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium text-xs py-3 rounded-xl transition shadow-sm mt-1 disabled:opacity-50"
            >
              {loading ? 'প্রসেসিং হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
            </button>
          </form>

          {/* Clean Separator with Lines */}
          <div className="flex items-center my-3">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-500 font-medium">অথবা</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Social Buttons Side-by-Side */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="w-full border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-800 py-2 px-2 rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-[11px] truncate">Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('github')}
              className="w-full border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-800 py-2 px-2 rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 shrink-0 fill-current text-gray-900" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="text-[11px] truncate">GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          {/* Card Footer Link */}
          <p className="text-xs text-gray-500 text-center pt-1">
            অ্যাকাউন্ট আছে?{' '}
            <Link href="/signin" className="text-green-600 font-semibold hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Home Link */}
        <div className="text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </div>
  );
}