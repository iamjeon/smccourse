// Source: Part 3/Part 3 Lesson 1 - MMXMs.txt (verified: matches title)
// COVERAGE (source: Part 3/Part 3 Lesson 1 - MMXMs.txt) — every point mapped:
// [x] two models: Market Maker Buy Model (bullish OF) and Market Maker Sell Model (bearish OF) -> intro + two-models list + Q1, Q2
// [x] MMXM is a pattern full of generated liquidity that gets attacked later; it starts with a consolidation -> intro + Q3
// [x] formed on a lower timeframe in the retracement phase of a higher-timeframe order flow -> intro + Q4
// [x] MMBM structure: original consolidation -> distribution stages -> SMR at a HTF PDRA -> accumulation -> completes at the original consolidation high -> mmbm chart steps + Q5, Q7
// [x] usually two distribution stages, possibly a third -> stages callout
// [x] MMSM is the mirror (accumulation stages up -> SMR -> distribution down -> completes at the original consolidation low) -> mmsm chart steps + Q6
// [x] the HTF PDRA can be a swing high/low, FVG, breaker, or any PDRA -> pdra note + Q7
// [x] SMR = smart money reversal -> definition + both charts + Q5
// [x] you only identify the model once the HTF PDRA is hit; stage naming is not critical -> identify callout
// [x] only look for the model that matches the order flow (bearish -> sell model only, bullish -> buy model only); the opposite will not complete -> match-the-flow callout + Q8
// [x] timeframe alignment is required (e.g. monthly->daily->H1, or daily->H1->M5/M1); you cannot jump monthly->H4 -> alignment callout + Q9
// [x] entry after the SMR + an MSS, at an FVG or the 50% of the latest pullback; multiple entries are possible until completion -> entry steps + entry callout + Q10
// [x] IRL to ERL plays out inside the model -> entry callout (callback)
// [x] kill zones (Asian/London/NY) give high-probability entries; one side runs fast, one slow -> killzone callout
// [x] news caution: do not enter during news, enter after -> killzone callout
// [x] the target is the original consolidation -> both charts step3 + Q5
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "mmxms",
  moduleSlug: "part-3",
  title: { en: "Market Maker Models (MMXM)", tl: "Market Maker Models (MMXM)" },
  summary: {
    en: "The Market Maker Buy and Sell Models are repeatable patterns: a consolidation, staged distribution into a Smart Money Reversal at a higher-timeframe PDRA, then an accumulation back to the original consolidation. Learn to spot them, align your timeframes, and enter.",
    tl: "Ang Market Maker Buy at Sell Models ay paulit-ulit na pattern: isang consolidation, staged distribution papunta sa Smart Money Reversal sa higher-timeframe PDRA, tapos accumulation pabalik sa orihinal na consolidation. Matutunan silang makita, ihanay ang timeframes, at pumasok.",
  },
  estMinutes: 14,
  sourceFile: "Part 3/Part 3 Lesson 1 - MMXMs.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "A market maker model (MMXM) is a pattern that appears again and again in the market. It is packed with generated liquidity that gets attacked later, and it always starts with a consolidation. These models form on a lower timeframe, inside the retracement phase of a higher-timeframe order flow.",
        tl: "Ang market maker model (MMXM) ay pattern na paulit-ulit lumalabas sa market. Puno ito ng generated liquidity na inaatake sa bandang huli, at lagi itong nagsisimula sa consolidation. Nabubuo ang mga model na ito sa lower timeframe, sa loob ng retracement phase ng isang higher-timeframe order flow.",
      },
    },
    {
      kind: "list",
      items: [
        {
          en: "Market Maker Buy Model (MMBM): forms in a bullish order flow. You use it to find longs.",
          tl: "Market Maker Buy Model (MMBM): nabubuo sa bullish order flow. Ginagamit para humanap ng longs.",
        },
        {
          en: "Market Maker Sell Model (MMSM): forms in a bearish order flow. You use it to find shorts.",
          tl: "Market Maker Sell Model (MMSM): nabubuo sa bearish order flow. Ginagamit para humanap ng shorts.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "SMR = Smart Money Reversal", tl: "SMR = Smart Money Reversal" },
      text: {
        en: "The turning point of the model, where price reverses after hitting a higher-timeframe PDRA, is called the SMR (Smart Money Reversal). That PDRA can be a swing high or low, an FVG, a breaker, or any other PDRA.",
        tl: "Ang turning point ng model, kung saan bumabaliktad ang presyo pagkatapos tamaan ang higher-timeframe PDRA, ay tinatawag na SMR (Smart Money Reversal). Ang PDRA na iyon ay pwedeng swing high o low, FVG, breaker, o anumang ibang PDRA.",
      },
    },
    {
      kind: "heading",
      text: { en: "The Market Maker Buy Model", tl: "Ang Market Maker Buy Model" },
    },
    {
      kind: "chart",
      spec: {
        id: "mmbm",
        title: { en: "Market Maker Buy Model (bullish)", tl: "Market Maker Buy Model (bullish)" },
        height: 420,
        candles: [
          { o: 120, h: 122, l: 118, c: 119 },
          { o: 119, h: 121, l: 117, c: 120 },
          { o: 120, h: 121, l: 112, c: 113 },
          { o: 112, h: 113, l: 105, c: 106 },
          { o: 106, h: 111, l: 105, c: 110 },
          { o: 106, h: 107, l: 102, c: 103 },
          { o: 103, h: 109, l: 102, c: 108 },
          { o: 108, h: 109, l: 95, c: 96 },
          { o: 96, h: 97, l: 92, c: 93 },
          { o: 93, h: 110, l: 92, c: 109 },
          { o: 109, h: 111, l: 103, c: 104 },
          { o: 104, h: 106, l: 102, c: 105 },
          { o: 105, h: 116, l: 104, c: 115 },
          { o: 115, h: 122, l: 114, c: 121 },
        ],
        annotations: [
          { type: "box", kind: "zone", from: 0, to: 1, top: 122, bottom: 117, tone: "zone", label: { en: "Original consolidation", tl: "Original consolidation" }, appearAtStep: 0 },
          { type: "label", index: 3, price: 102, text: { en: "1st stage", tl: "1st stage" }, tone: "bear", appearAtStep: 1 },
          { type: "label", index: 7, price: 100, text: { en: "2nd stage", tl: "2nd stage" }, tone: "bear", appearAtStep: 1 },
          { type: "marker", kind: "poi", index: 8, price: 90, tone: "bull", label: { en: "SMR (HTF PDRA)", tl: "SMR (HTF PDRA)" }, appearAtStep: 1 },
          { type: "marker", kind: "mss", index: 9, price: 110, tone: "bull", label: { en: "MSS", tl: "MSS" }, appearAtStep: 2 },
          { type: "box", kind: "fvg", from: 8, to: 10, bottom: 97, top: 103, tone: "bull", label: { en: "FVG entry", tl: "FVG entry" }, appearAtStep: 2 },
          { type: "label", index: 12, price: 112, text: { en: "Accumulation", tl: "Accumulation" }, tone: "bull", appearAtStep: 3 },
          { type: "line", kind: "level", price: 121, from: 10, to: 13, tone: "bull", dashed: true, label: { en: "Consolidation high (target)", tl: "Consolidation high (target)" }, labelPlacement: "center", appearAtStep: 3 },
          { type: "marker", kind: "tp", index: 13, price: 121, tone: "bull", label: { en: "Complete", tl: "Complete" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "The model starts with an original consolidation, a sideways range. This is the bullish version, the Market Maker Buy Model, forming inside the retracement of a bullish order flow.", tl: "Nagsisimula ang model sa original consolidation, isang sideways range. Ito ang bullish na bersyon, ang Market Maker Buy Model, na nabubuo sa loob ng retracement ng bullish order flow." },
            tip: { en: "Find the tight sideways range first: that is the original consolidation.", tl: "Hanapin muna ang makitid na sideways range: iyon ang original consolidation." },
            revealCandles: 2,
          },
          {
            caption: { en: "Price distributes DOWN in stages (first stage, then a second stage) into a higher-timeframe PDRA at the bottom. That turn is the Smart Money Reversal. You only start identifying the model once this PDRA is hit.", tl: "Nagdi-distribute PABABA ang presyo nang staged (first stage, tapos second stage) papunta sa higher-timeframe PDRA sa ibaba. Ang liko na iyon ay ang Smart Money Reversal. Saka mo lang sinisimulan kilalanin ang model kapag natamaan ang PDRA na ito." },
            tip: { en: "Two pushes down into a PDRA, then a sharp turn up = the SMR.", tl: "Dalawang push pababa papunta sa PDRA, tapos matalim na liko pataas = ang SMR." },
            revealCandles: 8,
          },
          {
            caption: { en: "An MSS up confirms the reversal. Price leaves an FVG, and the retrace into it is your entry. Remember IRL to ERL? The FVG is the IRL you enter from, drawing toward the highs.", tl: "Isang MSS pataas ang nagkukumpirma ng reversal. Nag-iiwan ng FVG ang presyo, at ang retrace papasok dito ang entry mo. Tandaan ang IRL papuntang ERL? Ang FVG ang IRL na pinapasukan mo, dumadraw papunta sa highs." },
            tip: { en: "After the MSS, the retrace into the FVG is the entry.", tl: "Pagkatapos ng MSS, ang retrace papasok sa FVG ang entry." },
            revealCandles: 12,
          },
          {
            caption: { en: "Price accumulates upward and completes the model by reaching the original consolidation high. That completion is your target.", tl: "Nag-aaccumulate pataas ang presyo at kinukumpleto ang model sa pag-abot sa original consolidation high. Ang pagkumpleto na iyon ang target mo." },
            tip: { en: "The model is complete when price gets back to the original consolidation.", tl: "Kumpleto ang model kapag bumalik ang presyo sa original consolidation." },
            revealCandles: 14,
          },
        ],
        caption: {
          en: "MMBM: consolidation, staged distribution down to the SMR at a PDRA, MSS, FVG entry, accumulation up to the consolidation high (target).",
          tl: "MMBM: consolidation, staged distribution pababa papunta sa SMR sa PDRA, MSS, FVG entry, accumulation pataas papunta sa consolidation high (target).",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "How many stages?", tl: "Ilang stage?" },
      text: {
        en: "Usually there are two stages of distribution (or accumulation), though a third can happen. The exact names of each stage are not important. What matters is recognizing the pattern as it forms inside the retracement.",
        tl: "Karaniwan, dalawang stage ng distribution (o accumulation), pero pwedeng magkaroon ng pangatlo. Hindi importante ang eksaktong pangalan ng bawat stage. Ang mahalaga ay makilala ang pattern habang nabubuo ito sa loob ng retracement.",
      },
    },
    {
      kind: "heading",
      text: { en: "The Market Maker Sell Model", tl: "Ang Market Maker Sell Model" },
    },
    {
      kind: "chart",
      spec: {
        id: "mmsm",
        title: { en: "Market Maker Sell Model (bearish)", tl: "Market Maker Sell Model (bearish)" },
        height: 420,
        candles: [
          { o: 100, h: 102, l: 98, c: 101 },
          { o: 101, h: 103, l: 99, c: 100 },
          { o: 100, h: 108, l: 99, c: 107 },
          { o: 108, h: 115, l: 107, c: 114 },
          { o: 114, h: 115, l: 109, c: 110 },
          { o: 114, h: 118, l: 113, c: 117 },
          { o: 117, h: 118, l: 111, c: 112 },
          { o: 112, h: 125, l: 111, c: 124 },
          { o: 124, h: 128, l: 123, c: 127 },
          { o: 127, h: 128, l: 110, c: 111 },
          { o: 111, h: 117, l: 109, c: 116 },
          { o: 116, h: 118, l: 114, c: 115 },
          { o: 115, h: 116, l: 104, c: 105 },
          { o: 105, h: 106, l: 98, c: 99 },
        ],
        annotations: [
          { type: "box", kind: "zone", from: 0, to: 1, top: 103, bottom: 98, tone: "zone", label: { en: "Original consolidation", tl: "Original consolidation" }, appearAtStep: 0 },
          { type: "label", index: 3, price: 118, text: { en: "1st stage", tl: "1st stage" }, tone: "bull", appearAtStep: 1 },
          { type: "label", index: 7, price: 120, text: { en: "2nd stage", tl: "2nd stage" }, tone: "bull", appearAtStep: 1 },
          { type: "marker", kind: "poi", index: 8, price: 131, tone: "bear", label: { en: "SMR (HTF PDRA)", tl: "SMR (HTF PDRA)" }, appearAtStep: 1 },
          { type: "marker", kind: "mss", index: 9, price: 110, tone: "bear", label: { en: "MSS", tl: "MSS" }, appearAtStep: 2 },
          { type: "box", kind: "fvg", from: 8, to: 10, bottom: 117, top: 123, tone: "bear", label: { en: "FVG entry", tl: "FVG entry" }, appearAtStep: 2 },
          { type: "label", index: 12, price: 109, text: { en: "Distribution", tl: "Distribution" }, tone: "bear", appearAtStep: 3 },
          { type: "line", kind: "level", price: 99, from: 10, to: 13, tone: "bear", dashed: true, label: { en: "Consolidation low (target)", tl: "Consolidation low (target)" }, labelPlacement: "center", appearAtStep: 3 },
          { type: "marker", kind: "tp", index: 13, price: 99, tone: "bear", label: { en: "Complete", tl: "Complete" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "The sell model is the exact mirror. It also starts with an original consolidation, this time forming inside the retracement of a bearish order flow.", tl: "Ang sell model ay eksaktong kabaligtaran. Nagsisimula rin ito sa original consolidation, ngayon ay nabubuo sa loob ng retracement ng bearish order flow." },
            tip: { en: "Same start: a tight sideways range is the original consolidation.", tl: "Parehong simula: makitid na sideways range ang original consolidation." },
            revealCandles: 2,
          },
          {
            caption: { en: "Price accumulates UP in stages into a higher-timeframe PDRA at the top. That turn down is the Smart Money Reversal.", tl: "Nag-aaccumulate PATAAS ang presyo nang staged papunta sa higher-timeframe PDRA sa itaas. Ang liko pababa na iyon ay ang Smart Money Reversal." },
            tip: { en: "Two pushes up into a PDRA, then a sharp turn down = the SMR.", tl: "Dalawang push pataas papunta sa PDRA, tapos matalim na liko pababa = ang SMR." },
            revealCandles: 8,
          },
          {
            caption: { en: "An MSS down confirms the reversal. Price leaves a bearish FVG, and the retrace up into it is your entry.", tl: "Isang MSS pababa ang nagkukumpirma ng reversal. Nag-iiwan ng bearish FVG ang presyo, at ang retrace pataas papasok dito ang entry mo." },
            tip: { en: "After the MSS down, the retrace up into the FVG is the entry.", tl: "Pagkatapos ng MSS pababa, ang retrace pataas papasok sa FVG ang entry." },
            revealCandles: 12,
          },
          {
            caption: { en: "Price distributes downward and completes the model by reaching the original consolidation low. That is your target.", tl: "Nagdi-distribute pababa ang presyo at kinukumpleto ang model sa pag-abot sa original consolidation low. Iyon ang target mo." },
            tip: { en: "Complete when price returns down to the original consolidation.", tl: "Kumpleto kapag bumalik pababa ang presyo sa original consolidation." },
            revealCandles: 14,
          },
        ],
        caption: {
          en: "MMSM: consolidation, staged accumulation up to the SMR at a PDRA, MSS down, FVG entry, distribution down to the consolidation low (target).",
          tl: "MMSM: consolidation, staged accumulation pataas papunta sa SMR sa PDRA, MSS pababa, FVG entry, distribution pababa papunta sa consolidation low (target).",
        },
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Match the model to the order flow", tl: "Itugma ang model sa order flow" },
      text: {
        en: "In a bearish order flow, only look for the sell model. In a bullish order flow, only look for the buy model. The wrong-way model cannot complete, because reaching its original consolidation would require the order flow itself to reverse (an MSS), which is not what is happening.",
        tl: "Sa bearish order flow, sell model lang ang hanapin. Sa bullish order flow, buy model lang. Hindi makukumpleto ang maling model, dahil ang pag-abot sa original consolidation nito ay mangangailangan na mag-reverse mismo ang order flow (isang MSS), na hindi ang nangyayari.",
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Timeframe alignment is required", tl: "Kailangan ang timeframe alignment" },
      text: {
        en: "The timeframes must line up. You cannot read the bias on the monthly and then hunt the model on the H4. Use steps: monthly bias to a daily model to an H1 entry, or a daily bias to an H1 model to an M5/M1 entry. A common choice is daily bias, H1 model, M5 entry.",
        tl: "Kailangang magkahanay ang timeframes. Hindi pwedeng basahin ang bias sa monthly tapos hahanapin ang model sa H4. Gumamit ng hakbang: monthly bias papunta sa daily model papunta sa H1 entry, o daily bias papunta sa H1 model papunta sa M5/M1 entry. Karaniwang piliin: daily bias, H1 model, M5 entry.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Entries inside the model", tl: "Mga entry sa loob ng model" },
      text: {
        en: "After the SMR and an MSS, enter at an FVG or the 50% of the latest pullback. There are usually several valid entries (first stage, second stage) until the model completes at the original consolidation. Inside the model, the IRL-to-ERL draw plays out, so price moves from FVGs to swing highs and lows.",
        tl: "Pagkatapos ng SMR at MSS, pumasok sa FVG o sa 50% ng pinakabagong pullback. Karaniwang may ilang valid na entry (first stage, second stage) hanggang makumpleto ang model sa original consolidation. Sa loob ng model, naglalaro ang IRL-papuntang-ERL na draw, kaya gumagalaw ang presyo mula FVGs papunta sa swing highs at lows.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Kill zones and news", tl: "Kill zones at news" },
      text: {
        en: "The highest-probability entries land in the kill zones (Asian, London, New York sessions). Often one side of the model is slow and the other runs fast. If the move is driven by news, do not enter during the news, wait and enter after it.",
        tl: "Ang pinakamataas na probability na entries ay nasa kill zones (Asian, London, New York sessions). Madalas, mabagal ang isang panig ng model at mabilis ang kabila. Kung news ang nagtutulak ng galaw, huwag pumasok habang news, maghintay at pumasok pagkatapos.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "MMXM is a consolidation, staged move into an SMR at a higher-timeframe PDRA, then a move back to the original consolidation (the target). Use the buy model in a bullish order flow and the sell model in a bearish one. Align your timeframes, enter at an FVG or 50% after the MSS, and respect kill zones and news.",
        tl: "Ang MMXM ay isang consolidation, staged na galaw papunta sa SMR sa higher-timeframe PDRA, tapos galaw pabalik sa original consolidation (ang target). Gamitin ang buy model sa bullish order flow at sell model sa bearish. Ihanay ang timeframes, pumasok sa FVG o 50% pagkatapos ng MSS, at igalang ang kill zones at news.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "Which model do you use in a bullish order flow?",
        tl: "Aling model ang ginagamit sa bullish order flow?",
      },
      options: [
        { id: "a", text: { en: "Market Maker Buy Model (MMBM)", tl: "Market Maker Buy Model (MMBM)" } },
        { id: "b", text: { en: "Market Maker Sell Model (MMSM)", tl: "Market Maker Sell Model (MMSM)" } },
        { id: "c", text: { en: "Neither", tl: "Wala sa dalawa" } },
        { id: "d", text: { en: "Both at once", tl: "Pareho nang sabay" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The buy model forms in a bullish order flow; the sell model forms in a bearish order flow.",
        tl: "Ang buy model ay nabubuo sa bullish order flow; ang sell model sa bearish order flow.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "How many market maker models are there?",
        tl: "Ilang market maker model ang mayroon?",
      },
      options: [
        { id: "a", text: { en: "Two: a buy model and a sell model", tl: "Dalawa: buy model at sell model" } },
        { id: "b", text: { en: "One", tl: "Isa" } },
        { id: "c", text: { en: "Five", tl: "Lima" } },
        { id: "d", text: { en: "Ten", tl: "Sampu" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Two: the Market Maker Buy Model and the Market Maker Sell Model.",
        tl: "Dalawa: ang Market Maker Buy Model at ang Market Maker Sell Model.",
      },
    },
    {
      id: "q3",
      type: "truefalse",
      prompt: {
        en: "A market maker model always starts with a consolidation.",
        tl: "Laging nagsisimula sa consolidation ang market maker model.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. It starts with an original consolidation, which is full of generated liquidity to be attacked later.",
        tl: "Oo. Nagsisimula ito sa original consolidation, na puno ng generated liquidity na aatakehin sa bandang huli.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "Where do market maker models form?",
        tl: "Saan nabubuo ang market maker models?",
      },
      options: [
        { id: "a", text: { en: "On a lower timeframe, in the retracement of a higher-timeframe order flow", tl: "Sa lower timeframe, sa retracement ng higher-timeframe order flow" } },
        { id: "b", text: { en: "Only on the monthly chart", tl: "Sa monthly chart lamang" } },
        { id: "c", text: { en: "Only during news", tl: "Tuwing news lamang" } },
        { id: "d", text: { en: "Never on intraday charts", tl: "Hindi kailanman sa intraday charts" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "They form on a lower timeframe, inside the retracement phase of a higher-timeframe order flow.",
        tl: "Nabubuo sila sa lower timeframe, sa loob ng retracement phase ng higher-timeframe order flow.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "In an MMBM, the model completes when price reaches…",
        tl: "Sa MMBM, nakukumpleto ang model kapag inabot ng presyo ang…",
      },
      options: [
        { id: "a", text: { en: "The original consolidation high", tl: "Ang original consolidation high" } },
        { id: "b", text: { en: "A random round number", tl: "Isang random na round number" } },
        { id: "c", text: { en: "The SMR low again", tl: "Ang SMR low ulit" } },
        { id: "d", text: { en: "The session open", tl: "Ang session open" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The buy model completes at the original consolidation high; that is the target.",
        tl: "Nakukumpleto ang buy model sa original consolidation high; iyon ang target.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "The Market Maker Sell Model is…",
        tl: "Ang Market Maker Sell Model ay…",
      },
      options: [
        { id: "a", text: { en: "The mirror of the buy model: accumulate up to the SMR, then distribute down to the consolidation low", tl: "Ang kabaligtaran ng buy model: accumulate pataas papunta sa SMR, tapos distribute pababa papunta sa consolidation low" } },
        { id: "b", text: { en: "Exactly the same as the buy model", tl: "Eksaktong kapareho ng buy model" } },
        { id: "c", text: { en: "Only for crypto", tl: "Para sa crypto lamang" } },
        { id: "d", text: { en: "A type of moving average", tl: "Isang uri ng moving average" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The sell model mirrors the buy model: staged accumulation up to the SMR, then distribution down to the original consolidation low.",
        tl: "Ang sell model ay kabaligtaran ng buy model: staged accumulation pataas papunta sa SMR, tapos distribution pababa papunta sa original consolidation low.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "The SMR (Smart Money Reversal) happens when price reverses after hitting…",
        tl: "Nangyayari ang SMR (Smart Money Reversal) kapag bumaliktad ang presyo pagkatapos tamaan ang…",
      },
      options: [
        { id: "a", text: { en: "A higher-timeframe PDRA (swing high/low, FVG, breaker, etc.)", tl: "Isang higher-timeframe PDRA (swing high/low, FVG, breaker, atbp.)" } },
        { id: "b", text: { en: "Any green candle", tl: "Anumang green candle" } },
        { id: "c", text: { en: "The middle of the chart", tl: "Ang gitna ng chart" } },
        { id: "d", text: { en: "A moving average only", tl: "Isang moving average lamang" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The SMR is the reversal at a higher-timeframe PDRA, which can be a swing high/low, FVG, breaker, or any PDRA.",
        tl: "Ang SMR ay ang reversal sa higher-timeframe PDRA, na pwedeng swing high/low, FVG, breaker, o anumang PDRA.",
      },
    },
    {
      id: "q8",
      type: "truefalse",
      prompt: {
        en: "In a bearish order flow, you should look for a buy model.",
        tl: "Sa bearish order flow, dapat kang maghanap ng buy model.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. In a bearish order flow, only look for the sell model. The buy model would not complete without a reversal of the order flow.",
        tl: "Mali. Sa bearish order flow, sell model lang ang hanapin. Hindi makukumpleto ang buy model kung walang reversal ng order flow.",
      },
    },
    {
      id: "q9",
      type: "truefalse",
      prompt: {
        en: "It is fine to read your bias on the monthly and hunt the model on the H4.",
        tl: "Okay lang basahin ang bias sa monthly at hanapin ang model sa H4.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. Timeframes must align in steps (e.g. monthly to daily to H1). You cannot jump from monthly to H4.",
        tl: "Mali. Kailangang magkahanay ang timeframes nang hakbang-hakbang (hal. monthly papuntang daily papuntang H1). Hindi pwedeng tumalon mula monthly papuntang H4.",
      },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: {
        en: "After the SMR, where do you enter?",
        tl: "Pagkatapos ng SMR, saan ka pumapasok?",
      },
      options: [
        { id: "a", text: { en: "At an FVG or the 50% of the latest pullback, after an MSS", tl: "Sa FVG o sa 50% ng pinakabagong pullback, pagkatapos ng MSS" } },
        { id: "b", text: { en: "At the very first candle, no confirmation", tl: "Sa pinakaunang candle, walang confirmation" } },
        { id: "c", text: { en: "Only at the original consolidation", tl: "Sa original consolidation lamang" } },
        { id: "d", text: { en: "You never enter a model", tl: "Hindi ka kailanman pumapasok sa model" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "After an MSS confirms the SMR, enter at an FVG or the 50% of the latest pullback. Several entries exist until completion.",
        tl: "Pagkatapos kumpirmahin ng MSS ang SMR, pumasok sa FVG o sa 50% ng pinakabagong pullback. May ilang entry hanggang sa makumpleto.",
      },
    },
  ],
};
