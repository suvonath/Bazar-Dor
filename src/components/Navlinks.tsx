import NavLink from "./NavLink";

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
    <nav aria-label="Product Categories" className="overflow-x-auto">
      <ul className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-3 text-sm text-gray-600">
        {categories.map((category) => (
          <li key={category.id} className="shrink-0">
            <NavLink
              href={`/categories/${category.slug}`}
              icon={category.icon}
              label={category.nameBn}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navlinks;
