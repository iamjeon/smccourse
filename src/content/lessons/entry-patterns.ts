// Source: Part 3/Part 3 Lesson 3 - Entry Patterns.txt (verified: matches title)
// COVERAGE (source: Part 3/Part 3 Lesson 3 - Entry Patterns.txt) — every point mapped:
// [x] entry pattern = a repeating price signature used for entries and stop losses (e.g. ICT 2022 model) -> intro + Q1
// [x] patterns form inside the MMXM after the SMR + MSS, using the STH-ITH-STH (breaker) structure -> intro + ep-bear chart + Q2
// [x] Pattern 1: enter at the FVG (or breaker on the retrace); SL above the protected ITH; TP = draw on liquidity (or 1:2/1:3) -> ep-bear chart steps + patterns callout + Q3, Q7, Q8
// [x] Pattern 2: same entry, SL at the short-term high (tighter, bigger RR, but more likely to be liquidated) -> patterns callout + Q4
// [x] Pattern 3: anticipation entry (enter before the right STH fully forms, at an FVG/breaker); SL above the ITH -> patterns callout + Q5
// [x] entry PDRAs/tools: FVG, breaker block, mitigation block, inversion FVG (IFVG), order block -> tools callouts + ep-bull chart + Q6, Q9
// [x] the 50% Fibonacci is the premium/discount equilibrium where entries cluster -> ep-bull chart step2 + equilibrium callout + Q10
// [x] the ITH is a protected high, so it is the safer stop placement (callback to market structure grades) -> patterns callout + Q3
// [x] it is not 100%: price may not return to your entry -> not-guaranteed callout
// [x] TP options: the draw on liquidity, or a fixed 1:2 / 1:3 -> patterns callout + ep charts step3 + Q8
// [x] worked examples (bullish STL-ITL-STL breaker at 50%, Bitcoin FVG, 1-min OB+breaker, bearish raid + mitigation block, GBPUSD mitigation block + inversion FVG) -> how-pros list
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "entry-patterns",
  moduleSlug: "part-3",
  title: { en: "Entry Patterns", tl: "Entry Patterns" },
  summary: {
    en: "Entry patterns are signatures that repeat in price, telling you exactly where to enter and where to put the stop. Inside a market maker model you read the short-term / intermediate-term high trio, then enter from an FVG, breaker, mitigation block, or inversion FVG at the 50% equilibrium.",
    tl: "Ang entry patterns ay mga signature na paulit-ulit sa presyo, nagsasabi kung saan eksakto pumasok at saan ilalagay ang stop. Sa loob ng market maker model, binabasa mo ang short-term / intermediate-term high na trio, tapos pumasok mula sa FVG, breaker, mitigation block, o inversion FVG sa 50% equilibrium.",
  },
  estMinutes: 13,
  sourceFile: "Part 3/Part 3 Lesson 3 - Entry Patterns.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "An entry pattern is a signature in price that repeats again and again. We use these patterns for two things: where to enter, and where to place the stop loss. A well-known example is the ICT 2022 model. The patterns form inside a market maker model, right after the Smart Money Reversal and an MSS, using the short-term and intermediate-term high (or low) structure you already learned.",
        tl: "Ang entry pattern ay isang signature sa presyo na paulit-ulit. Ginagamit natin ang mga ito sa dalawang bagay: kung saan pumasok, at kung saan ilalagay ang stop loss. Isang sikat na halimbawa ay ang ICT 2022 model. Nabubuo ang mga pattern sa loob ng market maker model, kaagad pagkatapos ng Smart Money Reversal at MSS, gamit ang short-term at intermediate-term high (o low) structure na natutunan mo na.",
      },
    },
    {
      kind: "heading",
      text: { en: "The bearish entry pattern", tl: "Ang bearish entry pattern" },
    },
    {
      kind: "chart",
      spec: {
        id: "ep-bear",
        title: { en: "Entering short from the STH-ITH-STH", tl: "Pagpasok ng short mula sa STH-ITH-STH" },
        height: 400,
        candles: [
          { o: 100, h: 102, l: 98, c: 101 },
          { o: 101, h: 109, l: 100, c: 108 },
          { o: 106, h: 107, l: 102, c: 103 },
          { o: 103, h: 114, l: 102, c: 113 },
          { o: 111, h: 112, l: 107, c: 108 },
          { o: 108, h: 113, l: 107, c: 112 },
          { o: 112, h: 113, l: 104, c: 105 },
          { o: 105, h: 106, l: 94, c: 95 },
          { o: 95, h: 101, l: 94, c: 100 },
          { o: 100, h: 101, l: 92, c: 93 },
          { o: 93, h: 94, l: 86, c: 87 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 87, from: 0, to: 10, tone: "bear", dashed: true, label: { en: "Draw on liquidity (TP)", tl: "Draw on liquidity (TP)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "label", index: 1, price: 112, text: { en: "STH", tl: "STH" }, tone: "neutral", appearAtStep: 0 },
          { type: "label", index: 3, price: 117, text: { en: "ITH", tl: "ITH" }, tone: "bull", appearAtStep: 1 },
          { type: "label", index: 5, price: 116, text: { en: "STH", tl: "STH" }, tone: "neutral", appearAtStep: 1 },
          { type: "line", kind: "level", price: 114, from: 3, to: 6, tone: "bull", dashed: true, label: { en: "Protected high (ITH)", tl: "Protected high (ITH)" }, labelPlacement: "center", appearAtStep: 1 },
          { type: "box", kind: "fvg", from: 6, to: 8, bottom: 101, top: 104, tone: "bear", label: { en: "FVG entry", tl: "FVG entry" }, appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 8, price: 101, tone: "bear", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "marker", kind: "sl", index: 3, price: 116, tone: "bear", label: { en: "SL above ITH", tl: "SL above ITH" }, appearAtStep: 2 },
          { type: "label", index: 9, price: 99, text: { en: "Expansion", tl: "Expansion" }, tone: "bear", appearAtStep: 3 },
          { type: "marker", kind: "tp", index: 10, price: 87, tone: "bear", label: { en: "TP", tl: "TP" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "In a bearish order flow, the retracement up builds a short-term high (STH). Your draw on liquidity, the target, rests below.", tl: "Sa bearish order flow, ang retracement pataas ay bumubuo ng short-term high (STH). Ang draw on liquidity mo, ang target, ay nasa ibaba." },
            tip: { en: "First small swing high in the retrace = the STH.", tl: "Unang maliit na swing high sa retrace = ang STH." },
            revealCandles: 2,
          },
          {
            caption: { en: "Price pushes higher to an intermediate-term high (ITH), takes out the STH liquidity, then makes a second STH. That STH, ITH, STH trio is the breaker shape. The ITH is a protected high.", tl: "Tumulak pataas ang presyo papuntang intermediate-term high (ITH), kinuha ang STH liquidity, tapos gumawa ng pangalawang STH. Ang STH, ITH, STH na trio ay ang breaker shape. Ang ITH ay protected high." },
            tip: { en: "STH, then a higher ITH, then STH again = the breaker pattern.", tl: "STH, tapos mas mataas na ITH, tapos STH ulit = ang breaker pattern." },
            revealCandles: 6,
          },
          {
            caption: { en: "Price turns back down and leaves an FVG. Enter short there. Place the stop just above the protected ITH, which is the safe placement.", tl: "Bumaba pabalik ang presyo at nag-iwan ng FVG. Pumasok ng short doon. Ilagay ang stop sa itaas lang ng protected ITH, ang ligtas na lagay." },
            tip: { en: "Enter at the FVG; hide the stop above the protected ITH.", tl: "Pumasok sa FVG; itago ang stop sa itaas ng protected ITH." },
            revealCandles: 9,
          },
          {
            caption: { en: "Price expands down to the draw on liquidity, your take profit. You can also bank a fixed 1:2 or 1:3 instead.", tl: "Nag-eexpand pababa ang presyo papunta sa draw on liquidity, ang take profit mo. Pwede ring kumuha ng fixed 1:2 o 1:3 sa halip." },
            tip: { en: "TP at the draw on liquidity, or take a fixed 1:2 / 1:3.", tl: "TP sa draw on liquidity, o kumuha ng fixed 1:2 / 1:3." },
            revealCandles: 11,
          },
        ],
        caption: {
          en: "Read the STH-ITH-STH, enter at the FVG, stop above the protected ITH, target the draw on liquidity.",
          tl: "Basahin ang STH-ITH-STH, pumasok sa FVG, stop sa itaas ng protected ITH, i-target ang draw on liquidity.",
        },
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "Three entry patterns (same entry, different stops)", tl: "Tatlong entry pattern (parehong entry, ibang stops)" },
      text: {
        en: "Pattern 1: enter at the FVG (or breaker), stop above the protected ITH, the safest choice. Pattern 2: same entry, but stop at the short-term high for a bigger reward-to-risk, with more chance of being liquidated. Pattern 3: an anticipation entry, taken before the right-hand STH fully forms, using an FVG or breaker. In all three, the target is the draw on liquidity, or a fixed 1:2 / 1:3.",
        tl: "Pattern 1: pumasok sa FVG (o breaker), stop sa itaas ng protected ITH, ang pinakaligtas. Pattern 2: parehong entry, pero stop sa short-term high para sa mas malaking reward-to-risk, na may mas malaking tsansang ma-liquidate. Pattern 3: anticipation entry, kinukuha bago tuluyang mabuo ang STH sa kanan, gamit ang FVG o breaker. Sa tatlo, ang target ay ang draw on liquidity, o fixed 1:2 / 1:3.",
      },
    },
    {
      kind: "heading",
      text: { en: "The entry tools (PDRAs)", tl: "Ang mga entry tool (PDRAs)" },
    },
    {
      kind: "list",
      items: [
        { en: "FVG: the fair value gap, your most common entry.", tl: "FVG: ang fair value gap, ang pinakakaraniwang entry." },
        { en: "Breaker block: an order block that price broke through and then returns to from the other side; after a stop hunt it flips into support or resistance.", tl: "Breaker block: order block na binasag ng presyo tapos binabalikan mula sa kabilang panig; pagkatapos ng stop hunt nagiging support o resistance." },
        { en: "Mitigation block: like a breaker but it forms without a stop hunt (a failure swing). It is still a valid PDRA to enter from.", tl: "Mitigation block: parang breaker pero nabubuo nang walang stop hunt (failure swing). Valid pa rin itong PDRA na pasukan." },
        { en: "Inversion FVG (IFVG): an FVG that gets violated and then flips, so the old support becomes resistance (or vice versa) and you enter on the retest.", tl: "Inversion FVG (IFVG): FVG na navayolate tapos bumaliktad, kaya ang dating support ay nagiging resistance (o vice versa) at pumapasok ka sa retest." },
        { en: "Order block: the last opposite-color candle before the move, from the earlier lesson.", tl: "Order block: ang huling kasalungat na kulay na candle bago ang galaw, mula sa naunang lesson." },
      ],
    },
    {
      kind: "heading",
      text: { en: "A bullish entry from a breaker", tl: "Isang bullish entry mula sa breaker" },
    },
    {
      kind: "chart",
      spec: {
        id: "ep-bull",
        title: { en: "Breaker entry at the 50% equilibrium", tl: "Breaker entry sa 50% equilibrium" },
        height: 380,
        candles: [
          { o: 100, h: 104, l: 99, c: 103 },
          { o: 103, h: 107, l: 102, c: 104 },
          { o: 104, h: 105, l: 99, c: 100 },
          { o: 100, h: 101, l: 93, c: 94 },
          { o: 94, h: 108, l: 93, c: 107 },
          { o: 107, h: 109, l: 102, c: 103 },
          { o: 103, h: 104, l: 101, c: 102 },
          { o: 102, h: 110, l: 101, c: 109 },
          { o: 109, h: 115, l: 108, c: 114 },
          { o: 114, h: 120, l: 113, c: 119 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 119, from: 0, to: 9, tone: "bull", dashed: true, label: { en: "Draw on liquidity (TP)", tl: "Draw on liquidity (TP)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 3, price: 93, tone: "bull", label: { en: "Raid (stop hunt)", tl: "Raid (stop hunt)" }, appearAtStep: 0 },
          { type: "marker", kind: "mss", index: 4, price: 108, tone: "bull", label: { en: "MSS", tl: "MSS" }, appearAtStep: 1 },
          { type: "box", kind: "zone", from: 2, to: 2, top: 104, bottom: 100, tone: "bull", label: { en: "Breaker block", tl: "Breaker block" }, appearAtStep: 1 },
          { type: "line", kind: "level", price: 101, from: 4, to: 6, tone: "neutral", dashed: true, label: { en: "50% (equilibrium)", tl: "50% (equilibrium)" }, labelPlacement: "center", appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 6, price: 102, tone: "bull", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "marker", kind: "sl", index: 3, price: 92, tone: "bull", label: { en: "SL below the low", tl: "SL below the low" }, appearAtStep: 2 },
          { type: "marker", kind: "tp", index: 9, price: 119, tone: "bull", label: { en: "TP", tl: "TP" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "A bullish setup: price raids a low (a stop hunt) into a higher-timeframe PDRA. The draw on liquidity sits above.", tl: "Bullish setup: rinaid ng presyo ang isang low (stop hunt) papunta sa higher-timeframe PDRA. Ang draw on liquidity ay nasa itaas." },
            tip: { en: "A poke below the low that snaps back up = the raid.", tl: "Pagtusok sa ilalim ng low na bumabalik pataas = ang raid." },
            revealCandles: 4,
          },
          {
            caption: { en: "An MSS up confirms. The down candle that caused the stop hunt now becomes a breaker block, a valid PDRA to enter from.", tl: "Isang MSS pataas ang nagkukumpirma. Ang down candle na nagdulot ng stop hunt ay nagiging breaker block, isang valid PDRA na pasukan." },
            tip: { en: "After the MSS, the down candle before the low flips into a breaker.", tl: "Pagkatapos ng MSS, ang down candle bago ang low ay nagiging breaker." },
            revealCandles: 5,
          },
          {
            caption: { en: "Price retraces to the breaker, around the 50% equilibrium of the leg (the line between premium above and discount below). Enter there, with the stop below the raided low.", tl: "Nag-retrace ang presyo papunta sa breaker, sa paligid ng 50% equilibrium ng leg (ang linya sa pagitan ng premium sa itaas at discount sa ibaba). Pumasok doon, na ang stop ay sa ilalim ng rinaid na low." },
            tip: { en: "Entries cluster at the 50% equilibrium. Stop goes below the raided low.", tl: "Nagsisiksikan ang entries sa 50% equilibrium. Ang stop ay sa ilalim ng rinaid na low." },
            revealCandles: 7,
          },
          {
            caption: { en: "Price expands up to the draw on liquidity, your take profit, or bank a fixed 1:2 or 1:3.", tl: "Nag-eexpand pataas ang presyo papunta sa draw on liquidity, ang take profit mo, o kumuha ng fixed 1:2 o 1:3." },
            tip: { en: "TP at the draw on liquidity above, or a fixed 1:2 / 1:3.", tl: "TP sa draw on liquidity sa itaas, o fixed 1:2 / 1:3." },
            revealCandles: 10,
          },
        ],
        caption: {
          en: "Raid, MSS, breaker forms, enter at the 50% equilibrium, stop below the low, target the draw on liquidity.",
          tl: "Raid, MSS, mabubuo ang breaker, pumasok sa 50% equilibrium, stop sa ilalim ng low, i-target ang draw on liquidity.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "The 50% equilibrium", tl: "Ang 50% equilibrium" },
      text: {
        en: "Draw a Fibonacci over the leg: the 50% is the equilibrium. Above it is premium (expensive), below it is discount (cheap). Entries cluster at the 50%, where the FVG, breaker, or mitigation block usually sits.",
        tl: "Mag-drawing ng Fibonacci sa leg: ang 50% ang equilibrium. Sa itaas nito ay premium (mahal), sa ibaba ay discount (mura). Nagsisiksikan ang entries sa 50%, kung saan kadalasang nasa FVG, breaker, o mitigation block.",
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "It is not 100%", tl: "Hindi ito 100%" },
      text: {
        en: "Price does not always come back to your entry. Sometimes it runs without you. That is normal. Pick the pattern whose stop you are comfortable with, and accept that some setups will be missed.",
        tl: "Hindi laging bumabalik ang presyo sa entry mo. Minsan tumatakbo ito nang wala ka. Normal iyon. Piliin ang pattern na kumportable ka sa stop, at tanggapin na may mga setup na malalampasan.",
      },
    },
    {
      kind: "heading",
      level: 3,
      text: { en: "How pros apply it", tl: "Paano ito ginagamit ng mga pro" },
    },
    {
      kind: "list",
      items: [
        {
          en: "Bullish: after a STL-ITL-STL formed, they entered at the breaker around the 50%, or at the FVG, stop below the latest low.",
          tl: "Bullish: pagkatapos mabuo ang STL-ITL-STL, pumasok sila sa breaker sa paligid ng 50%, o sa FVG, stop sa ilalim ng pinakabagong low.",
        },
        {
          en: "Bitcoin and a 1-minute example: entries came from an FVG and an order block after the three lows formed, then price expanded to the draw on liquidity.",
          tl: "Bitcoin at isang 1-minutong halimbawa: ang entries ay galing sa FVG at order block pagkatapos mabuo ang tatlong lows, tapos nag-expand ang presyo papunta sa draw on liquidity.",
        },
        {
          en: "GBPUSD: after the higher-timeframe FVG was hit, the entry was a mitigation block, and on another the entry was an inversion FVG. Both targeted the draw on liquidity.",
          tl: "GBPUSD: pagkatapos matamaan ang higher-timeframe FVG, ang entry ay mitigation block, at sa isa pa ay inversion FVG. Parehong tinarget ang draw on liquidity.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "Entry patterns repeat: read the STH-ITH-STH inside the model, then enter from an FVG, breaker, mitigation block, inversion FVG, or order block at the 50% equilibrium. Use the safe stop above/below the protected ITH/ITL, or a tighter stop at the short-term level for more RR. Target the draw on liquidity or a fixed 1:2 / 1:3.",
        tl: "Paulit-ulit ang entry patterns: basahin ang STH-ITH-STH sa loob ng model, tapos pumasok mula sa FVG, breaker, mitigation block, inversion FVG, o order block sa 50% equilibrium. Gamitin ang ligtas na stop sa itaas/ibaba ng protected ITH/ITL, o mas masikip na stop sa short-term level para sa mas malaking RR. I-target ang draw on liquidity o fixed 1:2 / 1:3.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "What is an entry pattern?",
        tl: "Ano ang entry pattern?",
      },
      options: [
        { id: "a", text: { en: "A signature in price that repeats, used for entries and stop losses", tl: "Isang signature sa presyo na paulit-ulit, ginagamit para sa entries at stop losses" } },
        { id: "b", text: { en: "A guaranteed winning trade", tl: "Isang garantisadong panalong trade" } },
        { id: "c", text: { en: "A type of broker order", tl: "Isang uri ng broker order" } },
        { id: "d", text: { en: "A news calendar", tl: "Isang news calendar" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "It is a repeating price signature you use to decide where to enter and where to place the stop.",
        tl: "Ito ay paulit-ulit na price signature na ginagamit para magdesisyon kung saan pumasok at saan ilalagay ang stop.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "The bearish entry pattern is read from which structure?",
        tl: "Ang bearish entry pattern ay binabasa mula sa anong structure?",
      },
      options: [
        { id: "a", text: { en: "The STH-ITH-STH trio (the breaker shape)", tl: "Ang STH-ITH-STH na trio (ang breaker shape)" } },
        { id: "b", text: { en: "A single candle", tl: "Isang candle" } },
        { id: "c", text: { en: "A moving average crossover", tl: "Isang moving average crossover" } },
        { id: "d", text: { en: "The daily open only", tl: "Ang daily open lamang" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "It forms from the short-term high, intermediate-term high, short-term high trio inside the model.",
        tl: "Nabubuo ito mula sa short-term high, intermediate-term high, short-term high na trio sa loob ng model.",
      },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: {
        en: "In Pattern 1, the safest stop loss goes…",
        tl: "Sa Pattern 1, ang pinakaligtas na stop loss ay…",
      },
      options: [
        { id: "a", text: { en: "Just beyond the protected ITH", tl: "Lampas lang sa protected ITH" } },
        { id: "b", text: { en: "On the entry FVG", tl: "Sa entry FVG" } },
        { id: "c", text: { en: "Below the target", tl: "Sa ilalim ng target" } },
        { id: "d", text: { en: "Nowhere, no stop", tl: "Wala, walang stop" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The ITH is protected, so a stop just beyond it is the safest placement.",
        tl: "Protected ang ITH, kaya ang stop lampas lang dito ang pinakaligtas.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "Pattern 2 places the stop at the short-term high. What is the trade-off?",
        tl: "Inilalagay ng Pattern 2 ang stop sa short-term high. Ano ang trade-off?",
      },
      options: [
        { id: "a", text: { en: "Bigger reward-to-risk, but more chance of being liquidated", tl: "Mas malaking reward-to-risk, pero mas malaking tsansang ma-liquidate" } },
        { id: "b", text: { en: "Smaller reward and totally safe", tl: "Mas maliit na reward at ganap na ligtas" } },
        { id: "c", text: { en: "No difference at all", tl: "Walang pagkakaiba" } },
        { id: "d", text: { en: "It removes the target", tl: "Inaalis nito ang target" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "A tighter stop at the short-term high gives more RR but is easier for the market to liquidate.",
        tl: "Ang mas masikip na stop sa short-term high ay nagbibigay ng mas malaking RR pero mas madaling ma-liquidate.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "Pattern 3 is best described as…",
        tl: "Ang Pattern 3 ay pinakamahusay ilarawan bilang…",
      },
      options: [
        { id: "a", text: { en: "An anticipation entry, before the right-hand STH fully forms", tl: "Anticipation entry, bago tuluyang mabuo ang STH sa kanan" } },
        { id: "b", text: { en: "An entry only after the trade is already over", tl: "Entry lang pagkatapos na ng trade" } },
        { id: "c", text: { en: "A counter-trend entry", tl: "Counter-trend entry" } },
        { id: "d", text: { en: "Never entering", tl: "Hindi kailanman pumasok" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Pattern 3 anticipates the right STH, entering early at an FVG or breaker, stop above the ITH.",
        tl: "Inaasahan ng Pattern 3 ang STH sa kanan, pumapasok nang maaga sa FVG o breaker, stop sa itaas ng ITH.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "Which of these is NOT one of the entry PDRAs mentioned?",
        tl: "Alin sa mga ito ang HINDI kabilang sa entry PDRAs na binanggit?",
      },
      options: [
        { id: "a", text: { en: "A moving average crossover", tl: "Moving average crossover" } },
        { id: "b", text: { en: "Breaker block", tl: "Breaker block" } },
        { id: "c", text: { en: "Mitigation block", tl: "Mitigation block" } },
        { id: "d", text: { en: "Inversion FVG", tl: "Inversion FVG" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The entry tools are the FVG, breaker, mitigation block, inversion FVG, and order block, not moving averages.",
        tl: "Ang entry tools ay FVG, breaker, mitigation block, inversion FVG, at order block, hindi moving averages.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "Where is the take profit usually placed?",
        tl: "Saan kadalasang inilalagay ang take profit?",
      },
      options: [
        { id: "a", text: { en: "At the draw on liquidity (or a fixed 1:2 / 1:3)", tl: "Sa draw on liquidity (o fixed 1:2 / 1:3)" } },
        { id: "b", text: { en: "At the entry price", tl: "Sa entry price" } },
        { id: "c", text: { en: "At the stop loss", tl: "Sa stop loss" } },
        { id: "d", text: { en: "There is no take profit", tl: "Walang take profit" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Target the draw on liquidity, or bank a fixed 1:2 or 1:3 reward-to-risk.",
        tl: "I-target ang draw on liquidity, o kumuha ng fixed 1:2 o 1:3 reward-to-risk.",
      },
    },
    {
      id: "q8",
      type: "truefalse",
      prompt: {
        en: "A fixed 1:2 or 1:3 reward-to-risk is a valid take-profit choice instead of the draw on liquidity.",
        tl: "Ang fixed 1:2 o 1:3 reward-to-risk ay valid na take-profit imbes na draw on liquidity.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. You can target the draw on liquidity or simply bank a fixed 1:2 or 1:3.",
        tl: "Oo. Pwede mong i-target ang draw on liquidity o kumuha lang ng fixed 1:2 o 1:3.",
      },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: {
        en: "An inversion FVG (IFVG) is…",
        tl: "Ang inversion FVG (IFVG) ay…",
      },
      options: [
        { id: "a", text: { en: "An FVG that is violated and flips, so old support becomes resistance (or vice versa)", tl: "FVG na navayolate at bumaliktad, kaya ang dating support ay nagiging resistance (o vice versa)" } },
        { id: "b", text: { en: "A brand new FVG with no history", tl: "Isang bagong FVG na walang history" } },
        { id: "c", text: { en: "A moving average", tl: "Isang moving average" } },
        { id: "d", text: { en: "The same as a swing high", tl: "Pareho ng swing high" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "An IFVG is an FVG that gets violated and then acts from the opposite side, where you enter on the retest.",
        tl: "Ang IFVG ay FVG na navayolate tapos kumikilos mula sa kabilang panig, kung saan pumapasok ka sa retest.",
      },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: {
        en: "On a Fibonacci, the 50% level represents…",
        tl: "Sa Fibonacci, ang 50% level ay kumakatawan sa…",
      },
      options: [
        { id: "a", text: { en: "The equilibrium between premium (above) and discount (below)", tl: "Ang equilibrium sa pagitan ng premium (itaas) at discount (ibaba)" } },
        { id: "b", text: { en: "The stop loss", tl: "Ang stop loss" } },
        { id: "c", text: { en: "The take profit only", tl: "Ang take profit lamang" } },
        { id: "d", text: { en: "A news time", tl: "Isang oras ng news" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The 50% is the equilibrium: above is premium, below is discount, and entries cluster there.",
        tl: "Ang 50% ang equilibrium: sa itaas ay premium, sa ibaba ay discount, at nagsisiksikan ang entries doon.",
      },
    },
  ],
};
