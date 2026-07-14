import { Info } from "lucide-react";

/**
 * Honest framing for preview modules: seed content is draft until the
 * Chief Language Advisor and EDP review it, and audio lands with the corpus.
 */
export function DemoNotice({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold-soft px-5 py-4">
      <Info size={18} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-ink-soft">{text}</p>
    </div>
  );
}
