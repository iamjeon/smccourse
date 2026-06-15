// Source: Basic TradingCourse/Market Structure Part 1.txt (verified: matches title)
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "market-structure-1",
  moduleSlug: "basics",
  title: { en: "Market Structure (Part 1)", tl: "Market Structure (Part 1)" },
  summary: {
    en: "The three types of market and how to read swing highs and lows — the basis for everything in SMC.",
    tl: "Ang tatlong uri ng market at paano basahin ang swing highs at lows — ang pundasyon ng lahat sa SMC.",
  },
  estMinutes: 9,
  sourceFile: "Basic TradingCourse/Market Structure Part 1.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "Market structure is the most important foundation in SMC. It is the basis we use to identify how the market is moving — so we always read it first before anything else.",
        tl: "Ang market structure ang pinaka-importanteng pundasyon sa SMC. Ito ang basis natin para ma-identify kung paano gumagalaw ang market — kaya ito muna ang binabasa natin bago ang kahit ano.",
      },
    },
    {
      kind: "heading",
      text: { en: "The three types of market", tl: "Ang tatlong uri ng market" },
    },
    {
      kind: "list",
      ordered: true,
      items: [
        {
          en: "Bullish — price is rising. Our entries here are long (buy) entries.",
          tl: "Bullish — paangat ang price. Ang entries natin dito ay long (buy).",
        },
        {
          en: "Bearish — price is falling. Our entries here are short (sell) entries.",
          tl: "Bearish — pababa ang price. Ang entries natin dito ay short (sell).",
        },
        {
          en: "Ranging / consolidation — no clear higher highs or lower lows; price just swings sideways.",
          tl: "Ranging / consolidation — walang malinaw na higher highs o lower lows; pa-gilid lang ang price.",
        },
      ],
    },
    {
      kind: "heading",
      level: 3,
      text: { en: "Naming the swing points", tl: "Pagpangalan sa swing points" },
    },
    {
      kind: "paragraph",
      text: {
        en: "We label the peaks and troughs of price as swing highs and swing lows. A low that sits above the previous low is a Higher Low (HL). A high above the previous high is a Higher High (HH). A high below the previous high is a Lower High (LH), and a low below the previous low is a Lower Low (LL).",
        tl: "Pinangalanan natin ang mga taas at baba ng price bilang swing highs at swing lows. Ang low na mas mataas sa nakaraang low ay Higher Low (HL). Ang high na mas mataas sa nakaraang high ay Higher High (HH). Ang high na mas mababa sa nakaraang high ay Lower High (LH), at ang low na mas mababa sa nakaraang low ay Lower Low (LL).",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "ms1-bullish",
        title: { en: "Bullish structure: HH + HL", tl: "Bullish structure: HH + HL" },
        height: 340,
        candles: [
          { o: 100, h: 105, l: 99, c: 104 },
          { o: 104, h: 110, l: 103, c: 109 },
          { o: 109, h: 116, l: 108, c: 114 },
          { o: 114, h: 116, l: 111, c: 112 },
          { o: 112, h: 113, l: 107, c: 109 },
          { o: 109, h: 112, l: 108, c: 111 },
          { o: 111, h: 117, l: 110, c: 116 },
          { o: 116, h: 124, l: 115, c: 122 },
          { o: 122, h: 126, l: 121, c: 124 },
          { o: 124, h: 125, l: 119, c: 120 },
          { o: 120, h: 121, l: 116, c: 117 },
          { o: 117, h: 124, l: 116, c: 123 },
          { o: 123, h: 131, l: 122, c: 129 },
          { o: 129, h: 136, l: 128, c: 134 },
        ],
        annotations: [
          { type: "label", index: 2, price: 119, text: { en: "HH", tl: "HH" }, tone: "bull", appearAtStep: 0 },
          { type: "label", index: 4, price: 104, text: { en: "HL", tl: "HL" }, tone: "bull", appearAtStep: 1 },
          { type: "label", index: 8, price: 130, text: { en: "HH", tl: "HH" }, tone: "bull", appearAtStep: 2 },
          { type: "label", index: 10, price: 112, text: { en: "HL", tl: "HL" }, tone: "bull", appearAtStep: 2 },
          { type: "label", index: 13, price: 140, text: { en: "HH", tl: "HH" }, tone: "bull", appearAtStep: 3 },
        ],
        steps: [
          { caption: { en: "Price pushes up to make a high.", tl: "Umaakyat ang price para gumawa ng high." }, revealCandles: 4 },
          { caption: { en: "It pulls back, but bottoms ABOVE the last low — a Higher Low.", tl: "Nag-pullback, pero bumaba ABOVE sa huling low — Higher Low." }, revealCandles: 6 },
          { caption: { en: "Then a new Higher High and another Higher Low.", tl: "Tapos bagong Higher High at isa pang Higher Low." }, revealCandles: 11 },
          { caption: { en: "Higher highs + higher lows = a bullish market.", tl: "Higher highs + higher lows = bullish market." }, revealCandles: 14 },
        ],
      },
    },
    {
      kind: "chart",
      spec: {
        id: "ms1-bearish",
        title: { en: "Bearish structure: LL + LH", tl: "Bearish structure: LL + LH" },
        height: 340,
        candles: [
          { o: 134, h: 136, l: 129, c: 130 },
          { o: 130, h: 131, l: 124, c: 125 },
          { o: 125, h: 126, l: 118, c: 120 },
          { o: 120, h: 122, l: 118, c: 121 },
          { o: 121, h: 128, l: 120, c: 127 },
          { o: 127, h: 129, l: 122, c: 123 },
          { o: 123, h: 124, l: 116, c: 118 },
          { o: 118, h: 119, l: 110, c: 112 },
          { o: 112, h: 114, l: 110, c: 113 },
          { o: 113, h: 120, l: 112, c: 119 },
          { o: 119, h: 121, l: 114, c: 115 },
          { o: 115, h: 116, l: 107, c: 109 },
          { o: 109, h: 110, l: 101, c: 103 },
        ],
        annotations: [
          { type: "label", index: 2, price: 114, text: { en: "LL", tl: "LL" }, tone: "bear", appearAtStep: 0 },
          { type: "label", index: 4, price: 132, text: { en: "LH", tl: "LH" }, tone: "bear", appearAtStep: 1 },
          { type: "label", index: 7, price: 106, text: { en: "LL", tl: "LL" }, tone: "bear", appearAtStep: 2 },
          { type: "label", index: 9, price: 124, text: { en: "LH", tl: "LH" }, tone: "bear", appearAtStep: 2 },
          { type: "label", index: 12, price: 97, text: { en: "LL", tl: "LL" }, tone: "bear", appearAtStep: 3 },
        ],
        steps: [
          { caption: { en: "Price drops to make a low.", tl: "Bumaba ang price para gumawa ng low." }, revealCandles: 4 },
          { caption: { en: "It bounces, but tops BELOW the last high — a Lower High.", tl: "Nag-bounce, pero tumaas BELOW sa huling high — Lower High." }, revealCandles: 6 },
          { caption: { en: "Then a new Lower Low and a Lower High.", tl: "Tapos bagong Lower Low at Lower High." }, revealCandles: 10 },
          { caption: { en: "Lower lows + lower highs = a bearish market.", tl: "Lower lows + lower highs = bearish market." }, revealCandles: 13 },
        ],
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "The rule to remember", tl: "Ang tandaan" },
      text: {
        en: "In a bullish market expect the market to keep making new higher highs. In a bearish market expect new lower lows. That expectation is what keeps you on the right side.",
        tl: "Sa bullish market, asahan na tuloy-tuloy gagawa ang market ng bagong higher highs. Sa bearish market, bagong lower lows. Yan ang expectation na magpapanatili sa'yo sa tamang side.",
      },
    },
    {
      kind: "heading",
      level: 3,
      text: { en: "Why we avoid ranging markets", tl: "Bakit iniiwasan ang ranging market" },
    },
    {
      kind: "paragraph",
      text: {
        en: "In a range there are only swing highs and lows — no clean HH/HL or LL/LH to lean on. These are low-probability conditions, so we focus on trending markets where the chance of profit is higher. Remember: less is more. You don't need to catch every move to be profitable.",
        tl: "Sa range, swing highs at lows lang — walang malinis na HH/HL o LL/LH na maaasahan. Low-probability ito, kaya nakapokus tayo sa trending market kung saan mas mataas ang chance ng profit. Tandaan: less is more. Hindi mo kailangang masakyan lahat ng moves para kumita.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "A low that forms ABOVE the previous low is called a…",
        tl: "Ang low na nabuo ABOVE sa nakaraang low ay tinatawag na…",
      },
      options: [
        { id: "a", text: { en: "Lower Low (LL)", tl: "Lower Low (LL)" } },
        { id: "b", text: { en: "Higher Low (HL)", tl: "Higher Low (HL)" } },
        { id: "c", text: { en: "Lower High (LH)", tl: "Lower High (LH)" } },
        { id: "d", text: { en: "Equal Low", tl: "Equal Low" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "A low higher than the previous low is a Higher Low — a sign of bullish structure.",
        tl: "Ang low na mas mataas sa nakaraang low ay Higher Low — senyales ng bullish structure.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "In a bullish market, what do we expect the market to keep creating?",
        tl: "Sa bullish market, ano ang inaasahan nating tuloy gagawin ng market?",
      },
      options: [
        { id: "a", text: { en: "New lower lows", tl: "Bagong lower lows" } },
        { id: "b", text: { en: "Equal highs only", tl: "Equal highs lang" } },
        { id: "c", text: { en: "New higher highs", tl: "Bagong higher highs" } },
        { id: "d", text: { en: "Nothing — it stays flat", tl: "Wala — patag lang" } },
      ],
      correctOptionId: "c",
      explanation: {
        en: "A bullish market keeps printing higher highs (and higher lows).",
        tl: "Ang bullish market ay tuloy gumagawa ng higher highs (at higher lows).",
      },
    },
    {
      id: "q3",
      type: "truefalse",
      prompt: {
        en: "Ranging / consolidation markets are high-probability conditions we should focus on.",
        tl: "Ang ranging / consolidation ay high-probability na dapat nating pagtuunan.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "Ranges are low-probability and harder to read. We focus on trending markets.",
        tl: "Low-probability at mahirap basahin ang range. Nakapokus tayo sa trending markets.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "In a bearish market, your entries are usually…",
        tl: "Sa bearish market, ang entries mo ay kadalasang…",
      },
      options: [
        { id: "a", text: { en: "Long (buy)", tl: "Long (buy)" } },
        { id: "b", text: { en: "Short (sell)", tl: "Short (sell)" } },
        { id: "c", text: { en: "Both at once", tl: "Pareho nang sabay" } },
        { id: "d", text: { en: "No entries allowed", tl: "Walang entries" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Bearish structure favors short entries, aligned with the downtrend.",
        tl: "Ang bearish structure ay pabor sa short entries, kasabay ng downtrend.",
      },
    },
  ],
};
