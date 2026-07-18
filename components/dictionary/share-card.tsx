"use client";

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import type { Entry } from "@/lib/dictionary";

/**
 * A shareable word tile, the visual identity of an entry, with copy-link
 * and native share. Stands in for entry imagery until illustrated and
 * photographed entries arrive with the content programme.
 */
export function ShareCard({ entry }: { entry: Entry }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(
        `https://ebira.net/dictionary/${entry.id}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  async function share() {
    const url = `https://ebira.net/dictionary/${entry.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${entry.headword} — Ebira dictionary`,
          text: `${entry.headword}: ${entry.senses[0]}`,
          url,
        });
      } catch {}
    } else {
      copy();
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line shadow-lift">
      <div className="relative bg-[#141b2e] px-7 pb-8 pt-7 text-center">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#000,#fefefe_25%,#141b2e_50%,#fff_75%,#000)]"
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8890a8]">
          Ebira.net · Dictionary
        </p>
        <p className="display mt-4 text-4xl font-semibold text-[#f1ecdd]">
          {entry.headword}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#e3b341]">
          {entry.pos} · {entry.dialect}
        </p>
        <p className="mx-auto mt-3 max-w-[26ch] text-sm leading-relaxed text-[#b9bfd2]">
          {entry.senses[0]}
        </p>
      </div>
      <div className="grid grid-cols-2 divide-x divide-line bg-raised">
        <button
          type="button"
          onClick={copy}
          className="inline-flex cursor-pointer items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:text-clay"
        >
          {copied ? (
            <>
              <Check size={15} className="text-sage" /> Copied
            </>
          ) : (
            <>
              <Link2 size={15} /> Copy link
            </>
          )}
        </button>
        <button
          type="button"
          onClick={share}
          className="inline-flex cursor-pointer items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:text-clay"
        >
          <Share2 size={15} /> Share word
        </button>
      </div>
    </div>
  );
}
