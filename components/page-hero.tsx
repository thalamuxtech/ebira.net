import type { ReactNode } from "react";
import { StatusChip } from "@/components/status-chip";
import type { PillarStatus } from "@/lib/site";

interface PageHeroProps {
  kicker: string;
  title: string;
  lede: string;
  status?: PillarStatus;
  children?: ReactNode;
}

/** Shared editorial header for module pages. */
export function PageHero({ kicker, title, lede, status, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-sunken/50">
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-40 sm:px-6 sm:pb-16 sm:pt-56">
        <div className="flex flex-wrap items-center gap-3">
          <p className="rule-ornament text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
            {kicker}
          </p>
          {status && <StatusChip status={status} />}
        </div>
        <h1 className="display mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {lede}
        </p>
        {children}
      </div>
      <div className="motif-divider" aria-hidden="true" />
    </section>
  );
}
