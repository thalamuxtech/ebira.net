import type { Metadata } from "next";
import { DemoNotice } from "@/components/demo-notice";
import { DictionaryBrowse } from "@/components/dictionary/browse";
import { ViewTabs } from "@/components/dictionary/view-tabs";

export const metadata: Metadata = {
  title: "Browse the Ebira Dictionary",
  description:
    "Read the Ebira dictionary page by page: every entry in alphabetical order, with an A to Z rail to jump between letters.",
};

export default function BrowsePage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-16 pt-40 sm:px-6 sm:pt-56">
      <p className="rule-ornament text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
        The Ebira dictionary
      </p>
      <h1 className="display mt-5 text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
        The dictionary, page by page.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Every entry in order, read the way you would read the printed book.
        Jump to a letter, or turn the pages.
      </p>

      <div className="mt-8">
        <ViewTabs />
      </div>

      <div className="mt-8">
        <DemoNotice text="Preview with a small demo seed. The letters fill in as the 800+ word collection and the EDP dictionary are digitised and verified." />
      </div>

      <div className="mt-10">
        <DictionaryBrowse />
      </div>
    </section>
  );
}
