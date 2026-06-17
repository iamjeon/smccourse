// Source: Basic TradingCourse/Fair Value Gap.txt (verified: matches title)
// COVERAGE (source: Basic TradingCourse/Fair Value Gap.txt) — every point mapped:
// [x] FVG (a.k.a. imbalance) = a 3-candle pattern where candle 1's wick does not overlap candle 3's wick; the gap sits on the middle candle -> intro + fvg-bullish chart + Q1
// [x] it marks an inefficient, fast move that price often returns to 'rebalance' -> intro + chart step2
// [x] bullish FVG (BISI) = high of candle 1 + low of candle 3 -> paragraph + chart + Q2
// [x] bearish FVG (SIBI) = low of candle 1 + high of candle 3 -> paragraph + Q5
// [x] price retraces back into the FVG, which acts as support (bull) or resistance (bear); it is a point of interest / PDRA -> chart + inversion note + Q6
// [x] entry at the high of a bullish FVG (or the 50%), NOT the bottom (you get left behind) -> entry callout + Q6
// [x] stop loss at the swing low (or the candle body / order block); target 1:2 as a beginner -> entry callout + Q7
// [x] FVG vs volume imbalance (a gap between candle BODIES, wicks overlap) vs opening gap (a true gap between candles; indices/forex weekends) -> types callout + Q8
// [x] there is NO FVG when candle 1 and candle 3 overlap -> no-fvg note + Q9
// [x] inversion FVG: a candle BODY close through the FVG disrespects it; former support becomes resistance; a wick is okay -> inversion paragraph + Q3, Q10
// [x] do not blindly set limit orders at every FVG; drop to a lower timeframe for confirmation first -> warning callout + Q4 context
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
        en: "A Fair Value Gap (also called imbalance) is a three-candlestick pattern where the wick of candle 1 does not overlap the wick of candle 3. That leaves a gap on the middle candle: the FVG. It marks an inefficient, fast move that price often returns to 'rebalance.'",
        tl: "Ang Fair Value Gap (tinatawag ding imbalance) ay isang three-candlestick pattern kung saan ang wick ng candle 1 ay hindi nag-overlap sa wick ng candle 3. May naiiwang gap sa gitnang candle: ang FVG. Senyales ito ng mabilis, inefficient na move na madalas binabalikan ng price para 'mag-rebalance.'",
      },
    },
    {
      kind: "heading",
      text: { en: "How an FVG forms", tl: "Paano nabubuo ang FVG" },
    },
    {
      kind: "paragraph",
      text: {
        en: "For a bullish FVG (BISI: buy-side imbalance, sell-side inefficiency), mark the high of candle 1 and the low of candle 3. The space between them is the gap. A bearish FVG (SIBI: sell-side imbalance, buy-side inefficiency) is the mirror: the low of candle 1 and the high of candle 3.",
        tl: "Para sa bullish FVG (BISI: buy-side imbalance, sell-side inefficiency), i-mark ang high ng candle 1 at ang low ng candle 3. Ang pagitan nila ang gap. Ang bearish FVG (SIBI: sell-side imbalance, buy-side inefficiency) ay kabaligtaran: ang low ng candle 1 at ang high ng candle 3.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "fvg-bullish",
        title: { en: "Bullish FVG → retrace → continuation", tl: "Bullish FVG → retrace → continuation" },
        height: 360,
        candles: [
          { o: 100, h: 102, l: 98, c: 101 },
          { o: 101, h: 104, l: 100, c: 103 },
          { o: 103, h: 120, l: 103, c: 118 },
          { o: 118, h: 132, l: 112, c: 130 },
          { o: 130, h: 133, l: 126, c: 128 },
          { o: 128, h: 129, l: 116, c: 118 },
          { o: 118, h: 119, l: 110, c: 112 },
          { o: 112, h: 126, l: 111, c: 124 },
          { o: 124, h: 138, l: 123, c: 136 },
          { o: 136, h: 146, l: 135, c: 144 },
        ],
        annotations: [
          {
            type: "box",
            kind: "fvg",
            from: 1,
            to: 6,
            top: 112,
            bottom: 104,
            tone: "gold",
            label: { en: "FVG", tl: "FVG" },
            appearAtStep: 1,
          },
          { type: "marker", kind: "entry", index: 6, price: 110, tone: "bull", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
        ],
        steps: [
          {
            caption: { en: "An impulsive up-move prints three candles fast. The middle candle barely overlaps the ones around it.", tl: "May impulsive up-move na nag-print ng tatlong candle nang mabilis. Halos hindi nag-o-overlap ang gitnang candle sa mga katabi." },
            tip: { en: "A fast 3-candle burst is where to look for the gap.", tl: "Sa mabilis na 3-candle burst hanapin ang gap." },
            revealCandles: 3,
          },
          {
            caption: { en: "Mark candle 1's high and candle 3's low. The space between them, which the wicks never filled, is the FVG.", tl: "I-mark ang high ng candle 1 at low ng candle 3. Ang pagitan nila, na hindi napunan ng wicks, ang FVG." },
            tip: { en: "Gap between candle 1 high and candle 3 low = a bullish FVG.", tl: "Gap sa pagitan ng high ng candle 1 at low ng candle 3 = bullish FVG." },
            revealCandles: 4,
          },
          {
            caption: { en: "Price retraces back into the FVG and reacts off it like support. Enter at the high of the FVG.", tl: "Bumalik ang price papasok sa FVG at nag-react dito parang support. Pumasok sa high ng FVG." },
            tip: { en: "A tap into the FVG that holds = the entry, at the FVG high.", tl: "Pagtama sa FVG na humawak = ang entry, sa high ng FVG." },
            revealCandles: 7,
          },
          {
            caption: { en: "Price continues higher. As a beginner, target 1:2.", tl: "Tuloy pataas ang price. Bilang beginner, target 1:2." },
            tip: { en: "Bank the move; 1:2 protects your win-rate and psychology.", tl: "Kunin ang move; pinoprotektahan ng 1:2 ang win-rate at psychology mo." },
            revealCandles: 10,
          },
        ],
        caption: {
          en: "Candle 1 high to candle 3 low is the FVG. Price retraces into it, then continues. Enter at the FVG high, target 1:2.",
          tl: "High ng candle 1 hanggang low ng candle 3 ang FVG. Bumabalik ang price dito, tapos tuloy. Pumasok sa FVG high, target 1:2.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Entry, stop, target", tl: "Entry, stop, target" },
      text: {
        en: "Enter at the high of a bullish FVG (or its 50%), not at the very bottom, or a fast move can leave you behind. Place the stop loss at the swing low (or the candle body / order block), and target 1:2, a higher win-rate target that protects your psychology as a beginner.",
        tl: "Mag-enter sa high ng bullish FVG (o sa 50% nito), hindi sa pinakailalim, kung hindi maiiwan ka ng mabilis na move. Ilagay ang stop loss sa swing low (o sa candle body / order block), at target 1:2, mas mataas ang win-rate at proteksyon sa psychology mo bilang beginner.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: {
        en: "FVG vs. volume imbalance vs. opening gap",
        tl: "FVG vs. volume imbalance vs. opening gap",
      },
      text: {
        en: "Don't confuse these: a fair value gap is the gap left in the MIDDLE of three candles (wicks do not overlap). A volume imbalance is a gap between two candle BODIES (the wicks still overlap). An opening gap is a true gap between candles (common on indices and over forex weekends). As a beginner, focus on the FVG. It's what we mostly use.",
        tl: "Huwag ipagkamali: ang fair value gap ay ang gap sa GITNA ng tatlong candle (hindi nag-o-overlap ang wicks). Ang volume imbalance ay gap sa pagitan ng dalawang candle BODY (nag-o-overlap pa ang wicks). Ang opening gap ay tunay na gap sa pagitan ng mga candle (madalas sa indices at sa forex tuwing weekend). Bilang beginner, FVG muna ang pagtuunan. Yan ang madalas nating gamitin.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "When there is NO FVG", tl: "Kapag WALANG FVG" },
      text: {
        en: "If candle 1 and candle 3 overlap (their wicks share price), there is no gap, so there is no FVG. The wicks must NOT overlap for a valid FVG.",
        tl: "Kung nag-o-overlap ang candle 1 at candle 3 (nagsasalubong ang wicks), walang gap, kaya walang FVG. Hindi dapat mag-overlap ang wicks para sa valid na FVG.",
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
        en: "Sometimes price doesn't respect an FVG. If a candle body closes through the FVG (e.g. closes below a bullish FVG's low), the FVG is 'disrespected' and inverts: a former support area now acts as resistance. Price may retrace back into it and then continue in the new direction. A wick through it is okay. It's the body close that signals the inversion.",
        tl: "Minsan hindi nirerespeto ng price ang FVG. Kapag may candle body na nag-close lampas sa FVG (hal. nag-close below sa low ng bullish FVG), ang FVG ay 'na-disrespect' at nag-invert: ang dating support ay nagiging resistance na. Pwedeng bumalik ang price dito tapos magtuloy sa bagong direksyon. Okay lang ang wick. Ang body close ang senyales ng inversion.",
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Don't blindly set limit orders", tl: "Huwag basta maglagay ng limit orders" },
      text: {
        en: "Don't drop a limit order at every FVG. An FVG is a point of interest (a PDRA), not a guaranteed entry. Drop to a lower timeframe and look for confirmation first, which we cover in the top-down analysis topics.",
        tl: "Huwag basta maglagay ng limit order sa bawat FVG. Ang FVG ay point of interest (PDRA), hindi garantisadong entry. Bumaba sa lower timeframe at maghanap muna ng confirmation, na tatalakayin sa top-down analysis topics.",
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
      chart: {
        id: "q-fvg",
        height: 220,
        candles: [
          { o: 101, h: 104, l: 100, c: 103 },
          { o: 103, h: 113, l: 103, c: 112 },
          { o: 112, h: 116, l: 108, c: 115 },
        ],
        annotations: [
          { type: "box", kind: "fvg", from: 0, to: 2, top: 108, bottom: 104, tone: "gold", label: { en: "FVG", tl: "FVG" } },
        ],
        caption: {
          en: "The shaded FVG forms across these three candles. What two prices bound it?",
          tl: "Ang shaded FVG ay nabuo sa tatlong candle. Anong dalawang presyo ang hangganan nito?",
        },
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
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "A bearish FVG (SIBI) is bounded by…",
        tl: "Ang bearish FVG (SIBI) ay nasa pagitan ng…",
      },
      options: [
        { id: "a", text: { en: "The low of candle 1 and the high of candle 3", tl: "Low ng candle 1 at high ng candle 3" } },
        { id: "b", text: { en: "The high of candle 1 and the low of candle 3", tl: "High ng candle 1 at low ng candle 3" } },
        { id: "c", text: { en: "Two equal lows", tl: "Dalawang pantay na lows" } },
        { id: "d", text: { en: "The session open", tl: "Ang session open" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "A bearish FVG is the mirror: the low of candle 1 and the high of candle 3.",
        tl: "Ang bearish FVG ay kabaligtaran: ang low ng candle 1 at high ng candle 3.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "Where do you enter a bullish FVG?",
        tl: "Saan ka pumapasok sa bullish FVG?",
      },
      options: [
        { id: "a", text: { en: "At the high of the FVG (or the 50%)", tl: "Sa high ng FVG (o sa 50%)" } },
        { id: "b", text: { en: "At the very bottom of the FVG", tl: "Sa pinakailalim ng FVG" } },
        { id: "c", text: { en: "Far above the FVG", tl: "Malayo sa itaas ng FVG" } },
        { id: "d", text: { en: "Anywhere", tl: "Kahit saan" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Enter at the FVG high (or 50%); entering at the very bottom can leave you behind on a fast move.",
        tl: "Pumasok sa FVG high (o 50%); ang pagpasok sa pinakailalim ay pwedeng mag-iwan sa'yo sa mabilis na move.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "Where does the stop loss usually go on an FVG entry?",
        tl: "Saan kadalasang inilalagay ang stop loss sa FVG entry?",
      },
      options: [
        { id: "a", text: { en: "At the swing low (or the candle body / order block)", tl: "Sa swing low (o sa candle body / order block)" } },
        { id: "b", text: { en: "At the take profit", tl: "Sa take profit" } },
        { id: "c", text: { en: "Above the FVG high", tl: "Sa itaas ng FVG high" } },
        { id: "d", text: { en: "There is no stop", tl: "Walang stop" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Hide the stop at the swing low (or the candle body) below the bullish FVG.",
        tl: "Itago ang stop sa swing low (o candle body) sa ilalim ng bullish FVG.",
      },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: {
        en: "How is a volume imbalance different from an FVG?",
        tl: "Paano naiiba ang volume imbalance sa FVG?",
      },
      options: [
        { id: "a", text: { en: "It is a gap between candle BODIES, while the wicks still overlap", tl: "Gap ito sa pagitan ng candle BODY, habang nag-o-overlap pa ang wicks" } },
        { id: "b", text: { en: "It is exactly the same thing", tl: "Eksaktong pareho lang" } },
        { id: "c", text: { en: "It only happens on weekends", tl: "Nangyayari lang tuwing weekend" } },
        { id: "d", text: { en: "It is a moving average", tl: "Isang moving average" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "A volume imbalance is a gap between bodies (wicks overlap); an FVG has non-overlapping wicks.",
        tl: "Ang volume imbalance ay gap sa pagitan ng bodies (nag-o-overlap ang wicks); ang FVG ay walang overlap na wicks.",
      },
    },
    {
      id: "q9",
      type: "truefalse",
      prompt: {
        en: "If candle 1 and candle 3 overlap, there is no FVG.",
        tl: "Kung nag-o-overlap ang candle 1 at candle 3, walang FVG.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "True. The wicks of candle 1 and 3 must NOT overlap; otherwise there is no gap.",
        tl: "Tama. Hindi dapat mag-overlap ang wicks ng candle 1 at 3; kung hindi, walang gap.",
      },
    },
    {
      id: "q10",
      type: "truefalse",
      prompt: {
        en: "A bullish FVG that gets a candle body close below it inverts and can then act as resistance.",
        tl: "Ang bullish FVG na may candle body na nag-close below dito ay nag-invert at pwedeng maging resistance.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. That is an inversion FVG: a former support becomes resistance after the body close through it.",
        tl: "Oo. Iyon ang inversion FVG: ang dating support ay nagiging resistance pagkatapos ng body close dito.",
      },
    },
  ],
};
