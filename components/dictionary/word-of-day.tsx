"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { SORTED_ENTRIES } from "@/lib/dictionary";

/** Rotates through the lexicon once a day, client-side so the static build stays fresh. */
export function WordOfDay() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const day = Math.floor((now.getTime() - start.getTime()) / 86400000);
      setIndex(day % SORTED_ENTRIES.length);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const entry = index === null ? SORTED_ENTRIES[0] : SORTED_ENTRIES[index];

  return (
    <Link
      href={`/dictionary/${entry.id}`}
      className="group flex h-full cursor-pointer flex-col rounded-3xl bg-[#141b2e] p-7 text-[#f1ecdd] shadow-lift transition-transform duration-300 hover:-translate-y-1"
    >
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e3b341]">
        <CalendarDays size={15} aria-hidden="true" /> Word of the day
      </p>
      <p className="display mt-4 text-4xl font-semibold">{entry.headword}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#8890a8]">
        {entry.pos} · {entry.dialect}
      </p>
      <p className="mt-3 leading-relaxed text-[#b9bfd2]">{entry.senses[0]}</p>
      <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-bold text-[#e3b341]">
        Read the entry
        <ArrowRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
