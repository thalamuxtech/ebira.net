"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { MotifCanvas } from "@/components/motif-canvas";
import { WordCycler } from "@/components/word-cycler";

export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // gentle parallax: the motif drifts at a third of scroll speed
  const motifY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const rise = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: motifY }}
        className="absolute inset-0"
      >
        <MotifCanvas />
      </motion.div>
      {/* vignette so text always sits on calm ground */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_35%_45%,_var(--bg)_25%,_transparent_100%)]"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-16 pt-36 sm:px-6 sm:pt-40">
        <motion.p
          {...rise(0.05)}
          className="rule-ornament text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep sm:text-sm"
        >
          A Haleyouth Foundation programme
        </motion.p>

        <motion.h1
          {...rise(0.18)}
          className="display mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-ink sm:text-7xl md:text-8xl"
        >
          Ẹ́bírà lives <span className="italic text-clay">here</span>.
        </motion.h1>

        <motion.p
          {...rise(0.34)}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          Four million people speak Ebira. Almost none of it lives online — no
          dictionary, no translator, no digital record. Ebira.net is the open
          platform that changes that: preserve the language, engage the
          diaspora, and enable education and research.
        </motion.p>

        <motion.div
          {...rise(0.48)}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href="/#pillars"
            className="inline-flex h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-clay px-7 text-[15px] font-semibold text-white shadow-lift transition-all duration-200 hover:bg-clay-strong active:scale-[0.98]"
          >
            Explore the plan
            <ArrowDown size={17} />
          </Link>
          <Link
            href="/dictionary"
            className="inline-flex h-13 cursor-pointer items-center justify-center gap-2 rounded-full border border-line-strong bg-raised/70 px-7 text-[15px] font-semibold text-ink backdrop-blur transition-all duration-200 hover:border-gold hover:text-gold-deep active:scale-[0.98]"
          >
            Preview the dictionary
            <ArrowRight size={17} />
          </Link>
        </motion.div>

        <motion.div
          {...rise(0.66)}
          className="mt-16 border-t border-line pt-8 sm:mt-20"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-ink-faint">
            Hear the language before you read about it
          </p>
          <WordCycler />
        </motion.div>
      </div>

      <div className="motif-divider relative" aria-hidden="true" />
    </section>
  );
}
