import type { Metadata } from "next";
import { BadgeCheck, BookMarked, ScrollText, UsersRound } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DemoNotice } from "@/components/demo-notice";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export const metadata: Metadata = {
  title: "People’s Encyclopedia",
  description:
    "A sourced, editor-reviewed record of notable Ebira people, past and present, across leadership, scholarship, the arts, sport, faith, and public service.",
};

const PRINCIPLES = [
  {
    icon: UsersRound,
    title: "Community-nominated",
    body: "Anyone can nominate a notable Ebira person, from Ebiraland or the diaspora, historical or living, of any gender.",
  },
  {
    icon: BookMarked,
    title: "Sourced, not promotional",
    body: "Every entry cites its sources: biography, contribution, dates, and a photo where permitted. Credible record, not a hall of flattery.",
  },
  {
    icon: BadgeCheck,
    title: "Editor-reviewed",
    body: "Editors verify claims before publication, and living subjects can review their entries. Corrections are open to all.",
  },
  {
    icon: ScrollText,
    title: "Cross-linked",
    body: "Entries connect to Ebira History by era and institution, and to the Diaspora Hub for living members who opt in.",
  },
];

const FIELDS = [
  "Leadership & traditional institutions",
  "Scholarship & education",
  "The arts & literature",
  "Sport",
  "Faith",
  "Public service & enterprise",
];

export default function PeoplePage() {
  return (
    <>
      <PageHero
        kicker="Pillar · People’s Encyclopedia"
        title="A community’s record of its own."
        lede="Notable Ebira people, past and present, documented properly, so the next generation can see who came before them and what is possible. Known traditionally as the Sons Encyclopedia, it records Ebira people of all genders."
        status="coming-soon"
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <DemoNotice text="The encyclopedia launches in Phase 2 with the first 100 sourced entries. Nominations open with the contribute tools; the criteria below are being settled now with the Community Advisory Board." />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <RevealItem key={p.title} className="h-full">
              <div className="h-full rounded-3xl border border-line bg-raised p-7 shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-soft text-sage">
                  <p.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h2 className="display mt-4 text-xl font-semibold text-ink">
                  {p.title}
                </h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14">
          <div className="rounded-3xl border border-line bg-sunken/60 p-8 sm:p-10">
            <h2 className="display text-2xl font-semibold text-ink">
              Fields of record
            </h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {FIELDS.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-line-strong bg-raised px-4 py-2 text-sm font-medium text-ink-soft"
                >
                  {f}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink-soft">
              Have someone in mind? A grandmother who taught a town to
              weave, a scholar, a chief, an athlete. Send the name and what
              you know to{" "}
              <a
                href="mailto:hello@ebira.net"
                className="font-semibold text-clay underline-offset-4 hover:underline"
              >
                hello@ebira.net
              </a>{" "}
              and we will research the rest.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
