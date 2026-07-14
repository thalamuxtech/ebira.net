import type { Metadata } from "next";
import { Mic, ShieldCheck, Trophy } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DemoNotice } from "@/components/demo-notice";
import { Reveal } from "@/components/reveal";
import { ContributeFlow } from "@/components/contribute/flow";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Add a word, riddle, or proverb to the Ebira record — from any phone, with consent and credit handled at the door.",
};

const PROMISES = [
  {
    icon: ShieldCheck,
    title: "Consent first",
    body: "You choose open release at submission, are credited unless you opt for anonymity, and may withdraw within a defined window.",
  },
  {
    icon: Mic,
    title: "Review before publication",
    body: "Native speakers check every submission in the validation queue; the EDP standard settles spelling and tone.",
  },
  {
    icon: Trophy,
    title: "Credit that lasts",
    body: "Published items carry their contributor’s name permanently — and the leaderboard celebrates the most generous memories.",
  },
];

export default function ContributePage() {
  return (
    <>
      <PageHero
        kicker="Pillar · Contribute & record"
        title="Add the first word you remember."
        lede="Every Ebira speaker holds a piece of the dictionary. Submit a word, riddle, or proverb from any phone — the in-browser voice recorder and 2G-friendly offline queue arrive with the corpus tooling."
        status="preview"
      />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
        <DemoNotice text="Working preview: submissions go to the pre-moderation queue (or wait safely on your device if you’re offline). Nothing publishes without native-speaker review." />

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          <ContributeFlow />

          <Reveal>
            <div className="space-y-4">
              {PROMISES.map((p) => (
                <div
                  key={p.title}
                  className="flex gap-4 rounded-3xl border border-line bg-raised p-6 shadow-soft"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-sage">
                    <p.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-semibold text-ink">{p.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
