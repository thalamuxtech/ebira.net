import type { PillarStatus } from "@/lib/site";

const STYLES: Record<PillarStatus, { label: string; className: string }> = {
  preview: {
    label: "Preview live",
    className: "bg-sage-soft text-sage border-sage/40",
  },
  "in-design": {
    label: "In design",
    className: "bg-gold-soft text-gold-deep border-gold/40",
  },
  "coming-soon": {
    label: "Coming soon",
    className: "bg-sunken text-ink-faint border-line-strong",
  },
};

export function StatusChip({ status }: { status: PillarStatus }) {
  const s = STYLES[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${s.className}`}
    >
      {s.label}
    </span>
  );
}
