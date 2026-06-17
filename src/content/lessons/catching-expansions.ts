// Source: Part 3/Part 3 Lesson 2 - Catching Expansions.txt (verified: matches title)
// COVERAGE (source: Part 3/Part 3 Lesson 2 - Catching Expansions.txt) — every point mapped:
// [x] step 1: find the draw on liquidity (the target); a setup is useless without it -> intro + steps list + key callout + ce-bear chart step0 + Q1, Q2
// [x] draw on liquidity target types: FVG, swing highs/lows, equal highs/lows, any PDRA -> targets note + Q2
// [x] step 2: wait for a raid on the short-term high (bearish) or short-term low (bullish) on the higher timeframe -> steps list + ce-bear chart step1 + Q3, Q5
// [x] the raid turns a short-term high into an intermediate-term high (callback to market structure grades) -> raid callout + Q6
// [x] ERL takeout -> drop to the lower timeframe -> enter at the FVG (IRL) [ERL/IRL callback] -> erl-irl callout + chart steps + Q7
// [x] step 3: wait for an MSS confirmation on the lower timeframe -> steps list + chart step2 + Q8
// [x] step 4: enter on the FVG (or a breaker, or the retracement) -> entry callout + chart step2
// [x] step 5: price expands to the draw on liquidity (the expansion you catch) -> chart step3 + Q1
// [x] timeframe alignment is required (daily->H1->M5, etc.) -> alignment callout + Q9
// [x] this combines MMXM (enter at the second stage, patience), ERL/IRL, draw on liquidity, states of the market -> synthesis paragraph + second-stage callout + Q10
// [x] enter at the second stage: safer, closer to target, smaller but safer profit -> second-stage callout + Q10
// [x] a relatively equal high is still a strong magnet (target) -> targets note
// [x] worked examples (NZDUSD H1->M5 MMSM; NQ daily->4H MMBM equal-high draw; 15m MMSM with OB/FVG entries) -> how-pros list
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "catching-expansions",
  moduleSlug: "part-3",
  title: { en: "Catching Expansions", tl: "Catching Expansions" },
  summary: {
    en: "Putting it together: find the draw on liquidity, wait for a raid on a short-term high or low, confirm with an MSS on the lower timeframe, enter at an FVG, and ride the expansion to your target. This is where order flow, ERL/IRL, and the market maker model all combine.",
    tl: "Pinagsama-sama: hanapin ang draw on liquidity, hintayin ang raid sa short-term high o low, kumpirmahin gamit ang MSS sa lower timeframe, pumasok sa FVG, at sakyan ang expansion papunta sa target. Dito nagsasama ang order flow, ERL/IRL, at ang market maker model.",
  },
  estMinutes: 12,
  sourceFile: "Part 3/Part 3 Lesson 2 - Catching Expansions.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "An expansion is the big, fast directional move, the part of the market you want to catch. To catch it you follow a clear order of steps, and the first one is the most important of all.",
        tl: "Ang expansion ay ang malaki at mabilis na may-direksyong galaw, ang bahagi ng market na gusto mong mahuli. Para mahuli ito, sumusunod ka sa malinaw na pagkakasunod ng hakbang, at ang una ang pinakamahalaga sa lahat.",
      },
    },
    {
      kind: "list",
      ordered: true,
      items: [
        { en: "Find the draw on liquidity. This is your target, where price most likely wants to go.", tl: "Hanapin ang draw on liquidity. Ito ang target mo, kung saan malamang gustong pumunta ng presyo." },
        { en: "Wait for a raid on a short-term high (if bearish) or a short-term low (if bullish) on the higher timeframe.", tl: "Hintayin ang raid sa short-term high (kung bearish) o short-term low (kung bullish) sa higher timeframe." },
        { en: "Drop to the aligned lower timeframe and wait for a Market Structure Shift (MSS).", tl: "Bumaba sa aligned na lower timeframe at hintayin ang Market Structure Shift (MSS)." },
        { en: "Enter at an FVG (or a breaker, or on the retracement).", tl: "Pumasok sa FVG (o breaker, o sa retracement)." },
        { en: "Ride the expansion to the draw on liquidity.", tl: "Sakyan ang expansion papunta sa draw on liquidity." },
      ],
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "No target, no trade", tl: "Walang target, walang trade" },
      text: {
        en: "The draw on liquidity is non-negotiable. Even a perfect-looking setup is useless without a clear target. The target can be an FVG, swing highs or lows, equal highs or lows, or any other PDRA. Even a relatively equal high (not perfectly level) is still a strong magnet.",
        tl: "Hindi mapag-uusapan ang draw on liquidity. Kahit perpekto ang itsura ng setup, walang silbi ito kung walang malinaw na target. Ang target ay pwedeng FVG, swing highs o lows, equal highs o lows, o anumang ibang PDRA. Kahit relatively equal high (hindi perpektong pantay) ay malakas pa ring magnet.",
      },
    },
    {
      kind: "heading",
      text: { en: "A bearish expansion, step by step", tl: "Isang bearish expansion, hakbang-hakbang" },
    },
    {
      kind: "chart",
      spec: {
        id: "ce-bear",
        title: { en: "Catching a bearish expansion", tl: "Paghuli ng bearish expansion" },
        height: 400,
        candles: [
          { o: 100, h: 104, l: 99, c: 103 },
          { o: 103, h: 111, l: 102, c: 110 },
          { o: 110, h: 111, l: 104, c: 105 },
          { o: 105, h: 106, l: 100, c: 101 },
          { o: 101, h: 114, l: 100, c: 113 },
          { o: 113, h: 114, l: 108, c: 109 },
          { o: 109, h: 110, l: 99, c: 100 },
          { o: 100, h: 104, l: 99, c: 103 },
          { o: 103, h: 104, l: 94, c: 95 },
          { o: 95, h: 96, l: 88, c: 89 },
          { o: 89, h: 90, l: 85, c: 86 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 88, from: 0, to: 10, tone: "bear", dashed: true, label: { en: "Draw on liquidity (target)", tl: "Draw on liquidity (target)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "line", kind: "level", price: 111, from: 1, to: 4, tone: "neutral", dashed: true, label: { en: "Short-term high", tl: "Short-term high" }, labelPlacement: "center", appearAtStep: 1 },
          { type: "marker", kind: "sweep", index: 4, price: 114, tone: "bear", label: { en: "Raid", tl: "Raid" }, appearAtStep: 1 },
          { type: "marker", kind: "mss", index: 6, price: 99, tone: "bear", label: { en: "MSS", tl: "MSS" }, appearAtStep: 2 },
          { type: "box", kind: "fvg", from: 5, to: 7, bottom: 104, top: 108, tone: "bear", label: { en: "FVG entry", tl: "FVG entry" }, appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 7, price: 104, tone: "bear", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "label", index: 8, price: 100, text: { en: "Expansion", tl: "Expansion" }, tone: "bear", appearAtStep: 3 },
          { type: "marker", kind: "tp", index: 10, price: 86, tone: "bear", label: { en: "Target hit", tl: "Target hit" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Step 1: find the draw on liquidity. Here it rests below as sell-side liquidity, the target price wants to reach. Mark it first; without it, do not trade.", tl: "Hakbang 1: hanapin ang draw on liquidity. Dito ito nakahimpil sa ibaba bilang sell-side liquidity, ang target na gustong abutin ng presyo. Markahan muna ito; kung wala nito, huwag mag-trade." },
            tip: { en: "Resting liquidity below in a bearish setup = your target.", tl: "Nakahimpil na liquidity sa ibaba sa bearish setup = ang target mo." },
            revealCandles: 2,
          },
          {
            caption: { en: "Step 2: wait for a raid on the short-term high. Price sweeps above it and grabs the liquidity (it takes the ERL). That raid turns the short-term high into an intermediate-term high.", tl: "Hakbang 2: hintayin ang raid sa short-term high. Sinisweep ng presyo ang itaas nito at kinukuha ang liquidity (kinukuha ang ERL). Ang raid na iyon ay ginagawang intermediate-term high ang short-term high." },
            tip: { en: "A poke above the short-term high that reverses = the raid.", tl: "Pagtusok lampas sa short-term high na bumabaliktad = ang raid." },
            revealCandles: 5,
          },
          {
            caption: { en: "Steps 3 and 4: drop to the aligned lower timeframe, wait for an MSS down to confirm, then enter at the FVG. Remember ERL to IRL? You took the ERL, now you enter the IRL (the FVG).", tl: "Hakbang 3 at 4: bumaba sa aligned na lower timeframe, hintayin ang MSS pababa para kumpirmahin, tapos pumasok sa FVG. Tandaan ang ERL papuntang IRL? Kinuha mo ang ERL, ngayon pumasok ka sa IRL (ang FVG)." },
            tip: { en: "MSS down, then the retrace into the FVG = your entry.", tl: "MSS pababa, tapos ang retrace papasok sa FVG = ang entry mo." },
            revealCandles: 8,
          },
          {
            caption: { en: "Step 5: price expands down to the draw on liquidity. That clean run to your target is the expansion you set out to catch.", tl: "Hakbang 5: nag-eexpand pababa ang presyo papunta sa draw on liquidity. Ang malinis na takbo papunta sa target mo ang expansion na nais mong mahuli." },
            tip: { en: "Price reaching the target liquidity = the expansion is done.", tl: "Pag-abot ng presyo sa target liquidity = tapos na ang expansion." },
            revealCandles: 11,
          },
        ],
        caption: {
          en: "Target first, then the raid, then MSS, then FVG entry, then the expansion to the target. The bullish version is the mirror.",
          tl: "Target muna, tapos ang raid, tapos MSS, tapos FVG entry, tapos ang expansion papunta sa target. Ang bullish na bersyon ay kabaligtaran.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "The raid is the ERL takeout", tl: "Ang raid ay ang ERL takeout" },
      text: {
        en: "The raid on the short-term high or low is exactly the external range liquidity (ERL) takeout from the ERL/IRL lesson. Once the ERL is taken, you drop down and enter the internal range liquidity (the FVG). And the short-term high being raided is what promotes it to an intermediate-term high, from the market structure lesson.",
        tl: "Ang raid sa short-term high o low ay mismong ang external range liquidity (ERL) takeout mula sa ERL/IRL lesson. Kapag nakuha ang ERL, bumababa ka at pumapasok sa internal range liquidity (ang FVG). At ang short-term high na rinaid ang nagpo-promote rito sa intermediate-term high, mula sa market structure lesson.",
      },
    },
    {
      kind: "heading",
      text: { en: "A bullish expansion", tl: "Isang bullish expansion" },
    },
    {
      kind: "chart",
      spec: {
        id: "ce-bull",
        title: { en: "Catching a bullish expansion", tl: "Paghuli ng bullish expansion" },
        height: 400,
        candles: [
          { o: 100, h: 101, l: 96, c: 97 },
          { o: 97, h: 98, l: 89, c: 90 },
          { o: 90, h: 96, l: 89, c: 95 },
          { o: 95, h: 100, l: 94, c: 99 },
          { o: 99, h: 100, l: 86, c: 87 },
          { o: 87, h: 92, l: 86, c: 91 },
          { o: 91, h: 101, l: 90, c: 100 },
          { o: 100, h: 101, l: 96, c: 97 },
          { o: 97, h: 106, l: 96, c: 105 },
          { o: 105, h: 112, l: 104, c: 111 },
          { o: 111, h: 115, l: 110, c: 114 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 112, from: 0, to: 10, tone: "bull", dashed: true, label: { en: "Draw on liquidity (target)", tl: "Draw on liquidity (target)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "line", kind: "level", price: 89, from: 1, to: 4, tone: "neutral", dashed: true, label: { en: "Short-term low", tl: "Short-term low" }, labelPlacement: "center", appearAtStep: 1 },
          { type: "marker", kind: "sweep", index: 4, price: 86, tone: "bull", label: { en: "Raid", tl: "Raid" }, appearAtStep: 1 },
          { type: "marker", kind: "mss", index: 6, price: 101, tone: "bull", label: { en: "MSS", tl: "MSS" }, appearAtStep: 2 },
          { type: "box", kind: "fvg", from: 5, to: 7, bottom: 92, top: 96, tone: "bull", label: { en: "FVG entry", tl: "FVG entry" }, appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 7, price: 96, tone: "bull", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "label", index: 8, price: 100, text: { en: "Expansion", tl: "Expansion" }, tone: "bull", appearAtStep: 3 },
          { type: "marker", kind: "tp", index: 10, price: 114, tone: "bull", label: { en: "Target hit", tl: "Target hit" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Step 1: the draw on liquidity sits above as buy-side liquidity. That is the target. Mark it first.", tl: "Hakbang 1: ang draw on liquidity ay nasa itaas bilang buy-side liquidity. Iyon ang target. Markahan muna ito." },
            tip: { en: "Resting liquidity above in a bullish setup = your target.", tl: "Nakahimpil na liquidity sa itaas sa bullish setup = ang target mo." },
            revealCandles: 2,
          },
          {
            caption: { en: "Step 2: wait for a raid on the short-term low. Price sweeps below it, grabs the liquidity, and that raid promotes it to an intermediate-term low.", tl: "Hakbang 2: hintayin ang raid sa short-term low. Sinisweep ng presyo ang ibaba nito, kinukuha ang liquidity, at ang raid na iyon ay nagpo-promote rito sa intermediate-term low." },
            tip: { en: "A poke below the short-term low that reverses up = the raid.", tl: "Pagtusok sa ilalim ng short-term low na bumabaliktad pataas = ang raid." },
            revealCandles: 5,
          },
          {
            caption: { en: "Steps 3 and 4: on the lower timeframe, wait for an MSS up, then enter at the FVG.", tl: "Hakbang 3 at 4: sa lower timeframe, hintayin ang MSS pataas, tapos pumasok sa FVG." },
            tip: { en: "MSS up, then the retrace into the FVG = your entry.", tl: "MSS pataas, tapos ang retrace papasok sa FVG = ang entry mo." },
            revealCandles: 8,
          },
          {
            caption: { en: "Step 5: price expands up to the draw on liquidity. Target reached.", tl: "Hakbang 5: nag-eexpand pataas ang presyo papunta sa draw on liquidity. Naabot ang target." },
            tip: { en: "Price reaching the target liquidity above = the expansion is done.", tl: "Pag-abot ng presyo sa target liquidity sa itaas = tapos na ang expansion." },
            revealCandles: 11,
          },
        ],
        caption: {
          en: "Same five steps, flipped: target above, raid the short-term low, MSS up, FVG entry, expansion up.",
          tl: "Parehong limang hakbang, binaliktad: target sa itaas, raid sa short-term low, MSS pataas, FVG entry, expansion pataas.",
        },
      },
    },
    {
      kind: "heading",
      level: 3,
      text: { en: "This is everything combined", tl: "Pinagsama-sama na ito lahat" },
    },
    {
      kind: "paragraph",
      text: {
        en: "Catching expansions is not a new tool, it is your whole toolkit working together. The raid and target are the ERL/IRL draw on liquidity. The structure that forms is a market maker model. The push, pause, and push are the states of the market. You are simply reading all of it at once.",
        tl: "Ang paghuli ng expansion ay hindi bagong tool, ito ang buong toolkit mo na magkakasamang gumagana. Ang raid at target ay ang ERL/IRL na draw on liquidity. Ang structure na nabubuo ay isang market maker model. Ang tulak, pahinga, at tulak ay ang states of the market. Binabasa mo lang lahat ito nang sabay-sabay.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Enter at the second stage (patience)", tl: "Pumasok sa second stage (pasensya)" },
      text: {
        en: "Inside the model, prefer to enter at the second stage. It is closer to the draw on liquidity, so the stop is well placed and the trade is safer. The profit is a little smaller, but profit is profit, and safer entries win more often. Patience is what makes this work.",
        tl: "Sa loob ng model, mas mainam pumasok sa second stage. Mas malapit ito sa draw on liquidity, kaya maganda ang lagay ng stop at mas ligtas ang trade. Bahagyang mas maliit ang profit, pero profit pa rin, at mas madalas manalo ang mas ligtas na entries. Ang pasensya ang dahilan kung bakit ito gumagana.",
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Keep the timeframes aligned", tl: "Panatilihing aligned ang timeframes" },
      text: {
        en: "Read the bias on the higher timeframe, find the model and raid on the aligned middle timeframe, and enter on the lower one (for example daily, H1, then M5). Do not mix far-apart timeframes.",
        tl: "Basahin ang bias sa higher timeframe, hanapin ang model at raid sa aligned na middle timeframe, at pumasok sa lower (halimbawa daily, H1, tapos M5). Huwag paghaluin ang magkalayong timeframes.",
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
          en: "NZDUSD (H1 to M5): a sell model, raid on the short-term high, MSS down, second-stage FVG entry, expansion to the draw on liquidity.",
          tl: "NZDUSD (H1 papuntang M5): sell model, raid sa short-term high, MSS pababa, second-stage FVG entry, expansion papunta sa draw on liquidity.",
        },
        {
          en: "NQ (daily to 4H): a buy model with a relatively equal high as the draw on liquidity. The equal high was a strong magnet, so the expansion ran straight to it.",
          tl: "NQ (daily papuntang 4H): buy model na may relatively equal high bilang draw on liquidity. Malakas na magnet ang equal high, kaya tumakbo nang diretso dito ang expansion.",
        },
        {
          en: "A 15-minute sell model: after the raid and MSS, entries came from an order block and the FVG, both targeting the draw on liquidity.",
          tl: "Isang 15-minutong sell model: pagkatapos ng raid at MSS, ang entries ay galing sa order block at FVG, parehong tinarget ang draw on liquidity.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "To catch an expansion: find the draw on liquidity first, wait for a raid on a short-term high/low, confirm with an MSS on the aligned lower timeframe, enter at an FVG (ideally the second stage), and ride the move to your target. It is order flow, ERL/IRL, and the market maker model all at once.",
        tl: "Para mahuli ang expansion: hanapin muna ang draw on liquidity, hintayin ang raid sa short-term high/low, kumpirmahin gamit ang MSS sa aligned na lower timeframe, pumasok sa FVG (mas mainam sa second stage), at sakyan ang galaw papunta sa target. Ito ay order flow, ERL/IRL, at market maker model nang sabay-sabay.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "What is an expansion?",
        tl: "Ano ang expansion?",
      },
      options: [
        { id: "a", text: { en: "The big, fast directional move to the target", tl: "Ang malaki at mabilis na may-direksyong galaw papunta sa target" } },
        { id: "b", text: { en: "A sideways range", tl: "Isang sideways range" } },
        { id: "c", text: { en: "A single doji candle", tl: "Isang doji candle" } },
        { id: "d", text: { en: "The spread widening", tl: "Ang paglapad ng spread" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "An expansion is the strong directional move, the part you aim to catch as it runs to the draw on liquidity.",
        tl: "Ang expansion ay ang malakas na may-direksyong galaw, ang bahaging nais mong mahuli habang tumatakbo papunta sa draw on liquidity.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "What is the first and most important step in catching an expansion?",
        tl: "Ano ang una at pinakamahalagang hakbang sa paghuli ng expansion?",
      },
      options: [
        { id: "a", text: { en: "Find the draw on liquidity (the target)", tl: "Hanapin ang draw on liquidity (ang target)" } },
        { id: "b", text: { en: "Pick a random entry", tl: "Pumili ng random na entry" } },
        { id: "c", text: { en: "Set a huge position size", tl: "Magtakda ng malaking position size" } },
        { id: "d", text: { en: "Wait for the weekend", tl: "Maghintay ng weekend" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Find the draw on liquidity first. Without a clear target, even a great setup is useless.",
        tl: "Hanapin muna ang draw on liquidity. Kung walang malinaw na target, walang silbi kahit magandang setup.",
      },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: {
        en: "In a bearish setup, what raid do you wait for?",
        tl: "Sa bearish setup, anong raid ang hinihintay mo?",
      },
      options: [
        { id: "a", text: { en: "A raid on a short-term high", tl: "Raid sa short-term high" } },
        { id: "b", text: { en: "A raid on a short-term low", tl: "Raid sa short-term low" } },
        { id: "c", text: { en: "No raid at all", tl: "Walang raid" } },
        { id: "d", text: { en: "A raid on the daily open", tl: "Raid sa daily open" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Bearish: wait for a raid on a short-term high. Bullish: a raid on a short-term low.",
        tl: "Bearish: hintayin ang raid sa short-term high. Bullish: raid sa short-term low.",
      },
    },
    {
      id: "q4",
      type: "truefalse",
      prompt: {
        en: "A relatively equal high (not perfectly level) can still be a strong draw on liquidity.",
        tl: "Ang relatively equal high (hindi perpektong pantay) ay malakas pa ring draw on liquidity.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Even a relatively equal high is a strong magnet, so it works as a target.",
        tl: "Oo. Kahit relatively equal high ay malakas na magnet, kaya gumagana ito bilang target.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "In a bullish setup, what raid do you wait for?",
        tl: "Sa bullish setup, anong raid ang hinihintay mo?",
      },
      options: [
        { id: "a", text: { en: "A raid on a short-term low", tl: "Raid sa short-term low" } },
        { id: "b", text: { en: "A raid on a short-term high", tl: "Raid sa short-term high" } },
        { id: "c", text: { en: "A raid on the spread", tl: "Raid sa spread" } },
        { id: "d", text: { en: "No raid", tl: "Walang raid" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Bullish: wait for a raid on a short-term low before looking to buy.",
        tl: "Bullish: hintayin ang raid sa short-term low bago maghanap ng buy.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "When a short-term high gets raided, it is promoted to…",
        tl: "Kapag rinaid ang short-term high, nagiging…",
      },
      options: [
        { id: "a", text: { en: "An intermediate-term high", tl: "Isang intermediate-term high" } },
        { id: "b", text: { en: "A consolidation", tl: "Isang consolidation" } },
        { id: "c", text: { en: "A gap", tl: "Isang gap" } },
        { id: "d", text: { en: "A moving average", tl: "Isang moving average" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The raid promotes a short-term high to an intermediate-term high, from the market structure lesson.",
        tl: "Ang raid ay nagpo-promote sa short-term high papuntang intermediate-term high, mula sa market structure lesson.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "After the raid takes the ERL, where do you look to enter?",
        tl: "Pagkatapos kunin ng raid ang ERL, saan ka tumitingin para pumasok?",
      },
      options: [
        { id: "a", text: { en: "At the FVG (the IRL) on the lower timeframe", tl: "Sa FVG (ang IRL) sa lower timeframe" } },
        { id: "b", text: { en: "At the same ERL again", tl: "Sa parehong ERL ulit" } },
        { id: "c", text: { en: "At a random candle", tl: "Sa random na candle" } },
        { id: "d", text: { en: "You never enter", tl: "Hindi ka kailanman pumapasok" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Once the ERL is taken, drop down and enter at the IRL (the FVG), the same ERL-to-IRL idea.",
        tl: "Kapag nakuha ang ERL, bumaba at pumasok sa IRL (ang FVG), ang parehong ERL-papuntang-IRL na ideya.",
      },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: {
        en: "What confirms the entry on the lower timeframe?",
        tl: "Ano ang nagkukumpirma ng entry sa lower timeframe?",
      },
      options: [
        { id: "a", text: { en: "A Market Structure Shift (MSS)", tl: "Isang Market Structure Shift (MSS)" } },
        { id: "b", text: { en: "A round number", tl: "Isang round number" } },
        { id: "c", text: { en: "A news alert", tl: "Isang news alert" } },
        { id: "d", text: { en: "The clock", tl: "Ang orasan" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "You wait for an MSS on the lower timeframe to confirm before entering at the FVG.",
        tl: "Hinihintay mo ang MSS sa lower timeframe para kumpirmahin bago pumasok sa FVG.",
      },
    },
    {
      id: "q9",
      type: "truefalse",
      prompt: {
        en: "Timeframes should be aligned (for example daily, then H1, then M5).",
        tl: "Dapat aligned ang timeframes (halimbawa daily, tapos H1, tapos M5).",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Keep timeframes aligned: bias on the higher, model on the middle, entry on the lower.",
        tl: "Oo. Panatilihing aligned ang timeframes: bias sa higher, model sa middle, entry sa lower.",
      },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: {
        en: "Inside the model, which entry is usually safer?",
        tl: "Sa loob ng model, aling entry ang kadalasang mas ligtas?",
      },
      options: [
        { id: "a", text: { en: "The second stage, closer to the draw on liquidity", tl: "Ang second stage, mas malapit sa draw on liquidity" } },
        { id: "b", text: { en: "The very first candle", tl: "Ang pinakaunang candle" } },
        { id: "c", text: { en: "Anywhere far from the target", tl: "Kahit saan na malayo sa target" } },
        { id: "d", text: { en: "Counter-trend", tl: "Counter-trend" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The second-stage entry is closer to the target, so it is safer. Smaller profit, but a higher chance of working.",
        tl: "Ang second-stage entry ay mas malapit sa target, kaya mas ligtas. Mas maliit na profit, pero mas malaking tsansang gumana.",
      },
    },
  ],
};
