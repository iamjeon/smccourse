// Source: Part 2/Part 2 Lesson 4 - Market Structure.txt (verified: matches title)
// COVERAGE (source: Part 2/Part 2 Lesson 4 - Market Structure.txt) — every point mapped:
// [x] market structure = 3 types of highs and lows: short term, intermediate term, long term -> intro + types list + ms-highs chart + Q1
// [x] uses of market structure (when price expands, where to put SL/TP, confirm draw on liquidity/bias, trends, identify order flow) -> uses list + Q2
// [x] protected (ITH/ITL, LTH/LTL) vs unprotected (STH/STL); only place stops on protected -> ms-highs chart step4 + protected callout + Q3, Q4, Q8
// [x] LT/IT highs-lows are HRLR; short term are LRLR (easily breached, price keeps its bias) -> HRLR/LRLR callout + Q5
// [x] identify LTH: a smart-money reversal high (after HTF PDRA hit) with a STH on its left and a STH on its right -> ms-highs chart step0,1 + Q6
// [x] identify ITH: forms after the LTH; has a STH on left and right, and takes out the left STH's high -> ms-highs chart step2,3 + Q7
// [x] mirror for lows (LTL / ITL / STL); ITL forms when an STL is taken out by another STL -> lows callout + ms-apply chart + Q9
// [x] stop loss goes beyond protected highs/lows because price just took liquidity there (high resistance to breach) -> ms-apply chart step3,4 + Q8
// [x] breaker entry: STH-ITH-STH pattern, enter after the right STH is created -> breaker callout + ms-highs chart step3
// [x] safer entry model: confirm MSS, then after STL-ITL-STL, enter at the next STL (an FVG) with a protected stop -> ms-apply chart steps + safer-entry callout + Q10
// [x] worked examples (bullish + bearish, weekly HTF, FVG/OB entries with protected stops) -> how-pros list + ms-apply chart
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "market-structure-p2",
  moduleSlug: "part-2",
  title: { en: "Market Structure", tl: "Market Structure" },
  summary: {
    en: "Market structure is built from three grades of highs and lows: short term, intermediate term, and long term. Knowing which is which tells you which levels are protected (safe for stops) and which are unprotected liquidity, and it powers your entries and targets.",
    tl: "Ang market structure ay binubuo ng tatlong baitang ng highs at lows: short term, intermediate term, at long term. Ang pagkilala kung alin ang alin ay nagsasabi kung aling level ang protected (ligtas para sa stops) at alin ang unprotected na liquidity, at ito ang nagpapagana sa entries at targets mo.",
  },
  estMinutes: 13,
  sourceFile: "Part 2/Part 2 Lesson 4 - Market Structure.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "Market structure is comprised of three types of highs and lows: short term, intermediate term, and long term. Each grade tells you something different, and together they let you read the trend, find safe places for stops, and confirm your bias.",
        tl: "Ang market structure ay binubuo ng tatlong uri ng highs at lows: short term, intermediate term, at long term. Bawat baitang ay may ibang sinasabi, at magkakasama silang nagpapabasa sa iyo ng trend, naghahanap ng ligtas na lugar para sa stops, at nagkukumpirma ng iyong bias.",
      },
    },
    {
      kind: "heading",
      text: { en: "What we use market structure for", tl: "Para saan ang market structure" },
    },
    {
      kind: "list",
      items: [
        { en: "To understand when price is about to expand.", tl: "Para maintindihan kung kailan malapit nang mag-expand ang presyo." },
        { en: "To decide where to place a stop loss.", tl: "Para malaman kung saan ilalagay ang stop loss." },
        { en: "To decide where to place a take profit (TP).", tl: "Para malaman kung saan ilalagay ang take profit (TP)." },
        { en: "Most importantly, to confirm the draw on liquidity, your bias.", tl: "Pinakamahalaga, para kumpirmahin ang draw on liquidity, ang iyong bias." },
        { en: "To understand the market trend and to help identify the order flow.", tl: "Para maintindihan ang market trend at tumulong tukuyin ang order flow." },
      ],
    },
    {
      kind: "heading",
      text: { en: "The three grades of highs and lows", tl: "Ang tatlong baitang ng highs at lows" },
    },
    {
      kind: "list",
      items: [
        {
          en: "Short term high/low (STH/STL): a plain swing high or low with one lower high (or higher low) on each immediate side. These are UNPROTECTED.",
          tl: "Short term high/low (STH/STL): payak na swing high o low na may isang mas mababang high (o mas mataas na low) sa magkabilang gilid. UNPROTECTED ang mga ito.",
        },
        {
          en: "Intermediate term high/low (ITH/ITL): a bigger pivot that has a short term high (or low) on its left AND its right. PROTECTED.",
          tl: "Intermediate term high/low (ITH/ITL): mas malaking pivot na may short term high (o low) sa kaliwa AT kanan nito. PROTECTED.",
        },
        {
          en: "Long term high/low (LTH/LTL): the major reversal high or low, formed where Smart Money reversed after hitting a higher-timeframe PDRA. PROTECTED.",
          tl: "Long term high/low (LTH/LTL): ang pangunahing reversal high o low, nabuo kung saan nag-reverse ang Smart Money pagkatapos tamaan ang higher-timeframe PDRA. PROTECTED.",
        },
      ],
    },
    {
      kind: "chart",
      spec: {
        id: "ms-highs",
        title: { en: "Short, intermediate, and long term highs", tl: "Short, intermediate, at long term highs" },
        height: 380,
        candles: [
          { o: 100, h: 104, l: 99, c: 103 },
          { o: 103, h: 118, l: 102, c: 117 },
          { o: 108, h: 108, l: 101, c: 102 },
          { o: 102, h: 110, l: 101, c: 109 },
          { o: 106, h: 106, l: 100, c: 101 },
          { o: 101, h: 114, l: 100, c: 113 },
          { o: 107, h: 107, l: 99, c: 100 },
          { o: 100, h: 108, l: 99, c: 107 },
          { o: 102, h: 103, l: 96, c: 97 },
          { o: 97, h: 98, l: 92, c: 93 },
        ],
        annotations: [
          { type: "label", index: 1, price: 121, text: { en: "LTH", tl: "LTH" }, tone: "bear", appearAtStep: 0 },
          { type: "label", index: 3, price: 113, text: { en: "STH", tl: "STH" }, tone: "neutral", appearAtStep: 1 },
          { type: "label", index: 5, price: 118, text: { en: "ITH", tl: "ITH" }, tone: "bull", appearAtStep: 2 },
          { type: "label", index: 7, price: 111, text: { en: "STH", tl: "STH" }, tone: "neutral", appearAtStep: 3 },
          { type: "line", kind: "level", price: 114, from: 5, to: 9, tone: "bull", dashed: true, label: { en: "Protected: stops go above", tl: "Protected: stops sa itaas" }, labelPlacement: "center", appearAtStep: 4 },
        ],
        steps: [
          {
            caption: { en: "Price rallies to a major high and reverses down. This is where Smart Money turned after hitting a higher-timeframe PDRA, so this is the Long Term High (LTH).", tl: "Umakyat ang presyo sa pangunahing high at bumaliktad pababa. Dito lumiko ang Smart Money pagkatapos tamaan ang higher-timeframe PDRA, kaya ito ang Long Term High (LTH)." },
            tip: { en: "The biggest high, at the reversal, with smaller highs on both sides = the LTH.", tl: "Ang pinakamalaking high, sa reversal, na may mas maliliit na high sa magkabilang gilid = ang LTH." },
            revealCandles: 2,
          },
          {
            caption: { en: "As price falls it leaves a small swing high. A plain high with just one lower high on each side is a Short Term High (STH). It is unprotected, easy to take out.", tl: "Habang bumababa ang presyo, nag-iiwan ito ng maliit na swing high. Ang payak na high na may isang mas mababang high lang sa magkabilang gilid ay Short Term High (STH). Unprotected ito, madaling kunin." },
            tip: { en: "A small high with one lower high to its left and right = an STH.", tl: "Maliit na high na may isang mas mababang high sa kaliwa at kanan = STH." },
            revealCandles: 4,
          },
          {
            caption: { en: "Now a bigger high forms with a STH on its left. This is an Intermediate Term High (ITH). Notice it takes out (trades above) the left STH's high.", tl: "Ngayon may mas malaking high na nabuo na may STH sa kaliwa nito. Ito ay Intermediate Term High (ITH). Pansinin na kinukuha nito (nag-trade pataas) ang high ng STH sa kaliwa." },
            tip: { en: "A high that has a STH beside it and trades above that STH = an ITH.", tl: "Isang high na may STH sa tabi at nag-trade lampas sa STH na iyon = ITH." },
            revealCandles: 6,
          },
          {
            caption: { en: "Another STH forms to the right of the ITH, confirming it. Now we have the STH, ITH, STH pattern. That trio is the breaker shape used for entries.", tl: "May isa pang STH na nabuo sa kanan ng ITH, kinukumpirma ito. Ngayon mayroon na tayong STH, ITH, STH na pattern. Ang trio na iyon ang breaker shape na ginagamit para sa entries." },
            tip: { en: "STH, then a higher ITH, then STH again = the breaker pattern.", tl: "STH, tapos mas mataas na ITH, tapos STH ulit = ang breaker pattern." },
            revealCandles: 8,
          },
          {
            caption: { en: "Protected vs unprotected: the ITH and LTH are protected (high resistance) because price had to take liquidity to reach them. Hide stop losses just beyond those. The STHs are unprotected, easily breached and taken as liquidity. Never put a stop on an STH.", tl: "Protected vs unprotected: ang ITH at LTH ay protected (high resistance) dahil kinailangan ng presyo na kumuha ng liquidity para maabot ang mga ito. Itago ang stop losses lampas lang sa mga iyon. Ang mga STH ay unprotected, madaling masira at kunin bilang liquidity. Huwag kailanman maglagay ng stop sa STH." },
            tip: { en: "Stops belong just beyond ITH/LTH (protected), never on an STH (unprotected).", tl: "Ang stops ay lampas lang sa ITH/LTH (protected), hindi kailanman sa STH (unprotected)." },
            revealCandles: 10,
          },
        ],
        caption: {
          en: "STH (unprotected liquidity) vs ITH and LTH (protected). The STH, ITH, STH trio is the breaker pattern for entries.",
          tl: "STH (unprotected liquidity) vs ITH at LTH (protected). Ang STH, ITH, STH na trio ang breaker pattern para sa entries.",
        },
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "Protected vs unprotected", tl: "Protected vs unprotected" },
      text: {
        en: "Intermediate and long term highs/lows are PROTECTED: place stop losses just beyond them, because price would need to take a lot of liquidity to breach them. Short term highs/lows are UNPROTECTED: never put a stop there, the market takes them out as liquidity.",
        tl: "Ang intermediate at long term highs/lows ay PROTECTED: maglagay ng stop losses lampas lang sa mga ito, dahil kailangan ng presyo na kumuha ng maraming liquidity para masira ang mga ito. Ang short term highs/lows ay UNPROTECTED: huwag kailanman maglagay ng stop doon, kinukuha sila ng market bilang liquidity.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Why protected = HRLR, unprotected = LRLR", tl: "Bakit protected = HRLR, unprotected = LRLR" },
      text: {
        en: "Long and intermediate term highs/lows are high resistance liquidity runs (HRLR): hard to breach. Short term highs/lows are low resistance liquidity runs (LRLR): easily breached and taken out, after which price simply continues in its bias. That is why your stop sits behind a protected level.",
        tl: "Ang long at intermediate term highs/lows ay high resistance liquidity runs (HRLR): mahirap masira. Ang short term highs/lows ay low resistance liquidity runs (LRLR): madaling masira at kunin, at pagkatapos nito ay tuloy lang ang presyo sa bias nito. Kaya nasa likod ng protected level ang stop mo.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "The breaker entry", tl: "Ang breaker entry" },
      text: {
        en: "A breaker already contains a STH, an ITH, and a STH. Once the right-hand STH is created, you can enter at the breaker zone. The lessons ahead lean on breaker and entry patterns built from exactly this structure.",
        tl: "Ang breaker ay naglalaman na ng STH, ITH, at STH. Kapag nabuo na ang STH sa kanan, pwede kang pumasok sa breaker zone. Ang mga susunod na lesson ay nakaangkla sa breaker at entry patterns na gawa mismo sa structure na ito.",
      },
    },
    {
      kind: "heading",
      text: { en: "The same idea for lows (bullish)", tl: "Parehong ideya para sa lows (bullish)" },
    },
    {
      kind: "paragraph",
      text: {
        en: "Everything flips for a bullish reversal. After price hits a higher-timeframe PDRA and turns up, the major low is the Long Term Low (LTL). A short term low (STL) is a plain pullback low. When an STL gets taken out by another STL, with short term lows on both sides, you get an Intermediate Term Low (ITL), which is protected.",
        tl: "Babaligtad ang lahat para sa bullish reversal. Pagkatapos tamaan ng presyo ang higher-timeframe PDRA at lumiko pataas, ang pangunahing low ay ang Long Term Low (LTL). Ang short term low (STL) ay payak na pullback low. Kapag ang isang STL ay nakuha ng isa pang STL, na may short term lows sa magkabilang gilid, makakakuha ka ng Intermediate Term Low (ITL), na protected.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "ms-apply",
        title: { en: "Bullish reversal: entry at the FVG, stop below the protected low", tl: "Bullish reversal: entry sa FVG, stop sa ilalim ng protected low" },
        height: 380,
        candles: [
          { o: 100, h: 104, l: 99, c: 103 },
          { o: 103, h: 105, l: 101, c: 102 },
          { o: 102, h: 103, l: 95, c: 96 },
          { o: 96, h: 97, l: 91, c: 92 },
          { o: 92, h: 99, l: 91, c: 98 },
          { o: 98, h: 110, l: 97, c: 109 },
          { o: 109, h: 114, l: 103, c: 104 },
          { o: 104, h: 106, l: 100, c: 101 },
          { o: 101, h: 111, l: 100, c: 110 },
          { o: 110, h: 116, l: 109, c: 115 },
        ],
        annotations: [
          { type: "label", index: 3, price: 88, text: { en: "LTL (protected)", tl: "LTL (protected)" }, tone: "bull", appearAtStep: 0 },
          { type: "marker", kind: "mss", index: 5, price: 110, tone: "bull", label: { en: "MSS", tl: "MSS" }, appearAtStep: 1 },
          { type: "box", kind: "fvg", from: 4, to: 6, bottom: 99, top: 103, tone: "bull", label: { en: "FVG entry", tl: "FVG entry" }, appearAtStep: 2 },
          { type: "label", index: 7, price: 96, text: { en: "STL (unprotected)", tl: "STL (unprotected)" }, tone: "neutral", appearAtStep: 3 },
          { type: "marker", kind: "entry", index: 8, price: 101, tone: "bull", label: { en: "Entry", tl: "Entry" }, appearAtStep: 3 },
          { type: "marker", kind: "sl", index: 3, price: 90, tone: "bear", label: { en: "Stop loss", tl: "Stop loss" }, appearAtStep: 3 },
          { type: "marker", kind: "tp", index: 9, price: 116, tone: "bull", label: { en: "Target", tl: "Target" }, appearAtStep: 4 },
        ],
        steps: [
          {
            caption: { en: "Price drops into a higher-timeframe PDRA and reverses. This major low is the Long Term Low (LTL), a protected low. Price should not come back here until the liquidity above is taken.", tl: "Bumaba ang presyo papunta sa higher-timeframe PDRA at bumaliktad. Itong pangunahing low ay ang Long Term Low (LTL), isang protected low. Hindi dapat bumalik ang presyo dito hangga't hindi nakukuha ang liquidity sa itaas." },
            tip: { en: "The reversal low at a HTF PDRA = the LTL (protected).", tl: "Ang reversal low sa HTF PDRA = ang LTL (protected)." },
            revealCandles: 4,
          },
          {
            caption: { en: "An MSS up confirms the reversal. Remember the Market Structure Shift from the earlier lesson? That is our green light to look for buys.", tl: "Isang MSS pataas ang nagkukumpirma ng reversal. Tandaan ang Market Structure Shift mula sa naunang lesson? Iyon ang green light natin para maghanap ng buys." },
            tip: { en: "A close above the last lower high = bullish MSS = look for longs.", tl: "Pag nag-close above sa huling lower high = bullish MSS = maghanap ng longs." },
            revealCandles: 6,
          },
          {
            caption: { en: "Price retraces and leaves a fair value gap, our entry zone.", tl: "Nag-retrace ang presyo at nag-iwan ng fair value gap, ang entry zone natin." },
            tip: { en: "The 3-candle gap left by the rally = the FVG entry.", tl: "Ang 3-candle na gap na iniwan ng rally = ang FVG entry." },
            revealCandles: 7,
          },
          {
            caption: { en: "The retrace dips to a Short Term Low, then respects the FVG and turns up: that is our entry. The STL is unprotected, so our stop loss goes BELOW the protected LTL, not on the STL.", tl: "Ang retrace ay bumaba sa Short Term Low, tapos nire-respeto ang FVG at lumiko pataas: iyon ang entry natin. Unprotected ang STL, kaya ang stop loss natin ay sa ILALIM ng protected LTL, hindi sa STL." },
            tip: { en: "Enter on the FVG, hide the stop below the protected LTL, never on the STL.", tl: "Pumasok sa FVG, itago ang stop sa ilalim ng protected LTL, hindi kailanman sa STL." },
            revealCandles: 9,
          },
          {
            caption: { en: "Price expands up to the target. The stop sat safely behind the protected low the whole time, exactly why we identify the grades of structure.", tl: "Mag-eexpand pataas ang presyo papunta sa target. Ligtas na nakaupo ang stop sa likod ng protected low sa buong panahon, kaya nga natin tinutukoy ang mga baitang ng structure." },
            tip: { en: "Target the liquidity above; the protected stop kept you safe through the noise.", tl: "I-target ang liquidity sa itaas; pinanatili kang ligtas ng protected stop sa gitna ng ingay." },
            revealCandles: 10,
          },
        ],
        caption: {
          en: "Reversal at the LTL, MSS up, enter at the FVG, stop below the protected low. The STL is just unprotected liquidity.",
          tl: "Reversal sa LTL, MSS pataas, pumasok sa FVG, stop sa ilalim ng protected low. Ang STL ay unprotected na liquidity lang.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "The safer entry model", tl: "Ang mas ligtas na entry model" },
      text: {
        en: "For safer entries, confirm an MSS first, then wait for the structure to build: STL, then ITL, then STL. Enter on the next STL, usually an FVG, with your stop hidden below the protected low. You give up a little reward for a much more protected stop.",
        tl: "Para sa mas ligtas na entries, kumpirmahin muna ang MSS, tapos hintayin na mabuo ang structure: STL, tapos ITL, tapos STL. Pumasok sa susunod na STL, kadalasang FVG, na nakatago ang stop sa ilalim ng protected low. Magbibigay ka ng kaunting reward para sa mas protektadong stop.",
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
          en: "Bullish (weekly HTF): after a HTF PDRA was hit they marked the LTL, then waited as STLs and an ITL formed, and entered at the FVG with a stop below the protected low.",
          tl: "Bullish (weekly HTF): pagkatapos matamaan ang HTF PDRA, minarkahan nila ang LTL, tapos naghintay habang nabubuo ang mga STL at ITL, at pumasok sa FVG na may stop sa ilalim ng protected low.",
        },
        {
          en: "Bearish (weekly HTF): a HTF PDRA was hit, an ITH and STHs formed, and they entered at the FVG (or an order block when no FVG was present) with the stop above the protected high.",
          tl: "Bearish (weekly HTF): natamaan ang HTF PDRA, nabuo ang ITH at mga STH, at pumasok sila sa FVG (o order block kung walang FVG) na may stop sa itaas ng protected high.",
        },
        {
          en: "Once a HTF PDRA is hit, you will almost always see a long term high or low form at that reversal: that is your anchor for reading the rest of the structure.",
          tl: "Kapag natamaan ang HTF PDRA, halos lagi kang makakakita ng long term high o low na nabubuo sa reversal na iyon: iyon ang anchor mo sa pagbasa ng buong structure.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "Three grades: short, intermediate, long term highs and lows. ITH/ITL and LTH/LTL are protected (HRLR): put stops just beyond them. STH/STL are unprotected (LRLR): never stop there. The STH-ITH-STH (or STL-ITL-STL) trio is the breaker pattern you enter from. Anchor everything to the long term high/low at a HTF PDRA.",
        tl: "Tatlong baitang: short, intermediate, long term highs at lows. Ang ITH/ITL at LTH/LTL ay protected (HRLR): maglagay ng stops lampas lang sa mga ito. Ang STH/STL ay unprotected (LRLR): huwag kailanman mag-stop doon. Ang STH-ITH-STH (o STL-ITL-STL) na trio ang breaker pattern na pinapasukan mo. I-anchor ang lahat sa long term high/low sa HTF PDRA.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "Market structure is comprised of how many types of highs and lows?",
        tl: "Ilang uri ng highs at lows ang bumubuo sa market structure?",
      },
      options: [
        { id: "a", text: { en: "One", tl: "Isa" } },
        { id: "b", text: { en: "Two", tl: "Dalawa" } },
        { id: "c", text: { en: "Three (short, intermediate, long term)", tl: "Tatlo (short, intermediate, long term)" } },
        { id: "d", text: { en: "Five", tl: "Lima" } },
      ],
      correctOptionId: "c",
      explanation: {
        en: "Three grades: short term, intermediate term, and long term highs and lows.",
        tl: "Tatlong baitang: short term, intermediate term, at long term highs at lows.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "Which is NOT one of the uses of market structure mentioned?",
        tl: "Alin ang HINDI kabilang sa mga gamit ng market structure na binanggit?",
      },
      options: [
        { id: "a", text: { en: "Confirming the draw on liquidity (bias)", tl: "Pagkumpirma sa draw on liquidity (bias)" } },
        { id: "b", text: { en: "Deciding where to place stops and TPs", tl: "Pagdedesisyon kung saan ilalagay ang stops at TPs" } },
        { id: "c", text: { en: "Guaranteeing every trade wins", tl: "Pag-garantiya na mananalo ang bawat trade" } },
        { id: "d", text: { en: "Identifying the order flow and trend", tl: "Pagtukoy sa order flow at trend" } },
      ],
      correctOptionId: "c",
      explanation: {
        en: "Nothing guarantees a win. Market structure helps with expansion, stops/TPs, bias, trend, and order flow.",
        tl: "Walang nagga-garantiya ng panalo. Tumutulong ang market structure sa expansion, stops/TPs, bias, trend, at order flow.",
      },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: {
        en: "Which highs and lows are protected?",
        tl: "Aling highs at lows ang protected?",
      },
      options: [
        { id: "a", text: { en: "Short term highs and lows", tl: "Short term highs at lows" } },
        { id: "b", text: { en: "Intermediate term and long term highs and lows", tl: "Intermediate term at long term highs at lows" } },
        { id: "c", text: { en: "Only the daily open", tl: "Ang daily open lamang" } },
        { id: "d", text: { en: "None of them", tl: "Wala sa kanila" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Intermediate and long term highs/lows are protected. Short term ones are unprotected liquidity.",
        tl: "Ang intermediate at long term highs/lows ay protected. Ang short term ay unprotected na liquidity.",
      },
    },
    {
      id: "q4",
      type: "truefalse",
      prompt: {
        en: "You should place stop losses on short term highs and lows.",
        tl: "Dapat maglagay ng stop losses sa short term highs at lows.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. Short term highs/lows are unprotected and easily taken out. Stops go beyond protected levels.",
        tl: "Mali. Ang short term highs/lows ay unprotected at madaling kunin. Ang stops ay lampas sa protected levels.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "Short term highs and lows behave like which kind of liquidity run?",
        tl: "Ang short term highs at lows ay kumikilos na parang anong uri ng liquidity run?",
      },
      options: [
        { id: "a", text: { en: "LRLR (low resistance, easily breached)", tl: "LRLR (low resistance, madaling masira)" } },
        { id: "b", text: { en: "HRLR (high resistance, hard to breach)", tl: "HRLR (high resistance, mahirap masira)" } },
        { id: "c", text: { en: "They never get breached", tl: "Hindi kailanman nasisira" } },
        { id: "d", text: { en: "They are not liquidity at all", tl: "Hindi sila liquidity" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Short term highs/lows are LRLR: easily breached and taken out, then price continues its bias.",
        tl: "Ang short term highs/lows ay LRLR: madaling masira at kunin, tapos tuloy ang presyo sa bias nito.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "How do you identify a long term high?",
        tl: "Paano makikilala ang long term high?",
      },
      options: [
        { id: "a", text: { en: "It has a short term high on its left and a short term high on its right, at the reversal", tl: "May short term high sa kaliwa at short term high sa kanan nito, sa reversal" } },
        { id: "b", text: { en: "It is any random high", tl: "Anumang random na high" } },
        { id: "c", text: { en: "It must be on a 1-minute chart", tl: "Dapat nasa 1-minute chart" } },
        { id: "d", text: { en: "It has no highs around it", tl: "Walang highs sa paligid nito" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The LTH is the reversal high (after a HTF PDRA hit) flanked by a short term high on each side.",
        tl: "Ang LTH ay ang reversal high (pagkatapos tamaan ang HTF PDRA) na may short term high sa magkabilang gilid.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "An intermediate term high is confirmed when it…",
        tl: "Nakukumpirma ang intermediate term high kapag ito ay…",
      },
      options: [
        { id: "a", text: { en: "Has a short term high on its left and right, and takes out the left STH's high", tl: "May short term high sa kaliwa at kanan, at kinukuha ang high ng STH sa kaliwa" } },
        { id: "b", text: { en: "Is the very first candle", tl: "Ang pinakaunang candle" } },
        { id: "c", text: { en: "Is always the lowest point", tl: "Palaging ang pinakamababang punto" } },
        { id: "d", text: { en: "Has no candles around it", tl: "Walang candles sa paligid nito" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "An ITH has a STH on each side and takes out the left STH's high. That is what makes it intermediate term.",
        tl: "Ang ITH ay may STH sa magkabilang gilid at kinukuha ang high ng STH sa kaliwa. Iyon ang gumagawa rito na intermediate term.",
      },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: {
        en: "Where does a stop loss belong on a bullish entry?",
        tl: "Saan dapat ilagay ang stop loss sa isang bullish entry?",
      },
      options: [
        { id: "a", text: { en: "Below the protected low (ITL/LTL)", tl: "Sa ilalim ng protected low (ITL/LTL)" } },
        { id: "b", text: { en: "On the nearest short term low", tl: "Sa pinakamalapit na short term low" } },
        { id: "c", text: { en: "Above the entry", tl: "Sa itaas ng entry" } },
        { id: "d", text: { en: "Anywhere, it does not matter", tl: "Kahit saan, walang pinagkaiba" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Hide stops below the protected low; price took liquidity to get there, so it is hard to breach.",
        tl: "Itago ang stops sa ilalim ng protected low; kumuha ng liquidity ang presyo para makarating doon, kaya mahirap masira.",
      },
    },
    {
      id: "q9",
      type: "truefalse",
      prompt: {
        en: "An intermediate term low forms when a short term low is taken out by another short term low, with STLs on both sides.",
        tl: "Nabubuo ang intermediate term low kapag ang isang short term low ay nakuha ng isa pang short term low, na may STLs sa magkabilang gilid.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. An ITL is the bigger low flanked by short term lows, just like the ITH for highs.",
        tl: "Oo. Ang ITL ay ang mas malaking low na may short term lows sa gilid, gaya ng ITH para sa highs.",
      },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: {
        en: "In the safer entry model, when do you enter?",
        tl: "Sa mas ligtas na entry model, kailan ka pumapasok?",
      },
      options: [
        { id: "a", text: { en: "After an MSS and the STL-ITL-STL structure, on the next STL (an FVG)", tl: "Pagkatapos ng MSS at ng STL-ITL-STL na structure, sa susunod na STL (isang FVG)" } },
        { id: "b", text: { en: "Immediately at the long term low with no confirmation", tl: "Agad sa long term low nang walang confirmation" } },
        { id: "c", text: { en: "Only at market close", tl: "Sa market close lamang" } },
        { id: "d", text: { en: "Never, you cannot enter safely", tl: "Hindi kailanman, hindi pwedeng pumasok nang ligtas" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Confirm the MSS, let STL-ITL-STL build, then enter on the next STL (often an FVG) with a protected stop.",
        tl: "Kumpirmahin ang MSS, hayaang mabuo ang STL-ITL-STL, tapos pumasok sa susunod na STL (kadalasang FVG) na may protected stop.",
      },
    },
  ],
};
