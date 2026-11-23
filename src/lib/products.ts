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

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return res.json();
}

export async function fetchProducts(): Promise<Product[]> {
  return getJson<Product[]>(`${API_URL}/products`);
}

export async function fetchProductsByCategory(
  slug: string
): Promise<Product[]> {
  return getJson<Product[]>(`${API_URL}/products?category=${slug}`);
}

export async function fetchCategory(slug: string): Promise<Category | null> {
  const res = await fetch(`${API_URL}/categories/${slug}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch category ${slug}`);
  }

  return res.json();
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | null> {
  const products = await getJson<Product[]>(
    `${API_URL}/products?slug=${slug}`
  );

  return products[0] ?? null;
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

export function formatAvg(min: number, max: number): string {
  const avg = (min + max) / 2;

  return Number.isInteger(avg) ? formatPrice(avg) : toBn(avg.toFixed(1));
}

export function formatDateBn(): string {
  return new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
  });
}

const UNIT_NAMES: Record<string, string> = {
  kg: "কেজি",
  dozen: "ডজন",
  litre: "লিটার",
  piece: "পিস",
};

export function unitName(unit: string): string {
  return UNIT_NAMES[unit] ?? unit;
}

export function unitLabel(unit: string): string {
  return `প্রতি ${unitName(unit)}`;
}
