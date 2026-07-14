"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled || open
            ? "border-line bg-raised/90 shadow-soft backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Ebira.net home"
        >
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "bg-clay-soft text-clay-strong"
                    : "text-ink-soft hover:bg-sunken hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/#waitlist"
            className="hidden cursor-pointer rounded-full bg-clay px-4.5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-clay-strong active:scale-[0.98] sm:inline-flex"
          >
            Join the waitlist
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-200 hover:text-ink lg:hidden"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-raised/95 p-3 shadow-lift backdrop-blur-md lg:hidden">
          <div className="grid gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="rounded-xl px-4 py-3 text-[15px] font-medium text-ink-soft transition-colors duration-200 hover:bg-sunken hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#waitlist"
              onClick={close}
              className="mt-1 rounded-xl bg-clay px-4 py-3 text-center text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-clay-strong"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
