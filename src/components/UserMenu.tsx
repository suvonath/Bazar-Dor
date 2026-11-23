"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOutAction } from "@/app/actions/auth";

interface UserMenuProps {
  name: string;
  email: string;
  image?: string | null;
}

const Avatar = ({
  name,
  image,
}: {
  name: string;
  image?: string | null;
}) => {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- avatar URL can come from any auth provider
      <img
        src={image}
        alt={name}
        referrerPolicy="no-referrer"
        className="h-9 w-9 rounded-full object-cover"
      />
    );
  }

  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
      {name.slice(0, 1)}
    </span>
  );
};

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-4 w-4 text-gray-500 transition-transform ${
      open ? "rotate-180" : ""
    }`}
    aria-hidden="true"
  >
    <path d="m6 8 4 4 4-4" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5M21 12H9" />
  </svg>
);

const UserMenu = ({ name, email, image }: UserMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="ব্যবহারকারী মেনু"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-gray-50"
      >
        <Avatar name={name} image={image} />
        <span className="max-w-40 truncate text-sm font-semibold text-gray-900">
          {name}
        </span>
        <ChevronDown open={open} />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="ব্যবহারকারী মেনু"
          className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
        >
          <div className="px-4 py-3">
            <p className="truncate text-sm font-semibold text-gray-900">
              {name}
            </p>
            <p className="truncate text-xs text-gray-500">{email}</p>
          </div>

          <div className="border-t border-gray-100" />

          <div className="p-1">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <span className="text-blue-600">
                <UserIcon />
              </span>
              আমার প্রোফাইল
            </Link>

            <form action={signOutAction}>
              <button
                type="submit"
                role="menuitem"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <span className="text-red-500">
                  <LogoutIcon />
                </span>
                সাইন আউট
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserMenu;
