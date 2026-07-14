"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftRight, BadgeCheck, CircleDashed } from "lucide-react";
import { ENTRIES, type Entry } from "@/lib/dictionary";

type Direction = "en-ebira" | "ebira-en";

function normalize(s: string) {
  return s.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function lookup(query: string, direction: Direction): Entry[] {
  const q = normalize(query);
  if (!q) return [];
  return ENTRIES.filter((e) => {
    if (direction === "ebira-en") {
      return normalize(e.headword).includes(q);
    }
    return e.senses.some((s) => normalize(s).includes(q));
  }).slice(0, 5);
}

export function Translator() {
  const [direction, setDirection] = useState<Direction>("en-ebira");
  const [text, setText] = useState("");
  const [flips, setFlips] = useState(0);
  const reduced = useReducedMotion();

  const results = useMemo(() => lookup(text, direction), [text, direction]);
  const from = direction === "en-ebira" ? "English" : "Ẹ́bírà";
  const to = direction === "en-ebira" ? "Ẹ́bírà" : "English";

  function swap() {
    setDirection((d) => (d === "en-ebira" ? "ebira-en" : "en-ebira"));
    setFlips((f) => f + 1);
    setText("");
  }

  return (
    <div className="rounded-3xl border border-line bg-raised shadow-soft">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
        <span className="w-24 text-sm font-bold uppercase tracking-wide text-clay">
          {from}
        </span>
        <motion.button
          type="button"
          onClick={swap}
          aria-label={`Swap direction — currently ${from} to ${to}`}
          animate={reduced ? undefined : { rotate: flips * 180 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-sunken text-ink-soft transition-colors duration-200 hover:border-gold hover:text-gold-deep"
        >
          <ArrowLeftRight size={18} />
        </motion.button>
        <span className="w-24 text-right text-sm font-bold uppercase tracking-wide text-sage">
          {to}
        </span>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="border-b border-line p-5 md:border-b-0 md:border-r sm:p-7">
          <label
            htmlFor="translate-input"
            className="text-xs font-semibold uppercase tracking-widest text-ink-faint"
          >
            {from}
          </label>
          <textarea
            id="translate-input"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              direction === "en-ebira"
                ? "Type an English word or phrase… try “rain” or “people”"
                : "Type an Ebira word… try “Ohomorihi” or “Eku”"
            }
            className="mt-3 w-full resize-none bg-transparent text-lg leading-relaxed text-ink placeholder:text-ink-faint focus:outline-none"
          />
        </div>

        <div className="p-5 sm:p-7" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
            {to}
          </p>
          {results.length > 0 ? (
            <ul className="mt-3 space-y-4">
              {results.map((entry) => (
                <li key={entry.id}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/dictionary/${entry.id}`}
                      className="display text-xl font-semibold text-ink underline-offset-4 transition-colors duration-200 hover:text-clay hover:underline"
                    >
                      {direction === "en-ebira" ? entry.headword : entry.senses[0]}
                    </Link>
                    <span className="inline-flex items-center gap-1 rounded-full bg-sage-soft px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-sage">
                      <BadgeCheck size={12} /> dictionary match
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">
                    {direction === "en-ebira"
                      ? entry.senses[0]
                      : `${entry.headword} · ${entry.pos}, ${entry.dialect}`}
                  </p>
                </li>
              ))}
            </ul>
          ) : text.trim() ? (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sunken px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">
                <CircleDashed size={13} /> no dictionary match yet
              </span>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                The preview lexicon is tiny. At launch, misses fall through to
                the parallel corpus — and sentence-level drafts are clearly
                flagged for community correction, never presented as fact.
              </p>
              <Link
                href="/contribute"
                className="mt-3 inline-block text-sm font-semibold text-clay underline-offset-4 hover:underline"
              >
                Know this word? Contribute it →
              </Link>
            </div>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-ink-faint">
              Results appear as you type. Dictionary-backed matches are marked
              as reliable; future machine-translated sentences will be marked
              as drafts.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
