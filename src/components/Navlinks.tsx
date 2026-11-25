import NavLink from "./NavLink";
import { fetchCategories } from "@/lib/products";

const Navlinks = async () => {
  const categories = await fetchCategories();

  return (
    <nav aria-label="Product Categories" className="overflow-x-auto">
      <ul className="mx-auto flex max-w-6xl items-center gap-1 px-4 py-3 text-sm text-gray-600">
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
