import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { DemoNotice } from "@/components/demo-notice";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Ebira History",
  description:
    "A structured, sourced account of the Ebira people: origins, institutions, festivals, and culture across the Confluence region.",
};

const THEMES = [
  {
    era: "Origins & migration",
    body: "Where the Ebira came from and how they settled Okene, Adavi, Okehi, Ajaokuta, and the wider Confluence region, told from oral tradition and checked against the historical record.",
  },
  {
    era: "Institutions",
    body: "The Ohinoyi of Ebiraland, the clans, and community structure: how Ebira society organises itself, and what the titles carry.",
  },
  {
    era: "Festivals & belief",
    body: "Ekuechi and the festival calendar, masquerade traditions, naming ceremonies, and the meeting of traditional belief with Islam and Christianity.",
  },
  {
    era: "Craft & work",
    body: "Ebira cloth-weaving and the crafts, trades, and markets that made Okene a commercial centre of the middle belt.",
  },
  {
    era: "The modern era",
    body: "Colonial encounter, education, the creation of Kogi State, and the growth of the diaspora: the forces reshaping how the language is spoken and passed on.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        kicker="Pillar · History"
        title="A people’s record, properly sourced."
        lede="Ebira history for learners, students, and the diaspora, with a timeline, a map view, primary sources, and elder testimony. Every article is reviewed by the Chief Language Advisor and the Community Advisory Board before it publishes."
        status="coming-soon"
      />

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-6">
        <DemoNotice text="Articles are in research now, drawn from the EDP Heritage Encyclopaedia, elder interviews, and academic partners. The outline below is the planned shape of the collection: 30 sourced articles in Phase 2, then 80 by Phase 3." />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[15px] top-2 w-0.5 bg-gradient-to-b from-clay via-gold to-sage"
          />
          <RevealGroup className="space-y-10">
            {THEMES.map((item, i) => (
              <RevealItem key={item.era}>
                <article className="relative pl-12">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold bg-bg text-xs font-bold text-gold-deep"
                  >
                    {i + 1}
                  </span>
                  <h2 className="display text-2xl font-semibold text-ink">
                    {item.era}
                  </h2>
                  <p className="mt-2.5 max-w-2xl leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-16">
          <div className="rounded-3xl border border-line bg-sunken/60 p-8 sm:p-10">
            <h2 className="display text-2xl font-semibold text-ink">
              Hold a piece of this history?
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
              Family records, photographs, or an elder whose testimony should
              be recorded? Write to{" "}
              <a
                href="mailto:hello@ebira.net"
                className="font-semibold text-clay underline-offset-4 hover:underline"
              >
                hello@ebira.net
              </a>
              . Sources are credited, and sensitive material goes to the
              Community Advisory Board first.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
