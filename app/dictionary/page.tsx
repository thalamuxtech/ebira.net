import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { DemoNotice } from "@/components/demo-notice";
import { DictionarySearch } from "@/components/dictionary/search";

export const metadata: Metadata = {
  title: "Dictionary",
  description:
    "Search the growing Ebira–English dictionary: meanings, dialects, tone, and — soon — audio pronunciation from the community corpus.",
};

export default function DictionaryPage() {
  return (
    <>
      <PageHero
        kicker="Pillar · Dictionary"
        title="Every Ebira word, findable and heard."
        lede="Search Ebira–English and English–Ebira, with dialect labels for Tao, Etuno, and Igu. Audio pronunciation, tone marking, and thousands more entries arrive as the corpus and the EDP dictionary come online."
        status="preview"
      />
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
        <DemoNotice text="Preview with a small demo seed. Entries are drafts pending verification by the Chief Language Advisor (Ebira Development Project); tone marking and audio land with the corpus. The full dictionary launches with 2,000+ verified headwords." />
        <div className="mt-8">
          <DictionarySearch />
        </div>
      </section>
    </>
  );
}
