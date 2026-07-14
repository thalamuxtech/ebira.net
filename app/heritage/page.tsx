import type { Metadata } from "next";
import Link from "next/link";
import { BookMarked, Music4, Puzzle, Quote } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DemoNotice } from "@/components/demo-notice";
import { RiddleCard } from "@/components/heritage/riddle-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Riddles & Oral Heritage",
  description:
    "Ebira riddles, proverbs, folk stories, and songs — recorded from elders, glossed in English, and preserved with audio.",
};

const TYPES = [
  {
    icon: Puzzle,
    title: "Riddles",
    body: "The distinctive, shareable format — question, pause, reveal — with the elder’s voice and an English gloss.",
  },
  {
    icon: Quote,
    title: "Proverbs & idioms (ita-azi)",
    body: "Literal and figurative meaning side by side, cross-linked to the dictionary words they use.",
  },
  {
    icon: BookMarked,
    title: "Folk stories",
    body: "Oral narratives recorded from elders, with transcripts and translations for learners.",
  },
  {
    icon: Music4,
    title: "Songs & praise poetry",
    body: "Naming traditions, work songs, and festival poetry — the music of the language.",
  },
];

export default function HeritagePage() {
  return (
    <>
      <PageHero
        kicker="Pillar · Oral heritage"
        title="The riddles your grandmother knew, kept."
        lede="A curated, categorised library of Ebira oral tradition — riddles with answer-reveal, proverbs with their double meanings, stories and songs from the elders — recorded before it is lost, shared so it lives."
        status="in-design"
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <DemoNotice text="This pillar launches in Phase 2, after the elder recording drives. The card below shows how a published riddle will work — content arrives from the community, reviewed by the Community Advisory Board." />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h2 className="display text-2xl font-semibold text-ink sm:text-3xl">
              Try the reveal.
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
              Every riddle is a small performance: the question sits with you,
              then the answer lands — in the elder’s own voice. Tap the card.
            </p>
            <div className="mt-7">
              <RiddleCard />
            </div>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {TYPES.map((t) => (
              <RevealItem key={t.title} className="h-full">
                <div className="h-full rounded-3xl border border-line bg-raised p-6 shadow-soft">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-soft text-gold-deep">
                    <t.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="display mt-4 text-lg font-semibold text-ink">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {t.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-16">
          <div className="rounded-3xl border border-line bg-sunken/60 p-8 text-center sm:p-10">
            <h2 className="display text-2xl font-semibold text-ink sm:text-3xl">
              Remember one? It belongs here.
            </h2>
            <p className="mx-auto mt-3 max-w-lg leading-relaxed text-ink-soft">
              Riddles and proverbs are collected through the contribute tool
              and elder recording drives across the Confluence region — with
              consent and credit handled at the door.
            </p>
            <Link
              href="/contribute"
              className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-full bg-clay px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-clay-strong"
            >
              Contribute a riddle or proverb
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
