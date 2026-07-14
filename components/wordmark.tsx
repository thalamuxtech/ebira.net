export function Wordmark({ large = false }: { large?: boolean }) {
  const size = large ? 40 : 32;
  return (
    <span className="flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon-64.png"
        alt=""
        width={size}
        height={size}
        className="shrink-0"
      />
      <span
        className={`display font-semibold tracking-tight text-ink ${
          large ? "text-2xl" : "text-lg"
        }`}
      >
        Ebira<span className="text-clay">.net</span>
      </span>
    </span>
  );
}
