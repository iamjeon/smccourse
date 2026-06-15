// Source: Basic TradingCourse/Liquidity.txt (verified: matches title)
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "liquidity",
  moduleSlug: "basics",
  title: { en: "Liquidity", tl: "Liquidity" },
  summary: {
    en: "Why price hunts stop losses, and how buy-side / sell-side liquidity drives smart-money moves.",
    tl: "Bakit hinahabol ng price ang stop losses, at paano hinihila ng buy-side / sell-side liquidity ang galaw ng smart money.",
  },
  estMinutes: 10,
  sourceFile: "Basic TradingCourse/Liquidity.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "Liquidity is what we always look at as ICT / SMC traders. Market makers mostly target the stop losses of retail traders. Retail relies on concepts like support, resistance, and trendlines — we read the chart naked, without indicators, and focus on where that liquidity sits.",
        tl: "Ang liquidity ang laging tinitingnan natin bilang ICT / SMC trader. Kadalasan, ang stop losses ng retail traders ang tina-target ng market makers. Umaasa ang retail sa support, resistance, at trendlines — tayo, naked chart, walang indicators, at nakapokus kung saan nakapwesto ang liquidity.",
      },
    },
    {
      kind: "heading",
      text: { en: "Buy-side vs sell-side liquidity", tl: "Buy-side vs sell-side liquidity" },
    },
    {
      kind: "paragraph",
      text: {
        en: "Resistance (highs) holds buy-side liquidity (BSL): the stop losses of shorts and the buy-stops of breakout traders sit just above it. Support (lows) holds sell-side liquidity (SSL): the stops of longs sit just below it. When that liquidity is 'taken out,' the orders there are cleared — and that's exactly when smart money enters the other way.",
        tl: "Ang resistance (highs) ay may buy-side liquidity (BSL): ang stop losses ng shorts at buy-stops ng breakout traders ay nasa itaas nito. Ang support (lows) ay may sell-side liquidity (SSL): ang stops ng longs ay nasa ilalim. Pag 'na-take out' ang liquidity na yan, nalilinis ang orders doon — at doon mismo pumapasok ang smart money sa kabilang side.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "liq-bsl-sweep",
        title: { en: "Buy-side liquidity sweep", tl: "Buy-side liquidity sweep" },
        height: 350,
        candles: [
          { o: 100, h: 107, l: 99, c: 106 },
          { o: 106, h: 120, l: 105, c: 118 },
          { o: 118, h: 119, l: 110, c: 112 },
          { o: 112, h: 113, l: 106, c: 108 },
          { o: 108, h: 120, l: 107, c: 116 },
          { o: 116, h: 118, l: 112, c: 113 },
          { o: 113, h: 124, l: 112, c: 119 },
          { o: 119, h: 121, l: 108, c: 110 },
          { o: 110, h: 111, l: 101, c: 103 },
          { o: 103, h: 104, l: 95, c: 97 },
          { o: 97, h: 98, l: 90, c: 92 },
        ],
        annotations: [
          {
            type: "line",
            kind: "liquidity",
            price: 120,
            from: 1,
            to: 6,
            tone: "gold",
            label: { en: "BSL", tl: "BSL" },
            appearAtStep: 0,
          },
          { type: "marker", kind: "sweep", index: 6, price: 124, tone: "gold", appearAtStep: 1, label: { en: "Sweep", tl: "Sweep" } },
          { type: "marker", kind: "entry", index: 7, price: 119, tone: "bear", appearAtStep: 2, label: { en: "Short", tl: "Short" } },
        ],
        steps: [
          { caption: { en: "Two equal highs build buy-side liquidity above them.", tl: "Dalawang pantay na highs ang gumawa ng buy-side liquidity sa itaas." }, revealCandles: 5 },
          { caption: { en: "Price spikes ABOVE — breakout longs trigger, stops rest above.", tl: "Tumalbog ang price ABOVE — nag-trigger ang breakout longs, nasa itaas ang stops." }, revealCandles: 7 },
          { caption: { en: "It was a trap: liquidity taken, price reverses down hard.", tl: "Trap pala: nakuha ang liquidity, malakas na bumaba ang price." }, revealCandles: 11 },
        ],
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Breakouts are often traps", tl: "Madalas trap ang breakouts" },
      text: {
        en: "When a 'resistance breaks,' retail buys expecting continuation. Often it doesn't truly break — it only takes the liquidity, then reverses. Identify liquidity first so your entries land on the right side.",
        tl: "Pag 'nag-break ang resistance,' bumibili ang retail na umaasa ng continuation. Madalas hindi ito totoong break — kinukuha lang ang liquidity, tapos reversal. I-identify muna ang liquidity para tama ang entries mo.",
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "The real sequence behind this is accumulation → manipulation → distribution (AMD). The sweep is the manipulation; our entry comes in the distribution that follows. We'll go deeper on AMD in later topics.",
        tl: "Ang tunay na sequence dito ay accumulation → manipulation → distribution (AMD). Ang sweep ay ang manipulation; ang entry natin ay sa distribution na sumusunod. Mas malalim ang AMD sa susunod na topics.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "Where does buy-side liquidity (BSL) typically rest?",
        tl: "Saan kadalasan nakapwesto ang buy-side liquidity (BSL)?",
      },
      options: [
        { id: "a", text: { en: "Below support / lows", tl: "Sa ilalim ng support / lows" } },
        { id: "b", text: { en: "Above resistance / highs", tl: "Sa itaas ng resistance / highs" } },
        { id: "c", text: { en: "Exactly at the open price", tl: "Sa mismong open price" } },
        { id: "d", text: { en: "Only on weekends", tl: "Tuwing weekend lang" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "BSL sits above highs/resistance, where shorts' stops and breakout buy-stops cluster.",
        tl: "Nasa itaas ng highs/resistance ang BSL, kung saan nag-cu-cluster ang stops ng shorts at buy-stops.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "What are market makers mostly targeting?",
        tl: "Ano ang kadalasang tina-target ng market makers?",
      },
      options: [
        { id: "a", text: { en: "Indicator signals", tl: "Mga signal ng indicator" } },
        { id: "b", text: { en: "The stop losses / liquidity of retail traders", tl: "Ang stop losses / liquidity ng retail traders" } },
        { id: "c", text: { en: "News headlines", tl: "Mga news headline" } },
        { id: "d", text: { en: "Round numbers only", tl: "Round numbers lang" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Smart money seeks the pooled liquidity (stops/orders) that retail leaves behind.",
        tl: "Hinahanap ng smart money ang naka-pool na liquidity (stops/orders) na iniwan ng retail.",
      },
    },
    {
      id: "q3",
      type: "truefalse",
      prompt: {
        en: "A breakout above resistance always means price will keep going up.",
        tl: "Ang breakout above resistance ay laging nangangahulugang tuloy aakyat ang price.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "Often the 'breakout' only sweeps liquidity, then reverses — a trap.",
        tl: "Madalas, ang 'breakout' ay nag-sweep lang ng liquidity, tapos reversal — trap.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "The three-phase sequence behind a liquidity sweep is…",
        tl: "Ang tatlong-phase na sequence sa likod ng liquidity sweep ay…",
      },
      options: [
        { id: "a", text: { en: "Accumulation → Manipulation → Distribution", tl: "Accumulation → Manipulation → Distribution" } },
        { id: "b", text: { en: "Buy → Hold → Sell", tl: "Buy → Hold → Sell" } },
        { id: "c", text: { en: "Support → Trendline → Indicator", tl: "Support → Trendline → Indicator" } },
        { id: "d", text: { en: "Open → High → Close", tl: "Open → High → Close" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "AMD: accumulation, then a manipulation sweep, then distribution where we enter.",
        tl: "AMD: accumulation, tapos manipulation sweep, tapos distribution kung saan tayo pumapasok.",
      },
    },
  ],
};
