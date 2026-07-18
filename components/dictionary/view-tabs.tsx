"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Search } from "lucide-react";

const TABS = [
  { href: "/dictionary", label: "Search", icon: Search },
  { href: "/dictionary/browse", label: "Browse A–Z", icon: BookOpen },
];

export function ViewTabs() {
  const pathname = usePathname();
  return (
    <div
      role="tablist"
      aria-label="Dictionary views"
      className="inline-flex rounded-full border border-line bg-sunken/70 p-1"
    >
      {TABS.map((tab) => {
        const active =
          tab.href === "/dictionary"
            ? pathname === "/dictionary" || pathname.startsWith("/dictionary/") && !pathname.startsWith("/dictionary/browse")
            : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={active}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
              active
                ? "bg-clay text-white shadow-soft"
                : "text-ink-soft hover:text-clay"
            }`}
          >
            <tab.icon size={15} aria-hidden="true" />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
