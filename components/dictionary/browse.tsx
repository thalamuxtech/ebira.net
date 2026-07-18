"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { LETTERS, SORTED_ENTRIES, entriesByLetter } from "@/lib/dictionary";

const PER_PAGE = 6;

/**
 * The paper-dictionary view: every entry in alphabetical order, read
 * page by page, with an A–Z rail to jump between letters.
 */
export function DictionaryBrowse() {
  const reduced = useReducedMotion();
  const [letter, setLetter] = useState<string>("All");
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);

  const entries = useMemo(
    () => (letter === "All" ? SORTED_ENTRIES : entriesByLetter(letter)),
    [letter]
  );
  const pageCount = Math.max(1, Math.ceil(entries.length / PER_PAGE));
  const current = entries.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const first = current[0];
  const last = current[current.length - 1];

  function turn(next: number) {
    setDir(next > page ? 1 : -1);
    setPage(Math.min(Math.max(next, 0), pageCount - 1));
  }

  function pick(l: string) {
    setLetter(l);
    setPage(0);
    setDir(1);
  }

  return (
    <div>
      {/* A–Z rail */}
      <div
        role="group"
        aria-label="Jump to letter"
        className="flex flex-wrap gap-1.5"
      >
        <button
          type="button"
          onClick={() => pick("All")}
          aria-pressed={letter === "All"}
          className={`h-10 cursor-pointer rounded-xl px-3.5 text-sm font-bold transition-colors duration-200 ${
            letter === "All"
              ? "bg-clay text-white"
              : "border border-line bg-raised text-ink-soft hover:border-clay hover:text-clay"
          }`}
        >
          All
        </button>
        {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((l) => {
          const has = LETTERS.includes(l);
          return (
            <button
              key={l}
              type="button"
              disabled={!has}
              onClick={() => pick(l)}
              aria-pressed={letter === l}
              className={`h-10 w-10 rounded-xl text-sm font-bold transition-colors duration-200 ${
                letter === l
                  ? "cursor-pointer bg-clay text-white"
                  : has
                    ? "cursor-pointer border border-line bg-raised text-ink-soft hover:border-clay hover:text-clay"
                    : "cursor-default border border-line/50 bg-sunken/40 text-ink-faint/40"
              }`}
            >
              {l}
            </button>
          );
        })}
      </div>

      {/* the open page */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-line bg-raised shadow-lift">
        {/* running head, like a print dictionary */}
        <div className="flex items-baseline justify-between border-b-2 border-gold/60 px-6 py-4 sm:px-10">
          <span className="display text-lg font-semibold text-ink">
            {first?.headword ?? "—"}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-faint">
            Ebira–English
          </span>
          <span className="display text-lg font-semibold text-ink">
            {last?.headword ?? "—"}
          </span>
        </div>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.ol
            key={`${letter}-${page}`}
            custom={dir}
            initial={reduced ? false : { opacity: 0, x: 46 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -46 * dir }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="divide-y divide-line/70 px-6 sm:px-10"
          >
            {current.map((e) => (
              <li key={e.id} className="py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/dictionary/${e.id}`}
                      className="group inline-flex flex-wrap items-baseline gap-x-3"
                    >
                      <span className="display text-2xl font-semibold text-ink underline-offset-4 group-hover:text-clay group-hover:underline">
                        {e.headword}
                      </span>
                      <span className="text-xs font-medium italic text-ink-faint">
                        {e.pos} · {e.dialect}
                      </span>
                    </Link>
                    <p className="mt-1 leading-relaxed text-ink-soft">
                      {e.senses.map((s, i) => (
                        <span key={s}>
                          {e.senses.length > 1 && (
                            <span className="font-semibold text-gold-deep">
                              {" "}
                              {i + 1}.{" "}
                            </span>
                          )}
                          {s}
                        </span>
                      ))}
                    </p>
                    {e.literal && (
                      <p className="mt-1 text-sm italic text-ink-faint">
                        lit. {e.literal}
                      </p>
                    )}
                  </div>
                  <span
                    title="Audio pronunciation arrives with the corpus"
                    className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-dashed border-line-strong text-ink-faint/50"
                  >
                    <Volume2 size={15} aria-hidden="true" />
                    <span className="sr-only">audio coming soon</span>
                  </span>
                </div>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>

        {/* page turner */}
        <div className="flex items-center justify-between border-t border-line px-6 py-4 sm:px-10">
          <button
            type="button"
            onClick={() => turn(page - 1)}
            disabled={page === 0}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:text-clay disabled:cursor-default disabled:opacity-30"
          >
            <ArrowLeft size={15} /> Previous page
          </button>
          <span className="text-sm text-ink-faint" aria-live="polite">
            Page {page + 1} of {pageCount}
            {letter !== "All" && <> · letter {letter}</>}
          </span>
          <button
            type="button"
            onClick={() => turn(page + 1)}
            disabled={page >= pageCount - 1}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:text-clay disabled:cursor-default disabled:opacity-30"
          >
            Next page <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-faint">
        {entries.length} {entries.length === 1 ? "entry" : "entries"} in this
        view. The full dictionary opens with 2,000+ verified headwords, and the
        letters fill in as the community contributes.
      </p>
    </div>
  );
}
