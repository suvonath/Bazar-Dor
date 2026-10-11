import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 bg-[#F5F7F2]">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">404 - পৃষ্ঠাটি পাওয়া যায়নি</h1>
        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          আপনি যে বিষয়টি খুঁজছেন তা বাতিল করা হয়েছে অথবা লিংকটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium text-xs px-6 py-3 rounded-xl transition shadow-sm"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}