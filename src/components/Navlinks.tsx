
import Link from "next/link";
interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await res.json();

  return (
    <nav aria-label="Product Categories">
      <ul className="mx-auto flex max-w-7xl items-center gap-7 px-4 py-3">
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/categories/${category.slug}`} prefetch={false}>
              <span aria-hidden="true">{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navlinks;
