// Source: Basic TradingCourse/Market Structure Part 1.txt (verified: matches title)
// COVERAGE (source: Basic TradingCourse/Market Structure Part 1.txt) — every point mapped:
// [x] market structure is the most important foundation; the basis we read first -> intro + Q9
// [x] three types of market: bullish (long entries), bearish (short entries), ranging/consolidation -> types list + Q4, Q7
// [x] swing highs and swing lows are the peaks and troughs we label -> "naming" paragraph + Q1
// [x] Higher Low (HL) = a low above the previous low -> naming paragraph + ms1-bullish chart + Q1
// [x] Higher High (HH) = a high above the previous high -> naming paragraph + ms1-bullish chart + Q2
// [x] Lower High (LH) = a high below the previous high -> naming paragraph + ms1-bearish chart + Q5
// [x] Lower Low (LL) = a low below the previous low -> naming paragraph + ms1-bearish chart + Q10
// [x] bullish market = higher highs + higher lows -> ms1-bullish chart + key callout + Q6
// [x] bearish market = lower lows + lower highs -> ms1-bearish chart + Q3 (downtrend)
// [x] in a bullish market expect new higher highs; in a bearish market expect new lower lows -> key callout + Q2
// [x] ranging/consolidation has only swing highs/lows, no clean HH/HL or LL/LH; low probability -> ranging paragraph + Q3, Q8
// [x] focus on trending (high-probability) markets; range gives small moves; less is more -> ranging paragraph + Q8, Q9
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "market-structure-1",
  moduleSlug: "basics",
  title: { en: "Market Structure (Part 1)", tl: "Market Structure (Part 1)" },
  summary: {
    en: "The three types of market and how to read swing highs and lows: the basis for everything in SMC.",
    tl: "Ang tatlong uri ng market at paano basahin ang swing highs at lows: ang pundasyon ng lahat sa SMC.",
  },
  estMinutes: 9,
  sourceFile: "Basic TradingCourse/Market Structure Part 1.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "Market structure is the most important foundation in SMC. It is the basis we use to identify how the market is moving, so we always read it first before anything else.",
        tl: "Ang market structure ang pinaka-importanteng pundasyon sa SMC. Ito ang basis natin para ma-identify kung paano gumagalaw ang market, kaya ito muna ang binabasa natin bago ang kahit ano.",
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
          en: "Bullish: price is rising. Our entries here are long (buy) entries.",
          tl: "Bullish: paangat ang price. Ang entries natin dito ay long (buy).",
        },
        {
          en: "Bearish: price is falling. Our entries here are short (sell) entries.",
          tl: "Bearish: pababa ang price. Ang entries natin dito ay short (sell).",
        },
        {
          en: "Ranging / consolidation: no clear higher highs or lower lows; price just swings sideways.",
          tl: "Ranging / consolidation: walang malinaw na higher highs o lower lows; pa-gilid lang ang price.",
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
        height: 360,
        candles: [
          { o: 100, h: 106, l: 98, c: 104 },
          { o: 104, h: 118, l: 103, c: 116 },
          { o: 116, h: 128, l: 115, c: 126 },
          { o: 126, h: 127, l: 116, c: 118 },
          { o: 118, h: 120, l: 112, c: 114 },
          { o: 114, h: 130, l: 113, c: 128 },
          { o: 128, h: 144, l: 127, c: 142 },
          { o: 142, h: 143, l: 132, c: 134 },
          { o: 134, h: 136, l: 128, c: 130 },
          { o: 130, h: 146, l: 129, c: 144 },
          { o: 144, h: 160, l: 143, c: 158 },
          { o: 158, h: 159, l: 150, c: 152 },
        ],
        annotations: [
          { type: "label", index: 2, price: 134, text: { en: "HH", tl: "HH" }, tone: "bull", appearAtStep: 0 },
          { type: "label", index: 4, price: 107, text: { en: "HL", tl: "HL" }, tone: "bull", appearAtStep: 1 },
          { type: "label", index: 6, price: 150, text: { en: "HH", tl: "HH" }, tone: "bull", appearAtStep: 2 },
          { type: "label", index: 8, price: 123, text: { en: "HL", tl: "HL" }, tone: "bull", appearAtStep: 3 },
          { type: "label", index: 10, price: 166, text: { en: "HH", tl: "HH" }, tone: "bull", appearAtStep: 4 },
        ],
        steps: [
          {
            caption: { en: "Price pushes up strongly and makes a peak. A peak higher than the one before it is a Higher High (HH).", tl: "Tumutulak pataas ang price at gumagawa ng tuktok. Ang tuktok na mas mataas sa nauna ay Higher High (HH)." },
            tip: { en: "A new peak ABOVE the last peak = a Higher High.", tl: "Bagong tuktok na MAS MATAAS sa huling tuktok = Higher High." },
            revealCandles: 3,
          },
          {
            caption: { en: "Price pulls back, but the dip stops ABOVE the previous low. A low above the last low is a Higher Low (HL).", tl: "Nag-pullback ang price, pero ang dip ay humihinto SA ITAAS ng nakaraang low. Ang low na mas mataas sa huling low ay Higher Low (HL)." },
            tip: { en: "A pullback low that stays ABOVE the last low = a Higher Low.", tl: "Pullback low na nananatili SA ITAAS ng huling low = Higher Low." },
            revealCandles: 5,
          },
          {
            caption: { en: "Price expands up again to a new Higher High. The staircase keeps climbing.", tl: "Mag-eexpand pataas ulit ang price sa bagong Higher High. Patuloy umaakyat ang hagdan." },
            tip: { en: "Another peak above the last = the up-trend continues.", tl: "Isa pang tuktok na mas mataas sa huli = tuloy ang pataas na trend." },
            revealCandles: 7,
          },
          {
            caption: { en: "Another shallow pullback makes a Higher Low, still above the previous one.", tl: "Isa pang mababaw na pullback ang gumagawa ng Higher Low, mas mataas pa rin sa nauna." },
            tip: { en: "Higher lows stacking up = buyers in control.", tl: "Mga higher low na nagsasalansan = hawak ng buyers." },
            revealCandles: 9,
          },
          {
            caption: { en: "And one more Higher High. Higher highs PLUS higher lows together is a bullish market.", tl: "At isa pang Higher High. Ang higher highs KASAMA ang higher lows ay bullish market." },
            tip: { en: "HH + HL repeating = bullish structure.", tl: "HH + HL na paulit-ulit = bullish structure." },
            revealCandles: 12,
          },
        ],
        caption: {
          en: "Higher highs (HH) + higher lows (HL) = a bullish market. Each pullback low sits ABOVE the previous one.",
          tl: "Higher highs (HH) + higher lows (HL) = bullish market. Bawat pullback low ay mas MATAAS sa nauna.",
        },
      },
    },
    {
      kind: "chart",
      spec: {
        id: "ms1-bearish",
        title: { en: "Bearish structure: LL + LH", tl: "Bearish structure: LL + LH" },
        height: 360,
        candles: [
          { o: 134, h: 136, l: 128, c: 130 },
          { o: 130, h: 131, l: 116, c: 118 },
          { o: 118, h: 119, l: 106, c: 108 },
          { o: 108, h: 118, l: 107, c: 116 },
          { o: 116, h: 122, l: 115, c: 118 },
          { o: 118, h: 119, l: 104, c: 106 },
          { o: 106, h: 107, l: 90, c: 92 },
          { o: 92, h: 104, l: 91, c: 102 },
          { o: 102, h: 106, l: 101, c: 104 },
          { o: 104, h: 105, l: 90, c: 92 },
          { o: 92, h: 93, l: 76, c: 78 },
          { o: 78, h: 86, l: 77, c: 84 },
        ],
        annotations: [
          { type: "label", index: 2, price: 100, text: { en: "LL", tl: "LL" }, tone: "bear", appearAtStep: 0 },
          { type: "label", index: 4, price: 128, text: { en: "LH", tl: "LH" }, tone: "bear", appearAtStep: 1 },
          { type: "label", index: 6, price: 84, text: { en: "LL", tl: "LL" }, tone: "bear", appearAtStep: 2 },
          { type: "label", index: 8, price: 112, text: { en: "LH", tl: "LH" }, tone: "bear", appearAtStep: 3 },
          { type: "label", index: 10, price: 70, text: { en: "LL", tl: "LL" }, tone: "bear", appearAtStep: 4 },
        ],
        steps: [
          {
            caption: { en: "Now flip it. Price falls and makes a trough BELOW the previous low. A low under the last low is a Lower Low (LL).", tl: "Ngayon baliktarin. Bumababa ang price at gumagawa ng lambak SA IBABA ng nakaraang low. Ang low na mas mababa sa huling low ay Lower Low (LL)." },
            tip: { en: "A new low BELOW the last low = a Lower Low.", tl: "Bagong low na MAS MABABA sa huling low = Lower Low." },
            revealCandles: 3,
          },
          {
            caption: { en: "Price bounces, but the bounce tops BELOW the previous high. A high under the last high is a Lower High (LH).", tl: "Nag-bounce ang price, pero ang bounce ay umaabot SA IBABA ng nakaraang high. Ang high na mas mababa sa huling high ay Lower High (LH)." },
            tip: { en: "A bounce that stops BELOW the last high = a Lower High.", tl: "Bounce na humihinto SA IBABA ng huling high = Lower High." },
            revealCandles: 5,
          },
          {
            caption: { en: "Price drops to another Lower Low. The staircase keeps descending.", tl: "Bumababa ang price sa isa pang Lower Low. Patuloy bumababa ang hagdan." },
            tip: { en: "Another low below the last = the down-trend continues.", tl: "Isa pang low na mas mababa sa huli = tuloy ang pababang trend." },
            revealCandles: 7,
          },
          {
            caption: { en: "Another weak bounce makes a Lower High, still below the previous one.", tl: "Isa pang mahinang bounce ang gumagawa ng Lower High, mas mababa pa rin sa nauna." },
            tip: { en: "Lower highs stacking down = sellers in control.", tl: "Mga lower high na bumababa = hawak ng sellers." },
            revealCandles: 9,
          },
          {
            caption: { en: "And one more Lower Low. Lower lows PLUS lower highs together is a bearish market.", tl: "At isa pang Lower Low. Ang lower lows KASAMA ang lower highs ay bearish market." },
            tip: { en: "LL + LH repeating = bearish structure.", tl: "LL + LH na paulit-ulit = bearish structure." },
            revealCandles: 12,
          },
        ],
        caption: {
          en: "Lower lows (LL) + lower highs (LH) = a bearish market. Each bounce tops BELOW the previous high.",
          tl: "Lower lows (LL) + lower highs (LH) = bearish market. Bawat bounce ay umaabot BELOW sa nakaraang high.",
        },
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
        en: "In a range there are only swing highs and lows, with no clean HH/HL or LL/LH to lean on. These are low-probability conditions, so we focus on trending markets where the chance of profit is higher. Remember: less is more. You don't need to catch every move to be profitable.",
        tl: "Sa range, swing highs at lows lang, walang malinis na HH/HL o LL/LH na maaasahan. Low-probability ito, kaya nakapokus tayo sa trending market kung saan mas mataas ang chance ng profit. Tandaan: less is more. Hindi mo kailangang masakyan lahat ng moves para kumita.",
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
      chart: {
        id: "q-ms1",
        height: 240,
        candles: [
          { o: 100, h: 103, l: 96, c: 101 },
          { o: 101, h: 114, l: 100, c: 112 },
          { o: 112, h: 126, l: 111, c: 124 },
          { o: 124, h: 125, l: 112, c: 114 },
          { o: 114, h: 116, l: 108, c: 110 },
          { o: 110, h: 124, l: 109, c: 122 },
        ],
        annotations: [
          { type: "label", index: 2, price: 132, text: { en: "high", tl: "high" }, tone: "bull" },
          { type: "label", index: 4, price: 102, text: { en: "?", tl: "?" }, tone: "bull" },
        ],
        caption: {
          en: "What do we call the pullback low marked '?' that sits above the prior low?",
          tl: "Ano ang tawag sa pullback low na '?' na nasa itaas ng dating low?",
        },
      },
      options: [
        { id: "a", text: { en: "Lower Low (LL)", tl: "Lower Low (LL)" } },
        { id: "b", text: { en: "Higher Low (HL)", tl: "Higher Low (HL)" } },
        { id: "c", text: { en: "Lower High (LH)", tl: "Lower High (LH)" } },
        { id: "d", text: { en: "Equal Low", tl: "Equal Low" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "A low higher than the previous low is a Higher Low, a sign of bullish structure.",
        tl: "Ang low na mas mataas sa nakaraang low ay Higher Low, senyales ng bullish structure.",
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
        { id: "d", text: { en: "Nothing, it stays flat", tl: "Wala, patag lang" } },
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
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "A high that forms BELOW the previous high is called a…",
        tl: "Ang high na nabuo BELOW sa nakaraang high ay tinatawag na…",
      },
      options: [
        { id: "a", text: { en: "Higher High (HH)", tl: "Higher High (HH)" } },
        { id: "b", text: { en: "Lower High (LH)", tl: "Lower High (LH)" } },
        { id: "c", text: { en: "Higher Low (HL)", tl: "Higher Low (HL)" } },
        { id: "d", text: { en: "Equal High", tl: "Equal High" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "A high below the previous high is a Lower High, a sign of bearish structure.",
        tl: "Ang high na mas mababa sa nakaraang high ay Lower High, senyales ng bearish structure.",
      },
    },
    {
      id: "q6",
      type: "truefalse",
      prompt: {
        en: "Higher highs together with higher lows signal a bullish market.",
        tl: "Ang higher highs kasama ang higher lows ay senyales ng bullish market.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. HH + HL is the signature of a bullish (rising) market.",
        tl: "Oo. Ang HH + HL ang tanda ng bullish (paangat) na market.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "Which describes a ranging / consolidation market?",
        tl: "Alin ang naglalarawan ng ranging / consolidation na market?",
      },
      options: [
        { id: "a", text: { en: "Only swing highs and lows, with no clean HH/HL or LL/LH", tl: "Swing highs at lows lang, walang malinis na HH/HL o LL/LH" } },
        { id: "b", text: { en: "A strong, clean uptrend", tl: "Malakas at malinis na uptrend" } },
        { id: "c", text: { en: "A strong, clean downtrend", tl: "Malakas at malinis na downtrend" } },
        { id: "d", text: { en: "A single huge candle", tl: "Isang malaking candle" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "A range just swings sideways with no clear higher highs/lows or lower lows/highs.",
        tl: "Ang range ay pa-gilid lang, walang malinaw na higher highs/lows o lower lows/highs.",
      },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: {
        en: "Why do we focus on trending markets?",
        tl: "Bakit tayo nakapokus sa trending markets?",
      },
      options: [
        { id: "a", text: { en: "They are higher-probability and offer bigger, clearer moves", tl: "Mas mataas ang probability at mas malaki, mas malinaw ang moves" } },
        { id: "b", text: { en: "They never lose", tl: "Hindi sila natatalo" } },
        { id: "c", text: { en: "They are the only markets that exist", tl: "Sila lang ang market na umiiral" } },
        { id: "d", text: { en: "Because ranges are illegal", tl: "Dahil bawal ang range" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Trending markets are higher-probability; ranges give small, low-probability moves.",
        tl: "Higher-probability ang trending markets; maliit at low-probability ang moves sa range.",
      },
    },
    {
      id: "q9",
      type: "truefalse",
      prompt: {
        en: "You must catch every single move to be profitable.",
        tl: "Kailangan mong masakyan ang bawat move para kumita.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. Less is more. A few high-probability trades beat chasing everything.",
        tl: "Mali. Less is more. Mas mabuti ang ilang high-probability na trade kaysa habulin lahat.",
      },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: {
        en: "A low that forms BELOW the previous low is called a…",
        tl: "Ang low na nabuo BELOW sa nakaraang low ay tinatawag na…",
      },
      options: [
        { id: "a", text: { en: "Higher Low (HL)", tl: "Higher Low (HL)" } },
        { id: "b", text: { en: "Lower Low (LL)", tl: "Lower Low (LL)" } },
        { id: "c", text: { en: "Higher High (HH)", tl: "Higher High (HH)" } },
        { id: "d", text: { en: "Equal Low", tl: "Equal Low" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "A low below the previous low is a Lower Low, a sign of bearish structure.",
        tl: "Ang low na mas mababa sa nakaraang low ay Lower Low, senyales ng bearish structure.",
      },
    },
  ],
};
