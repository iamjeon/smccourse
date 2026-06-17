// Source: Part 4/Part 4 Lesson 2 - Main Model.txt (verified: matches title; also at ~/Downloads/transcript.txt)
// COVERAGE (source: Part 4/Part 4 Lesson 2 - Main Model.txt) — every point mapped:
// [x] this is the instructor's main intraday model, built on three timeframes (HTF, intermediate, LTF) -> intro + timeframes list + Q1
// [x] rule 1: on the HTF get the draw on liquidity (from an IRL the draw is the ERL); that is your bias -> rules list + mm-bull chart step0 + Q2, Q3
// [x] only enter in the HTF direction; do not enter retracements (low probability) -> rules list + bias callout + Q4
// [x] rule 2: wait for the intermediate timeframe to move toward your direction (toward the draw) -> rules list + mm-bull chart step1 + Q5
// [x] rule 3: wait for a raid on the short-term high/low on the intermediate timeframe -> rules list + mm charts step1 + Q6
// [x] rule 4: drop to the lower timeframe after the raid and enter using an entry pattern -> rules list + mm charts step2 + Q7
// [x] the core requirement is the stop hunt/raid that takes liquidity, then price moves; filling an FVG is not strictly required -> requirement callout + Q8
// [x] SMT is an additional confluence only (when present, the swept side is protected) -> smt callout + Q9
// [x] targets: minimum 1:2, sometimes 1:3 for a very high-probability draw on liquidity -> targets callout + Q10
// [x] avoid the big-three / red-folder news -> news callout
// [x] bullish and bearish (mirror) -> mm-bull + mm-bear charts
// [x] worked examples (NZDUSD; GBPUSD with an inversion FVG + SMT + breaker; NASDAQ indices on New York) -> how-pros list
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "main-model",
  moduleSlug: "part-4",
  title: { en: "The Main Model", tl: "The Main Model" },
  summary: {
    en: "The core intraday model, on three timeframes: read the draw on liquidity on the higher timeframe, wait for the intermediate timeframe to raid a short-term high or low, then drop to the lower timeframe and enter with an entry pattern. Target a minimum 1:2.",
    tl: "Ang pangunahing intraday model, sa tatlong timeframe: basahin ang draw on liquidity sa higher timeframe, hintayin ang intermediate timeframe na i-raid ang short-term high o low, tapos bumaba sa lower timeframe at pumasok gamit ang entry pattern. Target na minimum 1:2.",
  },
  estMinutes: 13,
  sourceFile: "Part 4/Part 4 Lesson 2 - Main Model.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "This is the main model used for intraday trading. It runs on three timeframes that work together: the higher timeframe gives the bias and the draw on liquidity, the intermediate timeframe shows the move toward that draw and the raid, and the lower timeframe is where you enter with an entry pattern.",
        tl: "Ito ang pangunahing model na ginagamit para sa intraday trading. Tumatakbo ito sa tatlong timeframe na magkakasama: ang higher timeframe ang nagbibigay ng bias at draw on liquidity, ang intermediate timeframe ang nagpapakita ng galaw papunta sa draw na iyon at ng raid, at ang lower timeframe ang pinapasukan mo gamit ang entry pattern.",
      },
    },
    {
      kind: "list",
      ordered: true,
      items: [
        { en: "Higher timeframe: get the draw on liquidity. If price came from an IRL (an FVG), the draw is the ERL (a swing high or low). This is your bias.", tl: "Higher timeframe: kunin ang draw on liquidity. Kung galing ang presyo sa IRL (FVG), ang draw ay ang ERL (swing high o low). Ito ang bias mo." },
        { en: "Intermediate timeframe: wait for it to move toward your direction, then for a raid on a short-term high or low.", tl: "Intermediate timeframe: hintayin itong gumalaw papunta sa direksyon mo, tapos ang raid sa short-term high o low." },
        { en: "Lower timeframe: after the raid, drop down and enter with one of the entry patterns.", tl: "Lower timeframe: pagkatapos ng raid, bumaba at pumasok gamit ang isa sa mga entry pattern." },
      ],
    },
    {
      kind: "heading",
      text: { en: "The bullish main model", tl: "Ang bullish main model" },
    },
    {
      kind: "chart",
      spec: {
        id: "mm-bull",
        title: { en: "Bullish: raid a low, enter, target the ERL", tl: "Bullish: raid ang low, pumasok, target ang ERL" },
        height: 400,
        candles: [
          { o: 100, h: 104, l: 99, c: 103 },
          { o: 103, h: 108, l: 102, c: 104 },
          { o: 104, h: 105, l: 99, c: 100 },
          { o: 100, h: 101, l: 94, c: 95 },
          { o: 95, h: 109, l: 94, c: 108 },
          { o: 108, h: 110, l: 103, c: 104 },
          { o: 104, h: 105, l: 100, c: 101 },
          { o: 101, h: 111, l: 100, c: 110 },
          { o: 110, h: 113, l: 106, c: 107 },
          { o: 107, h: 117, l: 106, c: 116 },
          { o: 116, h: 119, l: 115, c: 118 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 118, from: 0, to: 10, tone: "bull", dashed: true, label: { en: "Draw on liquidity (ERL)", tl: "Draw on liquidity (ERL)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 3, price: 93, tone: "bull", label: { en: "Raid (STL)", tl: "Raid (STL)" }, appearAtStep: 1 },
          { type: "marker", kind: "mss", index: 4, price: 109, tone: "bull", label: { en: "MSS", tl: "MSS" }, appearAtStep: 2 },
          { type: "box", kind: "fvg", from: 3, to: 5, bottom: 101, top: 103, tone: "bull", label: { en: "Entry pattern (FVG)", tl: "Entry pattern (FVG)" }, appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 6, price: 101, tone: "bull", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "marker", kind: "sl", index: 3, price: 93, tone: "bull", label: { en: "SL below the raid", tl: "SL below the raid" }, appearAtStep: 2 },
          { type: "label", index: 9, price: 112, text: { en: "Expansion", tl: "Expansion" }, tone: "bull", appearAtStep: 3 },
          { type: "marker", kind: "tp", index: 10, price: 118, tone: "bull", label: { en: "ERL hit", tl: "ERL hit" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Higher timeframe first: get the draw on liquidity. Coming from an IRL (an FVG), the draw is the ERL, a swing high above. Bullish bias means we only look for longs.", tl: "Higher timeframe muna: kunin ang draw on liquidity. Galing sa IRL (FVG), ang draw ay ang ERL, isang swing high sa itaas. Bullish bias ibig sabihin longs lang." },
            tip: { en: "From an IRL the next draw is the ERL. Mark it as the target.", tl: "Mula sa IRL, ang susunod na draw ay ang ERL. Markahan ito bilang target." },
            revealCandles: 2,
          },
          {
            caption: { en: "Intermediate timeframe: price moves toward the draw, then raids a short-term low, taking the liquidity below it.", tl: "Intermediate timeframe: gumagalaw ang presyo papunta sa draw, tapos rinaraid ang short-term low, kinukuha ang liquidity sa ilalim nito." },
            tip: { en: "The move heads toward the draw, then sweeps a short-term low.", tl: "Ang galaw ay papunta sa draw, tapos sinisweep ang short-term low." },
            revealCandles: 4,
          },
          {
            caption: { en: "Lower timeframe: after the raid, an MSS up confirms. Enter with an entry pattern at the FVG (around the 50%), with the stop below the raid.", tl: "Lower timeframe: pagkatapos ng raid, isang MSS pataas ang nagkukumpirma. Pumasok gamit ang entry pattern sa FVG (sa paligid ng 50%), na ang stop ay sa ilalim ng raid." },
            tip: { en: "MSS, then an entry pattern at the FVG; stop below the raided low.", tl: "MSS, tapos entry pattern sa FVG; stop sa ilalim ng rinaid na low." },
            revealCandles: 7,
          },
          {
            caption: { en: "Price expands up to the ERL, the draw on liquidity. Target a minimum of 1:2, or 1:3 when the draw is very high probability.", tl: "Nag-eexpand pataas ang presyo papunta sa ERL, ang draw on liquidity. Target na minimum 1:2, o 1:3 kapag napakataas ng probability ng draw." },
            tip: { en: "Run it to the ERL, banking at least 1:2.", tl: "Patakbuhin papunta sa ERL, kumukuha ng kahit 1:2." },
            revealCandles: 11,
          },
        ],
        caption: {
          en: "HTF draw (ERL), intermediate raid of the low, lower-timeframe MSS + FVG entry, expansion to the ERL. Target 1:2 minimum.",
          tl: "HTF draw (ERL), intermediate raid ng low, lower-timeframe MSS + FVG entry, expansion papunta sa ERL. Target 1:2 minimum.",
        },
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "Enter only with the higher-timeframe bias", tl: "Pumasok lang kasama ang higher-timeframe bias" },
      text: {
        en: "If the higher timeframe is bullish, only take longs. Do not enter on retracements against the bias, those are low probability. The intermediate timeframe must be heading toward your draw before you look for the entry.",
        tl: "Kung bullish ang higher timeframe, longs lang. Huwag pumasok sa retracements laban sa bias, mababa ang probability ng mga iyon. Dapat papunta na sa draw mo ang intermediate timeframe bago ka maghanap ng entry.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "The real requirement: the raid", tl: "Ang totoong kailangan: ang raid" },
      text: {
        en: "The one thing this model needs is the stop hunt, the raid that takes the liquidity, after which price can move in your direction. Filling a specific FVG along the way is helpful but not strictly required. The liquidity grab is the trigger.",
        tl: "Ang isang bagay na kailangan ng model na ito ay ang stop hunt, ang raid na kumukuha ng liquidity, pagkatapos nito ay pwedeng gumalaw ang presyo sa direksyon mo. Ang pagpuno sa isang partikular na FVG ay nakakatulong pero hindi mahigpit na kailangan. Ang liquidity grab ang trigger.",
      },
    },
    {
      kind: "heading",
      text: { en: "The bearish main model (mirror)", tl: "Ang bearish main model (kabaligtaran)" },
    },
    {
      kind: "chart",
      spec: {
        id: "mm-bear",
        title: { en: "Bearish: raid a high, enter, target the ERL", tl: "Bearish: raid ang high, pumasok, target ang ERL" },
        height: 400,
        candles: [
          { o: 120, h: 121, l: 116, c: 117 },
          { o: 117, h: 118, l: 109, c: 110 },
          { o: 110, h: 117, l: 109, c: 116 },
          { o: 116, h: 122, l: 115, c: 121 },
          { o: 121, h: 125, l: 120, c: 124 },
          { o: 124, h: 125, l: 108, c: 109 },
          { o: 109, h: 115, l: 107, c: 114 },
          { o: 114, h: 117, l: 112, c: 116 },
          { o: 116, h: 117, l: 106, c: 107 },
          { o: 107, h: 111, l: 104, c: 110 },
          { o: 110, h: 111, l: 100, c: 101 },
          { o: 101, h: 102, l: 96, c: 97 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 97, from: 0, to: 11, tone: "bear", dashed: true, label: { en: "Draw on liquidity (ERL)", tl: "Draw on liquidity (ERL)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 4, price: 126, tone: "bear", label: { en: "Raid (STH)", tl: "Raid (STH)" }, appearAtStep: 1 },
          { type: "marker", kind: "mss", index: 5, price: 108, tone: "bear", label: { en: "MSS", tl: "MSS" }, appearAtStep: 2 },
          { type: "box", kind: "fvg", from: 4, to: 6, bottom: 115, top: 120, tone: "bear", label: { en: "Entry pattern (FVG)", tl: "Entry pattern (FVG)" }, appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 7, price: 117, tone: "bear", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "marker", kind: "sl", index: 4, price: 126, tone: "bear", label: { en: "SL above the raid", tl: "SL above the raid" }, appearAtStep: 2 },
          { type: "label", index: 10, price: 108, text: { en: "Expansion", tl: "Expansion" }, tone: "bear", appearAtStep: 3 },
          { type: "marker", kind: "tp", index: 11, price: 97, tone: "bear", label: { en: "ERL hit", tl: "ERL hit" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Same model flipped. The higher-timeframe draw on liquidity is an ERL swing low below. Bearish bias means we only look for shorts.", tl: "Parehong model, binaliktad. Ang higher-timeframe draw on liquidity ay ERL swing low sa ibaba. Bearish bias ibig sabihin shorts lang." },
            tip: { en: "The draw below is the target; bias is down.", tl: "Ang draw sa ibaba ang target; pababa ang bias." },
            revealCandles: 2,
          },
          {
            caption: { en: "On the intermediate timeframe, price raids a short-term high, taking the liquidity above it.", tl: "Sa intermediate timeframe, rinaraid ng presyo ang short-term high, kinukuha ang liquidity sa itaas nito." },
            tip: { en: "A sweep above a short-term high = the raid.", tl: "Isang sweep lampas sa short-term high = ang raid." },
            revealCandles: 4,
          },
          {
            caption: { en: "On the lower timeframe, an MSS down confirms. Enter at the FVG, with the stop above the raid.", tl: "Sa lower timeframe, isang MSS pababa ang nagkukumpirma. Pumasok sa FVG, na ang stop ay sa itaas ng raid." },
            tip: { en: "MSS down, then enter the FVG; stop above the raided high.", tl: "MSS pababa, tapos pumasok sa FVG; stop sa itaas ng rinaid na high." },
            revealCandles: 7,
          },
          {
            caption: { en: "Price expands down to the ERL draw on liquidity. Again, target a minimum 1:2.", tl: "Nag-eexpand pababa ang presyo papunta sa ERL draw on liquidity. Muli, target na minimum 1:2." },
            tip: { en: "Run it to the ERL below, at least 1:2.", tl: "Patakbuhin papunta sa ERL sa ibaba, kahit 1:2." },
            revealCandles: 12,
          },
        ],
        caption: {
          en: "Flip it: HTF draw below, raid a short-term high, MSS down, FVG entry, expansion to the ERL.",
          tl: "Baliktarin: HTF draw sa ibaba, raid ang short-term high, MSS pababa, FVG entry, expansion papunta sa ERL.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "SMT is confluence, not the signal", tl: "Confluence ang SMT, hindi ang signal" },
      text: {
        en: "SMT divergence can add confidence: when a correlated pair diverges, the swept side is protected and the bias is stronger. But SMT cannot be used alone, it is only an additional confluence on top of this model.",
        tl: "Pwedeng magdagdag ng tiwala ang SMT divergence: kapag nag-diverge ang correlated pair, protected ang sinweep na panig at mas malakas ang bias. Pero hindi pwedeng mag-isa ang SMT, dagdag na confluence lang ito sa model na ito.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Targets and news", tl: "Targets at news" },
      text: {
        en: "Target a minimum of 1:2 reward-to-risk, and 1:3 when the draw on liquidity is very high probability. Avoid entering into high-impact news (the red-folder, big-three releases); take the trade after the news instead.",
        tl: "Target na minimum 1:2 reward-to-risk, at 1:3 kapag napakataas ng probability ng draw on liquidity. Iwasan ang pagpasok papasok sa high-impact news (ang red-folder, big-three releases); kunin ang trade pagkatapos ng news.",
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
          en: "NZDUSD (daily, intermediate, M1): the daily draw was an FVG (IRL). The intermediate timeframe raided a short-term high, an anticipation entry on the lower timeframe caught the fast, news-driven push to the daily FVG.",
          tl: "NZDUSD (daily, intermediate, M1): ang daily draw ay FVG (IRL). Rinaid ng intermediate timeframe ang short-term high, isang anticipation entry sa lower timeframe ang humuli sa mabilis at news-driven na push papunta sa daily FVG.",
        },
        {
          en: "GBPUSD (4H weekly OB): the IRL was an inversion FVG, and an SMT with EURUSD said the high was protected, strengthening the bearish bias. Entries came from breaker blocks, targeting the low.",
          tl: "GBPUSD (4H weekly OB): ang IRL ay inversion FVG, at ang SMT sa EURUSD ay nagsabi na protected ang high, pinalakas ang bearish bias. Ang entries ay galing sa breaker blocks, tinarget ang low.",
        },
        {
          en: "NASDAQ (4H, 15m, 1m): indices are traded in the New York session, where price is volatile and fast. The ERL targets were the swing highs and lows, entered after the raid and MSS.",
          tl: "NASDAQ (4H, 15m, 1m): ang indices ay tina-trade sa New York session, kung saan volatile at mabilis ang presyo. Ang ERL targets ay ang swing highs at lows, pinasok pagkatapos ng raid at MSS.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "The main model is three timeframes: HTF for the draw on liquidity (your bias), intermediate for the move toward it and the raid, lower for the entry pattern. Only trade with the bias, never retracements. The raid (stop hunt) is the trigger; SMT is confluence; target a minimum 1:2, and avoid major news.",
        tl: "Ang main model ay tatlong timeframe: HTF para sa draw on liquidity (ang bias mo), intermediate para sa galaw papunta rito at sa raid, lower para sa entry pattern. Mag-trade lang kasama ang bias, hindi retracements. Ang raid (stop hunt) ang trigger; confluence ang SMT; target na minimum 1:2, at iwasan ang malalaking news.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "How many timeframes does the main model use?",
        tl: "Ilang timeframe ang ginagamit ng main model?",
      },
      options: [
        { id: "a", text: { en: "Three: higher, intermediate, and lower", tl: "Tatlo: higher, intermediate, at lower" } },
        { id: "b", text: { en: "One", tl: "Isa" } },
        { id: "c", text: { en: "Ten", tl: "Sampu" } },
        { id: "d", text: { en: "None", tl: "Wala" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Three: the HTF for the draw on liquidity, the intermediate for the raid, the lower for the entry.",
        tl: "Tatlo: ang HTF para sa draw on liquidity, ang intermediate para sa raid, ang lower para sa entry.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "What is the first thing you do on the higher timeframe?",
        tl: "Ano ang unang ginagawa mo sa higher timeframe?",
      },
      options: [
        { id: "a", text: { en: "Get the draw on liquidity (your bias)", tl: "Kunin ang draw on liquidity (ang bias mo)" } },
        { id: "b", text: { en: "Place an entry immediately", tl: "Maglagay agad ng entry" } },
        { id: "c", text: { en: "Set a 1-minute alarm", tl: "Magtakda ng 1-minutong alarm" } },
        { id: "d", text: { en: "Close all trades", tl: "Isara ang lahat ng trade" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Get the draw on liquidity on the HTF; that is your bias and target.",
        tl: "Kunin ang draw on liquidity sa HTF; iyon ang bias at target mo.",
      },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: {
        en: "If price came from an IRL, the draw on liquidity is…",
        tl: "Kung galing ang presyo sa IRL, ang draw on liquidity ay…",
      },
      options: [
        { id: "a", text: { en: "The ERL (a swing high or low)", tl: "Ang ERL (swing high o low)" } },
        { id: "b", text: { en: "Another IRL only", tl: "Isa pang IRL lamang" } },
        { id: "c", text: { en: "The spread", tl: "Ang spread" } },
        { id: "d", text: { en: "Nothing", tl: "Wala" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "From an IRL, the next draw is the ERL, a swing high or low.",
        tl: "Mula sa IRL, ang susunod na draw ay ang ERL, swing high o low.",
      },
    },
    {
      id: "q4",
      type: "truefalse",
      prompt: {
        en: "If the higher timeframe is bullish, you can still take short entries on retracements.",
        tl: "Kung bullish ang higher timeframe, pwede ka pa ring kumuha ng short entries sa retracements.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. Only trade with the bias. Retracement (counter-trend) entries are low probability.",
        tl: "Mali. Mag-trade lang kasama ang bias. Ang retracement (counter-trend) na entries ay low probability.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "On the intermediate timeframe, before the raid, what must price be doing?",
        tl: "Sa intermediate timeframe, bago ang raid, ano dapat ang ginagawa ng presyo?",
      },
      options: [
        { id: "a", text: { en: "Moving toward your draw on liquidity (your direction)", tl: "Gumagalaw papunta sa draw on liquidity mo (ang direksyon mo)" } },
        { id: "b", text: { en: "Moving away from your draw", tl: "Lumalayo sa draw mo" } },
        { id: "c", text: { en: "Staying perfectly flat", tl: "Nananatiling patag" } },
        { id: "d", text: { en: "Gapping every candle", tl: "Nag-gap kada candle" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Wait for the intermediate timeframe to move toward your direction (your draw) before the raid.",
        tl: "Hintayin ang intermediate timeframe na gumalaw papunta sa direksyon mo (ang draw mo) bago ang raid.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "On the intermediate timeframe you wait for…",
        tl: "Sa intermediate timeframe hinihintay mo ang…",
      },
      options: [
        { id: "a", text: { en: "A raid on a short-term high or low", tl: "Isang raid sa short-term high o low" } },
        { id: "b", text: { en: "A news headline", tl: "Isang news headline" } },
        { id: "c", text: { en: "A round number", tl: "Isang round number" } },
        { id: "d", text: { en: "Market close", tl: "Pagsasara ng market" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "You wait for a raid (stop hunt) on a short-term high or low before dropping down to enter.",
        tl: "Hinihintay mo ang raid (stop hunt) sa short-term high o low bago bumaba para pumasok.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "After the raid, where do you go to enter?",
        tl: "Pagkatapos ng raid, saan ka pumupunta para pumasok?",
      },
      options: [
        { id: "a", text: { en: "The lower timeframe, using an entry pattern", tl: "Ang lower timeframe, gamit ang entry pattern" } },
        { id: "b", text: { en: "The monthly chart", tl: "Ang monthly chart" } },
        { id: "c", text: { en: "You do not enter", tl: "Hindi ka pumapasok" } },
        { id: "d", text: { en: "A different asset", tl: "Ibang asset" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Drop to the lower timeframe and take one of the entry patterns.",
        tl: "Bumaba sa lower timeframe at kunin ang isa sa mga entry pattern.",
      },
    },
    {
      id: "q8",
      type: "truefalse",
      prompt: {
        en: "The core requirement of the model is the raid (stop hunt) that takes liquidity, after which price can move your way.",
        tl: "Ang pangunahing kailangan ng model ay ang raid (stop hunt) na kumukuha ng liquidity, pagkatapos nito ay pwedeng gumalaw ang presyo sa direksyon mo.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. The liquidity grab is the trigger; filling a specific FVG is helpful but not strictly required.",
        tl: "Oo. Ang liquidity grab ang trigger; nakakatulong ang pagpuno ng FVG pero hindi mahigpit na kailangan.",
      },
    },
    {
      id: "q9",
      type: "truefalse",
      prompt: {
        en: "SMT divergence can be used on its own as the entry signal.",
        tl: "Pwedeng gamitin nang mag-isa ang SMT divergence bilang entry signal.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. SMT is only an additional confluence; it cannot be the signal by itself.",
        tl: "Mali. Dagdag na confluence lang ang SMT; hindi ito pwedeng maging signal nang mag-isa.",
      },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: {
        en: "What is the minimum target for this model?",
        tl: "Ano ang minimum na target para sa model na ito?",
      },
      options: [
        { id: "a", text: { en: "1:2 (and 1:3 for very high-probability draws)", tl: "1:2 (at 1:3 para sa napakataas na probability na draws)" } },
        { id: "b", text: { en: "1:0.5", tl: "1:0.5" } },
        { id: "c", text: { en: "There is no target", tl: "Walang target" } },
        { id: "d", text: { en: "100:1", tl: "100:1" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Aim for a minimum 1:2, and 1:3 when the draw on liquidity is very high probability.",
        tl: "Tumudla ng minimum 1:2, at 1:3 kapag napakataas ng probability ng draw on liquidity.",
      },
    },
  ],
};
