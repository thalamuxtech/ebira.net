"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Volume2 } from "lucide-react";

/**
 * Interactive demo of the riddle answer-reveal pattern. The copy is a
 * placeholder describing the format — real riddles arrive from the
 * community recording drives, in Ebira with audio and an English gloss.
 */
export function RiddleCard() {
  const [revealed, setRevealed] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="relative" style={{ perspective: 1200 }}>
      <motion.div
        animate={reduced ? undefined : { rotateY: revealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative min-h-96 sm:min-h-80"
      >
        {/* front — the question */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className={`absolute inset-0 flex flex-col rounded-3xl border border-line bg-[#141b2e] p-7 text-[#f1ecdd] shadow-lift ${
            reduced && revealed ? "hidden" : ""
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e3b341]">
            Riddle · sample format
          </span>
          <p className="display mt-5 text-2xl font-medium leading-snug">
            The riddle asks its question here — in Ẹ́bírà first, with tone
            marks, exactly as the elder spoke it.
          </p>
          <p className="mt-3 text-sm italic text-[#b9bfd2]">
            The English gloss sits beneath, so the diaspora can play too.
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-auto inline-flex cursor-pointer items-center justify-center self-start rounded-full bg-[#e3b341] px-6 py-3 text-sm font-bold text-[#141b2e] transition-colors duration-200 hover:bg-[#f0c65e]"
          >
            Reveal the answer
          </button>
        </div>

        {/* back — the answer */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: reduced ? undefined : "rotateY(180deg)",
          }}
          className={`absolute inset-0 flex-col rounded-3xl border border-gold/50 bg-gold-soft p-7 shadow-lift ${
            reduced ? (revealed ? "flex" : "hidden") : "flex"
          }`}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
            The answer
          </span>
          <p className="display mt-5 text-3xl font-semibold text-ink">
            …lands here,
          </p>
          <p className="mt-2 max-w-sm leading-relaxed text-ink-soft">
            with the answer in Ebira, its meaning in English, and the elder’s
            own voice a tap away.
          </p>
          <div className="mt-auto flex items-center gap-3">
            <span
              title="Audio arrives with the elder recording drives"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-gold/60 text-gold-deep"
            >
              <Volume2 size={18} aria-hidden="true" />
              <span className="sr-only">audio coming soon</span>
            </span>
            <button
              type="button"
              onClick={() => setRevealed(false)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-raised px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-gold"
            >
              <RotateCcw size={14} /> Ask me again
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
