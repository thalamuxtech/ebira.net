"use client";

import { motion, useReducedMotion } from "framer-motion";

interface WordsRevealProps {
  text: string;
  /** Words (1-indexed from the end) to set in italic clay, e.g. 1 = last word. */
  accentLast?: number;
  className?: string;
}

/**
 * Editorial word-by-word reveal: each word rises and settles in sequence
 * when the heading scrolls into view, the final words landing in clay.
 */
export function WordsReveal({ text, accentLast = 0, className }: WordsRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
      aria-label={text}
    >
      {words.map((word, i) => {
        const accented = accentLast > 0 && i >= words.length - accentLast;
        return (
          <motion.span
            key={`${word}-${i}`}
            aria-hidden="true"
            className={`inline-block whitespace-pre ${
              accented ? "italic text-clay" : ""
            }`}
            variants={{
              hidden: { opacity: 0, y: "0.6em", rotate: 2 },
              show: {
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
