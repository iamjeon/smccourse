/**
 * SMC glossary. Definitions are kept faithful to the course lessons (no invented rules).
 * Bilingual (English + Taglish), no em-dashes. Used by the /tools/glossary lookup.
 * `lessonSlug` links a term to the lesson that teaches it (only where unambiguous).
 * `related` lists other glossary terms by their exact `term` string.
 */
import type { LocaleText } from "@/content/schema";

export type GlossaryCategory =
  | "structure"
  | "liquidity"
  | "zones"
  | "models"
  | "general";

export type GlossaryTerm = {
  term: string;
  aka?: string[];
  category: GlossaryCategory;
  def: LocaleText;
  lessonSlug?: string;
  related?: string[];
};

export const categoryLabels: Record<GlossaryCategory, LocaleText> = {
  structure: { en: "Market structure", tl: "Market structure" },
  liquidity: { en: "Liquidity", tl: "Liquidity" },
  zones: { en: "Zones & imbalance", tl: "Zones at imbalance" },
  models: { en: "Models & entries", tl: "Models at entries" },
  general: { en: "General", tl: "General" },
};

export const glossary: GlossaryTerm[] = [
  {
    term: "Smart Money Concepts (SMC)",
    aka: ["smart money"],
    category: "general",
    def: {
      en: "A way of reading charts that follows how large institutions move price through structure, liquidity, and imbalance, rather than classic retail indicators.",
      tl: "Paraan ng pagbasa ng chart na sinusundan kung paano ginagalaw ng malalaking institusyon ang presyo gamit ang structure, liquidity, at imbalance, sa halip na retail indicators.",
    },
    related: ["Market structure", "Liquidity", "Order block (OB)"],
  },
  {
    term: "Market structure",
    category: "structure",
    lessonSlug: "market-structure-1",
    def: {
      en: "The sequence of swing highs and lows that shows the current trend: making higher highs and higher lows is bullish, lower highs and lower lows is bearish.",
      tl: "Ang pagkakasunod ng swing highs at lows na nagpapakita ng trend: higher highs at higher lows ay bullish, lower highs at lower lows ay bearish.",
    },
    related: ["Higher high (HH)", "Break of structure (BOS)", "Swing high"],
  },
  {
    term: "Swing high",
    category: "structure",
    lessonSlug: "market-structure-1",
    def: {
      en: "A candle whose high sticks up above the candles right before and right after it. A local peak in price.",
      tl: "Candle na ang high ay mas mataas kaysa sa mga candle bago at pagkatapos nito. Isang local na taluktok ng presyo.",
    },
    related: ["Swing low", "Higher high (HH)"],
  },
  {
    term: "Swing low",
    category: "structure",
    lessonSlug: "market-structure-1",
    def: {
      en: "A candle whose low dips below the candles right before and right after it. A local bottom in price.",
      tl: "Candle na ang low ay mas mababa kaysa sa mga candle bago at pagkatapos nito. Isang local na ilalim ng presyo.",
    },
    related: ["Swing high", "Lower low (LL)"],
  },
  {
    term: "Higher high (HH)",
    category: "structure",
    lessonSlug: "market-structure-1",
    def: {
      en: "A swing high that is higher than the previous swing high. A sign of bullish strength.",
      tl: "Swing high na mas mataas kaysa sa nakaraang swing high. Tanda ng bullish na lakas.",
    },
    related: ["Higher low (HL)", "Lower high (LH)", "Market structure"],
  },
  {
    term: "Higher low (HL)",
    category: "structure",
    lessonSlug: "market-structure-1",
    def: {
      en: "A swing low that is higher than the previous swing low. Buyers stepping in earlier each time.",
      tl: "Swing low na mas mataas kaysa sa nakaraang swing low. Mas maaga nang pumapasok ang buyers.",
    },
    related: ["Higher high (HH)", "Lower low (LL)"],
  },
  {
    term: "Lower high (LH)",
    category: "structure",
    lessonSlug: "market-structure-1",
    def: {
      en: "A swing high that is lower than the previous swing high. A sign of bearish pressure.",
      tl: "Swing high na mas mababa kaysa sa nakaraang swing high. Tanda ng bearish na presyon.",
    },
    related: ["Lower low (LL)", "Higher high (HH)"],
  },
  {
    term: "Lower low (LL)",
    category: "structure",
    lessonSlug: "market-structure-1",
    def: {
      en: "A swing low that is lower than the previous swing low. Sellers pushing price down further.",
      tl: "Swing low na mas mababa kaysa sa nakaraang swing low. Itinutulak pababa ng sellers ang presyo.",
    },
    related: ["Lower high (LH)", "Higher low (HL)"],
  },
  {
    term: "Break of structure (BOS)",
    aka: ["bos"],
    category: "structure",
    lessonSlug: "msb-mss",
    def: {
      en: "Price closing beyond the most recent swing in the direction of the trend. It confirms the trend is continuing.",
      tl: "Pag-close ng presyo lampas sa pinakahuling swing patungo sa direksyon ng trend. Kumukumpirma na nagpapatuloy ang trend.",
    },
    related: ["Market structure shift (MSS)", "Market structure"],
  },
  {
    term: "Market structure shift (MSS)",
    aka: ["change of character", "choch", "mss"],
    category: "structure",
    lessonSlug: "msb-mss",
    def: {
      en: "Price breaking structure against the current trend, for example closing below a higher low in an uptrend. An early warning the trend may be flipping.",
      tl: "Pagsira ng presyo sa structure laban sa kasalukuyang trend, halimbawa pag-close sa ilalim ng higher low sa uptrend. Maagang babala na baka mag-flip ang trend.",
    },
    related: ["Break of structure (BOS)", "Liquidity sweep"],
  },
  {
    term: "Liquidity",
    category: "liquidity",
    lessonSlug: "liquidity",
    def: {
      en: "Resting orders that price can fill, usually clustered above highs and below lows where stop losses and pending orders sit.",
      tl: "Mga nakahandang order na pwedeng punuin ng presyo, kadalasang naka-kumpol sa itaas ng highs at ilalim ng lows kung saan nakalagay ang stop loss at pending orders.",
    },
    related: ["Buy-side liquidity (BSL)", "Sell-side liquidity (SSL)", "Liquidity pool"],
  },
  {
    term: "Buy-side liquidity (BSL)",
    aka: ["bsl"],
    category: "liquidity",
    lessonSlug: "liquidity",
    def: {
      en: "Liquidity resting above a high, made up of buy stops and breakout buy orders. Price often runs up into it before reversing.",
      tl: "Liquidity sa itaas ng high, binubuo ng buy stops at breakout buy orders. Madalas tumatakbo pataas ang presyo papunta rito bago mag-reverse.",
    },
    related: ["Sell-side liquidity (SSL)", "Liquidity sweep"],
  },
  {
    term: "Sell-side liquidity (SSL)",
    aka: ["ssl"],
    category: "liquidity",
    lessonSlug: "liquidity",
    def: {
      en: "Liquidity resting below a low, made up of sell stops and breakout sell orders. Price often dips down into it before reversing.",
      tl: "Liquidity sa ilalim ng low, binubuo ng sell stops at breakout sell orders. Madalas bumababa ang presyo papunta rito bago mag-reverse.",
    },
    related: ["Buy-side liquidity (BSL)", "Liquidity sweep"],
  },
  {
    term: "Liquidity pool",
    category: "liquidity",
    lessonSlug: "liquidity-pools",
    def: {
      en: "An area with two or more equal highs or equal lows, where many orders pile up and become an obvious target for price.",
      tl: "Lugar na may dalawa o higit pang pantay na highs o lows, kung saan nag-iipon ang mga order at nagiging halatang target ng presyo.",
    },
    related: ["Liquidity sweep", "Liquidity"],
  },
  {
    term: "Liquidity sweep",
    aka: ["stop hunt", "liquidity grab", "sweep"],
    category: "liquidity",
    lessonSlug: "liquidity-pools",
    def: {
      en: "A quick push beyond a high or low that grabs the resting orders there, then reverses. It is how smart money fills large positions.",
      tl: "Mabilis na pagtulak lampas sa high o low na kinukuha ang mga nakahandang order doon, tapos mag-reverse. Ganito nagpapasok ng malaking posisyon ang smart money.",
    },
    related: ["Liquidity pool", "Market structure shift (MSS)", "Inducement"],
  },
  {
    term: "Inducement",
    category: "liquidity",
    def: {
      en: "An obvious-looking high or low that tempts traders to enter early, creating the liquidity that price then sweeps before the real move.",
      tl: "Halatang high o low na nang-eengganyo sa traders na pumasok nang maaga, gumagawa ng liquidity na sinasweep ng presyo bago ang tunay na galaw.",
    },
    related: ["Liquidity sweep", "Liquidity pool"],
  },
  {
    term: "External range liquidity (ERL)",
    aka: ["erl"],
    category: "liquidity",
    lessonSlug: "erl-irl",
    def: {
      en: "Liquidity sitting at the edges of a range, that is the highs and lows themselves. Price tends to move between ERL and internal range liquidity.",
      tl: "Liquidity sa gilid ng range, ibig sabihin ang mismong highs at lows. Gumagalaw ang presyo sa pagitan ng ERL at internal range liquidity.",
    },
    related: ["Internal range liquidity (IRL)", "Liquidity"],
  },
  {
    term: "Internal range liquidity (IRL)",
    aka: ["irl"],
    category: "liquidity",
    lessonSlug: "erl-irl",
    def: {
      en: "Liquidity inside a range, such as order blocks and fair value gaps, that price often taps into before heading to the external range.",
      tl: "Liquidity sa loob ng range, tulad ng order blocks at fair value gaps, na madalas tinatapik ng presyo bago pumunta sa external range.",
    },
    related: ["External range liquidity (ERL)", "Order block (OB)", "Fair value gap (FVG)"],
  },
  {
    term: "Order block (OB)",
    aka: ["ob", "order block"],
    category: "zones",
    lessonSlug: "order-blocks",
    def: {
      en: "The last opposite-color candle before a strong impulse move. Its body marks a zone price often returns to before continuing.",
      tl: "Ang huling kasalungat na kulay na candle bago ang malakas na impulse move. Ang body nito ay zone na madalas binabalikan ng presyo bago magpatuloy.",
    },
    related: ["Fair value gap (FVG)", "Mitigation", "Displacement"],
  },
  {
    term: "Fair value gap (FVG)",
    aka: ["fvg", "imbalance"],
    category: "zones",
    lessonSlug: "fair-value-gap",
    def: {
      en: "A three-candle gap left by a fast move, where the first and third candles do not overlap. Price often returns to rebalance it.",
      tl: "Tatlong-candle na puwang na naiwan ng mabilis na galaw, kung saan hindi nag-overlap ang una at ikatlong candle. Madalas bumabalik ang presyo para i-rebalance ito.",
    },
    related: ["Order block (OB)", "Displacement", "Mitigation"],
  },
  {
    term: "Mitigation",
    category: "zones",
    def: {
      en: "Price returning to an order block or imbalance to fill earlier orders before continuing in the original direction.",
      tl: "Pagbalik ng presyo sa order block o imbalance para punuin ang naunang orders bago magpatuloy sa orihinal na direksyon.",
    },
    related: ["Order block (OB)", "Fair value gap (FVG)"],
  },
  {
    term: "Premium and discount",
    aka: ["premium", "discount", "equilibrium"],
    category: "zones",
    def: {
      en: "Split a range in half at equilibrium (the 50% level). Above it is premium (better to sell), below it is discount (better to buy).",
      tl: "Hatiin ang range sa equilibrium (ang 50% level). Sa itaas ay premium (mas maganda magbenta), sa ibaba ay discount (mas maganda bumili).",
    },
    related: ["External range liquidity (ERL)", "Internal range liquidity (IRL)"],
  },
  {
    term: "Displacement",
    category: "zones",
    def: {
      en: "A strong, one-sided move that breaks structure and usually leaves a fair value gap. It shows aggressive intent from smart money.",
      tl: "Malakas at isang-panig na galaw na sumisira sa structure at kadalasang nag-iiwan ng fair value gap. Nagpapakita ng agresibong intensyon ng smart money.",
    },
    related: ["Fair value gap (FVG)", "Break of structure (BOS)"],
  },
  {
    term: "OHLC",
    category: "general",
    lessonSlug: "ohlc-olhc",
    def: {
      en: "Open, High, Low, Close: the four prices that build a single candle. The body is open to close, the wicks reach the high and low.",
      tl: "Open, High, Low, Close: ang apat na presyo na bumubuo ng isang candle. Ang body ay open hanggang close, ang wicks ay umaabot sa high at low.",
    },
    related: ["Smart Money Concepts (SMC)"],
  },
  {
    term: "Accumulation, Manipulation, Distribution (AMD)",
    aka: ["amd", "po3", "power of three"],
    category: "models",
    def: {
      en: "A three-phase pattern: price ranges to accumulate, sweeps liquidity to manipulate, then trends to distribute. Also called Power of Three.",
      tl: "Tatlong-yugtong pattern: nag-range ang presyo para mag-accumulate, nag-sweep ng liquidity para mag-manipulate, tapos nag-trend para mag-distribute. Tinatawag ding Power of Three.",
    },
    related: ["Liquidity sweep", "Killzone"],
  },
  {
    term: "Killzone",
    aka: ["session", "killzone"],
    category: "models",
    lessonSlug: "asian-session",
    def: {
      en: "A specific time window in a trading session (such as London or New York) when volatility and clean moves are more likely.",
      tl: "Tiyak na oras sa loob ng session (tulad ng London o New York) kung kailan mas malamang ang volatility at malinis na galaw.",
    },
    related: ["Accumulation, Manipulation, Distribution (AMD)"],
  },
  {
    term: "SMT divergence",
    aka: ["smt"],
    category: "models",
    lessonSlug: "smt-divergence",
    def: {
      en: "When two correlated markets disagree, for example one makes a higher high while the other makes a lower high. It can hint at a reversal.",
      tl: "Kapag hindi sang-ayon ang dalawang magkaugnay na market, halimbawa isa ay gumawa ng higher high habang ang isa ay lower high. Pwedeng hudyat ng reversal.",
    },
    related: ["Liquidity sweep", "Market structure shift (MSS)"],
  },
  {
    term: "Risk to reward (R:R)",
    aka: ["rr", "risk reward"],
    category: "general",
    def: {
      en: "How much you stand to gain compared to what you risk. Risking 1 to make 2 is a 1:2 R:R. Always plan it before entering.",
      tl: "Gaano ang posibleng kita kumpara sa pinapasok na panganib. Mag-risk ng 1 para kumita ng 2 ay 1:2 R:R. Planuhin lagi ito bago pumasok.",
    },
  },
];

// ── Slug + lookups (drive the individual /tools/glossary/[slug] pages) ─────────
/** URL slug for a term, dropping the parenthetical abbreviation, e.g.
 * "Order block (OB)" -> "order-block", "Risk to reward (R:R)" -> "risk-to-reward". */
export function glossarySlug(term: string): string {
  return term
    .replace(/\([^)]*\)/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** The term name without its parenthetical abbreviation, e.g. "Order block". */
export function plainTermName(term: string): string {
  return term.replace(/\s*\([^)]*\)/g, "").trim();
}

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossary.find((t) => glossarySlug(t.term) === slug);
}

/** Look up a term by its exact `term` string (used to resolve `related` links). */
export function getTermByName(name: string): GlossaryTerm | undefined {
  return glossary.find((t) => t.term === name);
}
