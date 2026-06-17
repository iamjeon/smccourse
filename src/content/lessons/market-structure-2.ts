// Source: Basic TradingCourse/Market Structure Part 2.txt (verified: matches title)
// COVERAGE (source: Basic TradingCourse/Market Structure Part 2.txt) — every point mapped:
// [x] apply structure to real price; the key skill is identifying swing highs/lows correctly first -> intro + Q1, Q10
// [x] bullish builds HH/HL/HH/HL; a lower high then a break of the last higher low = a possible reversal (MSS preview) -> ms2-applied chart + Q2, Q5
// [x] a bearish market on real price shows lower lows and lower highs -> bearish note + Q9
// [x] ranging/consolidation is a trap: a short can have its high taken out even when you expect a drop; low probability; avoid -> warning callout + Q3, Q6
// [x] less is more: fewer, cleaner trades can mean fewer losses and more profit -> paragraph + Q7
// [x] beginner target is 1:2 for win-rate and psychology, even when a bigger RR (e.g. 1:3.91) looks possible -> paragraph + Q8
// [x] liquidity / failure swings can be targets to aim at -> targets note
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "market-structure-2",
  moduleSlug: "basics",
  title: { en: "Market Structure (Part 2)", tl: "Market Structure (Part 2)" },
  summary: {
    en: "Applying structure to real price: identify swing points correctly, and spot when a higher low breaks.",
    tl: "Pag-apply ng structure sa totoong price: i-identify nang tama ang swing points, at mapansin kapag na-break ang higher low.",
  },
  estMinutes: 8,
  sourceFile: "Basic TradingCourse/Market Structure Part 2.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "Now we apply structure to real price. The skill that matters most is correctly identifying the swing highs and swing lows first. Only then can you judge whether structure is continuing or about to break. We do this on a naked chart, no indicators needed.",
        tl: "Ngayon, i-a-apply natin ang structure sa totoong price. Ang pinaka-importanteng skill ay tama munang ma-identify ang swing highs at swing lows. Saka mo masasabi kung tuloy ba ang structure o malapit nang ma-break. Ginagawa natin ito sa naked chart, walang indicator.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "ms2-applied",
        title: { en: "Bullish structure, then a higher low breaks (MSS)", tl: "Bullish structure, tapos na-break ang higher low (MSS)" },
        height: 400,
        candles: [
          { o: 108, h: 110, l: 104, c: 106 },
          { o: 106, h: 107, l: 98, c: 100 },
          { o: 100, h: 114, l: 99, c: 113 },
          { o: 113, h: 126, l: 112, c: 124 },
          { o: 124, h: 125, l: 116, c: 118 },
          { o: 118, h: 119, l: 110, c: 112 },
          { o: 112, h: 128, l: 111, c: 126 },
          { o: 126, h: 140, l: 125, c: 138 },
          { o: 139, h: 155, l: 138, c: 152 },
          { o: 152, h: 153, l: 139, c: 141 },
          { o: 141, h: 142, l: 130, c: 132 },
          { o: 132, h: 140, l: 131, c: 139 },
          { o: 139, h: 143, l: 138, c: 141 },
          { o: 141, h: 142, l: 133, c: 135 },
          { o: 135, h: 136, l: 126, c: 128 },
          { o: 128, h: 130, l: 120, c: 122 },
        ],
        annotations: [
          { type: "label", index: 3, price: 133, text: { en: "HH", tl: "HH" }, tone: "bull", appearAtStep: 0 },
          { type: "label", index: 5, price: 104, text: { en: "HL", tl: "HL" }, tone: "bull", appearAtStep: 1 },
          { type: "label", index: 8, price: 162, text: { en: "HH", tl: "HH" }, tone: "bull", appearAtStep: 2 },
          { type: "label", index: 10, price: 123, text: { en: "HL", tl: "HL" }, tone: "bull", appearAtStep: 3 },
          { type: "label", index: 12, price: 150, text: { en: "LH", tl: "LH" }, tone: "bear", appearAtStep: 4 },
          { type: "line", kind: "level", price: 130, from: 10, to: 14, tone: "bear", dashed: true, label: { en: "MSS", tl: "MSS" }, labelPlacement: "center", appearAtStep: 5 },
          { type: "marker", kind: "mss", index: 14, price: 130, tone: "bear", label: { en: "", tl: "" }, appearAtStep: 5 },
        ],
        steps: [
          {
            caption: { en: "On real price, mark the swings. The first clear higher high (HH) tells us the market is bullish.", tl: "Sa totoong price, markahan ang swings. Ang unang malinaw na higher high (HH) ang nagsasabing bullish ang market." },
            tip: { en: "Find the first peak above the previous peak: a Higher High.", tl: "Hanapin ang unang tuktok na mas mataas sa nauna: Higher High." },
            revealCandles: 4,
          },
          {
            caption: { en: "The pullback holds above the previous low, a Higher Low (HL). Structure is healthy and bullish.", tl: "Ang pullback ay humahawak sa itaas ng nakaraang low, isang Higher Low (HL). Malusog at bullish ang structure." },
            tip: { en: "Pullback stays above the last low = Higher Low.", tl: "Pullback na nananatili sa itaas ng huling low = Higher Low." },
            revealCandles: 6,
          },
          {
            caption: { en: "Another higher high confirms buyers are still in control.", tl: "Isa pang higher high ang nagkukumpirma na hawak pa rin ng buyers." },
            tip: { en: "New higher high = the uptrend continues.", tl: "Bagong higher high = tuloy ang uptrend." },
            revealCandles: 9,
          },
          {
            caption: { en: "And another higher low. So far this is a clean bullish staircase: HH, HL, HH, HL.", tl: "At isa pang higher low. Sa ngayon, malinis na bullish na hagdan ito: HH, HL, HH, HL." },
            tip: { en: "HH and HL stacking up = still bullish.", tl: "HH at HL na nagsasalansan = bullish pa rin." },
            revealCandles: 11,
          },
          {
            caption: { en: "Now watch: price makes a lower high (LH) instead of a higher high. That is the first warning.", tl: "Ngayon, bantayan: gumawa ang price ng lower high (LH) imbes na higher high. Iyon ang unang babala." },
            tip: { en: "A high that fails to beat the last high = a Lower High, a warning.", tl: "High na hindi nalampasan ang huling high = Lower High, isang babala." },
            revealCandles: 13,
          },
          {
            caption: { en: "Then price closes BELOW the last higher low (the dashed line). Breaking that level is a possible reversal, the MSS we study next.", tl: "Tapos nag-close ang price BELOW sa huling higher low (ang putol-putol na linya). Ang pag-break sa level na iyon ay posibleng reversal, ang MSS na aaralin natin sunod." },
            tip: { en: "A close below the last higher low = the bullish structure may be shifting.", tl: "Pag nag-close below sa huling higher low = pwedeng nag-shift na ang bullish structure." },
            revealCandles: 16,
          },
        ],
        caption: {
          en: "HH → HL → HH → HL builds bullish structure. Price then makes a lower high (LH) and closes below the last higher low. Breaking that level is a possible reversal, the MSS.",
          tl: "HH → HL → HH → HL ang bumubuo ng bullish structure. Tapos gumawa ang price ng lower high (LH) at nag-close below sa huling higher low. Ang pag-break sa level na iyon ay posibleng reversal, ang MSS.",
        },
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "A bearish market on real price reads the same way, just flipped: you will see lower lows and lower highs instead. Mark the swings, and the trend names itself.",
        tl: "Ang bearish market sa totoong price ay ganoon din basahin, binaliktad lang: makikita mo ang lower lows at lower highs. Markahan ang swings, at mismong magpapangalan ang trend.",
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Ranging markets are traps", tl: "Trap ang ranging markets" },
      text: {
        en: "In consolidation you only get swing highs and lows with no clean HH/HL. A short there can get its high taken out even though you expected continuation. Avoid these low-probability conditions.",
        tl: "Sa consolidation, swing highs at lows lang, walang malinis na HH/HL. Pwedeng ma-take out ang high ng short mo kahit umaasa ka ng continuation. Iwasan ang low-probability na kondisyon na ito.",
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "You don't need to catch every move. Fewer, cleaner trades often mean fewer losses and more profit. Less is more. We keep a 1:2 target as beginners to protect win-rate and psychology, even when a bigger target (sometimes 1:3 or more) looks possible. And the targets we aim at are real liquidity, like failure swings, not random levels.",
        tl: "Hindi mo kailangang masakyan lahat ng move. Mas kaunti pero malilinis na trades = mas kaunting talo at mas maraming profit. Less is more. Pinapanatili natin ang 1:2 target bilang beginner para sa win-rate at psychology, kahit mukhang kaya ang mas malaking target (minsan 1:3 o higit pa). At ang tinatarget natin ay totoong liquidity, gaya ng failure swings, hindi random na level.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "Before deciding if structure is continuing or breaking, you must first…",
        tl: "Bago magdesisyon kung tuloy o break ang structure, dapat mo munang…",
      },
      options: [
        { id: "a", text: { en: "Add three indicators", tl: "Magdagdag ng tatlong indicator" } },
        { id: "b", text: { en: "Correctly identify the swing highs and lows", tl: "Tama na ma-identify ang swing highs at lows" } },
        { id: "c", text: { en: "Wait for the news", tl: "Hintayin ang balita" } },
        { id: "d", text: { en: "Switch to a 1-minute chart", tl: "Lumipat sa 1-minute chart" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Everything depends on correctly reading the swing points first.",
        tl: "Lahat ay nakadepende sa tamang pagbasa ng swing points muna.",
      },
    },
    {
      id: "q2",
      type: "truefalse",
      prompt: {
        en: "In a bullish trend, breaking the latest higher low can be a possible reversal signal.",
        tl: "Sa bullish trend, ang pag-break sa pinakahuling higher low ay posibleng senyales ng reversal.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "A broken higher low warns the bullish structure may be shifting (next lesson: MSS).",
        tl: "Senyales ang na-break na higher low na pwedeng mag-shift ang bullish structure (susunod: MSS).",
      },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: {
        en: "Why do we avoid trading consolidation/ranging markets?",
        tl: "Bakit iniiwasan ang pag-trade sa consolidation/ranging market?",
      },
      options: [
        { id: "a", text: { en: "They're illegal", tl: "Bawal sila" } },
        { id: "b", text: { en: "They're low-probability and easily trap you", tl: "Low-probability at madaling mag-trap" } },
        { id: "c", text: { en: "They never move", tl: "Hindi gumagalaw" } },
        { id: "d", text: { en: "Brokers ban them", tl: "Bina-ban ng broker" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Ranges lack clean structure, so both sides' liquidity can be taken: low probability.",
        tl: "Walang malinis na structure ang range, kaya pwedeng makuha ang liquidity ng magkabila: low probability.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "The beginner target taught in this course is…",
        tl: "Ang beginner target na itinuturo sa course na ito ay…",
      },
      options: [
        { id: "a", text: { en: "1:2, for a higher win-rate and discipline", tl: "1:2, para sa mas mataas na win-rate at disiplina" } },
        { id: "b", text: { en: "1:1 always", tl: "1:1 lagi" } },
        { id: "c", text: { en: "As high as possible every time", tl: "Pinakamataas palagi" } },
        { id: "d", text: { en: "There is no target", tl: "Walang target" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "1:2 keeps win-rate high and protects psychology while you build skill.",
        tl: "Pinapataas ng 1:2 ang win-rate at pinoprotektahan ang psychology habang natututo.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "In the chart, what two things together warned of the reversal?",
        tl: "Sa chart, anong dalawang bagay ang sabay na nagbabala ng reversal?",
      },
      options: [
        { id: "a", text: { en: "A lower high, then a close below the last higher low", tl: "Isang lower high, tapos close below sa huling higher low" } },
        { id: "b", text: { en: "A higher high and a higher low", tl: "Isang higher high at higher low" } },
        { id: "c", text: { en: "Two equal highs", tl: "Dalawang equal high" } },
        { id: "d", text: { en: "A single big green candle", tl: "Isang malaking green candle" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "First a lower high (the warning), then price closing below the last higher low (the break / MSS).",
        tl: "Una ang lower high (babala), tapos ang close below sa huling higher low (ang break / MSS).",
      },
    },
    {
      id: "q6",
      type: "truefalse",
      prompt: {
        en: "In a range, a short can be stopped out when its swing high is taken even though you expected price to fall.",
        tl: "Sa range, pwedeng ma-stop out ang short kapag nakuha ang swing high nito kahit umasa kang bababa ang price.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Ranges have no clean structure, so either side's liquidity can be grabbed. That is the trap.",
        tl: "Oo. Walang malinis na structure ang range, kaya pwedeng makuha ang liquidity ng kahit aling panig. Iyon ang trap.",
      },
    },
    {
      id: "q7",
      type: "truefalse",
      prompt: {
        en: "Fewer, cleaner trades can mean fewer losses and more profit.",
        tl: "Ang mas kaunti at malinis na trades ay pwedeng mangahulugan ng mas kaunting talo at mas maraming profit.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Less is more: quality over quantity protects your account and your mind.",
        tl: "Oo. Less is more: kalidad kaysa dami, pinoprotektahan ang account at isip mo.",
      },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: {
        en: "Even if a 1:3.91 reward looks possible, what target does the course recommend for beginners?",
        tl: "Kahit mukhang kayang abutin ang 1:3.91, anong target ang inirerekomenda ng course para sa beginners?",
      },
      options: [
        { id: "a", text: { en: "1:2", tl: "1:2" } },
        { id: "b", text: { en: "1:10", tl: "1:10" } },
        { id: "c", text: { en: "1:1", tl: "1:1" } },
        { id: "d", text: { en: "No target", tl: "Walang target" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Stick to 1:2 as a beginner; you can raise the reward later as your skill grows.",
        tl: "Manatili sa 1:2 bilang beginner; pwede mong taasan ang reward mamaya kapag lumago ang skill.",
      },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: {
        en: "A bearish market on real price shows…",
        tl: "Ang bearish market sa totoong price ay nagpapakita ng…",
      },
      options: [
        { id: "a", text: { en: "Lower lows and lower highs", tl: "Lower lows at lower highs" } },
        { id: "b", text: { en: "Higher highs and higher lows", tl: "Higher highs at higher lows" } },
        { id: "c", text: { en: "Only equal highs", tl: "Equal highs lang" } },
        { id: "d", text: { en: "Nothing readable", tl: "Walang mababasa" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Bearish structure is the mirror: lower lows and lower highs.",
        tl: "Ang bearish structure ay kabaligtaran: lower lows at lower highs.",
      },
    },
    {
      id: "q10",
      type: "truefalse",
      prompt: {
        en: "You should load three indicators before you can read market structure.",
        tl: "Dapat kang mag-load ng tatlong indicator bago mabasa ang market structure.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. We read structure on a naked chart by marking swing highs and lows.",
        tl: "Mali. Binabasa natin ang structure sa naked chart sa pagmamarka ng swing highs at lows.",
      },
    },
  ],
};
