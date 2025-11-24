"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cards-ssr", label: "Cards SSR" },
  { href: "/cards-ssg", label: "Cards SSG" },
  { href: "/cards-isr", label: "Cards ISR" },
  { href: "/create-post", label: "Create Post" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary-600 text-white dark:bg-primary-500"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

