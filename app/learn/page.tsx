import type { Metadata } from "next";
import Link from "next/link";
import { Award, Flame, Headphones, SpellCheck2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DemoNotice } from "@/components/demo-notice";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Learn Ebira",
  description:
    "Structured, audio-first Ebira lessons covering alphabet and tone, greetings, numbers, and everyday phrases, with streaks, quizzes, and certificates.",
};

const UNITS = [
  {
    unit: "Unit 1",
    title: "Alphabet & tone",
    body: "The sounds of Ebira, the orthography, and how tone changes meaning, trained by ear from day one.",
  },
  {
    unit: "Unit 2",
    title: "Greetings & respect",
    body: "How Anebira greet across the day, elders and age-mates, and the responses that mark you as home-trained.",
  },
  {
    unit: "Unit 3",
    title: "Family & names",
    body: "Kinship words, personal names and their meanings, and how to introduce yourself and your people.",
  },
  {
    unit: "Unit 4",
    title: "Numbers & market",
    body: "Counting, money, bargaining, and the everyday phrases that carry a market day in Okene.",
  },
  {
    unit: "Unit 5",
    title: "Home & food",
    body: "The household, cooking, and eating: the vocabulary of daily life, where language lives longest.",
  },
  {
    unit: "Unit 6",
    title: "Stories & riddles",
    body: "Graduate into real oral tradition: follow a folk story, catch the proverb, answer the riddle.",
  },
];

const FEATURES = [
  {
    icon: Headphones,
    title: "Audio-first drills",
    body: "Every item is spoken by real Ebira speakers from the corpus, not synthesis, until the TTS is good enough to earn its place.",
  },
  {
    icon: Flame,
    title: "Streaks & quizzes",
    body: "Small daily sessions with spaced repetition, a riddle-of-the-day, and streaks that make showing up a habit.",
  },
  {
    icon: SpellCheck2,
    title: "Tone from day one",
    body: "Tone is meaning in Ebira. Minimal-pair listening drills train your ear before your eyes get involved.",
  },
  {
    icon: Award,
    title: "Certificates that count",
    body: "Completion certificates arrive in Phase 2 and build toward the university-recognised certificate and degree pathway in Phase 3.",
  },
];

export default function LearnPage() {
  return (
    <>
      <PageHero
        kicker="Pillar · Learn Ebira"
        title="From your first greeting to your first riddle."
        lede="A structured, self-paced path from beginner to intermediate: audio-first, tone-aware, and built on the same corpus that powers the dictionary. Learn on your phone, offline, wherever the diaspora took you."
        status="in-design"
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <DemoNotice text="The beginner track launches in Phase 2 with the corpus audio. This is the planned curriculum; join the waitlist below to be in the first cohort." />

        <Reveal className="mt-12">
          <h2 className="display text-2xl font-semibold text-ink sm:text-3xl">
            The beginner track
          </h2>
        </Reveal>
        <RevealGroup className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UNITS.map((u, i) => (
            <RevealItem key={u.unit} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-line bg-raised p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-clay">
                    {u.unit}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      i === 0
                        ? "bg-gold text-[#141b2e]"
                        : "bg-sunken text-ink-faint"
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className="display mt-3 text-xl font-semibold text-ink">
                  {u.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {u.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-16">
          <h2 className="display text-2xl font-semibold text-ink sm:text-3xl">
            Built to keep you coming back
          </h2>
        </Reveal>
        <RevealGroup className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <RevealItem key={f.title} className="h-full">
              <div className="h-full rounded-3xl border border-line bg-raised p-6 shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-clay-soft text-clay-strong">
                  <f.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {f.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-16">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="display text-2xl font-semibold text-ink sm:text-3xl">
              Be in the first cohort.
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Waitlist members get first access to lessons, and early
              learners shape the curriculum. Meanwhile,{" "}
              <Link
                href="/dictionary"
                className="font-semibold text-clay underline-offset-4 hover:underline"
              >
                start with the dictionary
              </Link>
              .
            </p>
            <div className="mt-7">
              <WaitlistForm source="learn" />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
