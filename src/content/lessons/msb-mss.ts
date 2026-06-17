// Source: Basic TradingCourse/Market Structure Break & Market Structure Shift.txt (verified: matches title)
// COVERAGE (source: Basic TradingCourse/Market Structure Break & Market Structure Shift.txt) — every point mapped:
// [x] MSB = a break during continuation (along the trend); MSS = a reversal of the current trend -> intro + msb-mss chart + Q1, Q2
// [x] a break only counts once the level is actually taken out, not while price is still approaching -> callout + chart step1 + Q3
// [x] in a bullish trend the MSB breaks a swing high along the trend -> chart step1 + Q5
// [x] in a bearish trend the MSB breaks a swing low (break, retrace, break) -> bearish note + Q6, Q9
// [x] retracement = the pullback move between two breaks -> bearish note + Q9
// [x] the MSS happens after price hits a higher-timeframe POI (retail support/resistance) where it can react or reverse -> POI paragraph + chart step2 + Q4, Q7
// [x] the POI behaves like a wall/floor (the house analogy) where price bounces -> POI paragraph + Q7
// [x] after the MSS flips the trend, breaks along the NEW trend are MSBs again -> POI paragraph + Q8
// [x] POIs are also called premium & discount arrays (PDRAs), covered in later topics -> POI paragraph + Q10
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
        en: "Both describe price breaking a level. The difference is direction. A Market Structure Break (MSB) happens along the trend (continuation). A Market Structure Shift (MSS) happens against the current trend and signals a reversal.",
        tl: "Pareho silang naglalarawan ng pag-break ng level. Ang pinagkaiba ay direksyon. Ang Market Structure Break (MSB) ay nangyayari kasabay ng trend (continuation). Ang Market Structure Shift (MSS) ay kontra sa kasalukuyang trend at senyales ng reversal.",
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
        title: { en: "MSB (continuation), then MSS (reversal)", tl: "MSB (continuation), tapos MSS (reversal)" },
        height: 400,
        candles: [
          { o: 106, h: 108, l: 100, c: 102 },
          { o: 102, h: 104, l: 96, c: 98 },
          { o: 98, h: 112, l: 97, c: 110 },
          { o: 110, h: 122, l: 109, c: 120 },
          { o: 120, h: 121, l: 110, c: 112 },
          { o: 112, h: 113, l: 104, c: 106 },
          { o: 106, h: 128, l: 105, c: 126 },
          { o: 126, h: 140, l: 125, c: 138 },
          { o: 138, h: 152, l: 137, c: 150 },
          { o: 150, h: 151, l: 138, c: 140 },
          { o: 140, h: 141, l: 128, c: 130 },
          { o: 130, h: 142, l: 129, c: 140 },
          { o: 140, h: 144, l: 139, c: 142 },
          { o: 142, h: 143, l: 132, c: 134 },
          { o: 134, h: 135, l: 124, c: 126 },
          { o: 126, h: 128, l: 118, c: 120 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 122, from: 3, to: 7, tone: "bull", dashed: true, label: { en: "MSB", tl: "MSB" }, labelPlacement: "center", appearAtStep: 1 },
          { type: "marker", kind: "bos", index: 6, price: 122, tone: "bull", label: { en: "", tl: "" }, appearAtStep: 1 },
          { type: "box", kind: "zone", from: 8, to: 12, top: 158, bottom: 150, tone: "bear", label: { en: "POI (resistance)", tl: "POI (resistance)" }, extend: true, appearAtStep: 2 },
          { type: "line", kind: "level", price: 128, from: 10, to: 14, tone: "bear", dashed: true, label: { en: "MSS", tl: "MSS" }, labelPlacement: "center", appearAtStep: 4 },
          { type: "marker", kind: "mss", index: 14, price: 128, tone: "bear", label: { en: "", tl: "" }, appearAtStep: 4 },
        ],
        steps: [
          {
            caption: { en: "Price is in a bullish trend, making higher highs and higher lows.", tl: "Nasa bullish trend ang price, gumagawa ng higher highs at higher lows." },
            tip: { en: "HH + HL = the trend is up.", tl: "HH + HL = pataas ang trend." },
            revealCandles: 4,
          },
          {
            caption: { en: "Price takes out the previous swing high IN the trend direction. That break is a Market Structure Break (MSB), a continuation. Note it only counts once the level is actually taken out.", tl: "Kinuha ng price ang nakaraang swing high SA direksyon ng trend. Ang break na iyon ay Market Structure Break (MSB), continuation. Tandaan, bilang lang ito kapag na-take out na ang level." },
            tip: { en: "A close beyond the swing high, in the trend direction = MSB.", tl: "Close lampas sa swing high, sa direksyon ng trend = MSB." },
            revealCandles: 7,
          },
          {
            caption: { en: "Price rallies into a higher-timeframe POI (point of interest), what retail calls resistance. Here price can react or reverse.", tl: "Umakyat ang price papunta sa higher-timeframe POI (point of interest), ang tawag ng retail ay resistance. Dito pwedeng mag-react o mag-reverse ang price." },
            tip: { en: "Price reaching a HTF POI = watch for a reaction.", tl: "Pag-abot ng price sa HTF POI = bantayan ang reaksyon." },
            revealCandles: 9,
          },
          {
            caption: { en: "Price reacts off the POI and pulls back. The trend is being tested.", tl: "Nag-react ang price mula sa POI at nag-pullback. Sinusubok ang trend." },
            tip: { en: "A sharp rejection at the POI is the first clue of a turn.", tl: "Matalim na rejection sa POI ang unang palatandaan ng liko." },
            revealCandles: 12,
          },
          {
            caption: { en: "Now price breaks the last higher low AGAINST the trend. That break is a Market Structure Shift (MSS), the reversal signal.", tl: "Ngayon, binreak ng price ang huling higher low LABAN sa trend. Ang break na iyon ay Market Structure Shift (MSS), ang senyales ng reversal." },
            tip: { en: "A close below the last higher low, against the trend = MSS.", tl: "Close below sa huling higher low, laban sa trend = MSS." },
            revealCandles: 16,
          },
        ],
        caption: {
          en: "Price breaks a swing high in the trend direction, which is an MSB (continuation). After tapping the POI (resistance), it breaks the last higher low against the trend, which is an MSS (reversal).",
          tl: "Nag-break ang price sa swing high kasabay ng trend, iyon ang MSB (continuation). Pagkatapos tumama sa POI (resistance), ni-break nito ang huling higher low kontra sa trend, iyon ang MSS (reversal).",
        },
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "A bearish trend breaks the same way, just downward: break a swing low, retrace, break the next swing low, again and again. That pullback between two breaks is called a retracement. Break, retrace, break is the rhythm of a trend.",
        tl: "Ang bearish trend ay nag-break ng ganoon din, pababa lang: i-break ang swing low, mag-retrace, i-break ang susunod na swing low, paulit-ulit. Ang pullback na iyon sa pagitan ng dalawang break ay tinatawag na retracement. Break, retrace, break ang ritmo ng trend.",
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "Think of the POI like a wall or a floor: when price hits a higher-timeframe point of interest (what retail calls support/resistance), it can react or reverse, like a ball bouncing off the floor or ceiling. The MSS confirms the reversal; afterwards, breaks along the NEW trend are MSBs again. These POIs are also called premium & discount arrays (PDRAs), and we cover them in later topics.",
        tl: "Isipin ang POI parang pader o sahig: pag tumama ang price sa higher-timeframe point of interest (ang tawag ng retail ay support/resistance), pwede itong mag-react o mag-reverse, parang bolang tumatalbog sa sahig o kisame. Kinukumpirma ng MSS ang reversal; pagkatapos, ang mga break kasabay ng BAGONG trend ay MSB na ulit. Ang mga POI na ito ay tinatawag ding premium & discount arrays (PDRAs), at tatalakayin sa susunod na topics.",
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
        en: "MSB is a break in the SAME direction as the trend: continuation.",
        tl: "Ang MSB ay break sa PAREHONG direksyon ng trend: continuation.",
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
        en: "MSS breaks structure against the trend: a reversal signal.",
        tl: "Nira-break ng MSS ang structure kontra sa trend: senyales ng reversal.",
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
        en: "It's only a break once the level is actually taken out, not while approaching.",
        tl: "Break lang kapag na-take out na ang level, hindi habang papalapit pa lang.",
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
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "In a bullish trend, an MSB is a break of…",
        tl: "Sa bullish trend, ang MSB ay break ng…",
      },
      options: [
        { id: "a", text: { en: "A swing high, in the trend direction (up)", tl: "Isang swing high, sa direksyon ng trend (pataas)" } },
        { id: "b", text: { en: "A swing low, downward", tl: "Isang swing low, pababa" } },
        { id: "c", text: { en: "The session open", tl: "Ang session open" } },
        { id: "d", text: { en: "A moving average", tl: "Isang moving average" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Bullish MSB takes out a swing high along the up-trend.",
        tl: "Ang bullish MSB ay kumukuha ng swing high kasabay ng pataas na trend.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "In a bearish trend, an MSB breaks…",
        tl: "Sa bearish trend, ang MSB ay nag-break ng…",
      },
      options: [
        { id: "a", text: { en: "A swing low, downward (along the trend)", tl: "Isang swing low, pababa (kasabay ng trend)" } },
        { id: "b", text: { en: "A swing high, upward", tl: "Isang swing high, pataas" } },
        { id: "c", text: { en: "Nothing", tl: "Wala" } },
        { id: "d", text: { en: "A round number", tl: "Isang round number" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "A bearish MSB takes out a swing low: break, retrace, break, downward.",
        tl: "Ang bearish MSB ay kumukuha ng swing low: break, retrace, break, pababa.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "A POI (point of interest) behaves like…",
        tl: "Ang POI (point of interest) ay kumikilos parang…",
      },
      options: [
        { id: "a", text: { en: "A wall or floor where price can react or reverse", tl: "Pader o sahig kung saan pwedeng mag-react o mag-reverse ang price" } },
        { id: "b", text: { en: "A random price", tl: "Isang random na presyo" } },
        { id: "c", text: { en: "The broker fee", tl: "Ang bayarin ng broker" } },
        { id: "d", text: { en: "A lagging indicator", tl: "Isang lagging indicator" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "A POI is like support/resistance: a wall or floor where price bounces, reacts, or reverses.",
        tl: "Ang POI ay parang support/resistance: pader o sahig kung saan tumatalbog, nag-react, o nag-reverse ang price.",
      },
    },
    {
      id: "q8",
      type: "truefalse",
      prompt: {
        en: "After an MSS flips the trend, breaks along the new trend are MSBs again.",
        tl: "Pagkatapos baliktarin ng MSS ang trend, ang mga break kasabay ng bagong trend ay MSB na ulit.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Once the trend has shifted, continuation breaks in the new direction are MSBs.",
        tl: "Oo. Kapag nag-shift na ang trend, ang mga continuation break sa bagong direksyon ay MSB.",
      },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: {
        en: "The pullback between two breaks (break, retrace, break) is called a…",
        tl: "Ang pullback sa pagitan ng dalawang break (break, retrace, break) ay tinatawag na…",
      },
      options: [
        { id: "a", text: { en: "Retracement", tl: "Retracement" } },
        { id: "b", text: { en: "Expansion", tl: "Expansion" } },
        { id: "c", text: { en: "Gap", tl: "Gap" } },
        { id: "d", text: { en: "Spread", tl: "Spread" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The pullback move between breaks is a retracement.",
        tl: "Ang pullback sa pagitan ng mga break ay retracement.",
      },
    },
    {
      id: "q10",
      type: "truefalse",
      prompt: {
        en: "POIs are also called premium & discount arrays (PDRAs).",
        tl: "Ang POIs ay tinatawag ding premium & discount arrays (PDRAs).",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Points of interest are the premium & discount arrays, covered in later topics.",
        tl: "Oo. Ang points of interest ay ang premium & discount arrays, tatalakayin sa susunod na topics.",
      },
    },
  ],
};
