import Link from "next/link";
import { PILLARS } from "@/lib/site";

const YEAR = 2026;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-sunken/60">
      <div className="motif-divider" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Ebira.net home" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand-logo.png"
                alt="Ebira.net, learn, develop and preserve it"
                width={170}
                height={188}
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              The digital home for the Ebira language, its people, and its
              diaspora. Built openly with the community.
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              A project by{" "}
              <a
                href="https://haleyouthfoundation.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-clay underline-offset-4 transition-colors duration-200 hover:text-clay-strong hover:underline"
              >
                Haleyouth Foundation
              </a>
            </p>
            <p className="mt-4 text-xs leading-relaxed text-ink-faint">
              Data CC BY 4.0. Code Apache 2.0. Dataset cards CC0. Nothing on
              this platform ships under a closed licence.
            </p>
          </div>

          <nav aria-label="Platform">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PILLARS.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    className="text-ink-soft transition-colors duration-200 hover:text-clay"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Community">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
              Community
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PILLARS.slice(5).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    className="text-ink-soft transition-colors duration-200 hover:text-clay"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#roadmap"
                  className="text-ink-soft transition-colors duration-200 hover:text-clay"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
              <a
                href="https://haleyouthfoundation.org"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-clay"
              >
                Haleyouth Foundation
              </a>
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li>
                <a
                  href="https://haleyouthfoundation.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-clay"
                >
                  haleyouthfoundation.org
                </a>
              </li>
              <li>CAC RC-138260</li>
              <li>Okene, Kogi State, Nigeria</li>
              <li>
                <a
                  href="mailto:hello@ebira.net"
                  className="transition-colors duration-200 hover:text-clay"
                >
                  hello@ebira.net
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/thalamuxtech/ebira.net"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="transition-colors duration-200 hover:text-clay"
                >
                  GitHub, open source
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>
            {`© ${YEAR} Haleyouth Foundation · Language & Heritage programme`}
            {" · "}
            <Link
              href="/admin"
              className="transition-colors duration-200 hover:text-clay"
            >
              Admin
            </Link>
          </p>
          <p className="display text-sm text-ink-soft">
            Ẹ́bírà lives here.
          </p>
        </div>
      </div>
    </footer>
  );
}
