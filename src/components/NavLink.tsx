"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  icon: string;
  label: string;
}

const NavLink = ({ href, icon, label }: NavLinkProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      prefetch={false}
      className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 transition-colors ${
        active
          ? "bg-green-600 font-medium text-white"
          : "hover:text-green-700"
      }`}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default NavLink;
