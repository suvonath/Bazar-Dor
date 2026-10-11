import Link from 'next/link';

interface ProductCardProps {
  product: {
    slug: string;
    image?: string;
    categoryIcon?: string;
    nameBn: string;
    unit: string;
    today: number;
    change: {
      dir: 'up' | 'down' | 'flat';
      pct: number;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const isFlat = product.change?.dir === 'flat' || !product.change;

  // Format unit text nicely in Bengali
  const unitText = 
    product.unit === 'kg' ? 'প্রতি কেজি' :
    product.unit === 'litre' ? 'প্রতি লিটার' :
    product.unit === 'dozen' ? 'প্রতি ডজন' : `প্রতি ${product.unit}`;

  return (
    <Link href={`/product/${product.slug}`} className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition block">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl bg-gray-50 p-2 rounded-lg flex items-center justify-center w-12 h-12">
          {product.image || product.categoryIcon || '🛒'}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">{unitText}</p>
        </div>
      </div>
      <div className="flex justify-between items-end mt-2">
        <div>
          <span className="text-xs text-gray-400 block">আজকের দাম</span>
          <span className="text-lg font-bold text-gray-800">{product.today} টাকা</span>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
          isUp ? 'text-red-600 bg-red-50' : isDown ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-100'
        }`}>
          {isUp && `▲ ${product.change.pct}%`}
          {isDown && `▼ ${Math.abs(product.change.pct)}%`}
          {isFlat && `— 0.0%`}
        </span>
      </div>
    </Link>
  );
}