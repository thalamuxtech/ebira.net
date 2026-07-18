"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, CornerDownLeft, Search } from "lucide-react";
import { suggestEntries, type Entry } from "@/lib/dictionary";

/**
 * The dictionary's front door: one large search field with ranked,
 * keyboard-navigable suggestions. Choosing a word goes straight to its
 * entry page, the way a print dictionary falls open at the headword.
 */
export function SearchHero({ autoFocus = false }: { autoFocus?: boolean }) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const suggestions = suggestEntries(query);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function go(entry: Entry) {
    setOpen(false);
    router.push(`/dictionary/${entry.id}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) {
      if (e.key === "Enter" && suggestions.length > 0) go(suggestions[0]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a <= 0 ? suggestions.length - 1 : a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(suggestions[Math.max(active, 0)]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={boxRef} className="relative">
      <div className="flex items-center gap-2 rounded-2xl border-2 border-line-strong bg-raised p-2 shadow-lift transition-colors duration-200 focus-within:border-clay sm:p-2.5">
        <Search
          size={22}
          className="ml-3 shrink-0 text-ink-faint"
          aria-hidden="true"
        />
        <label htmlFor="dict-q" className="sr-only">
          Search the Ebira dictionary
        </label>
        <input
          id="dict-q"
          type="search"
          autoFocus={autoFocus}
          autoComplete="off"
          placeholder="Search Ebira or English…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={open && suggestions.length > 0}
          aria-controls="dict-suggestions"
          aria-activedescendant={active >= 0 ? `sug-${active}` : undefined}
          className="h-12 w-full bg-transparent text-lg text-ink placeholder:text-ink-faint focus:outline-none sm:h-14"
        />
        <button
          type="button"
          onClick={() => suggestions.length > 0 && go(suggestions[0])}
          className="hidden h-12 cursor-pointer items-center gap-2 rounded-xl bg-clay px-6 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-clay-strong sm:inline-flex sm:h-14 sm:px-7"
        >
          Search
        </button>
      </div>

      <AnimatePresence>
        {open && query.trim() && (
          <motion.ul
            id="dict-suggestions"
            role="listbox"
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-line bg-raised shadow-lift"
          >
            {suggestions.length === 0 ? (
              <li className="px-5 py-4 text-sm text-ink-soft">
                Nothing in the seed yet.{" "}
                <Link
                  href="/contribute"
                  className="font-semibold text-clay underline-offset-4 hover:underline"
                >
                  Know this word? Contribute it
                </Link>
              </li>
            ) : (
              suggestions.map((s, i) => (
                <li key={s.id} role="option" aria-selected={i === active} id={`sug-${i}`}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(s)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors duration-150 ${
                      i === active ? "bg-clay-soft" : ""
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="display text-lg font-semibold text-ink">
                        {s.headword}
                      </span>
                      <span className="ml-2.5 text-xs font-medium uppercase tracking-wide text-ink-faint">
                        {s.pos}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-ink-soft">
                        {s.senses[0]}
                      </span>
                    </span>
                    <span className="shrink-0 text-ink-faint">
                      {i === active ? (
                        <CornerDownLeft size={16} />
                      ) : (
                        <ArrowRight size={16} />
                      )}
                    </span>
                  </button>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
