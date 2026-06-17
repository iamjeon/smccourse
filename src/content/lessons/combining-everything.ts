// Source: Part 3/Part 3 Lesson 4 - Combining Everything.txt (verified: matches title)
// COVERAGE (source: Part 3/Part 3 Lesson 4 - Combining Everything.txt) — every point mapped:
// [x] combining everything = use all the concepts together to build your own model -> intro + Q1
// [x] checklist item 1: order flow / bias (bullish -> only long, bearish -> only short) -> checklist list + capstone step0 + Q2, Q3
// [x] checklist item 2: ERL/IRL to know continue vs retrace; ERL = swing high/low, IRL = FVG; two things price does -> checklist list + capstone step1 + Q4
// [x] checklist item 3: liquidity = the draw on liquidity (target/TP); generated liquidity; LRLR failure swings are good targets; protected vs unprotected -> checklist list + liquidity callout + Q5
// [x] checklist item 4: time = kill zones for intraday, macros for scalping; trade a pair in its session (EURUSD = London + New York, not Asian); mind news -> time callout + Q6, Q9
// [x] checklist item 5: structure confirms bias and DOL, performs the MMXM, shows protected highs/lows, sets TP/SL; ITH/ITL formation confirms bias -> checklist list + capstone step3 + Q7
// [x] process: identify order flow -> see ERL/IRL -> take out STH/STL = entry -> find liquidity target -> check time -> wait for structure confirmation (MSS) -> enter FVG/breaker/inversion at 50% -> protected SL -> TP at DOL -> capstone chart steps + Q8, Q10
// [x] after a HTF PDRA is hit in a kill zone the expansion can be very fast; if too fast, drop to a lower timeframe to enter -> fast-move callout
// [x] wrong session = consolidation, FVGs not respected, low probability -> time callout
// [x] an inversion FVG / BPR at the entry makes it high probability -> capstone step2 (inversion note)
// [x] worked DXY examples (ERL->IRL->ERL, MMBM, 50% entry, STL-ITL-STL, inversion FVG, NY kill zone) -> how-pros list
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "combining-everything",
  moduleSlug: "part-3",
  title: { en: "Combining Everything", tl: "Combining Everything" },
  summary: {
    en: "The capstone: a five-point checklist that ties order flow, ERL/IRL, liquidity, time, and structure into one repeatable model. Read the bias, find the target, wait for the right time, confirm with structure, then enter. This is how all the pieces work together.",
    tl: "Ang capstone: limang-puntong checklist na nag-uugnay sa order flow, ERL/IRL, liquidity, time, at structure tungo sa isang paulit-ulit na model. Basahin ang bias, hanapin ang target, hintayin ang tamang oras, kumpirmahin sa structure, tapos pumasok. Ito ang paraan kung paano nagkakasama ang lahat ng piraso.",
  },
  estMinutes: 13,
  sourceFile: "Part 3/Part 3 Lesson 4 - Combining Everything.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "This is one of the most important lessons. Here we take every concept from the earlier lessons and combine them into one workflow, so you can build your own model that fits you. It comes down to a five-point checklist.",
        tl: "Isa ito sa pinakamahalagang lesson. Dito kinukuha natin ang bawat konsepto mula sa naunang lessons at pinagsasama sa isang workflow, para makagawa ka ng sariling model na bagay sa iyo. Bumababa ito sa limang-puntong checklist.",
      },
    },
    {
      kind: "list",
      ordered: true,
      items: [
        { en: "Order flow: your bias. Bullish means only look for longs; bearish means only look for shorts.", tl: "Order flow: ang bias mo. Bullish ibig sabihin longs lang; bearish ibig sabihin shorts lang." },
        { en: "ERL / IRL: is price going to continue or retrace? After the ERL is taken, price draws to the IRL (an FVG); after the IRL, it draws to the ERL (a swing high or low).", tl: "ERL / IRL: magpapatuloy ba o mag-re-retrace ang presyo? Pagkatapos kunin ang ERL, dumadraw ang presyo sa IRL (FVG); pagkatapos ng IRL, dumadraw sa ERL (swing high o low)." },
        { en: "Liquidity: the draw on liquidity, your target and take-profit area.", tl: "Liquidity: ang draw on liquidity, ang target at take-profit area mo." },
        { en: "Time: trade at the right time. Kill zones for intraday, macros for scalping.", tl: "Time: mag-trade sa tamang oras. Kill zones para sa intraday, macros para sa scalping." },
        { en: "Structure: confirms your bias and your draw on liquidity, and is where you read the MMXM, protected highs/lows, and place your TP and SL.", tl: "Structure: kinukumpirma ang bias at draw on liquidity mo, at dito mo binabasa ang MMXM, protected highs/lows, at inilalagay ang TP at SL mo." },
      ],
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "Price only does two things", tl: "Dalawa lang ang ginagawa ng presyo" },
      text: {
        en: "After taking the ERL, price draws to the IRL. After the IRL, it draws to the ERL. The ERL is the swing highs and lows; the IRL is the FVGs. The whole map is just this cycle, read with your bias.",
        tl: "Pagkatapos kunin ang ERL, dumadraw ang presyo sa IRL. Pagkatapos ng IRL, dumadraw sa ERL. Ang ERL ay ang swing highs at lows; ang IRL ay ang FVGs. Ang buong mapa ay ang cycle na ito, binasa kasama ang bias mo.",
      },
    },
    {
      kind: "heading",
      text: { en: "The checklist applied", tl: "Ang checklist na ginamit" },
    },
    {
      kind: "chart",
      spec: {
        id: "combine-capstone",
        title: { en: "Everything together (bullish)", tl: "Lahat nang sabay (bullish)" },
        height: 420,
        candles: [
          { o: 100, h: 106, l: 99, c: 105 },
          { o: 105, h: 107, l: 100, c: 101 },
          { o: 101, h: 102, l: 94, c: 95 },
          { o: 95, h: 96, l: 89, c: 90 },
          { o: 90, h: 91, l: 86, c: 87 },
          { o: 87, h: 108, l: 86, c: 107 },
          { o: 107, h: 109, l: 100, c: 101 },
          { o: 101, h: 103, l: 98, c: 99 },
          { o: 99, h: 110, l: 98, c: 109 },
          { o: 109, h: 112, l: 104, c: 105 },
          { o: 105, h: 116, l: 104, c: 115 },
          { o: 115, h: 121, l: 114, c: 120 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 120, from: 0, to: 11, tone: "bull", dashed: true, label: { en: "Draw on liquidity (ERL target)", tl: "Draw on liquidity (ERL target)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "poi", index: 4, price: 84, tone: "bull", label: { en: "SMR (long term low)", tl: "SMR (long term low)" }, appearAtStep: 1 },
          { type: "marker", kind: "mss", index: 5, price: 108, tone: "bull", label: { en: "MSS", tl: "MSS" }, appearAtStep: 2 },
          { type: "box", kind: "fvg", from: 4, to: 6, bottom: 91, top: 100, tone: "bull", label: { en: "FVG entry", tl: "FVG entry" }, appearAtStep: 2 },
          { type: "line", kind: "level", price: 97, from: 5, to: 7, tone: "neutral", dashed: true, label: { en: "50% equilibrium", tl: "50% equilibrium" }, labelPlacement: "center", appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 7, price: 98, tone: "bull", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "label", index: 9, price: 103, text: { en: "Higher low", tl: "Higher low" }, tone: "bull", appearAtStep: 3 },
          { type: "label", index: 10, price: 110, text: { en: "Expansion", tl: "Expansion" }, tone: "bull", appearAtStep: 3 },
          { type: "marker", kind: "tp", index: 11, price: 120, tone: "bull", label: { en: "DOL hit", tl: "DOL hit" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Checklist 1, order flow: the bias is bullish, so we only look for longs. Checklist 3, liquidity: mark the draw on liquidity above, our target.", tl: "Checklist 1, order flow: bullish ang bias, kaya longs lang ang hahanapin natin. Checklist 3, liquidity: markahan ang draw on liquidity sa itaas, ang target natin." },
            tip: { en: "Set your bias and your target before anything else.", tl: "Itakda ang bias at target mo bago ang lahat." },
            revealCandles: 2,
          },
          {
            caption: { en: "Checklist 2, ERL/IRL: price raids a low, taking the ERL, into a higher-timeframe PDRA. That reversal is the Smart Money Reversal, the long term low.", tl: "Checklist 2, ERL/IRL: rinaid ng presyo ang isang low, kinuha ang ERL, papunta sa higher-timeframe PDRA. Ang reversal na iyon ay ang Smart Money Reversal, ang long term low." },
            tip: { en: "A low swept at a HTF PDRA = the ERL taken, the SMR.", tl: "Isang low na na-sweep sa HTF PDRA = nakuha ang ERL, ang SMR." },
            revealCandles: 5,
          },
          {
            caption: { en: "Checklist 5, structure: an MSS up confirms the bias. Price retraces to the FVG at the 50% equilibrium, our entry. If that FVG is also an inversion FVG, the entry is even higher probability.", tl: "Checklist 5, structure: isang MSS pataas ang nagkukumpirma ng bias. Nag-retrace ang presyo papunta sa FVG sa 50% equilibrium, ang entry natin. Kung ang FVG na iyon ay inversion FVG din, mas mataas pa ang probability ng entry." },
            tip: { en: "MSS, then the FVG at ~50% = the entry. An inversion FVG there is a bonus.", tl: "MSS, tapos ang FVG sa ~50% = ang entry. Bonus kung inversion FVG ito." },
            revealCandles: 8,
          },
          {
            caption: { en: "Structure builds a higher low, then price expands up to the draw on liquidity. Checklist 4, time: we only took this in the kill zone. Every item on the checklist lined up.", tl: "Bumubuo ang structure ng higher low, tapos nag-eexpand pataas ang presyo papunta sa draw on liquidity. Checklist 4, time: kinuha lang natin ito sa kill zone. Lahat ng item sa checklist ay nakahanay." },
            tip: { en: "All five checklist items agreed, so the trade ran to target.", tl: "Lahat ng limang checklist item ay sang-ayon, kaya tumakbo ang trade papunta sa target." },
            revealCandles: 12,
          },
        ],
        caption: {
          en: "Order flow (bias), ERL/IRL (the SMR), structure (MSS + FVG at 50%), time (kill zone), liquidity (the target). All five together.",
          tl: "Order flow (bias), ERL/IRL (ang SMR), structure (MSS + FVG sa 50%), time (kill zone), liquidity (ang target). Lahat ng lima nang sabay.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Liquidity: what makes a good target", tl: "Liquidity: ano ang magandang target" },
      text: {
        en: "Generated liquidity makes the best targets, especially LRLR failure swings and equal highs/lows. Protected levels are harder to reach and only break once a higher-timeframe PDRA forces a reversal that takes all that liquidity.",
        tl: "Ang generated liquidity ang pinakamagagandang target, lalo na ang LRLR failure swings at equal highs/lows. Ang protected levels ay mas mahirap abutin at nasisira lang kapag may higher-timeframe PDRA na nagpipilit ng reversal na kumukuha ng lahat ng liquidity na iyon.",
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Time: trade the right session", tl: "Time: i-trade ang tamang session" },
      text: {
        en: "Trade a pair during its own kill zones. EURUSD trades in the London and New York kill zones, not the Asian session, where movement is low probability and price just consolidates, so FVGs are not respected. Use kill zones for intraday, macros for scalping, and avoid trading into the news.",
        tl: "I-trade ang isang pair sa sariling kill zones nito. Ang EURUSD ay nagta-trade sa London at New York kill zones, hindi sa Asian session, kung saan low probability ang galaw at nagko-consolidate lang ang presyo, kaya hindi nire-respeto ang FVGs. Gamitin ang kill zones para sa intraday, macros para sa scalping, at iwasan ang pag-trade papasok sa news.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "When the move is too fast", tl: "Kapag masyadong mabilis ang galaw" },
      text: {
        en: "After a higher-timeframe PDRA is hit in a kill zone, the expansion can be extremely fast, sometimes too fast to enter. When that happens, drop to a lower timeframe to find your entry.",
        tl: "Pagkatapos matamaan ang higher-timeframe PDRA sa kill zone, pwedeng sobrang bilis ng expansion, minsan masyadong mabilis para pumasok. Kapag nangyari iyon, bumaba sa lower timeframe para hanapin ang entry mo.",
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
          en: "DXY (daily to 1H): an ERL swing low was taken, the draw moved to an FVG (IRL) then to the high (ERL). On the lower timeframe a buy model formed; entry was the 50% FVG that was also an inversion (a BPR), so it was high probability, taken in the New York kill zone.",
          tl: "DXY (daily papuntang 1H): nakuha ang ERL swing low, gumalaw ang draw papunta sa FVG (IRL) tapos sa high (ERL). Sa lower timeframe nabuo ang buy model; ang entry ay ang 50% FVG na inversion din (BPR), kaya high probability, kinuha sa New York kill zone.",
        },
        {
          en: "DXY again: an FVG (IRL) drew price to a swing high (ERL). A buy model formed, the SMR was the long term low, an MSS confirmed, and a STL-ITL-STL gave clean FVG and breaker entries.",
          tl: "DXY ulit: isang FVG (IRL) ang nagdraw sa presyo papunta sa swing high (ERL). Nabuo ang buy model, ang SMR ay ang long term low, nagkumpirma ang MSS, at ang STL-ITL-STL ay nagbigay ng malinis na FVG at breaker entries.",
        },
        {
          en: "In both, the checklist drove the decision: order flow, ERL/IRL, draw on liquidity, time (kill zone), and structure, all aligned before entry.",
          tl: "Sa pareho, ang checklist ang nagdrive ng desisyon: order flow, ERL/IRL, draw on liquidity, time (kill zone), at structure, lahat nakahanay bago pumasok.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "Run the five-point checklist every time: order flow (bias), ERL/IRL (continue or retrace), liquidity (the target), time (kill zones), structure (confirmation, MMXM, stops and targets). When all five agree, you have a model. Bullish bias = longs only; bearish = shorts only.",
        tl: "Patakbuhin ang limang-puntong checklist palagi: order flow (bias), ERL/IRL (continue o retrace), liquidity (ang target), time (kill zones), structure (confirmation, MMXM, stops at targets). Kapag sang-ayon ang lahat ng lima, may model ka na. Bullish bias = longs lang; bearish = shorts lang.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "What is the goal of \"combining everything\"?",
        tl: "Ano ang layunin ng \"combining everything\"?",
      },
      options: [
        { id: "a", text: { en: "Use all the concepts together to build your own repeatable model", tl: "Gamitin ang lahat ng konsepto para gumawa ng sariling paulit-ulit na model" } },
        { id: "b", text: { en: "Forget the earlier lessons", tl: "Kalimutan ang naunang lessons" } },
        { id: "c", text: { en: "Trade randomly", tl: "Mag-trade nang random" } },
        { id: "d", text: { en: "Only use one indicator", tl: "Gumamit lang ng isang indicator" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "It combines order flow, ERL/IRL, liquidity, time, and structure into one workflow you can repeat.",
        tl: "Pinagsasama nito ang order flow, ERL/IRL, liquidity, time, at structure sa isang workflow na maaaring ulitin.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "What is the first item on the checklist?",
        tl: "Ano ang unang item sa checklist?",
      },
      options: [
        { id: "a", text: { en: "Order flow (your bias)", tl: "Order flow (ang bias mo)" } },
        { id: "b", text: { en: "Your position size", tl: "Ang position size mo" } },
        { id: "c", text: { en: "The broker spread", tl: "Ang broker spread" } },
        { id: "d", text: { en: "A moving average", tl: "Isang moving average" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Order flow first: it is your bias, telling you whether to look for longs or shorts.",
        tl: "Order flow muna: ito ang bias mo, nagsasabi kung longs o shorts ang hahanapin.",
      },
    },
    {
      id: "q3",
      type: "truefalse",
      prompt: {
        en: "If the order flow is bullish, you only look for longs.",
        tl: "Kung bullish ang order flow, longs lang ang hahanapin mo.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Bullish bias means longs only; bearish bias means shorts only.",
        tl: "Oo. Bullish bias ibig sabihin longs lang; bearish bias ibig sabihin shorts lang.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "After price takes the ERL, where does it draw next?",
        tl: "Pagkatapos kunin ng presyo ang ERL, saan ito dumadraw sunod?",
      },
      options: [
        { id: "a", text: { en: "To the IRL (an FVG)", tl: "Sa IRL (isang FVG)" } },
        { id: "b", text: { en: "Straight to the stop loss", tl: "Diretso sa stop loss" } },
        { id: "c", text: { en: "Nowhere", tl: "Wala" } },
        { id: "d", text: { en: "To another ERL only", tl: "Sa isa pang ERL lamang" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "After the ERL is taken, price draws to the IRL (an FVG); after the IRL, it draws to the ERL.",
        tl: "Pagkatapos kunin ang ERL, dumadraw ang presyo sa IRL (FVG); pagkatapos ng IRL, sa ERL.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "Which makes the best draw-on-liquidity targets?",
        tl: "Alin ang pinakamagandang draw-on-liquidity na target?",
      },
      options: [
        { id: "a", text: { en: "Generated liquidity, like LRLR failure swings and equal highs/lows", tl: "Generated liquidity, gaya ng LRLR failure swings at equal highs/lows" } },
        { id: "b", text: { en: "Random prices", tl: "Random na presyo" } },
        { id: "c", text: { en: "The middle of a candle", tl: "Ang gitna ng candle" } },
        { id: "d", text: { en: "The broker commission", tl: "Ang komisyon ng broker" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Generated liquidity, especially LRLR failure swings and equal highs/lows, are strong targets.",
        tl: "Ang generated liquidity, lalo na ang LRLR failure swings at equal highs/lows, ay malalakas na target.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "When should you trade EURUSD?",
        tl: "Kailan dapat i-trade ang EURUSD?",
      },
      options: [
        { id: "a", text: { en: "During the London and New York kill zones", tl: "Sa London at New York kill zones" } },
        { id: "b", text: { en: "During the Asian session", tl: "Sa Asian session" } },
        { id: "c", text: { en: "Only on weekends", tl: "Tuwing weekend lamang" } },
        { id: "d", text: { en: "Any random time", tl: "Kahit anong random na oras" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Trade EURUSD in its kill zones (London, New York). The Asian session is low probability and choppy.",
        tl: "I-trade ang EURUSD sa kill zones nito (London, New York). Ang Asian session ay low probability at magulo.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "What does structure give you on the checklist?",
        tl: "Ano ang ibinibigay sa iyo ng structure sa checklist?",
      },
      options: [
        { id: "a", text: { en: "Confirmation of bias and DOL, the MMXM, protected highs/lows, and TP/SL placement", tl: "Kumpirmasyon ng bias at DOL, ang MMXM, protected highs/lows, at TP/SL placement" } },
        { id: "b", text: { en: "The broker's fees", tl: "Ang bayarin ng broker" } },
        { id: "c", text: { en: "A guaranteed win", tl: "Isang garantisadong panalo" } },
        { id: "d", text: { en: "Nothing useful", tl: "Walang kapaki-pakinabang" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Structure confirms bias and DOL, lets you read the MMXM and protected levels, and is where you set TP and SL.",
        tl: "Kinukumpirma ng structure ang bias at DOL, pinapabasa ang MMXM at protected levels, at dito mo inilalagay ang TP at SL.",
      },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: {
        en: "On the checklist, what confirms the entry before you take it?",
        tl: "Sa checklist, ano ang nagkukumpirma ng entry bago mo ito kunin?",
      },
      options: [
        { id: "a", text: { en: "A Market Structure Shift (MSS)", tl: "Isang Market Structure Shift (MSS)" } },
        { id: "b", text: { en: "A news headline", tl: "Isang news headline" } },
        { id: "c", text: { en: "A round number", tl: "Isang round number" } },
        { id: "d", text: { en: "Nothing, you guess", tl: "Wala, hinuhulaan mo" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Structure confirmation, an MSS, comes before the entry at the FVG / breaker around the 50%.",
        tl: "Ang structure confirmation, isang MSS, ang nauuna bago ang entry sa FVG / breaker sa paligid ng 50%.",
      },
    },
    {
      id: "q9",
      type: "truefalse",
      prompt: {
        en: "Trading outside the kill zones is lower probability because price often just consolidates.",
        tl: "Ang pag-trade sa labas ng kill zones ay lower probability dahil madalas nagko-consolidate lang ang presyo.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Outside the kill zones, price often consolidates and PDRAs like FVGs are not respected.",
        tl: "Oo. Sa labas ng kill zones, madalas nagko-consolidate ang presyo at hindi nire-respeto ang PDRAs gaya ng FVGs.",
      },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: {
        en: "If the expansion after the PDRA is too fast to enter, what do you do?",
        tl: "Kung masyadong mabilis ang expansion pagkatapos ng PDRA para pumasok, ano ang gagawin mo?",
      },
      options: [
        { id: "a", text: { en: "Drop to a lower timeframe to find an entry", tl: "Bumaba sa lower timeframe para humanap ng entry" } },
        { id: "b", text: { en: "Chase it at market with no plan", tl: "Habulin ito sa market nang walang plano" } },
        { id: "c", text: { en: "Trade the opposite direction", tl: "Mag-trade sa kabaligtarang direksyon" } },
        { id: "d", text: { en: "Give up on the pair forever", tl: "Sukuan ang pair habambuhay" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "When the move is too fast, drop to a lower timeframe to find a clean entry.",
        tl: "Kapag masyadong mabilis ang galaw, bumaba sa lower timeframe para makahanap ng malinis na entry.",
      },
    },
  ],
};
