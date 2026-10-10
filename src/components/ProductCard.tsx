import Link from 'next/link';

interface ProductCardProps {
  product: {
    slug: string;
    emoji: string;
    name: string;
    unit: string;
    currentPrice: number;
    changePercentage: number;
    changeType: 'up' | 'down' | 'flat';
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.changeType === 'up';
  const isDown = product.changeType === 'down';

  return (
    <Link href={`/product/${product.slug}`} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition block">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl bg-gray-50 p-2 rounded-lg">{product.emoji}</div>
        <div>
          <h3 className="font-semibold text-gray-900">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.unit}</p>
        </div>
      </div>
      <div className="flex justify-between items-end mt-2">
        <div>
          <span className="text-xs text-gray-400 block">আজকের দাম</span>
          <span className="text-lg font-bold text-gray-800">{product.currentPrice} টাকা</span>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
          isUp ? 'text-red-600 bg-red-50' : isDown ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-100'
        }`}>
          {isUp && `▲ ${product.changePercentage}%`}
          {isDown && `▼ ${product.changePercentage}%`}
          {!isUp && !isDown && `— 0.0%`}
        </span>
      </div>
    </Link>
  );
}