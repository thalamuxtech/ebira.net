"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SHOWCASE_WORDS } from "@/lib/site";

const TYPE_MS = 130;
const HOLD_MS = 3200;
const GAP_MS = 500;

/**
 * The landing signature moment: an Ebira word writes itself on,
 * its meaning settles in beneath it, then the next word takes over.
 */
export function WordCycler() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(reduced ? SHOWCASE_WORDS[0].word.length : 0);

  const current = SHOWCASE_WORDS[index % SHOWCASE_WORDS.length];
  // Split by grapheme-ish clusters so combining tone marks stay attached
  const glyphs = Array.from(current.word.normalize("NFC"));
  const done = typed >= glyphs.length;

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(
        () => setIndex((i) => (i + 1) % SHOWCASE_WORDS.length),
        HOLD_MS + 1200
      );
      return () => clearTimeout(t);
    }
    if (!done) {
      const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTyped(0);
      setIndex((i) => (i + 1) % SHOWCASE_WORDS.length);
    }, HOLD_MS + GAP_MS);
    return () => clearTimeout(t);
  }, [typed, done, reduced, index]);

  return (
    <div
      className="flex flex-col items-center gap-2 sm:items-start"
      aria-live="polite"
    >
      <span className="display text-4xl font-semibold text-gold-deep sm:text-5xl">
        {reduced ? current.word : glyphs.slice(0, typed).join("")}
        {!reduced && <span className="caret" aria-hidden="true" />}
      </span>
      <span className="h-6 text-sm text-ink-faint sm:text-[15px]">
        <AnimatePresence mode="wait">
          {(done || reduced) && (
            <motion.span
              key={current.word}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="italic"
            >
              “{current.gloss}”
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </div>
  );
}
