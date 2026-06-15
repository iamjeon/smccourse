// Source: Basic TradingCourse/Market Structure Break & Market Structure Shift.txt
// (verified: matches title)
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "msb-mss",
  moduleSlug: "basics",
  title: {
    en: "Market Structure Break & Shift",
    tl: "Market Structure Break & Shift",
  },
  summary: {
    en: "MSB happens during continuation; MSS signals a reversal after price hits a higher-timeframe POI.",
    tl: "Nangyayari ang MSB sa continuation; senyales ng reversal ang MSS pagkatapos tumama sa higher-timeframe POI.",
  },
  estMinutes: 11,
  sourceFile: "Basic TradingCourse/Market Structure Break & Market Structure Shift.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "Both describe price breaking a level — the difference is direction. A Market Structure Break (MSB) happens along the trend (continuation). A Market Structure Shift (MSS) happens against the current trend and signals a reversal.",
        tl: "Pareho silang naglalarawan ng pag-break ng level — ang pinagkaiba ay direksyon. Ang Market Structure Break (MSB) ay nangyayari kasabay ng trend (continuation). Ang Market Structure Shift (MSS) ay kontra sa kasalukuyang trend at senyales ng reversal.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "A break only counts when taken out", tl: "Bilang lang ang break kapag na-take out" },
      text: {
        en: "While price is still approaching a swing high/low, it is NOT yet a break. It only becomes an MSB/MSS once that level is actually taken out.",
        tl: "Habang papalapit pa lang ang price sa swing high/low, HINDI pa ito break. Nagiging MSB/MSS lang ito kapag na-take out na ang level.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "msb-mss",
        title: { en: "MSB (continuation) then MSS (reversal)", tl: "MSB (continuation) tapos MSS (reversal)" },
        height: 380,
        candles: [
          { o: 100, h: 106, l: 99, c: 105 },
          { o: 105, h: 112, l: 104, c: 111 },
          { o: 111, h: 112, l: 105, c: 107 },
          { o: 107, h: 110, l: 105, c: 109 },
          { o: 109, h: 118, l: 108, c: 116 },
          { o: 116, h: 124, l: 115, c: 122 },
          { o: 122, h: 123, l: 116, c: 118 },
          { o: 118, h: 128, l: 117, c: 126 },
          { o: 126, h: 129, l: 119, c: 121 },
          { o: 121, h: 122, l: 114, c: 116 },
          { o: 116, h: 117, l: 108, c: 110 },
          { o: 110, h: 111, l: 102, c: 104 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 112, from: 1, to: 4, tone: "bull", dashed: true, label: { en: "MSB", tl: "MSB" }, appearAtStep: 0 },
          { type: "marker", kind: "bos", index: 4, price: 117, tone: "bull", label: { en: "MSB", tl: "MSB" }, appearAtStep: 0 },
          { type: "marker", kind: "bos", index: 7, price: 127, tone: "bull", label: { en: "MSB", tl: "MSB" }, appearAtStep: 1 },
          { type: "box", kind: "zone", from: 6, to: 11, top: 131, bottom: 128, tone: "bear", label: { en: "POI / Resistance", tl: "POI / Resistance" }, extend: true, appearAtStep: 2 },
          { type: "line", kind: "level", price: 116, from: 6, to: 9, tone: "bear", dashed: true, label: { en: "Last HL", tl: "Last HL" }, appearAtStep: 2 },
          { type: "marker", kind: "mss", index: 9, price: 114, tone: "bear", label: { en: "MSS", tl: "MSS" }, appearAtStep: 3 },
          { type: "marker", kind: "bos", index: 11, price: 102, tone: "bear", label: { en: "MSB", tl: "MSB" }, appearAtStep: 4 },
        ],
        steps: [
          { caption: { en: "In an uptrend, breaking a swing high = MSB (continuation).", tl: "Sa uptrend, pag-break ng swing high = MSB (continuation)." }, revealCandles: 5 },
          { caption: { en: "Another MSB as price climbs toward a higher-timeframe POI.", tl: "Isa pang MSB habang umaakyat papunta sa higher-timeframe POI." }, revealCandles: 8 },
          { caption: { en: "At the POI, price stalls. Watch the last higher low.", tl: "Sa POI, huminto ang price. Bantayan ang last higher low." }, revealCandles: 9 },
          { caption: { en: "Breaking that higher low AGAINST the trend = MSS (reversal).", tl: "Pag-break ng higher low na yan KONTRA sa trend = MSS (reversal)." }, revealCandles: 11 },
          { caption: { en: "Now bearish: breaking lows along the new trend are MSBs again.", tl: "Bearish na: ang pag-break ng lows kasabay ng bagong trend ay MSB ulit." }, revealCandles: 12 },
        ],
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "Think of the POI like a wall: when price hits a higher-timeframe point of interest (what retail calls support/resistance), it can react or reverse. The MSS confirms the reversal; afterwards, breaks along the new trend are MSBs again. We'll cover POIs (premium & discount arrays) in later topics.",
        tl: "Isipin ang POI parang pader: pag tumama ang price sa higher-timeframe point of interest (ang tawag ng retail ay support/resistance), pwede itong mag-react o mag-reverse. Kinukumpirma ng MSS ang reversal; pagkatapos, ang mga break kasabay ng bagong trend ay MSB na ulit. Tatalakayin ang POIs (premium & discount arrays) sa susunod na topics.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "A Market Structure Break (MSB) happens…",
        tl: "Ang Market Structure Break (MSB) ay nangyayari…",
      },
      options: [
        { id: "a", text: { en: "Against the trend (reversal)", tl: "Kontra sa trend (reversal)" } },
        { id: "b", text: { en: "Along the trend (continuation)", tl: "Kasabay ng trend (continuation)" } },
        { id: "c", text: { en: "Only at market open", tl: "Sa market open lang" } },
        { id: "d", text: { en: "Never on real charts", tl: "Hindi kailanman sa totoong chart" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "MSB is a break in the SAME direction as the trend — continuation.",
        tl: "Ang MSB ay break sa PAREHONG direksyon ng trend — continuation.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "A Market Structure Shift (MSS) signals…",
        tl: "Ang Market Structure Shift (MSS) ay senyales ng…",
      },
      options: [
        { id: "a", text: { en: "Continuation", tl: "Continuation" } },
        { id: "b", text: { en: "A reversal of the current trend", tl: "Reversal ng kasalukuyang trend" } },
        { id: "c", text: { en: "A pause with no meaning", tl: "Paghinto na walang ibig sabihin" } },
        { id: "d", text: { en: "Lower volume only", tl: "Mababang volume lang" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "MSS breaks structure against the trend — a reversal signal.",
        tl: "Nira-break ng MSS ang structure kontra sa trend — senyales ng reversal.",
      },
    },
    {
      id: "q3",
      type: "truefalse",
      prompt: {
        en: "It's already a break the moment price approaches the swing high/low.",
        tl: "Break na agad kahit papalapit pa lang ang price sa swing high/low.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "It's only a break once the level is actually taken out — not while approaching.",
        tl: "Break lang kapag na-take out na ang level — hindi habang papalapit pa lang.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "An MSS reversal typically happens after price…",
        tl: "Karaniwang nangyayari ang MSS reversal pagkatapos ang price ay…",
      },
      options: [
        { id: "a", text: { en: "Hits a higher-timeframe POI (resistance/support)", tl: "Tumama sa higher-timeframe POI (resistance/support)" } },
        { id: "b", text: { en: "Reaches a round number", tl: "Umabot sa round number" } },
        { id: "c", text: { en: "Crosses a moving average", tl: "Tumawid sa moving average" } },
        { id: "d", text: { en: "The weekend starts", tl: "Nagsimula ang weekend" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The shift usually comes after reacting at a higher-timeframe point of interest.",
        tl: "Karaniwang dumarating ang shift pagkatapos mag-react sa higher-timeframe POI.",
      },
    },
  ],
};
