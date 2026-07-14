"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Volume2 } from "lucide-react";
import { searchEntries, type Dialect } from "@/lib/dictionary";

const DIALECTS: (Dialect | "All")[] = ["All", "Tao", "Etuno", "Igu", "General"];

export function DictionarySearch() {
  const [query, setQuery] = useState("");
  const [dialect, setDialect] = useState<(typeof DIALECTS)[number]>("All");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const base = searchEntries(query);
    return dialect === "All" ? base : base.filter((e) => e.dialect === dialect);
  }, [query, dialect]);

  return (
    <div>
      <motion.div
        animate={{ scale: focused ? 1.015 : 1 }}
        transition={{ duration: 0.2 }}
        className={`flex items-center gap-3 rounded-full border bg-raised px-5 shadow-soft transition-colors duration-200 ${
          focused ? "border-clay" : "border-line-strong"
        }`}
      >
        <Search size={19} className="shrink-0 text-ink-faint" aria-hidden="true" />
        <label htmlFor="dict-search" className="sr-only">
          Search the dictionary
        </label>
        <input
          id="dict-search"
          ref={inputRef}
          type="search"
          placeholder="Search Ebira or English… try “rain”, “festival”, or a name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-14 w-full bg-transparent text-[15px] text-ink placeholder:text-ink-faint focus:outline-none"
        />
        <kbd
          aria-hidden="true"
          className="hidden shrink-0 rounded-md border border-line-strong bg-sunken px-2 py-0.5 text-xs font-semibold text-ink-faint sm:block"
        >
          /
        </kbd>
      </motion.div>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by dialect"
      >
        {DIALECTS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDialect(d)}
            aria-pressed={dialect === d}
            className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
              dialect === d
                ? "border-clay bg-clay text-white"
                : "border-line-strong bg-raised text-ink-soft hover:border-clay hover:text-clay-strong"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink-faint" aria-live="polite">
        {results.length} {results.length === 1 ? "entry" : "entries"}
        {query.trim() && <> for “{query.trim()}”</>}
      </p>

      <ul className="mt-4 grid gap-3">
        {results.map((entry) => (
          <li key={entry.id}>
            <Link
              href={`/dictionary/${entry.id}`}
              className="group flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-line bg-raised p-5 shadow-soft transition-all duration-200 hover:border-gold/60 hover:shadow-lift sm:p-6"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="display text-xl font-semibold text-ink group-hover:text-clay-strong sm:text-2xl">
                    {entry.headword}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                    {entry.pos} · {entry.dialect}
                  </span>
                </div>
                <p className="mt-1.5 truncate text-[15px] text-ink-soft">
                  {entry.senses[0]}
                </p>
              </div>
              <span
                title="Audio pronunciation arrives with the corpus"
                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-faint/60"
              >
                <Volume2 size={17} aria-hidden="true" />
                <span className="sr-only">audio coming soon</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-sunken/50 p-8 text-center">
          <p className="display text-lg font-medium text-ink">
            Not in the seed yet. Maybe you know it.
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
            The preview holds only a handful of entries. If you remember this
            word, it belongs in the dictionary.{" "}
            <Link
              href="/contribute"
              className="font-semibold text-clay underline-offset-4 hover:underline"
            >
              contribute it
            </Link>{" "}
            and be credited when it publishes.
          </p>
        </div>
      )}
    </div>
  );
}
