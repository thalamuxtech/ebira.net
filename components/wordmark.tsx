export function Wordmark({ large = false }: { large?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        width={large ? 34 : 28}
        height={large ? 34 : 28}
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Woven-cloth mark: interlocking triangles in the heritage palette */}
        <rect width="32" height="32" rx="8" fill="#141B2E" />
        <path d="M6 22 L13 10 L20 22 Z" fill="#B8482E" />
        <path d="M13 22 L20 10 L27 22 Z" fill="#D4A017" opacity="0.92" />
        <path d="M16.5 16 L20 10 L23.5 16 Z" fill="#FAF6EC" opacity="0.9" />
      </svg>
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
