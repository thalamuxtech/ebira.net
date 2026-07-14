import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center px-5 text-center">
      <p className="rule-ornament text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
        404
      </p>
      <h1 className="display mt-5 text-4xl font-semibold text-ink sm:text-6xl">
        This page isn’t in the record yet.
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
        Like much of the Ebira story, it may simply be waiting to be written.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-clay-strong"
      >
        <ArrowLeft size={16} /> Back home
      </Link>
    </section>
  );
}
