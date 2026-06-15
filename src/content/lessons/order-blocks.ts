// Source: Basic TradingCourse/Order Blocks.txt (verified: matches title)
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "order-blocks",
  moduleSlug: "basics",
  title: { en: "Order Blocks", tl: "Order Blocks" },
  summary: {
    en: "How to mark a valid order block, why it needs an FVG to be high-probability, and where to enter.",
    tl: "Paano i-mark ang valid order block, bakit kailangan nito ng FVG para high-probability, at saan mag-enter.",
  },
  estMinutes: 12,
  sourceFile: "Basic TradingCourse/Order Blocks.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "An order block (OB) is a point of interest — part of the premium & discount arrays (PDRA) we use for entries, alongside FVGs and inversion FVGs. It's the last opposite-color candle before an impulsive move.",
        tl: "Ang order block (OB) ay isang point of interest — bahagi ng premium & discount arrays (PDRA) na ginagamit natin para sa entries, kasama ng FVG at inversion FVG. Ito ang huling kabaligtarang-kulay na candle bago ang impulsive move.",
      },
    },
    {
      kind: "heading",
      text: { en: "Marking an order block", tl: "Pag-mark ng order block" },
    },
    {
      kind: "list",
      items: [
        {
          en: "Bullish OB: the last down-close (bearish) candle before an up-move.",
          tl: "Bullish OB: ang huling down-close (bearish) candle bago ang up-move.",
        },
        {
          en: "Bearish OB: the last up-close (bullish) candle before a down-move.",
          tl: "Bearish OB: ang huling up-close (bullish) candle bago ang down-move.",
        },
        {
          en: "Mark the candle BODY only. If several same-color candles sit together before the move, combine them.",
          tl: "I-mark ang candle BODY lang. Kung magkakasunod ang parehong-kulay na candles bago ang move, pagsamahin sila.",
        },
      ],
    },
    {
      kind: "chart",
      spec: {
        id: "ob-bullish",
        title: { en: "Bullish OB with FVG", tl: "Bullish OB with FVG" },
        height: 360,
        candles: [
          { o: 112, h: 113, l: 107, c: 108 },
          { o: 108, h: 109, l: 103, c: 105 },
          { o: 105, h: 106, l: 101, c: 103 },
          { o: 103, h: 111, l: 103, c: 110 },
          { o: 110, h: 117, l: 109, c: 116 },
          { o: 116, h: 118, l: 109, c: 114 },
          { o: 114, h: 115, l: 104, c: 108 },
          { o: 108, h: 114, l: 105, c: 113 },
          { o: 113, h: 121, l: 112, c: 119 },
          { o: 119, h: 126, l: 118, c: 124 },
        ],
        annotations: [
          { type: "box", kind: "ob", from: 2, to: 7, top: 105, bottom: 103, tone: "bull", label: { en: "OB", tl: "OB" }, appearAtStep: 0 },
          { type: "box", kind: "fvg", from: 2, to: 6, top: 109, bottom: 106, tone: "gold", label: { en: "FVG", tl: "FVG" }, appearAtStep: 1 },
          { type: "marker", kind: "entry", index: 6, price: 105, tone: "bull", appearAtStep: 2, label: { en: "Entry", tl: "Entry" } },
          { type: "line", kind: "level", price: 100, tone: "bear", dashed: true, appearAtStep: 3, label: { en: "SL", tl: "SL" } },
        ],
        steps: [
          { caption: { en: "The last down-close candle before the rally is the OB (body only).", tl: "Ang huling down-close candle bago ang rally ay ang OB (body lang)." }, revealCandles: 3 },
          { caption: { en: "The impulsive move also leaves an FVG — that makes the OB high-probability.", tl: "May naiwang FVG din ang impulsive move — kaya high-probability ang OB." }, revealCandles: 5 },
          { caption: { en: "Price returns and reacts at the OB — entry.", tl: "Bumalik ang price at nag-react sa OB — entry." }, revealCandles: 7 },
          { caption: { en: "Continuation. Stop below the OB / swing low, target 1:2.", tl: "Continuation. Stop sa ilalim ng OB / swing low, target 1:2." }, revealCandles: 10 },
        ],
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "An OB needs an FVG", tl: "Kailangan ng OB ng FVG" },
      text: {
        en: "An order block is only high-probability when it overlaps or sits with an FVG (above, inside, or below for the matching direction). No FVG → treat it as low-probability.",
        tl: "High-probability lang ang order block kapag may kasamang FVG (sa taas, loob, o baba depende sa direksyon). Walang FVG → ituring na low-probability.",
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "If the OB is large, you can use its 50% as the entry. Stops go at the OB body or the swing low/high, with a 1:2 target. One reason many entries are taken inside FVGs is that order blocks are often NOT mitigated — price may never come back to them, while the FVG gets tapped more often.",
        tl: "Kung malaki ang OB, pwedeng ang 50% nito ang entry. Stops sa OB body o sa swing low/high, target 1:2. Isa sa dahilan kung bakit madalas sa FVG ang entries: madalas HINDI na-mi-mitigate ang order blocks — minsan hindi na binabalikan, habang mas madalas na-ta-tap ang FVG.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "A bullish order block is which candle?",
        tl: "Aling candle ang bullish order block?",
      },
      options: [
        { id: "a", text: { en: "The last up-close candle before an up-move", tl: "Huling up-close candle bago ang up-move" } },
        { id: "b", text: { en: "The last down-close candle before an up-move", tl: "Huling down-close candle bago ang up-move" } },
        { id: "c", text: { en: "Any large candle", tl: "Kahit anong malaking candle" } },
        { id: "d", text: { en: "The first candle of the day", tl: "Unang candle ng araw" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Bullish OB = the last down-close (bearish) candle right before the up-move.",
        tl: "Bullish OB = ang huling down-close (bearish) candle bago mismo ang up-move.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "When marking an order block, you mark the…",
        tl: "Kapag nag-mark ng order block, mina-mark mo ang…",
      },
      options: [
        { id: "a", text: { en: "Full candle including wicks", tl: "Buong candle pati wicks" } },
        { id: "b", text: { en: "Candle body only", tl: "Candle body lang" } },
        { id: "c", text: { en: "Only the wick", tl: "Wick lang" } },
        { id: "d", text: { en: "The whole day's range", tl: "Buong range ng araw" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "We mark the candle body only (combine consecutive same-color candles).",
        tl: "Candle body lang ang mina-mark natin (pagsamahin ang magkakasunod na parehong-kulay).",
      },
    },
    {
      id: "q3",
      type: "truefalse",
      prompt: {
        en: "An order block is high-probability even without a nearby FVG.",
        tl: "High-probability ang order block kahit walang kalapit na FVG.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "It needs an FVG (above/inside/below) to be high-probability; otherwise it's weak.",
        tl: "Kailangan nito ng FVG (taas/loob/baba) para high-probability; kung wala, mahina.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "Order blocks are often NOT mitigated, which is one reason traders also enter at…",
        tl: "Madalas HINDI na-mi-mitigate ang order blocks, kaya isa sa pinapasukan din ay ang…",
      },
      options: [
        { id: "a", text: { en: "Random round numbers", tl: "Random na round numbers" } },
        { id: "b", text: { en: "Fair value gaps (FVGs)", tl: "Fair value gaps (FVGs)" } },
        { id: "c", text: { en: "Moving averages", tl: "Moving averages" } },
        { id: "d", text: { en: "The daily open only", tl: "Daily open lang" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "FVGs get tapped more often than OBs, so entries inside the FVG fill more reliably.",
        tl: "Mas madalas na-ta-tap ang FVG kaysa OB, kaya mas madalas mapupuno ang entry sa loob ng FVG.",
      },
    },
  ],
};
