// Source: Basic TradingCourse/Market Structure Part 2.txt (verified: matches title)
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "market-structure-2",
  moduleSlug: "basics",
  title: { en: "Market Structure (Part 2)", tl: "Market Structure (Part 2)" },
  summary: {
    en: "Applying structure to real price: identify swing points correctly, and spot when a higher low breaks.",
    tl: "Pag-apply ng structure sa totoong price: i-identify nang tama ang swing points, at mapansin kapag na-break ang higher low.",
  },
  estMinutes: 8,
  sourceFile: "Basic TradingCourse/Market Structure Part 2.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "Now we apply structure to real price. The skill that matters most is correctly identifying the swing highs and swing lows first — only then can you judge whether structure is continuing or about to break.",
        tl: "Ngayon, i-a-apply natin ang structure sa totoong price. Ang pinaka-importanteng skill ay tama munang ma-identify ang swing highs at swing lows — saka mo masasabi kung tuloy ba ang structure o malapit nang ma-break.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "ms2-applied",
        title: { en: "Bullish structure → a higher low breaks", tl: "Bullish structure → na-break ang higher low" },
        height: 350,
        candles: [
          { o: 100, h: 105, l: 99, c: 104 },
          { o: 104, h: 111, l: 103, c: 110 },
          { o: 110, h: 116, l: 109, c: 114 },
          { o: 114, h: 115, l: 108, c: 110 },
          { o: 110, h: 113, l: 108, c: 112 },
          { o: 112, h: 120, l: 111, c: 118 },
          { o: 118, h: 125, l: 117, c: 123 },
          { o: 123, h: 124, l: 117, c: 119 },
          { o: 119, h: 120, l: 114, c: 116 },
          { o: 116, h: 117, l: 112, c: 113 },
          { o: 113, h: 114, l: 107, c: 108 },
          { o: 108, h: 109, l: 102, c: 104 },
        ],
        annotations: [
          { type: "label", index: 2, price: 120, text: { en: "HH", tl: "HH" }, tone: "bull", appearAtStep: 0 },
          { type: "label", index: 4, price: 104, text: { en: "HL", tl: "HL" }, tone: "bull", appearAtStep: 0 },
          { type: "label", index: 6, price: 129, text: { en: "HH", tl: "HH" }, tone: "bull", appearAtStep: 0 },
          { type: "label", index: 8, price: 110, text: { en: "HL", tl: "HL" }, tone: "bull", appearAtStep: 1 },
          { type: "line", kind: "level", price: 114, from: 8, to: 11, tone: "bear", dashed: true, label: { en: "Last HL", tl: "Last HL" }, appearAtStep: 1 },
          { type: "marker", kind: "sweep", index: 10, price: 107, tone: "bear", label: { en: "Break", tl: "Break" }, appearAtStep: 2 },
        ],
        steps: [
          { caption: { en: "Reading real price: HH, HL, HH — bullish while it keeps making higher highs.", tl: "Pagbasa ng totoong price: HH, HL, HH — bullish habang gumagawa ng higher highs." }, revealCandles: 7 },
          { caption: { en: "Identify the swing points correctly — especially the latest higher low.", tl: "I-identify nang tama ang swing points — lalo na ang pinakahuling higher low." }, revealCandles: 9 },
          { caption: { en: "When that higher low breaks, it's a possible reversal signal.", tl: "Kapag na-break ang higher low na yan, posibleng senyales ng reversal." }, revealCandles: 12 },
        ],
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Ranging markets are traps", tl: "Trap ang ranging markets" },
      text: {
        en: "In consolidation you only get swing highs and lows with no clean HH/HL. A short there can get its high taken out even though you expected continuation. Avoid these low-probability conditions.",
        tl: "Sa consolidation, swing highs at lows lang, walang malinis na HH/HL. Pwedeng ma-take out ang high ng short mo kahit umaasa ka ng continuation. Iwasan ang low-probability na kondisyon na ito.",
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "You don't need to catch every move. Fewer, cleaner trades often mean fewer losses and more profit — less is more. We keep a 1:2 target as beginners to protect win-rate and psychology, even when a bigger target looks possible.",
        tl: "Hindi mo kailangang masakyan lahat ng move. Mas kaunti pero malilinis na trades = mas kaunting talo at mas maraming profit — less is more. Pinapanatili natin ang 1:2 target bilang beginner para sa win-rate at psychology, kahit mukhang kaya ang mas malaking target.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "Before deciding if structure is continuing or breaking, you must first…",
        tl: "Bago magdesisyon kung tuloy o break ang structure, dapat mo munang…",
      },
      options: [
        { id: "a", text: { en: "Add three indicators", tl: "Magdagdag ng tatlong indicator" } },
        { id: "b", text: { en: "Correctly identify the swing highs and lows", tl: "Tama na ma-identify ang swing highs at lows" } },
        { id: "c", text: { en: "Wait for the news", tl: "Hintayin ang balita" } },
        { id: "d", text: { en: "Switch to a 1-minute chart", tl: "Lumipat sa 1-minute chart" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Everything depends on correctly reading the swing points first.",
        tl: "Lahat ay nakadepende sa tamang pagbasa ng swing points muna.",
      },
    },
    {
      id: "q2",
      type: "truefalse",
      prompt: {
        en: "In a bullish trend, breaking the latest higher low can be a possible reversal signal.",
        tl: "Sa bullish trend, ang pag-break sa pinakahuling higher low ay posibleng senyales ng reversal.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "A broken higher low warns the bullish structure may be shifting (next lesson: MSS).",
        tl: "Senyales ang na-break na higher low na pwedeng mag-shift ang bullish structure (susunod: MSS).",
      },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: {
        en: "Why do we avoid trading consolidation/ranging markets?",
        tl: "Bakit iniiwasan ang pag-trade sa consolidation/ranging market?",
      },
      options: [
        { id: "a", text: { en: "They're illegal", tl: "Bawal sila" } },
        { id: "b", text: { en: "They're low-probability and easily trap you", tl: "Low-probability at madaling mag-trap" } },
        { id: "c", text: { en: "They never move", tl: "Hindi gumagalaw" } },
        { id: "d", text: { en: "Brokers ban them", tl: "Bina-ban ng broker" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Ranges lack clean structure, so both sides' liquidity can be taken — low probability.",
        tl: "Walang malinis na structure ang range, kaya pwedeng makuha ang liquidity ng magkabila — low probability.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "The beginner target taught in this course is…",
        tl: "Ang beginner target na itinuturo sa course na ito ay…",
      },
      options: [
        { id: "a", text: { en: "1:2, for a higher win-rate and discipline", tl: "1:2, para sa mas mataas na win-rate at disiplina" } },
        { id: "b", text: { en: "1:1 always", tl: "1:1 lagi" } },
        { id: "c", text: { en: "As high as possible every time", tl: "Pinakamataas palagi" } },
        { id: "d", text: { en: "There is no target", tl: "Walang target" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "1:2 keeps win-rate high and protects psychology while you build skill.",
        tl: "Pinapataas ng 1:2 ang win-rate at pinoprotektahan ang psychology habang natututo.",
      },
    },
  ],
};
