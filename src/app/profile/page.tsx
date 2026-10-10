'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [name, setName] = useState('Rezwan Ahmed');
  const [email] = useState('rezwanahmed@gmail.com');
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('নামের ঘরটি ফাঁকা রাখা যাবে না');
      return;
    }
    setLoading(true);

    // Simulated BetterAuth user update request (authClient.updateUser({ name }))
    setTimeout(() => {
      toast.success('তথ্য সফলভাবে আপডেট হয়েছে!');
      setLoading(false);
    }, 800);
  };

  const handleSignOut = () => {
    toast.success('সফলভাবে সাইন আউট হয়েছে');
    window.location.href = '/signin';
  };

  return (
    <div className="min-h-[80vh] bg-[#F5F7F2] py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-xs text-gray-500 mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>

        {/* User Identity Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl border border-gray-200">
              👤
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{name}</h2>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold px-4 py-2 rounded-xl transition"
          >
            ← সাইন আউট
          </button>
        </div>

        {/* Update Information Form (Challenge C3) */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900">তথ্য আপডেট করুন</h3>
          
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium text-xs py-3 rounded-xl transition shadow-sm disabled:opacity-50"
            >
              {loading ? 'আপডেট হচ্ছে...' : 'আপডেট করুন'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}