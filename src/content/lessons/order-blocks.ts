// Source: Basic TradingCourse/Order Blocks.txt (verified: matches title)
// COVERAGE (source: Basic TradingCourse/Order Blocks.txt) — every point mapped:
// [x] OB = a point of interest, part of the PDRAs (with FVG and inversion FVG); the last opposite-color candle before an impulsive move -> intro + Q1, Q9
// [x] bullish OB = the last down-close candle before an up-move -> list + ob-bullish chart + Q1
// [x] bearish OB = the last up-close candle before a down-move -> list + Q5
// [x] mark the candle BODY only; combine consecutive same-color candles before the move -> list + Q2
// [x] an OB is only high-probability when it has an FVG (above/inside/below); no FVG = low-probability -> key callout + chart step1 + Q3, Q10
// [x] if the OB is large, use its 50% as the entry -> paragraph + Q6
// [x] stops at the OB body or the swing low/high; target 1:2 -> paragraph + chart step3 + Q7
// [x] OBs are often NOT mitigated; price may never return, while the FVG gets tapped more often, so many entries are inside FVGs -> paragraph + Q4
// [x] mitigation = price returns and taps/wicks back into the zone -> mitigation note + Q8
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
        en: "An order block (OB) is a point of interest: part of the premium & discount arrays (PDRA) we use for entries, alongside FVGs and inversion FVGs. It's the last opposite-color candle before an impulsive move.",
        tl: "Ang order block (OB) ay isang point of interest: bahagi ng premium & discount arrays (PDRA) na ginagamit natin para sa entries, kasama ng FVG at inversion FVG. Ito ang huling kabaligtarang-kulay na candle bago ang impulsive move.",
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
          { o: 128, h: 130, l: 122, c: 124 },
          { o: 124, h: 125, l: 116, c: 118 },
          { o: 118, h: 119, l: 112, c: 114 },
          { o: 114, h: 128, l: 113, c: 126 },
          { o: 126, h: 140, l: 125, c: 138 },
          { o: 138, h: 139, l: 124, c: 126 },
          { o: 126, h: 127, l: 115, c: 117 },
          { o: 117, h: 131, l: 116, c: 129 },
          { o: 129, h: 143, l: 128, c: 141 },
          { o: 141, h: 151, l: 140, c: 149 },
        ],
        annotations: [
          { type: "box", kind: "ob", from: 2, to: 6, top: 118, bottom: 114, tone: "bull", label: { en: "OB", tl: "OB" }, appearAtStep: 0 },
          { type: "box", kind: "fvg", from: 2, to: 4, top: 125, bottom: 119, tone: "gold", label: { en: "FVG", tl: "FVG" }, appearAtStep: 1 },
          { type: "marker", kind: "entry", index: 6, price: 114, tone: "bull", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "line", kind: "level", price: 110, tone: "bear", dashed: true, label: { en: "SL", tl: "SL" }, labelPlacement: "center", appearAtStep: 2 },
        ],
        steps: [
          {
            caption: { en: "Find the last down-close (red) candle right before the rally. Its body is the bullish order block.", tl: "Hanapin ang huling down-close (pula) na candle bago mismo ang rally. Ang body nito ang bullish order block." },
            tip: { en: "Last red candle before a strong up-move = the bullish OB (body only).", tl: "Huling pulang candle bago ang malakas na pataas = ang bullish OB (body lang)." },
            revealCandles: 3,
          },
          {
            caption: { en: "The impulsive move also leaves an FVG. An OB paired with an FVG is high-probability.", tl: "May naiwang FVG din ang impulsive move. Ang OB na may kasamang FVG ay high-probability." },
            tip: { en: "OB + an FVG nearby = a high-probability zone.", tl: "OB + FVG na malapit = high-probability na zone." },
            revealCandles: 5,
          },
          {
            caption: { en: "Price returns and reacts at the order block: this is the entry. The stop sits just below the OB / swing low.", tl: "Bumalik ang price at nag-react sa order block: ito ang entry. Ang stop ay sa ilalim lang ng OB / swing low." },
            tip: { en: "A tap back into the OB that holds = the entry.", tl: "Pagbalik sa OB na humawak = ang entry." },
            revealCandles: 7,
          },
          {
            caption: { en: "Price continues higher. Stop below the OB / swing low, target 1:2.", tl: "Tuloy pataas ang price. Stop sa ilalim ng OB / swing low, target 1:2." },
            tip: { en: "Bank the move at 1:2 as a beginner.", tl: "Kunin ang move sa 1:2 bilang beginner." },
            revealCandles: 10,
          },
        ],
        caption: {
          en: "The last down-close candle before the rally is the bullish OB. Paired with an FVG it is high-probability. Enter on the return, stop below, target 1:2.",
          tl: "Ang huling down-close candle bago ang rally ang bullish OB. May kasamang FVG, high-probability. Pumasok sa pagbalik, stop sa ilalim, target 1:2.",
        },
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
        en: "If the OB is large, you can use its 50% as the entry. Stops go at the OB body or the swing low/high, with a 1:2 target. One reason many entries are taken inside FVGs is that order blocks are often NOT mitigated. 'Mitigated' means price returns and taps (wicks) back into the zone. An OB may never get mitigated, while the FVG gets tapped more often, so it fills more reliably.",
        tl: "Kung malaki ang OB, pwedeng ang 50% nito ang entry. Stops sa OB body o sa swing low/high, target 1:2. Isa sa dahilan kung bakit madalas sa FVG ang entries: madalas HINDI na-mi-mitigate ang order blocks. Ang 'mitigated' ay ang pagbalik at pagtama (pag-wick) ng price papasok sa zone. Minsan hindi na-mi-mitigate ang OB, habang mas madalas na-ta-tap ang FVG, kaya mas madalas mapupuno.",
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
      chart: {
        id: "q-ob",
        height: 220,
        candles: [
          { o: 112, h: 113, l: 107, c: 108 },
          { o: 108, h: 109, l: 103, c: 105 },
          { o: 105, h: 106, l: 101, c: 103 },
          { o: 103, h: 111, l: 103, c: 110 },
          { o: 110, h: 117, l: 109, c: 116 },
        ],
        annotations: [
          { type: "box", kind: "ob", from: 2, to: 2, top: 105, bottom: 103, tone: "bull", label: { en: "?", tl: "?" } },
        ],
        caption: {
          en: "A strong up-move follows. Which candle (boxed) is the order block?",
          tl: "May malakas na up-move na sumunod. Aling candle (naka-box) ang order block?",
        },
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
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "A bearish order block is which candle?",
        tl: "Aling candle ang bearish order block?",
      },
      options: [
        { id: "a", text: { en: "The last up-close candle before a down-move", tl: "Huling up-close candle bago ang down-move" } },
        { id: "b", text: { en: "The last down-close candle before a down-move", tl: "Huling down-close candle bago ang down-move" } },
        { id: "c", text: { en: "The biggest green candle", tl: "Ang pinakamalaking green candle" } },
        { id: "d", text: { en: "The last candle of the week", tl: "Huling candle ng linggo" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Bearish OB = the last up-close (bullish) candle right before the down-move.",
        tl: "Bearish OB = ang huling up-close (bullish) candle bago mismo ang down-move.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "If an order block is very large, what can you use as the entry?",
        tl: "Kung napakalaki ng order block, ano ang pwedeng gamitin bilang entry?",
      },
      options: [
        { id: "a", text: { en: "Its 50%", tl: "Ang 50% nito" } },
        { id: "b", text: { en: "A random price", tl: "Isang random na presyo" } },
        { id: "c", text: { en: "The very top only", tl: "Ang pinakatuktok lang" } },
        { id: "d", text: { en: "You cannot enter", tl: "Hindi pwedeng pumasok" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "For a large OB, the 50% level is a common, cleaner entry.",
        tl: "Para sa malaking OB, ang 50% level ay karaniwan at mas malinis na entry.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "Where does the stop loss go for an OB entry?",
        tl: "Saan inilalagay ang stop loss sa OB entry?",
      },
      options: [
        { id: "a", text: { en: "At the OB body or the swing low/high", tl: "Sa OB body o sa swing low/high" } },
        { id: "b", text: { en: "At the take profit", tl: "Sa take profit" } },
        { id: "c", text: { en: "Far above the entry", tl: "Malayo sa itaas ng entry" } },
        { id: "d", text: { en: "There is no stop", tl: "Walang stop" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Place the stop at the OB body or the swing low/high, with a 1:2 target.",
        tl: "Ilagay ang stop sa OB body o swing low/high, na may 1:2 target.",
      },
    },
    {
      id: "q8",
      type: "truefalse",
      prompt: {
        en: "An order block is 'mitigated' when price returns and taps back into it.",
        tl: "Ang order block ay 'mitigated' kapag bumalik ang price at tumama pabalik dito.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Mitigation is when price returns to tap (wick into) the zone.",
        tl: "Oo. Ang mitigation ay kapag bumalik ang price para tumama (mag-wick) sa zone.",
      },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: {
        en: "Which three PDRAs (points of interest) did the basics teach?",
        tl: "Aling tatlong PDRA (points of interest) ang itinuro sa basics?",
      },
      options: [
        { id: "a", text: { en: "FVG, inversion FVG, and order block", tl: "FVG, inversion FVG, at order block" } },
        { id: "b", text: { en: "Moving average, RSI, and MACD", tl: "Moving average, RSI, at MACD" } },
        { id: "c", text: { en: "Trendline, channel, and pennant", tl: "Trendline, channel, at pennant" } },
        { id: "d", text: { en: "Open, high, and close", tl: "Open, high, at close" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The basics covered three PDRAs: the FVG, the inversion FVG, and the order block.",
        tl: "Tinalakay ng basics ang tatlong PDRA: ang FVG, ang inversion FVG, at ang order block.",
      },
    },
    {
      id: "q10",
      type: "truefalse",
      prompt: {
        en: "An order block alone, with no FVG, is the strongest possible entry.",
        tl: "Ang order block lang, na walang FVG, ang pinakamalakas na entry.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. An OB needs an FVG to be high-probability; without one it is weak.",
        tl: "Mali. Kailangan ng OB ang FVG para high-probability; kung wala, mahina ito.",
      },
    },
  ],
};
