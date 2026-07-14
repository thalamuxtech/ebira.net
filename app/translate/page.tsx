import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { DemoNotice } from "@/components/demo-notice";
import { Translator } from "@/components/translate/translator";

export const metadata: Metadata = {
  title: "Translator",
  description:
    "Translate between English and Ebira. Word and phrase lookup today, sentence-level translation as the 25,000-pair parallel corpus grows.",
};

export default function TranslatePage() {
  return (
    <>
      <PageHero
        kicker="Pillar · Translator"
        title="English ↔ Ebira, honest about its confidence."
        lede="Dictionary-backed word and phrase lookup comes first — reliable, verifiable, offline-capable. Sentence-level machine translation follows as the parallel corpus grows, always flagged as a draft for community correction."
        status="preview"
      />
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
        <DemoNotice text="Preview running on the demo seed lexicon. The launch translator is backed by the full dictionary and 25,000 parallel sentences from Voices of the Middle Belt; voice input and read-aloud arrive with the corpus ASR and TTS models." />
        <div className="mt-8">
          <Translator />
        </div>
      </section>
    </>
  );
}
