import type { Metadata } from "next";
import { CalendarDays, HandCoins, MessagesSquare, UserRound } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DemoNotice } from "@/components/demo-notice";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Diaspora Hub",
  description:
    "The home base for Ebira people worldwide: find each other, meet, tell your story, and fund the language one adopted word at a time.",
};

const FEATURES = [
  {
    icon: UserRound,
    title: "Member directory",
    body: "Opt-in profiles so Anebira in Lagos, London, Houston, or Dubai can find each other by city, by clan, or by shared interest.",
  },
  {
    icon: MessagesSquare,
    title: "Forum & stories",
    body: "Moderated discussion in Ebira and English, and “why Ebira matters to me” stories in writing and video.",
  },
  {
    icon: CalendarDays,
    title: "Events",
    body: "Cultural festivals, meetups, and virtual language cafés, on one calendar that keeps the community in rhythm.",
  },
  {
    icon: HandCoins,
    title: "Adopt a word",
    body: "Sponsor a word or a riddle. Your name (or your family’s) stands with it forever, and the micro-giving funds the platform.",
  },
];

export default function DiasporaPage() {
  return (
    <>
      <PageHero
        kicker="Pillar · Diaspora Hub"
        title="Wherever you are, Ẹ́bírà has a place for you."
        lede="For Ebira people outside the homeland: find each other, gather, tell your story, and put your stake in the language’s future, one adopted word at a time."
        status="coming-soon"
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <DemoNotice text="The hub launches in Phase 2. Waitlist members become the founding cohort: first profiles, first forum threads, first adopted words." />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <RevealItem key={f.title} className="h-full">
              <div className="h-full rounded-3xl border border-line bg-raised p-7 shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-clay-soft text-clay-strong">
                  <f.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h2 className="display mt-4 text-xl font-semibold text-ink">
                  {f.title}
                </h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-16">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="display text-2xl font-semibold text-ink sm:text-3xl">
              Join the founding cohort.
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Ebira unions and diaspora associations, we would love to partner
              on events and drives. Write to{" "}
              <a
                href="mailto:hello@ebira.net"
                className="font-semibold text-clay underline-offset-4 hover:underline"
              >
                hello@ebira.net
              </a>
              .
            </p>
            <div className="mt-7">
              <WaitlistForm source="diaspora" />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
