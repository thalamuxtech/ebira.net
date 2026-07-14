export function Wordmark({ large = false }: { large?: boolean }) {
  const size = large ? 56 : 44;
  return (
    <span className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon-192.png"
        alt=""
        width={size}
        height={size}
        className="shrink-0"
      />
      <span
        className={`display font-semibold tracking-tight text-ink ${
          large ? "text-3xl" : "text-xl"
        }`}
      >
        Ebira<span className="text-clay">.net</span>
      </span>
    </span>
  );
}
