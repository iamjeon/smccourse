// Source: Basic TradingCourse/Fair Value Gap.txt (verified: matches title)
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "fair-value-gap",
  moduleSlug: "basics",
  title: { en: "Fair Value Gap (FVG)", tl: "Fair Value Gap (FVG)" },
  summary: {
    en: "The three-candle imbalance, how to mark it, where to enter, and what an inversion FVG means.",
    tl: "Ang three-candle imbalance, paano i-mark, saan mag-enter, at ano ang inversion FVG.",
  },
  estMinutes: 12,
  sourceFile: "Basic TradingCourse/Fair Value Gap.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "A Fair Value Gap (also called imbalance) is a three-candlestick pattern where the wick of candle 1 does not overlap the wick of candle 3. That leaves a gap on the middle candle — the FVG. It marks an inefficient, fast move that price often returns to 'rebalance.'",
        tl: "Ang Fair Value Gap (tinatawag ding imbalance) ay isang three-candlestick pattern kung saan ang wick ng candle 1 ay hindi nag-overlap sa wick ng candle 3. May naiiwang gap sa gitnang candle — ang FVG. Senyales ito ng mabilis, inefficient na move na madalas binabalikan ng price para 'mag-rebalance.'",
      },
    },
    {
      kind: "heading",
      text: { en: "How an FVG forms", tl: "Paano nabubuo ang FVG" },
    },
    {
      kind: "paragraph",
      text: {
        en: "For a bullish FVG (BISI — buy-side imbalance, sell-side inefficiency), mark the high of candle 1 and the low of candle 3. The space between them is the gap. A bearish FVG (SIBI) is the mirror: the low of candle 1 and the high of candle 3.",
        tl: "Para sa bullish FVG (BISI — buy-side imbalance, sell-side inefficiency), i-mark ang high ng candle 1 at ang low ng candle 3. Ang pagitan nila ang gap. Ang bearish FVG (SIBI) ay kabaligtaran: ang low ng candle 1 at ang high ng candle 3.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "fvg-bullish",
        title: { en: "Bullish FVG → retrace → continuation", tl: "Bullish FVG → retrace → continuation" },
        height: 350,
        candles: [
          { o: 100, h: 102, l: 99, c: 101 },
          { o: 101, h: 104, l: 100, c: 103 },
          { o: 103, h: 113, l: 103, c: 112 },
          { o: 112, h: 116, l: 108, c: 115 },
          { o: 115, h: 117, l: 112, c: 113 },
          { o: 113, h: 114, l: 107, c: 109 },
          { o: 109, h: 115, l: 108, c: 114 },
          { o: 114, h: 122, l: 113, c: 120 },
          { o: 120, h: 127, l: 119, c: 125 },
        ],
        annotations: [
          {
            type: "box",
            kind: "fvg",
            from: 1,
            to: 6,
            top: 108,
            bottom: 104,
            tone: "gold",
            label: { en: "FVG", tl: "FVG" },
            appearAtStep: 1,
          },
          { type: "marker", kind: "entry", index: 5, price: 108, tone: "bull", appearAtStep: 2, label: { en: "Entry", tl: "Entry" } },
        ],
        steps: [
          { caption: { en: "An impulsive up-move forms 3 candles.", tl: "May impulsive up-move na bumuo ng 3 candles." }, revealCandles: 4 },
          { caption: { en: "Candle 1 high → candle 3 low: that gap is the FVG.", tl: "Candle 1 high → candle 3 low: ang gap na yan ang FVG." }, revealCandles: 4 },
          { caption: { en: "Price retraces into the FVG and reacts — entry at the FVG high.", tl: "Bumalik ang price sa FVG at nag-react — entry sa FVG high." }, revealCandles: 6 },
          { caption: { en: "Continuation higher. Target 1:2 as a beginner.", tl: "Continuation pataas. Target 1:2 bilang beginner." }, revealCandles: 9 },
        ],
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Entry, stop, target", tl: "Entry, stop, target" },
      text: {
        en: "Enter at the high of a bullish FVG (or its 50%). Place the stop loss at the swing low (or the candle body), and target 1:2 — a higher win-rate target that protects your psychology as a beginner.",
        tl: "Mag-enter sa high ng bullish FVG (o sa 50% nito). Ilagay ang stop loss sa swing low (o sa candle body), at target 1:2 — mas mataas ang win-rate at proteksyon sa psychology mo bilang beginner.",
      },
    },
    {
      kind: "heading",
      level: 3,
      text: { en: "Inversion FVG", tl: "Inversion FVG" },
    },
    {
      kind: "paragraph",
      text: {
        en: "Sometimes price doesn't respect an FVG. If a candle body closes through the FVG (e.g. closes below a bullish FVG's low), the FVG is 'disrespected' and inverts: a former support area now acts as resistance. Price may retrace back into it and then continue in the new direction. A wick through it is okay — it's the body close that signals the inversion.",
        tl: "Minsan hindi nirerespeto ng price ang FVG. Kapag may candle body na nag-close lampas sa FVG (hal. nag-close below sa low ng bullish FVG), ang FVG ay 'na-disrespect' at nag-invert: ang dating support ay nagiging resistance na. Pwedeng bumalik ang price dito tapos magtuloy sa bagong direksyon. Okay lang ang wick — ang body close ang senyales ng inversion.",
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Don't blindly set limit orders", tl: "Huwag basta maglagay ng limit orders" },
      text: {
        en: "Don't drop a limit order at every FVG. Drop to a lower timeframe and look for confirmation first — covered in the top-down analysis topics.",
        tl: "Huwag basta maglagay ng limit order sa bawat FVG. Bumaba sa lower timeframe at maghanap muna ng confirmation — tatalakayin sa top-down analysis topics.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "An FVG is a pattern made of how many candles?",
        tl: "Ang FVG ay pattern na binubuo ng ilang candles?",
      },
      options: [
        { id: "a", text: { en: "One", tl: "Isa" } },
        { id: "b", text: { en: "Two", tl: "Dalawa" } },
        { id: "c", text: { en: "Three", tl: "Tatlo" } },
        { id: "d", text: { en: "Five", tl: "Lima" } },
      ],
      correctOptionId: "c",
      explanation: {
        en: "An FVG is a three-candle pattern; the gap appears on the middle candle.",
        tl: "Ang FVG ay three-candle pattern; ang gap ay nasa gitnang candle.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "For a bullish FVG, the gap sits between…",
        tl: "Para sa bullish FVG, ang gap ay nasa pagitan ng…",
      },
      options: [
        { id: "a", text: { en: "The high of candle 1 and the low of candle 3", tl: "High ng candle 1 at low ng candle 3" } },
        { id: "b", text: { en: "The low of candle 1 and the high of candle 3", tl: "Low ng candle 1 at high ng candle 3" } },
        { id: "c", text: { en: "The open and close of candle 2", tl: "Open at close ng candle 2" } },
        { id: "d", text: { en: "Two equal highs", tl: "Dalawang pantay na highs" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Bullish FVG = gap between candle 1's high and candle 3's low.",
        tl: "Bullish FVG = gap sa pagitan ng high ng candle 1 at low ng candle 3.",
      },
    },
    {
      id: "q3",
      type: "truefalse",
      prompt: {
        en: "A single wick poking through a bullish FVG confirms an inversion.",
        tl: "Ang isang wick lang na tumutusok sa bullish FVG ay nagkukumpirma ng inversion.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "A wick is okay; it takes a candle BODY close through the FVG to signal inversion.",
        tl: "Okay ang wick; kailangan ng candle BODY close lampas sa FVG para mag-signal ng inversion.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "As a beginner, the recommended target in this course is…",
        tl: "Bilang beginner, ang inirerekomendang target sa course na ito ay…",
      },
      options: [
        { id: "a", text: { en: "1:1", tl: "1:1" } },
        { id: "b", text: { en: "1:2", tl: "1:2" } },
        { id: "c", text: { en: "1:10", tl: "1:10" } },
        { id: "d", text: { en: "No target", tl: "Walang target" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "1:2 is taught for a higher win-rate and better discipline early on.",
        tl: "Itinuturo ang 1:2 para sa mas mataas na win-rate at disiplina sa umpisa.",
      },
    },
  ],
};
