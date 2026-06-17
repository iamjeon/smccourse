// Source: Part 4/Part 4 Lesson 1 - Asian Session High & Low.txt (verified: matches title)
// COVERAGE (source: Part 4/Part 4 Lesson 1 - Asian Session High & Low.txt) — every point mapped:
// [x] the Asian Session High & Low model; similar to the Previous Daily High & Low model -> intro + Q1
// [x] the Asian session forms an Asian high and an Asian low (low volume, choppy) on EURUSD/GBPUSD -> intro + as-bear chart step0 + Q2
// [x] wait for one of the Asian high/low to be taken out (a raid) at the London open -> as-bear chart step1 + Q3
// [x] after the raid: wait for an MSS, then the STH-ITH-STH formation, then enter at a PDRA -> as-bear chart steps + structure callout + Q5
// [x] target = the opposite Asian extreme (raid the high -> target the Asian low; raid the low -> target the Asian high) -> both charts step3 + Q6
// [x] stop loss above the ITH (bearish) or below the ITL (bullish) -> as-bear chart step2 + Q7
// [x] bullish version is the mirror -> as-bull chart + Q6
// [x] entries during the London kill zone, on M1 (M5 formation is stronger but the range is small) -> timeframe callout + Q4, Q8
// [x] use any PDRA for entry: FVG, breaker, or any other PDRA -> tools note + Q5
// [x] do not chase if price runs without you; wait for a retracement, and if it free-falls, skip (a mis-entry) -> chase callout + Q9
// [x] CRITICAL: the entry must be inside the London kill zone; if the pattern forms before the kill zone, do not enter (it likely continues out of the zone) -> killzone callout + Q10
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "asian-session",
  moduleSlug: "part-4",
  title: { en: "Asian Session High & Low Model", tl: "Asian Session High & Low Model" },
  summary: {
    en: "A clean intraday model: the Asian session builds a high and a low, then at the London open price raids one side. You wait for an MSS, enter at a PDRA inside the London kill zone, and target the opposite side of the Asian range.",
    tl: "Isang malinis na intraday model: bumubuo ang Asian session ng high at low, tapos sa London open rinaraid ng presyo ang isang panig. Hinihintay mo ang MSS, pumapasok sa PDRA sa loob ng London kill zone, at tinatarget ang kabilang panig ng Asian range.",
  },
  estMinutes: 12,
  sourceFile: "Part 4/Part 4 Lesson 1 - Asian Session High & Low.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "The Asian Session High & Low model is close cousin to the Previous Daily High & Low model. During the Asian session, pairs like EURUSD and GBPUSD have low volume, so price just chops sideways and leaves a clear Asian high and Asian low. At the London open, price raids one of those edges, and that is where the trade begins.",
        tl: "Ang Asian Session High & Low model ay malapit na kamag-anak ng Previous Daily High & Low model. Sa Asian session, ang mga pair gaya ng EURUSD at GBPUSD ay mababa ang volume, kaya pa-gilid lang ang presyo at nag-iiwan ng malinaw na Asian high at Asian low. Sa London open, rinaraid ng presyo ang isa sa mga gilid na iyon, at doon nagsisimula ang trade.",
      },
    },
    {
      kind: "heading",
      text: { en: "A bearish Asian session trade", tl: "Isang bearish Asian session trade" },
    },
    {
      kind: "chart",
      spec: {
        id: "as-bear",
        title: { en: "Raid the Asian high, target the Asian low", tl: "Raid ang Asian high, target ang Asian low" },
        height: 400,
        candles: [
          { o: 100, h: 109, l: 97, c: 108 },
          { o: 108, h: 110, l: 96, c: 100 },
          { o: 100, h: 108, l: 99, c: 107 },
          { o: 107, h: 114, l: 107, c: 113 },
          { o: 113, h: 114, l: 106, c: 107 },
          { o: 107, h: 112, l: 106, c: 111 },
          { o: 111, h: 112, l: 102, c: 103 },
          { o: 103, h: 104, l: 100, c: 101 },
          { o: 101, h: 105, l: 100, c: 104 },
          { o: 104, h: 105, l: 97, c: 98 },
          { o: 98, h: 99, l: 95, c: 96 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 110, from: 0, to: 3, tone: "neutral", dashed: true, label: { en: "Asian high", tl: "Asian high" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "line", kind: "level", price: 96, from: 0, to: 10, tone: "bear", dashed: true, label: { en: "Asian low (target)", tl: "Asian low (target)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 3, price: 115, tone: "bear", label: { en: "Raid (London open)", tl: "Raid (London open)" }, appearAtStep: 1 },
          { type: "marker", kind: "mss", index: 6, price: 101, tone: "bear", label: { en: "MSS", tl: "MSS" }, appearAtStep: 2 },
          { type: "box", kind: "fvg", from: 5, to: 7, bottom: 104, top: 106, tone: "bear", label: { en: "PDRA entry (FVG)", tl: "PDRA entry (FVG)" }, appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 8, price: 105, tone: "bear", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "marker", kind: "sl", index: 3, price: 116, tone: "bear", label: { en: "SL above the high", tl: "SL above the high" }, appearAtStep: 2 },
          { type: "marker", kind: "tp", index: 10, price: 96, tone: "bear", label: { en: "Asian low hit", tl: "Asian low hit" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "The Asian session leaves a range: an Asian high and an Asian low. Volume is low, so price just chops. Mark both edges first.", tl: "Nag-iiwan ang Asian session ng range: isang Asian high at isang Asian low. Mababa ang volume, kaya pa-gilid lang ang presyo. Markahan muna ang magkabilang gilid." },
            tip: { en: "The top and bottom of the quiet Asian range = the Asian high and low.", tl: "Ang taas at ibaba ng tahimik na Asian range = ang Asian high at low." },
            revealCandles: 3,
          },
          {
            caption: { en: "At the London open, inside the kill zone, price raids the Asian high, sweeping the liquidity resting above it.", tl: "Sa London open, sa loob ng kill zone, rinaraid ng presyo ang Asian high, kinukuha ang liquidity na nakahimpil sa itaas nito." },
            tip: { en: "A poke above the Asian high that snaps back = the raid.", tl: "Pagtusok lampas sa Asian high na bumabalik = ang raid." },
            revealCandles: 4,
          },
          {
            caption: { en: "Wait for an MSS down to confirm. Then enter at a PDRA, here an FVG, with the stop above the Asian high. These entries belong on M1, inside the London kill zone.", tl: "Hintayin ang MSS pababa para kumpirmahin. Tapos pumasok sa PDRA, dito FVG, na ang stop ay sa itaas ng Asian high. Ang mga entry na ito ay nasa M1, sa loob ng London kill zone." },
            tip: { en: "MSS down, then enter at the FVG/breaker; stop above the Asian high.", tl: "MSS pababa, tapos pumasok sa FVG/breaker; stop sa itaas ng Asian high." },
            revealCandles: 9,
          },
          {
            caption: { en: "Price expands down to the opposite side of the range, the Asian low. That is your target.", tl: "Nag-eexpand pababa ang presyo papunta sa kabilang panig ng range, ang Asian low. Iyon ang target mo." },
            tip: { en: "Target the opposite edge: raid the high, aim for the low.", tl: "I-target ang kabilang gilid: raid ang high, tumudla sa low." },
            revealCandles: 11,
          },
        ],
        caption: {
          en: "Asian range, London raid of the high, MSS down, FVG entry (stop above the high), target the Asian low.",
          tl: "Asian range, London raid ng high, MSS pababa, FVG entry (stop sa itaas ng high), target ang Asian low.",
        },
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "The entry must be in the London kill zone", tl: "Ang entry ay dapat nasa London kill zone" },
      text: {
        en: "This is the most important rule of the model. If the STH-ITH-STH pattern forms BEFORE the London kill zone, do not enter, price will likely keep running out of the zone. Wait until you are inside the kill zone, where the PDRAs start to be respected, then take the entry.",
        tl: "Ito ang pinakamahalagang rule ng model. Kung ang STH-ITH-STH pattern ay nabuo BAGO ang London kill zone, huwag pumasok, malamang patuloy na tatakbo ang presyo palabas ng zone. Maghintay hanggang nasa loob ka ng kill zone, kung saan nagsisimulang igalang ang mga PDRA, tapos kunin ang entry.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Timeframes and entry tools", tl: "Timeframes at entry tools" },
      text: {
        en: "Enter on M1, inside the London kill zone. You can spot the formation on M5 too, which is stronger, but the range is small there and the swing highs and lows are harder to see. Any PDRA works for the entry: an FVG, a breaker block, or another PDRA.",
        tl: "Pumasok sa M1, sa loob ng London kill zone. Pwede mo ring makita ang formation sa M5, na mas malakas, pero maliit ang range doon at mas mahirap makita ang swing highs at lows. Anumang PDRA ay pwede sa entry: FVG, breaker block, o ibang PDRA.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Read the structure first", tl: "Basahin muna ang structure" },
      text: {
        en: "After the raid, wait for the MSS, then for price to build the short-term high, intermediate-term high, short-term high (or the low version), just like the earlier models. Enter on the pattern at a PDRA, and place the stop beyond the protected intermediate-term high or low.",
        tl: "Pagkatapos ng raid, hintayin ang MSS, tapos hintayin na buuin ng presyo ang short-term high, intermediate-term high, short-term high (o ang low na bersyon), gaya ng naunang models. Pumasok sa pattern sa isang PDRA, at ilagay ang stop lampas sa protected intermediate-term high o low.",
      },
    },
    {
      kind: "heading",
      text: { en: "The bullish version (mirror)", tl: "Ang bullish na bersyon (kabaligtaran)" },
    },
    {
      kind: "chart",
      spec: {
        id: "as-bull",
        title: { en: "Raid the Asian low, target the Asian high", tl: "Raid ang Asian low, target ang Asian high" },
        height: 400,
        candles: [
          { o: 110, h: 113, l: 101, c: 102 },
          { o: 102, h: 114, l: 100, c: 110 },
          { o: 110, h: 111, l: 102, c: 103 },
          { o: 103, h: 103, l: 96, c: 97 },
          { o: 97, h: 104, l: 96, c: 103 },
          { o: 103, h: 104, l: 98, c: 99 },
          { o: 99, h: 108, l: 98, c: 107 },
          { o: 107, h: 110, l: 106, c: 109 },
          { o: 109, h: 110, l: 105, c: 106 },
          { o: 106, h: 113, l: 105, c: 112 },
          { o: 112, h: 115, l: 111, c: 114 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 100, from: 0, to: 3, tone: "neutral", dashed: true, label: { en: "Asian low", tl: "Asian low" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "line", kind: "level", price: 114, from: 0, to: 10, tone: "bull", dashed: true, label: { en: "Asian high (target)", tl: "Asian high (target)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 3, price: 95, tone: "bull", label: { en: "Raid (London open)", tl: "Raid (London open)" }, appearAtStep: 1 },
          { type: "marker", kind: "mss", index: 6, price: 108, tone: "bull", label: { en: "MSS", tl: "MSS" }, appearAtStep: 2 },
          { type: "box", kind: "fvg", from: 5, to: 7, bottom: 104, top: 106, tone: "bull", label: { en: "PDRA entry (FVG)", tl: "PDRA entry (FVG)" }, appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 8, price: 105, tone: "bull", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "marker", kind: "sl", index: 3, price: 95, tone: "bull", label: { en: "SL below the low", tl: "SL below the low" }, appearAtStep: 2 },
          { type: "marker", kind: "tp", index: 10, price: 114, tone: "bull", label: { en: "Asian high hit", tl: "Asian high hit" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Same start, mirrored: mark the Asian high and Asian low of the quiet session range.", tl: "Parehong simula, binaliktad: markahan ang Asian high at Asian low ng tahimik na session range." },
            tip: { en: "Mark both edges of the Asian range before the London open.", tl: "Markahan ang magkabilang gilid ng Asian range bago ang London open." },
            revealCandles: 3,
          },
          {
            caption: { en: "At the London open, price raids the Asian low, sweeping the liquidity below it.", tl: "Sa London open, rinaraid ng presyo ang Asian low, kinukuha ang liquidity sa ilalim nito." },
            tip: { en: "A poke below the Asian low that snaps back up = the raid.", tl: "Pagtusok sa ilalim ng Asian low na bumabalik pataas = ang raid." },
            revealCandles: 4,
          },
          {
            caption: { en: "Wait for an MSS up, then enter at the PDRA, with the stop below the Asian low. M1, inside the London kill zone.", tl: "Hintayin ang MSS pataas, tapos pumasok sa PDRA, na ang stop ay sa ilalim ng Asian low. M1, sa loob ng London kill zone." },
            tip: { en: "MSS up, then enter at the FVG/breaker; stop below the Asian low.", tl: "MSS pataas, tapos pumasok sa FVG/breaker; stop sa ilalim ng Asian low." },
            revealCandles: 9,
          },
          {
            caption: { en: "Price expands up to the opposite side, the Asian high. Target reached.", tl: "Nag-eexpand pataas ang presyo papunta sa kabilang panig, ang Asian high. Naabot ang target." },
            tip: { en: "Raid the low, aim for the high.", tl: "Raid ang low, tumudla sa high." },
            revealCandles: 11,
          },
        ],
        caption: {
          en: "Flip everything: raid the Asian low, MSS up, FVG entry (stop below the low), target the Asian high.",
          tl: "Baliktarin lahat: raid ang Asian low, MSS pataas, FVG entry (stop sa ilalim ng low), target ang Asian high.",
        },
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Do not chase", tl: "Huwag humabol" },
      text: {
        en: "If price runs to the target without you, do not chase it. Wait for a retracement to form a clean entry. If instead it free-falls (or free-rises) with no pullback, let it go, that would be a mis-entry.",
        tl: "Kung tumakbo ang presyo papunta sa target nang wala ka, huwag itong habulin. Maghintay ng retracement para sa malinis na entry. Kung sa halip ay diretsong bumagsak (o umakyat) nang walang pullback, hayaan na lang, mis-entry iyon.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "Mark the Asian high and low. At the London open, wait for a raid on one edge, an MSS, and the STH-ITH-STH pattern, then enter at a PDRA on M1 inside the London kill zone. Target the opposite edge of the Asian range, stop beyond the protected level, and never enter outside the kill zone or chase a runaway move.",
        tl: "Markahan ang Asian high at low. Sa London open, hintayin ang raid sa isang gilid, ang MSS, at ang STH-ITH-STH pattern, tapos pumasok sa PDRA sa M1 sa loob ng London kill zone. I-target ang kabilang gilid ng Asian range, stop lampas sa protected level, at huwag kailanman pumasok sa labas ng kill zone o humabol sa tumatakbong galaw.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "The Asian Session High & Low model is most similar to which other model?",
        tl: "Ang Asian Session High & Low model ay pinaka-katulad ng aling ibang model?",
      },
      options: [
        { id: "a", text: { en: "The Previous Daily High & Low model", tl: "Ang Previous Daily High & Low model" } },
        { id: "b", text: { en: "A moving average system", tl: "Isang moving average system" } },
        { id: "c", text: { en: "A news-only strategy", tl: "Isang news-only na strategy" } },
        { id: "d", text: { en: "A buy-and-hold model", tl: "Isang buy-and-hold model" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "It is a close cousin of the Previous Daily High & Low model.",
        tl: "Malapit itong kamag-anak ng Previous Daily High & Low model.",
      },
    },
    {
      id: "q2",
      type: "truefalse",
      prompt: {
        en: "During the Asian session, EURUSD and GBPUSD usually have low volume and chop sideways.",
        tl: "Sa Asian session, ang EURUSD at GBPUSD ay kadalasang mababa ang volume at pa-gilid.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Low Asian volume leaves a sideways range with a clear Asian high and low.",
        tl: "Oo. Ang mababang Asian volume ay nag-iiwan ng sideways range na may malinaw na Asian high at low.",
      },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: {
        en: "What do you wait for at the London open?",
        tl: "Ano ang hinihintay mo sa London open?",
      },
      options: [
        { id: "a", text: { en: "A raid on the Asian high or the Asian low", tl: "Isang raid sa Asian high o Asian low" } },
        { id: "b", text: { en: "A moving average crossover", tl: "Isang moving average crossover" } },
        { id: "c", text: { en: "The market to close", tl: "Ang pagsasara ng market" } },
        { id: "d", text: { en: "Nothing, you enter right away", tl: "Wala, pumapasok ka agad" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "You wait for price to raid one edge of the Asian range.",
        tl: "Hinihintay mong i-raid ng presyo ang isang gilid ng Asian range.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "What is the best entry timeframe for this model?",
        tl: "Ano ang pinakamagandang entry timeframe para sa model na ito?",
      },
      options: [
        { id: "a", text: { en: "M1 (with M5 also usable)", tl: "M1 (gamit din ang M5)" } },
        { id: "b", text: { en: "The monthly", tl: "Ang monthly" } },
        { id: "c", text: { en: "The weekly", tl: "Ang weekly" } },
        { id: "d", text: { en: "Only the daily", tl: "Ang daily lamang" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Enter on M1; M5 works too and is stronger, but the range is small so swings are harder to see.",
        tl: "Pumasok sa M1; gumagana rin ang M5 at mas malakas, pero maliit ang range kaya mas mahirap makita ang swings.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "What can you use for the entry?",
        tl: "Ano ang pwede mong gamitin sa entry?",
      },
      options: [
        { id: "a", text: { en: "Any PDRA: an FVG, breaker, or other PDRA", tl: "Anumang PDRA: FVG, breaker, o ibang PDRA" } },
        { id: "b", text: { en: "Only a round number", tl: "Isang round number lamang" } },
        { id: "c", text: { en: "Only the daily open", tl: "Ang daily open lamang" } },
        { id: "d", text: { en: "Only a news event", tl: "Isang news event lamang" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Use any PDRA: an FVG, a breaker block, or another PDRA, after the MSS and the pattern.",
        tl: "Gamitin ang anumang PDRA: FVG, breaker block, o ibang PDRA, pagkatapos ng MSS at ng pattern.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "If price raids the Asian high, what is your target?",
        tl: "Kung rinaid ng presyo ang Asian high, ano ang target mo?",
      },
      options: [
        { id: "a", text: { en: "The Asian low (the opposite edge)", tl: "Ang Asian low (ang kabilang gilid)" } },
        { id: "b", text: { en: "An even higher high", tl: "Isang mas mataas pang high" } },
        { id: "c", text: { en: "The same Asian high again", tl: "Ang parehong Asian high ulit" } },
        { id: "d", text: { en: "No target", tl: "Walang target" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Target the opposite edge: raid the high, aim for the Asian low (and vice versa).",
        tl: "I-target ang kabilang gilid: raid ang high, tumudla sa Asian low (at vice versa).",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "In the bearish trade, where does the stop loss go?",
        tl: "Sa bearish trade, saan inilalagay ang stop loss?",
      },
      options: [
        { id: "a", text: { en: "Above the protected high (the raided Asian high / ITH)", tl: "Sa itaas ng protected high (ang rinaid na Asian high / ITH)" } },
        { id: "b", text: { en: "Below the entry", tl: "Sa ilalim ng entry" } },
        { id: "c", text: { en: "At the Asian low", tl: "Sa Asian low" } },
        { id: "d", text: { en: "There is no stop", tl: "Walang stop" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The stop goes above the protected high (the raided Asian high / ITH), safe from a quick liquidity grab.",
        tl: "Ang stop ay sa itaas ng protected high (ang rinaid na Asian high / ITH), ligtas sa mabilis na liquidity grab.",
      },
    },
    {
      id: "q8",
      type: "truefalse",
      prompt: {
        en: "Entries in this model should be taken inside the London kill zone.",
        tl: "Ang mga entry sa model na ito ay dapat kunin sa loob ng London kill zone.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. This model focuses on London kill zone entries on M1.",
        tl: "Oo. Nakatuon ang model na ito sa London kill zone entries sa M1.",
      },
    },
    {
      id: "q9",
      type: "truefalse",
      prompt: {
        en: "If price free-falls to the target with no pullback, you should still chase the entry.",
        tl: "Kung diretsong bumagsak ang presyo papunta sa target nang walang pullback, dapat mo pa ring habulin ang entry.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. Do not chase. If there is no retracement, let it go, that would be a mis-entry.",
        tl: "Mali. Huwag humabol. Kung walang retracement, hayaan na lang, mis-entry iyon.",
      },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: {
        en: "The STH-ITH-STH pattern forms, but you are NOT yet in the London kill zone. What do you do?",
        tl: "Nabuo ang STH-ITH-STH pattern, pero WALA ka pa sa London kill zone. Ano ang gagawin mo?",
      },
      options: [
        { id: "a", text: { en: "Do not enter, wait for the kill zone", tl: "Huwag pumasok, hintayin ang kill zone" } },
        { id: "b", text: { en: "Enter immediately", tl: "Pumasok agad" } },
        { id: "c", text: { en: "Double your size", tl: "Doblehin ang size" } },
        { id: "d", text: { en: "Trade the opposite direction", tl: "Mag-trade sa kabaligtarang direksyon" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Do not enter before the kill zone; price will likely keep running out of the zone. Wait until you are inside it.",
        tl: "Huwag pumasok bago ang kill zone; malamang patuloy na tatakbo ang presyo palabas ng zone. Maghintay hanggang nasa loob ka na.",
      },
    },
  ],
};
