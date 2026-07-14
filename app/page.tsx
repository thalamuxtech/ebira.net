import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { WordsReveal } from "@/components/words-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { PillarIcon } from "@/components/pillar-icon";
import { StatusChip } from "@/components/status-chip";
import { WaitlistForm } from "@/components/waitlist-form";
import { PILLARS, ROADMAP, PARTNERS, STATS, SHOWCASE_WORDS } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WordStrip />
      <Problem />
      <Pillars />
      <HowItWorks />
      <Roadmap />
      <Community />
      <OpenCorpus />
      <Waitlist />
    </>
  );
}

/* ── Word strip ─────────────────────────────────────────────── */

function WordStrip() {
  const items = [...SHOWCASE_WORDS, ...SHOWCASE_WORDS];
  return (
    <div
      className="overflow-hidden border-b border-line bg-sunken/60 py-5"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap px-6">
        {items.map((w, i) => (
          <span key={i} className="flex items-baseline gap-3">
            <span className="display text-xl font-medium text-ink">
              {w.word}
            </span>
            <span className="text-sm italic text-ink-faint">{w.gloss}</span>
            <span className="ml-6 inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── The problem, briefly ───────────────────────────────────── */

function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-28">
      <Reveal>
        <p className="rule-ornament text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
          The problem, briefly
        </p>
        <h2 className="display mt-5 max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-5xl">
          A major language with almost no digital footprint.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          There is no single place online where a young Ebira person in Lagos,
          London, or Houston can look up a word, hear it spoken correctly, read
          a riddle their grandmother knew, or start learning from scratch.
          Haleyouth Foundation already runs the pieces. Ebira.net holds them together.
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <RevealItem key={stat.label}>
            <div className="h-full rounded-3xl border border-line bg-raised p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift">
              <p className="display text-5xl font-semibold text-clay">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 font-semibold text-ink">{stat.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-faint">
                {stat.note}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* ── The nine pillars ───────────────────────────────────────── */

function Pillars() {
  return (
    <section id="pillars" className="scroll-mt-24 bg-sunken/50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <p className="rule-ornament text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
            One platform, nine pillars
          </p>
          <h2 className="display mt-5 max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Nine pillars, each making the others stronger.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            The dictionary feeds the translator. Contributors grow the corpus,
            and the corpus gives the language a voice. Nothing here stands
            alone, and nothing waits for everything else to finish.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <RevealItem key={pillar.slug} className="h-full">
              <Link
                href={pillar.href}
                className="group flex h-full cursor-pointer flex-col rounded-3xl border border-line bg-raised p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-soft text-clay-strong transition-all duration-300 group-hover:scale-105 group-hover:bg-clay group-hover:text-white">
                    <PillarIcon name={pillar.icon} />
                  </span>
                  <StatusChip status={pillar.status} />
                </div>
                <h3 className="display mt-5 text-xl font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {pillar.line}
                </p>
                <p className="mt-3 hidden text-sm leading-relaxed text-ink-faint sm:block">
                  {pillar.detail}
                </p>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-clay transition-colors duration-200 group-hover:text-clay-strong">
                  {pillar.status === "preview" ? "Open preview" : "Learn more"}
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── How it works ───────────────────────────────────────────── */

const STEPS = [
  {
    n: "01",
    title: "Preserve",
    body: "Turn scattered words, riddles, proverbs, stories, and recordings into an open, structured, permanent digital record.",
  },
  {
    n: "02",
    title: "Engage",
    body: "Give the diaspora and young people a living reason to return to the language: learn it, contribute to it, and connect around it.",
  },
  {
    n: "03",
    title: "Enable",
    body: "Provide the data, tooling, and credibility that open the door to grants, research partnerships, and formal Ebira-language education.",
  },
];

function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-28">
      <Reveal>
        <p className="rule-ornament text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
          How it works
        </p>
        <h2 className="display mt-5 max-w-2xl text-3xl font-semibold leading-tight text-ink sm:text-5xl">
          Preserve, engage, enable.
        </h2>
      </Reveal>
      <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <RevealItem key={step.n} className="h-full">
            <div className="relative h-full rounded-3xl border border-line bg-raised p-8 shadow-soft">
              <span className="display text-6xl font-semibold text-gold/50">
                {step.n}
              </span>
              <h3 className="display mt-4 text-2xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{step.body}</p>
              {i < STEPS.length - 1 && (
                <ArrowRight
                  size={22}
                  aria-hidden="true"
                  className="absolute -right-3.5 top-1/2 hidden -translate-y-1/2 text-gold md:block"
                />
              )}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* ── Roadmap ────────────────────────────────────────────────── */

function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-24 bg-sunken/50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <p className="rule-ornament text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
            The roadmap
          </p>
          <h2 className="display mt-5 max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            <WordsReveal text="Every phase ships something real." accentLast={2} />
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            We do not wait for the whole platform to be finished. The plan runs two
            years, from foundation to a university-backed education pathway.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROADMAP.map((phase, i) => (
            <RevealItem key={phase.phase} className="h-full">
              <div className="relative h-full rounded-3xl border border-line bg-raised p-7 shadow-soft">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                      i === 0
                        ? "bg-clay text-white"
                        : "border border-line-strong bg-sunken text-ink-soft"
                    }`}
                  >
                    {i}
                  </span>
                  <p className="text-sm font-bold uppercase tracking-wide text-clay">
                    {phase.phase}
                  </p>
                </div>
                <h3 className="display mt-4 text-xl font-semibold text-ink">
                  {phase.title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ── Built with the community ───────────────────────────────── */

function Community() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-28">
      <Reveal>
        <p className="rule-ornament text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
          Built with the community
        </p>
        <h2 className="display mt-5 max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-5xl">
          Rooted in Ebiraland, reviewed by its custodians.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Ebira.net rests on six years of Haleyouth’s work in Ebira-speaking
          territory. A Community Advisory Board signs off on sensitive content,
          and the Chief Language Advisor, Alhaji Salawo S. Salami of the Ebira
          Development Project, has the final say on orthography and lexical
          correctness.
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.map((partner) => (
          <RevealItem key={partner.name} className="h-full">
            <div className="h-full rounded-3xl border border-line bg-raised p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
                {partner.status}
              </p>
              <h3 className="mt-2.5 font-semibold leading-snug text-ink">
                {partner.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-faint">
                {partner.role}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* ── Open corpus & governance ───────────────────────────────── */

function OpenCorpus() {
  return (
    <section id="open-corpus" className="scroll-mt-24 px-5 pb-24 sm:px-6 sm:pb-28">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#141b2e] px-7 py-14 text-[#f1ecdd] shadow-lift sm:px-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#b8482e,#d4a017,#93ab94)]"
          />
          <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e3b341]">
                <ShieldCheck size={16} /> Open corpus &amp; API
              </p>
              <h2 className="display mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                Open by default, owned by the community.
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-[#b9bfd2]">
                Every dataset ships CC BY 4.0 and every line of code Apache
                2.0. Contributors consent at submission, are credited unless
                they choose anonymity, and may withdraw within a defined
                window. A versioned read API serves Masakhane teams,
                university labs, and app developers. This is the data spine
                that moves Ebira toward the resource-rich languages.
              </p>
              <a
                href="https://github.com/thalamuxtech/ebira.net"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#e3b341] px-6 py-3 text-sm font-bold text-[#141b2e] transition-colors duration-200 hover:bg-[#f0c65e]"
              >
                Follow the build on GitHub
                <ArrowUpRight size={16} />
              </a>
            </div>
            <dl className="grid grid-cols-2 gap-6 lg:gap-8">
              {[
                ["75 h", "Ebira speech targeted in the corpus"],
                ["25,000", "parallel Ebira–English sentences"],
                ["2,000+", "headwords with audio in Phase 1"],
                ["v1", "public read API for researchers"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="display text-3xl font-semibold text-[#e3b341]">
                    {value}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-snug text-[#b9bfd2]">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Waitlist ───────────────────────────────────────────────── */

function Waitlist() {
  return (
    <section id="waitlist" className="scroll-mt-24 px-5 pb-8 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="rule-ornament justify-center text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
            Be first through the door
          </p>
          <h2 className="display mt-5 text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            Add your name, then add{" "}
            <span className="italic text-clay">the first word you remember</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Join the waitlist for launch news, contributor drives, and
            diaspora events. Wherever you live, the language has a place for
            you.
          </p>
          <div className="mx-auto mt-9 max-w-xl">
            <WaitlistForm source="landing" />
          </div>
          <p className="mt-6 text-sm text-ink-faint">
            Ready now?{" "}
            <Link
              href="/contribute"
              className="font-semibold text-clay underline-offset-4 transition-colors duration-200 hover:text-clay-strong hover:underline"
            >
              Preview the contribute flow
            </Link>{" "}
            and see how a word travels from your memory to the dictionary.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
