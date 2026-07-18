import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Mic, PenLine } from "lucide-react";
import { DemoNotice } from "@/components/demo-notice";
import { SearchHero } from "@/components/dictionary/search-hero";
import { ViewTabs } from "@/components/dictionary/view-tabs";
import { WordOfDay } from "@/components/dictionary/word-of-day";
import { Reveal } from "@/components/reveal";
import { LETTERS, SORTED_ENTRIES } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: "Ebira Dictionary",
  description:
    "Look up Ebira words: meanings, dialect labels, tone, and soon audio pronunciation from the community corpus. Search or browse A to Z.",
};

export default function DictionaryPage() {
  return (
    <>
      {/* search-first hero */}
      <section className="relative overflow-hidden border-b border-line bg-sunken/50">
        <div className="mx-auto max-w-4xl px-5 pb-16 pt-40 text-center sm:px-6 sm:pt-56">
          <p className="rule-ornament justify-center text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
            The Ebira dictionary
          </p>
          <h1 className="display mt-5 text-4xl font-semibold leading-[1.08] text-ink sm:text-6xl">
            Which word shall we look up?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            Ebira to English and back, with dialect labels for Tao, Etuno, and
            Igu. Audio arrives with the community corpus.
          </p>
          <div className="mt-8 text-left">
            <SearchHero autoFocus />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-ink-faint">
            Try:
            {SORTED_ENTRIES.slice(0, 4).map((e) => (
              <Link
                key={e.id}
                href={`/dictionary/${e.id}`}
                className="rounded-full border border-line bg-raised px-3.5 py-1.5 font-medium text-ink-soft transition-colors duration-200 hover:border-clay hover:text-clay"
              >
                {e.headword}
              </Link>
            ))}
          </div>
        </div>
        <div className="motif-divider" aria-hidden="true" />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ViewTabs />
          <p className="text-sm text-ink-faint">
            {SORTED_ENTRIES.length} preview entries · letters{" "}
            {LETTERS.join(", ")}
          </p>
        </div>

        <div className="mt-8">
          <DemoNotice text="Preview with a small demo seed. Entries are drafts pending verification by the Chief Language Advisor (Ebira Development Project); tone marking and audio land with the corpus. The full dictionary launches with 2,000+ verified headwords." />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Reveal className="h-full">
            <WordOfDay />
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <Link
              href="/dictionary/browse"
              className="group flex h-full cursor-pointer flex-col rounded-3xl border border-line bg-raised p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-gold-deep">
                <BookOpen size={22} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h2 className="display mt-4 text-xl font-semibold text-ink">
                Browse page by page
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">
                Read the dictionary the way you would a book: every entry in
                order, A to Z, one page at a time.
              </p>
              <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-clay">
                Open the book
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.16} className="h-full">
            <Link
              href="/contribute"
              className="group flex h-full cursor-pointer flex-col rounded-3xl border border-line bg-raised p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-soft text-clay-strong">
                <PenLine size={22} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h2 className="display mt-4 text-xl font-semibold text-ink">
                Add a missing word
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">
                Every speaker holds a piece of this dictionary. Contribute a
                word and be credited when it publishes.
              </p>
              <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-clay">
                Contribute
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <div className="flex items-start gap-4 rounded-3xl border border-line bg-sunken/60 p-6 sm:items-center sm:p-7">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-sage">
              <Mic size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-ink-soft sm:text-[15px]">
              Every published headword will carry a native speaker’s voice,
              recorded through the Voices of the Middle Belt corpus. Until
              then, entries show a quiet speaker icon where the audio will
              live.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
