import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react";
import { ENTRIES, getEntry } from "@/lib/dictionary";
import { DemoNotice } from "@/components/demo-notice";

interface Params {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return ENTRIES.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const entry = getEntry(id);
  if (!entry) return { title: "Entry not found" };
  return {
    title: `${entry.headword} — Ebira dictionary`,
    description: `${entry.headword} (${entry.pos}, ${entry.dialect}): ${entry.senses[0]}`,
  };
}

export default async function EntryPage({ params }: Params) {
  const { id } = await params;
  const entry = getEntry(id);
  if (!entry) notFound();

  const index = ENTRIES.findIndex((e) => e.id === entry.id);
  const related = ENTRIES.filter(
    (e) => e.domain === entry.domain && e.id !== entry.id
  ).slice(0, 3);
  const prev = ENTRIES[(index - 1 + ENTRIES.length) % ENTRIES.length];
  const next = ENTRIES[(index + 1) % ENTRIES.length];

  return (
    <article className="mx-auto max-w-4xl px-5 pb-16 pt-32 sm:px-6 sm:pt-40">
      <Link
        href="/dictionary"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-clay"
      >
        <ArrowLeft size={15} /> Back to search
      </Link>

      <header className="mt-8 rounded-3xl border border-line bg-raised p-8 shadow-soft sm:p-10">
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

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="display text-5xl font-semibold text-ink sm:text-6xl">
            {entry.headword}
          </h1>
          <span
            title="Audio pronunciation arrives with the corpus recordings"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-line-strong text-ink-faint/60"
          >
            <Volume2 size={22} aria-hidden="true" />
            <span className="sr-only">audio pronunciation coming soon</span>
          </span>
        </div>

        <ol className="mt-6 space-y-3">
          {entry.senses.map((sense, i) => (
            <li key={sense} className="flex gap-4">
              <span className="display mt-0.5 text-lg font-semibold text-gold-deep">
                {i + 1}.
              </span>
              <p className="text-lg leading-relaxed text-ink-soft">{sense}</p>
            </li>
          ))}
        </ol>

        {entry.literal && (
          <p className="mt-5 border-l-2 border-gold pl-4 text-[15px] italic leading-relaxed text-ink-faint">
            Literally: {entry.literal}
          </p>
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
      </header>

      <div className="mt-6">
        <DemoNotice text="This is a preview entry. Meanings, tone marking, and orthography are verified against the EDP standard before publication, and every published headword carries community audio." />
      </div>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="display text-xl font-semibold text-ink">
            Related in “{entry.domain}”
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/dictionary/${r.id}`}
                className="group cursor-pointer rounded-2xl border border-line bg-raised p-5 shadow-soft transition-all duration-200 hover:border-gold/60 hover:shadow-lift"
              >
                <p className="display text-lg font-semibold text-ink group-hover:text-clay-strong">
                  {r.headword}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                  {r.senses[0]}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <nav
        className="mt-10 flex items-center justify-between border-t border-line pt-6 text-sm font-medium"
        aria-label="Entry pagination"
      >
        <Link
          href={`/dictionary/${prev.id}`}
          className="inline-flex items-center gap-1.5 text-ink-soft transition-colors duration-200 hover:text-clay"
        >
          <ArrowLeft size={15} /> {prev.headword}
        </Link>
        <Link
          href={`/dictionary/${next.id}`}
          className="inline-flex items-center gap-1.5 text-ink-soft transition-colors duration-200 hover:text-clay"
        >
          {next.headword} <ArrowRight size={15} />
        </Link>
      </nav>
    </article>
  );
}
