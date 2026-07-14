export type PillarStatus = "preview" | "in-design" | "coming-soon";

export interface Pillar {
  slug: string;
  href: string;
  title: string;
  ebira?: string;
  line: string;
  detail: string;
  status: PillarStatus;
  icon: string; // lucide icon name, resolved in the component
}

export const PILLARS: Pillar[] = [
  {
    slug: "dictionary",
    href: "/dictionary",
    title: "Dictionary",
    line: "Search Ebira–English with audio, tone, and dialect labels.",
    detail:
      "Seeded from the 2024 word-collection exercise and the EDP Comprehensive Ebira-English Dictionary, grown by the community, spoken by the corpus voices.",
    status: "preview",
    icon: "BookOpen",
  },
  {
    slug: "translate",
    href: "/translate",
    title: "Translator",
    line: "English to Ebira and back, with sources you can check.",
    detail:
      "Word and phrase lookup first, sentence-level translation as the 25,000-pair parallel corpus grows. Voice input and read-aloud arrive with the corpus models.",
    status: "preview",
    icon: "ArrowLeftRight",
  },
  {
    slug: "learn",
    href: "/learn",
    title: "Learn Ebira",
    line: "Alphabet and tone to everyday conversation, audio-first.",
    detail:
      "Structured lessons with drills, quizzes, streaks, and certificates. The track builds toward a recognised certificate and, later, a degree pathway with university partners.",
    status: "in-design",
    icon: "GraduationCap",
  },
  {
    slug: "heritage",
    href: "/heritage",
    title: "Riddles & Heritage",
    line: "Riddles, proverbs, stories, and songs from the elders.",
    detail:
      "A library of riddles, proverbs, stories, and songs, each with audio and an English gloss. This is the content people pass around, and it is how the diaspora finds its way in.",
    status: "in-design",
    icon: "Sparkles",
  },
  {
    slug: "history",
    href: "/history",
    title: "Ebira History",
    line: "Origins, institutions, and festivals, sourced and reviewed.",
    detail:
      "A structured account of the Ebira people across the Confluence region, with a timeline, maps, primary sources, and elder testimony.",
    status: "coming-soon",
    icon: "Landmark",
  },
  {
    slug: "people",
    href: "/people",
    title: "People’s Encyclopedia",
    line: "A record of notable Ebira people, past and present.",
    detail:
      "Community-nominated, editor-reviewed, and sourced biographies across leadership, scholarship, the arts, sport, faith, and public service.",
    status: "coming-soon",
    icon: "Users",
  },
  {
    slug: "diaspora",
    href: "/diaspora",
    title: "Diaspora Hub",
    line: "Find each other, meet, and adopt a word.",
    detail:
      "Opt-in member directory, forum, events, and a micro-giving model that lets the diaspora fund the platform one word at a time.",
    status: "coming-soon",
    icon: "Globe2",
  },
  {
    slug: "contribute",
    href: "/contribute",
    title: "Contribute & Record",
    line: "Add a word or a recording from any phone, even on 2G.",
    detail:
      "Built on the Voices of the Middle Belt recorder. Native speakers review every submission, and consent and credit are settled before anything is stored.",
    status: "preview",
    icon: "Mic",
  },
  {
    slug: "corpus",
    href: "/#open-corpus",
    title: "Open Corpus & API",
    line: "Open data and a public API for researchers and builders.",
    detail:
      "Versioned releases of the dictionary and corpus (CC BY 4.0 data, Apache 2.0 code) plus a read API for Masakhane teams, university labs, and app developers.",
    status: "coming-soon",
    icon: "Database",
  },
];

export const STATS = [
  {
    value: 4,
    suffix: "M",
    label: "Ebira speakers",
    note: "across Kogi, Nasarawa, Edo, Ondo, and the FCT",
  },
  {
    value: 800,
    suffix: "+",
    label: "words already collected",
    note: "in the 2024 public word-collection exercise",
  },
  {
    value: 3,
    suffix: "",
    label: "dialects to document",
    note: "Tao, Etuno, and Igu",
  },
  {
    value: 0,
    suffix: "",
    label: "presence in global datasets",
    note: "absent from NLLB-200, Common Voice, and FLEURS. That changes here",
  },
];

export interface RoadmapPhase {
  phase: string;
  title: string;
  items: string[];
}

export const ROADMAP: RoadmapPhase[] = [
  {
    phase: "Phase 0",
    title: "Foundation",
    items: [
      "Landing page, brand, and mailing list",
      "Data schema and design system",
      "Import the 800+ word seed",
      "Governance and licensing signed off",
    ],
  },
  {
    phase: "Phase 1",
    title: "Dictionary, App & Corpus",
    items: [
      "Dictionary with search, audio, dialects",
      "Translator in word-and-phrase mode",
      "Contribute tool and validation queue",
      "Public API v1 and first open release",
    ],
  },
  {
    phase: "Phase 2",
    title: "Heritage, People & Diaspora",
    items: [
      "Riddles, proverbs, stories, and songs",
      "Ebira History and the People’s Encyclopedia",
      "Diaspora Hub and community campaigns",
      "Learn Ebira beginner track, full mobile app",
    ],
  },
  {
    phase: "Phase 3",
    title: "Education & Voice",
    items: [
      "Sentence-level translation, ASR and TTS",
      "Structured curriculum and certificates",
      "University partnership toward a degree pathway",
      "Teacher training and classroom materials",
    ],
  },
];

export const PARTNERS = [
  {
    name: "Ebira Development Project (EDP), Okene",
    role: "Dictionary, encyclopaedia, and orthographic authority",
    status: "Letter of support received",
  },
  {
    name: "Ohinoyi of Ebiraland’s Office",
    role: "Community endorsement and access",
    status: "Relationship established",
  },
  {
    name: "Kogi State University, Anyigba",
    role: "Linguistic review, ethics oversight, degree pathway",
    status: "In active discussion",
  },
  {
    name: "Federal University Lokoja",
    role: "Orthographic standardisation and curriculum",
    status: "In active discussion",
  },
  {
    name: "Masakhane African Languages Hub",
    role: "Peer review, benchmarks, and data reuse",
    status: "Corpus community",
  },
  {
    name: "Ebira diaspora associations",
    role: "Membership, micro-funding, and events",
    status: "Join us",
  },
];

export const NAV_LINKS = [
  { href: "/dictionary", label: "Dictionary" },
  { href: "/translate", label: "Translate" },
  { href: "/heritage", label: "Heritage" },
  { href: "/history", label: "History" },
  { href: "/learn", label: "Learn" },
  { href: "/contribute", label: "Contribute" },
];

/** Words shown in the hero signature moment and the marquee strip. */
export const SHOWCASE_WORDS = [
  { word: "Ẹ́bírà", gloss: "our language, and our character" },
  { word: "Anebira", gloss: "the Ebira people" },
  { word: "Ohomorihi", gloss: "God, the giver of rain" },
  { word: "Ohinoyi", gloss: "paramount ruler of Ebiraland" },
  { word: "Ozovehe", gloss: "a human being is worth more than wealth" },
  { word: "Ekuechi", gloss: "the festival that closes the year" },
];
