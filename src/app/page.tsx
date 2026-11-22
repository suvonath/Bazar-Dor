import HomeHero from "@/components/HomeHero";
import PriceSection from "@/components/PriceSection";
import { fetchProducts, toBn } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await fetchProducts();
  const gainers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const losers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="flex-1 bg-[#f7f9f5]">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
        <HomeHero />

        <PriceSection
          id="price-list"
          title="আজ দাম বেড়েছে"
          direction="up"
          products={gainers}
        />

        <PriceSection
          id="price-drops"
          title="আজ দাম কমেছে"
          direction="down"
          products={losers}
        />

        <PriceSection
          id="all-products"
          title="সব পণ্য"
          subtitle={`মোট ${toBn(products.length)}টি পণ্য • প্রতিদিন হালনাগাদ`}
          products={products}
        />
      </div>
    </main>
  );
}
