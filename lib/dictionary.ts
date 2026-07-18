/**
 * Demo seed lexicon.
 *
 * Every entry is `status: "draft"` on purpose: these are preview items,
 * pending verification by the Chief Language Advisor (Ebira Development
 * Project) before publication. Tone marking follows the EDP standard once
 * the content-licensing agreement lands; audio arrives with the corpus.
 */

export type Dialect = "Tao" | "Etuno" | "Igu" | "General";

export interface Entry {
  id: string;
  headword: string;
  pos: "noun" | "verb" | "phrase" | "name" | "title" | "interjection";
  dialect: Dialect;
  senses: string[];
  literal?: string;
  example?: { ebira: string; english: string };
  domain: string;
  status: "draft" | "published";
}

export const ENTRIES: Entry[] = [
  {
    id: "ebira",
    headword: "Ẹ́bírà",
    pos: "noun",
    dialect: "General",
    senses: ["the Ebira language", "good character; behaviour"],
    literal: "the name of the language is also its oldest lesson: behaviour",
    domain: "identity",
    status: "draft",
  },
  {
    id: "anebira",
    headword: "Anebira",
    pos: "noun",
    dialect: "General",
    senses: ["the Ebira people; sons and daughters of Ebiraland"],
    domain: "identity",
    status: "draft",
  },
  {
    id: "ohinoyi",
    headword: "Ohinoyi",
    pos: "title",
    dialect: "Tao",
    senses: ["the paramount traditional ruler of Ebiraland"],
    domain: "institutions",
    status: "draft",
  },
  {
    id: "ohomorihi",
    headword: "Ohomorihi",
    pos: "noun",
    dialect: "General",
    senses: ["God; the Supreme Being"],
    literal: "the giver of rain",
    domain: "belief",
    status: "draft",
  },
  {
    id: "ekuechi",
    headword: "Ekuechi",
    pos: "noun",
    dialect: "Tao",
    senses: ["the night masquerade festival that closes the Ebira year"],
    domain: "festival",
    status: "draft",
  },
  {
    id: "echane",
    headword: "Echane",
    pos: "noun",
    dialect: "Tao",
    senses: ["an annual Ebira festival season"],
    domain: "festival",
    status: "draft",
  },
  {
    id: "eku",
    headword: "Eku",
    pos: "noun",
    dialect: "General",
    senses: ["masquerade; ancestral masked figure"],
    domain: "festival",
    status: "draft",
  },
  {
    id: "ozovehe",
    headword: "Ozovehe",
    pos: "name",
    dialect: "General",
    senses: ["personal name: a human being is worth more than wealth"],
    domain: "names",
    status: "draft",
  },
  {
    id: "onoruoiza",
    headword: "Onoruoiza",
    pos: "name",
    dialect: "General",
    senses: ["personal name: who is greater than God?"],
    domain: "names",
    status: "draft",
  },
  {
    id: "ohunene",
    headword: "Ohunene",
    pos: "name",
    dialect: "General",
    senses: ["personal name: the mercy of God"],
    domain: "names",
    status: "draft",
  },
  {
    id: "adeiza",
    headword: "Adeiza",
    pos: "name",
    dialect: "General",
    senses: ["personal name: the father of fortune"],
    domain: "names",
    status: "draft",
  },
  {
    id: "omeiza",
    headword: "Omeiza",
    pos: "name",
    dialect: "General",
    senses: ["personal name: a gift of God"],
    domain: "names",
    status: "draft",
  },
  {
    id: "adavize",
    headword: "Adavize",
    pos: "name",
    dialect: "General",
    senses: ["personal name: one with people has wealth"],
    domain: "names",
    status: "draft",
  },
  {
    id: "okene",
    headword: "Okene",
    pos: "noun",
    dialect: "Tao",
    senses: ["the historic commercial heart of Ebiraland, Kogi State"],
    domain: "places",
    status: "draft",
  },
  {
    id: "itaazi",
    headword: "Ita-azi",
    pos: "noun",
    dialect: "General",
    senses: ["proverb; wise saying of the elders"],
    domain: "heritage",
    status: "draft",
  },
  {
    id: "ireto",
    headword: "Ireto",
    pos: "noun",
    dialect: "General",
    senses: ["the traditional Ebira woven cloth"],
    domain: "craft",
    status: "draft",
  },
];

/** Strip tone marks and case so search works however the user types. */
export function fold(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** All entries in dictionary (alphabetical) order. */
export const SORTED_ENTRIES: Entry[] = [...ENTRIES].sort((a, b) =>
  fold(a.headword).localeCompare(fold(b.headword))
);

/** Letters of the alphabet that currently have entries. */
export const LETTERS: string[] = Array.from(
  new Set(SORTED_ENTRIES.map((e) => fold(e.headword)[0].toUpperCase()))
).sort();

export function entriesByLetter(letter: string): Entry[] {
  return SORTED_ENTRIES.filter(
    (e) => fold(e.headword)[0].toUpperCase() === letter.toUpperCase()
  );
}

/**
 * Ranked suggestions for the search dropdown: prefix matches on the
 * headword first, then prefix matches on any sense word, then substring
 * matches anywhere.
 */
export function suggestEntries(query: string, limit = 7): Entry[] {
  const q = fold(query.trim());
  if (!q) return [];
  const scored = ENTRIES.map((e) => {
    const head = fold(e.headword);
    const senses = e.senses.map(fold).join(" ");
    let score = -1;
    if (head.startsWith(q)) score = 0;
    else if (senses.split(/[^a-z]+/).some((w) => w.startsWith(q))) score = 1;
    else if (head.includes(q) || senses.includes(q)) score = 2;
    else if (fold(e.domain).includes(q) || fold(e.literal ?? "").includes(q))
      score = 3;
    return { e, score };
  })
    .filter((s) => s.score >= 0)
    .sort((a, b) => a.score - b.score || fold(a.e.headword).localeCompare(fold(b.e.headword)));
  return scored.slice(0, limit).map((s) => s.e);
}

export function searchEntries(query: string): Entry[] {
  const q = query
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  if (!q) return ENTRIES;
  return ENTRIES.filter((e) => {
    const hay = [e.headword, ...e.senses, e.domain, e.dialect, e.literal ?? ""]
      .join(" ")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
    return hay.includes(q);
  });
}

export function getEntry(id: string): Entry | undefined {
  return ENTRIES.find((e) => e.id === id);
}
