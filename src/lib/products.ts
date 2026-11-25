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
  const res = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return res.json();
}

/**
 * All helpers degrade gracefully: if the public API is unreachable the pages
 * render with empty data instead of crashing (spec: reloading must never error).
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    return await getJson<Product[]>(`${API_URL}/products`);
  } catch {
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    return await getJson<Category[]>(`${API_URL}/categories`);
  } catch {
    return [];
  }
}

export async function fetchProductsByCategory(
  slug: string
): Promise<Product[]> {
  try {
    return await getJson<Product[]>(
      `${API_URL}/products?category=${encodeURIComponent(slug)}`
    );
  } catch {
    return [];
  }
}

export async function fetchCategory(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${API_URL}/categories/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      // 404 (invalid slug) and API failures both fall through to the
      // friendly not-found page instead of an error page.
      return null;
    }

    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const products = await getJson<Product[]>(
      `${API_URL}/products?slug=${encodeURIComponent(slug)}`
    );

    return products[0] ?? null;
  } catch {
    return null;
  }
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

export interface PriceSummary {
  min: number;
  max: number;
  average: number;
}

export function getPriceSummary(product: Product): PriceSummary {
  if (product.markets.length === 0) {
    return {
      min: product.today,
      max: product.today,
      average: product.today,
    };
  }

  const midpoints = product.markets.map(
    (market) => (market.min + market.max) / 2
  );

  return {
    min: Math.min(...product.markets.map((market) => market.min)),
    max: Math.max(...product.markets.map((market) => market.max)),
    average: Math.round(
      midpoints.reduce((total, value) => total + value, 0) / midpoints.length
    ),
  };
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
