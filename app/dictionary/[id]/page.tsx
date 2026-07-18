import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { SORTED_ENTRIES, getEntry } from "@/lib/dictionary";
import { DemoNotice } from "@/components/demo-notice";
import { SearchHero } from "@/components/dictionary/search-hero";
import { ShareCard } from "@/components/dictionary/share-card";
import { ViewTabs } from "@/components/dictionary/view-tabs";

interface Params {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return SORTED_ENTRIES.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const entry = getEntry(id);
  if (!entry) return { title: "Entry not found" };
  return {
    title: `${entry.headword} | meaning in the Ebira Dictionary`,
    description: `${entry.headword} (${entry.pos}, ${entry.dialect} dialect): ${entry.senses[0]}`,
  };
}

export default async function EntryPage({ params }: Params) {
  const { id } = await params;
  const entry = getEntry(id);
  if (!entry) notFound();

  const index = SORTED_ENTRIES.findIndex((e) => e.id === entry.id);
  const related = SORTED_ENTRIES.filter(
    (e) => e.domain === entry.domain && e.id !== entry.id
  ).slice(0, 4);
  const prev = SORTED_ENTRIES[(index - 1 + SORTED_ENTRIES.length) % SORTED_ENTRIES.length];
  const next = SORTED_ENTRIES[(index + 1) % SORTED_ENTRIES.length];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-36 sm:px-6 sm:pt-52">
      {/* persistent search, like the red bar on Cambridge */}
      <div className="mx-auto max-w-3xl">
        <SearchHero />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <ViewTabs />
        <Link
          href="/dictionary/browse"
          className="text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-clay"
        >
          {entry.headword} is entry {index + 1} of {SORTED_ENTRIES.length}
        </Link>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* ── the entry itself ── */}
        <article className="rounded-3xl border border-line bg-raised shadow-soft">
          <header className="border-b border-line px-7 py-7 sm:px-9">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-clay-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-clay-strong">
                {entry.pos}
              </span>
              <span className="rounded-full bg-sunken px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {entry.dialect} dialect
              </span>
              <span className="rounded-full border border-gold/40 bg-gold-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-deep">
                draft · pending review
              </span>
            </div>

            <h1 className="display mt-5 text-5xl font-semibold text-ink sm:text-6xl">
              {entry.headword}
            </h1>

            {/* pronunciation row */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled
                title="Audio pronunciation arrives with the corpus recordings"
                className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-line-strong px-5 text-sm font-semibold text-ink-faint"
              >
                <Volume2 size={17} aria-hidden="true" />
                Pronunciation coming with the corpus
              </button>
              <span className="text-sm text-ink-faint">
                Tone marking follows the EDP standard on publication.
              </span>
            </div>
          </header>

          <div className="px-7 py-7 sm:px-9">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Meaning{entry.senses.length > 1 ? "s" : ""}
            </h2>
            <ol className="mt-4 space-y-5">
              {entry.senses.map((sense, i) => (
                <li key={sense} className="flex gap-4">
                  <span className="display mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sunken text-sm font-bold text-gold-deep">
                    {i + 1}
                  </span>
                  <p className="text-lg leading-relaxed text-ink">{sense}</p>
                </li>
              ))}
            </ol>

            {entry.literal && (
              <div className="mt-6 rounded-2xl border-l-4 border-gold bg-gold-soft/60 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
                  Literally
                </p>
                <p className="mt-1 italic leading-relaxed text-ink-soft">
                  {entry.literal}
                </p>
              </div>
            )}

            {entry.example && (
              <div className="mt-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
                  Example
                </h2>
                <p className="display mt-2 text-lg text-ink">
                  {entry.example.ebira}
                </p>
                <p className="text-[15px] italic text-ink-soft">
                  {entry.example.english}
                </p>
              </div>
            )}

            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm sm:grid-cols-3">
              <div>
                <dt className="font-semibold uppercase tracking-wide text-ink-faint">
                  Domain
                </dt>
                <dd className="mt-1 capitalize text-ink-soft">{entry.domain}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-ink-faint">
                  Source
                </dt>
                <dd className="mt-1 text-ink-soft">2024 word-collection seed</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-ink-faint">
                  Licence
                </dt>
                <dd className="mt-1 text-ink-soft">CC BY 4.0 on publication</dd>
              </div>
            </dl>
          </div>

          {/* book-style pagination */}
          <nav
            aria-label="Neighbouring entries"
            className="flex items-center justify-between border-t border-line px-7 py-4 sm:px-9"
          >
            <Link
              href={`/dictionary/${prev.id}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-clay"
            >
              <ArrowLeft
                size={15}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              <span>
                <span className="block text-[11px] uppercase tracking-wide text-ink-faint">
                  Previous
                </span>
                <span className="display font-semibold">{prev.headword}</span>
              </span>
            </Link>
            <Link
              href={`/dictionary/${next.id}`}
              className="group inline-flex items-center gap-2 text-right text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-clay"
            >
              <span>
                <span className="block text-[11px] uppercase tracking-wide text-ink-faint">
                  Next
                </span>
                <span className="display font-semibold">{next.headword}</span>
              </span>
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </nav>
        </article>

        {/* ── side rail ── */}
        <aside className="space-y-6">
          <ShareCard entry={entry} />

          {related.length > 0 && (
            <div className="rounded-3xl border border-line bg-raised p-6 shadow-soft">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
                Related in “{entry.domain}”
              </h2>
              <ul className="mt-4 divide-y divide-line/70">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/dictionary/${r.id}`}
                      className="group flex items-center justify-between gap-3 py-3"
                    >
                      <span className="min-w-0">
                        <span className="display text-lg font-semibold text-ink group-hover:text-clay">
                          {r.headword}
                        </span>
                        <span className="block truncate text-sm text-ink-soft">
                          {r.senses[0]}
                        </span>
                      </span>
                      <ArrowRight
                        size={15}
                        className="shrink-0 text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-clay"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <DemoNotice text="Preview entry. Meanings, tone marking, and orthography are verified against the EDP standard before publication, and every published headword carries community audio." />
        </aside>
      </div>
    </div>
  );
}
