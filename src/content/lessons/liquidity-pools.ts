// Source: Part 1/Part 1 Lesson 3 - Liquidity Pools.txt (verified: matches title)
// COVERAGE (source: Part 1/Part 1 Lesson 3 - Liquidity Pools.txt) — every point mapped:
// [x] liquidity pool = a high/low with more liquidity than a usual one -> intro + Q1
// [x] they are the most important swing highs/lows to monitor -> intro + heading
// [x] types: previous session (Asian/London/NY), previous day, previous week, previous month -> list + Q2, Q8
// [x] price is sensitive at pools (reaction, reversal/retracement) -> paragraph
// [x] mechanic: sweep one pool's high -> target the opposite pool (the low) -> guided chart + key callout + Q3
// [x] must wait for confirmation (MSS) before entering -> chart step + warning callout + Q4
// [x] confirmation should be a candle BODY close, not just a wick -> warning callout + Q5
// [x] a wick on a higher TF is a full sweep/move on a lower TF -> warning callout + Q6
// [x] entry after MSS = OB / breaker / FVG / PDRA -> chart step + key callout + Q7
// [x] re-entry = the second distribution of the market maker model (safer entry) -> tip callout + Q10
// [x] keep entries/targets achievable (not too close to the next pool) -> tip callout + Q9
// [x] bearish & bullish mirror (sweep high->short to low; sweep low->long to high) -> paragraph
// [x] SL at the swept extreme (previous low/high); a drawdown is OK if SL not hit -> tip callout
// [x] inversion FVG / BPR can also be the confirmation -> paragraph
// [x] timeframes: session=intraday, week=Monday, month=swing/position -> paragraph
// note: the instructor repeats the SAME mechanic across Asian/day/week/month examples; the
//   guided chart shows it once on the previous-day pools, and the pool list + callouts carry
//   the rest. One garbled audio patch (a second weekly example) was omitted, not guessed.
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "liquidity-pools",
  moduleSlug: "part-1",
  title: { en: "Liquidity Pools", tl: "Liquidity Pools" },
  summary: {
    en: "The specific highs and lows that hold the most resting orders, and the universal play: sweep one pool, wait for confirmation, then trade to the opposite pool.",
    tl: "Ang mga tiyak na highs at lows na may pinakamaraming nakahandang orders, at ang unibersal na laro: i-sweep ang isang pool, maghintay ng confirmation, tapos i-trade papunta sa kabilang pool.",
  },
  estMinutes: 11,
  sourceFile: "Part 1/Part 1 Lesson 3 - Liquidity Pools.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "A liquidity pool is a high or low that holds more liquidity than a usual one. They are simply the most important swing highs and lows: the levels everyone can see, so the most stop orders rest just beyond them. Price is drawn to these pools, and reacts strongly when it reaches one.",
        tl: "Ang liquidity pool ay isang high o low na may mas maraming liquidity kaysa sa karaniwan. Ito ay ang pinaka-importanteng swing highs at lows: ang mga level na nakikita ng lahat, kaya doon nag-iipon ang pinakamaraming stop orders. Hinihila ang presyo papunta sa mga pool na ito, at malakas itong nag-rereact pagdating doon.",
      },
    },
    {
      kind: "heading",
      text: { en: "Which highs and lows", tl: "Aling highs at lows" },
    },
    {
      kind: "list",
      items: [
        {
          en: "Previous session highs and lows: the three sessions are Asian, London, and New York.",
          tl: "Previous session highs at lows: ang tatlong session ay Asian, London, at New York.",
        },
        {
          en: "Previous day's high and low (the prior day, including Monday's).",
          tl: "High at low ng previous day (ang nakaraang araw, kasama ang sa Lunes).",
        },
        {
          en: "Previous week's high and low (Monday anchors the week).",
          tl: "High at low ng previous week (ang Lunes ang anchor ng linggo).",
        },
        {
          en: "Previous month's high and low (used for swing / position trades).",
          tl: "High at low ng previous month (ginagamit sa swing / position trades).",
        },
      ],
    },
    {
      kind: "paragraph",
      text: {
        en: "Price is sensitive at all of these. You will often see a reaction, and sometimes a reversal or a retracement, right at a pool. So we watch them and plan around them.",
        tl: "Sensitibo ang presyo sa lahat ng ito. Madalas kang makakakita ng reaction, at minsan reversal o retracement, mismo sa isang pool. Kaya binabantayan natin sila at nagpaplano sa paligid nila.",
      },
    },
    {
      kind: "heading",
      level: 3,
      text: { en: "How to trade a liquidity pool", tl: "Paano i-trade ang liquidity pool" },
    },
    {
      kind: "chart",
      spec: {
        id: "liq-pool-trade",
        title: { en: "Sweep one pool, then trade to the opposite pool", tl: "I-sweep ang isang pool, tapos i-trade sa kabilang pool" },
        height: 400,
        candles: [
          { o: 108, h: 112, l: 107, c: 111 },
          { o: 111, h: 116, l: 110, c: 115 },
          { o: 115, h: 117, l: 111, c: 112 },
          { o: 112, h: 113, l: 110, c: 111 },
          { o: 111, h: 119, l: 110, c: 118 },
          { o: 118, h: 123, l: 117, c: 119 },
          { o: 119, h: 120, l: 113, c: 115 },
          { o: 115, h: 116, l: 108, c: 109 },
          { o: 109, h: 114, l: 108, c: 113 },
          { o: 113, h: 114, l: 104, c: 106 },
          { o: 106, h: 107, l: 100, c: 101 },
          { o: 101, h: 103, l: 98, c: 99 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 120, from: 0, to: 6, tone: "gold", dashed: true, label: { en: "Previous day high", tl: "Previous day high" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "line", kind: "level", price: 100, from: 0, to: 11, tone: "gold", dashed: true, label: { en: "Previous day low (target)", tl: "Previous day low (target)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 5, price: 125, tone: "gold", label: { en: "Sweep", tl: "Sweep" }, appearAtStep: 1 },
          { type: "line", kind: "level", price: 110, from: 4, to: 7, tone: "bear", dashed: true, label: { en: "MSS", tl: "MSS" }, labelPlacement: "center", appearAtStep: 2 },
          { type: "marker", kind: "mss", index: 7, price: 110, tone: "bear", label: { en: "", tl: "" }, appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 8, price: 116, tone: "bear", label: { en: "Entry", tl: "Entry" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Two dashed lines mark our liquidity pools: the previous day's HIGH (buy-side liquidity above) and the previous day's LOW (sell-side liquidity below). Price is drawn toward them.", tl: "Dalawang putol-putol na linya ang nagmamarka ng liquidity pools: ang HIGH ng previous day (buy-side liquidity sa itaas) at ang LOW ng previous day (sell-side liquidity sa ibaba). Hinihila ang presyo papunta sa kanila." },
            tip: { en: "Liquidity pools = the most-watched swing highs/lows: previous session, day, week, month.", tl: "Liquidity pools = pinaka-binabantayang swing highs/lows: previous session, day, week, month." },
            revealCandles: 4,
          },
          {
            caption: { en: "Price rallies up and pokes ABOVE the previous day high, then closes back below it. That is the SWEEP (manipulation), grabbing the liquidity resting above the high. The same sweep idea as the Liquidity lesson.", tl: "Umakyat ang presyo at tumusok PATAAS lampas sa previous day high, tapos nag-close pabalik sa ilalim. Iyon ang SWEEP (manipulation), kinukuha ang liquidity sa itaas ng high. Parehong sweep idea sa Liquidity lesson." },
            tip: { en: "A poke above the level that closes back below = a sweep, not a real breakout.", tl: "Tusok pataas sa level na nag-close pabalik sa ilalim = sweep, hindi totoong breakout." },
            revealCandles: 6,
          },
          {
            caption: { en: "Then price breaks DOWN through the last short-term low. Remember the MSS (Market Structure Shift) from the earlier lesson? That break is your CONFIRMATION that structure flipped. Do NOT enter before this.", tl: "Tapos bumaba ang presyo lampas sa huling short-term low. Tandaan ang MSS (Market Structure Shift) sa naunang lesson? Iyon ang CONFIRMATION na nag-shift ang structure. HUWAG mag-enter bago ito." },
            tip: { en: "Confirmation should be a candle BODY close beyond the level, not just a wick.", tl: "Ang confirmation ay dapat candle BODY close lampas sa level, hindi lang wick." },
            revealCandles: 8,
          },
          {
            caption: { en: "On the pullback, enter SHORT at the order block / FVG / breaker the drop left behind (any PDRA). This is where you join the move toward the target.", tl: "Sa pullback, mag-enter ng SHORT sa order block / FVG / breaker na naiwan ng pagbaba (kahit anong PDRA). Dito ka sumasakay papunta sa target." },
            tip: { en: "Stop loss goes at the swept extreme (here, above the previous day high).", tl: "Ang stop loss ay sa swept extreme (dito, sa itaas ng previous day high)." },
            revealCandles: 9,
          },
          {
            caption: { en: "Price distributes down and reaches the opposite pool, the previous day LOW. That was the target all along: sweep one pool, then trade to the other.", tl: "Nagdi-distribute pababa ang presyo at umabot sa kabilang pool, ang LOW ng previous day. Iyon ang target mula pa simula: i-sweep ang isang pool, tapos i-trade papunta sa kabila." },
            tip: { en: "Keep targets achievable: aim for the opposite pool, not somewhere price can't reach.", tl: "Panatilihing achievable ang target: tutukan ang kabilang pool, hindi ang hindi kayang abutin." },
            revealCandles: 12,
          },
        ],
        caption: {
          en: "The universal play: price sweeps one liquidity pool, shifts structure (MSS), you enter at a PDRA, and target the opposite pool.",
          tl: "Ang unibersal na laro: sini-sweep ng presyo ang isang liquidity pool, nag-shift ng structure (MSS), mag-e-enter ka sa PDRA, at tutukan ang kabilang pool.",
        },
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "The repeatable play", tl: "Ang paulit-ulit na laro" },
      text: {
        en: "Sweep a pool, wait for a market structure shift (confirmation), enter at an order block / FVG / breaker, and target the OPPOSITE pool. Sweep a high then short toward the low; sweep a low then long toward the high. It works the same on session, day, week, and month pools.",
        tl: "I-sweep ang pool, maghintay ng market structure shift (confirmation), mag-enter sa order block / FVG / breaker, at tutukan ang KABILANG pool. I-sweep ang high tapos short papuntang low; i-sweep ang low tapos long papuntang high. Pareho lang ito sa session, day, week, at month pools.",
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Confirmation must be a body close, not a wick", tl: "Ang confirmation ay body close, hindi wick" },
      text: {
        en: "Only treat structure as shifted when a candle BODY closes through the level, not when a wick pokes through. Also remember: a single wick on a higher timeframe is often a full sweep when you drop to a lower timeframe, so check the lower timeframe to confirm.",
        tl: "Ituring lang na nag-shift ang structure kapag may candle BODY na nag-close lampas sa level, hindi kapag wick lang ang tumusok. Tandaan din: ang isang wick sa mas mataas na timeframe ay madalas buong sweep kapag bumaba ka sa mas mababang timeframe, kaya i-check ang lower timeframe para makumpirma.",
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "Alternative confirmations work too: an inversion FVG or a BPR (balanced price range) can confirm the shift instead of a plain MSS. And the same idea scales across timeframes, an intraday play uses session and previous-day pools, while weekly (Monday) and monthly pools are for swing or position trades.",
        tl: "May alternatibong confirmation din: ang inversion FVG o BPR (balanced price range) ay pwedeng magkumpirma ng shift sa halip na plain MSS. At ang parehong ideya ay umaakma sa lahat ng timeframe, ang intraday ay gumagamit ng session at previous-day pools, habang ang weekly (Lunes) at monthly pools ay para sa swing o position trades.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Entries, stops, and re-entries", tl: "Entries, stops, at re-entries" },
      text: {
        en: "Put the stop loss at the swept extreme (the previous low for a long, the previous high for a short). A drawdown is fine as long as the stop is not hit. A safer entry is the re-entry: the second distribution of the market maker model, after the first push. Keep every target achievable, aim for the opposite pool, not somewhere price is unlikely to reach.",
        tl: "Ilagay ang stop loss sa swept extreme (ang previous low para sa long, ang previous high para sa short). Okay lang ang drawdown basta hindi tumama ang stop. Mas safe na entry ang re-entry: ang ikalawang distribution ng market maker model, pagkatapos ng unang push. Panatilihing achievable ang bawat target, tutukan ang kabilang pool, hindi ang malabong abutin.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "Liquidity pools are the key swing highs/lows (session, day, week, month). Price sweeps one, you wait for an MSS body-close confirmation, enter at a PDRA, and target the opposite pool. Stop at the swept extreme; keep targets achievable.",
        tl: "Ang liquidity pools ay ang mahahalagang swing highs/lows (session, day, week, month). Sini-sweep ng presyo ang isa, maghintay ka ng MSS body-close confirmation, mag-enter sa PDRA, at tutukan ang kabilang pool. Stop sa swept extreme; panatilihing achievable ang target.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: { en: "A liquidity pool is…", tl: "Ang liquidity pool ay…" },
      options: [
        { id: "a", text: { en: "A high or low that holds more liquidity than usual", tl: "High o low na may mas maraming liquidity kaysa karaniwan" } },
        { id: "b", text: { en: "A type of indicator", tl: "Isang uri ng indicator" } },
        { id: "c", text: { en: "A broker account", tl: "Isang broker account" } },
        { id: "d", text: { en: "A candle color", tl: "Kulay ng candle" } },
      ],
      correctOptionId: "a",
      explanation: { en: "Pools are the key swing highs/lows where the most stop orders rest.", tl: "Ang pools ay mahahalagang swing highs/lows kung saan nag-iipon ang pinakamaraming stop orders." },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: { en: "Which of these are liquidity pools we watch?", tl: "Alin sa mga ito ang liquidity pools na binabantayan?" },
      options: [
        { id: "a", text: { en: "Previous session, day, week, and month highs/lows", tl: "Previous session, day, week, at month highs/lows" } },
        { id: "b", text: { en: "Only today's open", tl: "Ang open lang ngayon" } },
        { id: "c", text: { en: "Random prices", tl: "Random na presyo" } },
        { id: "d", text: { en: "Moving averages", tl: "Moving averages" } },
      ],
      correctOptionId: "a",
      explanation: { en: "Previous session/day/week/month highs and lows are the main pools.", tl: "Previous session/day/week/month highs at lows ang pangunahing pools." },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: { en: "After a pool's HIGH is swept, the natural target is…", tl: "Pagkatapos ma-sweep ang HIGH ng pool, ang natural na target ay…" },
      options: [
        { id: "a", text: { en: "The opposite pool (the low)", tl: "Ang kabilang pool (ang low)" } },
        { id: "b", text: { en: "The same high again", tl: "Ang parehong high ulit" } },
        { id: "c", text: { en: "A round number", tl: "Round number" } },
        { id: "d", text: { en: "Nowhere", tl: "Wala" } },
      ],
      correctOptionId: "a",
      explanation: { en: "Sweep one pool, then trade to the opposite pool.", tl: "I-sweep ang isang pool, tapos i-trade papunta sa kabila." },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: { en: "Before entering after a sweep, you must wait for…", tl: "Bago mag-enter pagkatapos ng sweep, dapat maghintay ng…" },
      options: [
        { id: "a", text: { en: "A market structure shift (confirmation)", tl: "Market structure shift (confirmation)" } },
        { id: "b", text: { en: "Nothing, enter immediately", tl: "Wala, enter agad" } },
        { id: "c", text: { en: "The next day", tl: "Ang susunod na araw" } },
        { id: "d", text: { en: "An indicator cross", tl: "Cross ng indicator" } },
      ],
      correctOptionId: "a",
      explanation: { en: "Wait for the MSS to confirm structure flipped before entering.", tl: "Maghintay ng MSS para makumpirma na nag-flip ang structure bago mag-enter." },
    },
    {
      id: "q5",
      type: "truefalse",
      prompt: { en: "A valid MSS confirmation should be a candle BODY close through the level, not just a wick.", tl: "Ang valid na MSS confirmation ay dapat candle BODY close lampas sa level, hindi lang wick." },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: { en: "A body close confirms; a lone wick does not.", tl: "Ang body close ang nagkukumpirma; hindi sapat ang wick lang." },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: { en: "A single wick on a higher timeframe is often what on a lower timeframe?", tl: "Ang isang wick sa mas mataas na timeframe ay madalas ano sa mas mababang timeframe?" },
      options: [
        { id: "a", text: { en: "A full sweep / move", tl: "Buong sweep / move" } },
        { id: "b", text: { en: "Nothing at all", tl: "Wala talaga" } },
        { id: "c", text: { en: "A gap", tl: "Isang gap" } },
        { id: "d", text: { en: "A reversal candle only", tl: "Reversal candle lang" } },
      ],
      correctOptionId: "a",
      explanation: { en: "Drop to the lower timeframe: that wick is usually a full sweep there.", tl: "Bumaba sa lower timeframe: ang wick na iyon ay kadalasang buong sweep doon." },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: { en: "After the MSS, where do you look for an entry?", tl: "Pagkatapos ng MSS, saan ka humahanap ng entry?" },
      options: [
        { id: "a", text: { en: "An order block, breaker, or FVG (a PDRA)", tl: "Order block, breaker, o FVG (PDRA)" } },
        { id: "b", text: { en: "Anywhere on the chart", tl: "Kahit saan sa chart" } },
        { id: "c", text: { en: "The exact swept extreme", tl: "Mismong swept extreme" } },
        { id: "d", text: { en: "At the session close", tl: "Sa session close" } },
      ],
      correctOptionId: "a",
      explanation: { en: "Enter at the PDRA (OB / breaker / FVG) the impulse left behind.", tl: "Mag-enter sa PDRA (OB / breaker / FVG) na naiwan ng impulse." },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: { en: "The weekly liquidity pool is anchored to…", tl: "Ang weekly liquidity pool ay naka-anchor sa…" },
      options: [
        { id: "a", text: { en: "The previous week's high/low (Monday)", tl: "High/low ng previous week (Lunes)" } },
        { id: "b", text: { en: "Any random day", tl: "Kahit anong araw" } },
        { id: "c", text: { en: "The monthly open only", tl: "Monthly open lang" } },
        { id: "d", text: { en: "Friday's close only", tl: "Close ng Biyernes lang" } },
      ],
      correctOptionId: "a",
      explanation: { en: "The week is anchored on Monday; we watch the previous week's high and low.", tl: "Ang linggo ay naka-anchor sa Lunes; binabantayan ang high at low ng previous week." },
    },
    {
      id: "q9",
      type: "truefalse",
      prompt: { en: "You should always set the target as far as possible, even if price is unlikely to reach it.", tl: "Dapat laging ilagay ang target nang malayo hangga't kaya, kahit malabong abutin ng presyo." },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: { en: "False. Keep targets achievable, aim for the opposite pool.", tl: "Mali. Panatilihing achievable ang target, tutukan ang kabilang pool." },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: { en: "The safer 're-entry' corresponds to…", tl: "Ang mas safe na 're-entry' ay tumutugma sa…" },
      options: [
        { id: "a", text: { en: "The second distribution of the market maker model", tl: "Ang ikalawang distribution ng market maker model" } },
        { id: "b", text: { en: "Doubling your risk", tl: "Pagdodoble ng risk" } },
        { id: "c", text: { en: "Entering before the sweep", tl: "Pag-enter bago ang sweep" } },
        { id: "d", text: { en: "Removing the stop loss", tl: "Pag-alis ng stop loss" } },
      ],
      correctOptionId: "a",
      explanation: { en: "The re-entry is the second distribution after the first push, a safer spot.", tl: "Ang re-entry ay ang ikalawang distribution pagkatapos ng unang push, mas safe." },
    },
  ],
};
