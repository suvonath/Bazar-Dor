export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

const PRODUCTS_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(PRODUCTS_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => BN_DIGITS[Number(digit)]);
}

export function formatPrice(value: number): string {
  return toBn(value.toLocaleString("en-US"));
}

export function formatPct(pct: number): string {
  return `${toBn(Math.abs(pct).toFixed(1))}%`;
}

const UNIT_LABELS: Record<string, string> = {
  kg: "প্রতি কেজি",
  dozen: "প্রতি ডজন",
  litre: "প্রতি লিটার",
  piece: "প্রতি পিস",
};

export function unitLabel(unit: string): string {
  return UNIT_LABELS[unit] ?? `প্রতি ${unit}`;
}
