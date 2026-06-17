// Source: Part 2/Part 2 Lesson 1 - Order Flow.txt (verified: matches title)
// COVERAGE (source: Part 2/Part 2 Lesson 1 - Order Flow.txt) — every point mapped:
// [x] order flow tells us where the market is heading (the directional bias) -> intro + Q1
// [x] PDRA / PD array = the levels Smart Money reacts from (OB, FVG, breaker) -> intro callout + Q2
// [x] bullish order flow: bullish PDRAs give support (respected) -> rules list + flow-bull chart step2 + Q3
// [x] bullish order flow: bearish PDRAs are violated -> rules list + Q4
// [x] bullish: runs short-term highs and breaks structure up (run + BOS, repeatedly) -> flow-bull chart step3,4 + Q5
// [x] bullish: expands higher then retraces lower (to a PDRA) -> flow-bull chart step1,2 + Q6
// [x] bearish order flow = mirror: bearish PDRAs resistance, bullish PDRAs violated, runs lows, BOS down -> rules list + Q7
// [x] without order flow you cannot know if price goes higher/lower -> "why it matters" paragraph + Q1
// [x] wait for the retracement to finish, then anticipate the move in the order-flow direction -> paragraph + key callout + Q8
// [x] time is fractal: what happens on the higher timeframe can happen on the lower timeframe -> fractal chart intro + Q9
// [x] a lower-timeframe bearish move during a higher-timeframe bullish order flow is just the retracement, not a switch of bias; always check the HTF -> fractal chart step1,2 + warning callout + Q9
// [x] the LTF retracement lands on the HTF PDRA / point of interest -> fractal chart step2 (OB) + Q10
// [x] need an MSS to confirm the reversal back into the order flow before continuing -> fractal chart step3 (callback to MSS lesson) + Q10
// [x] worked examples (BTCUSD bullish, NASDAQ bearish, EURUSD bullish) on HTF + LTF -> "how pros apply it" list
// [x] breaker block can confirm a continuation when there is no valid swing low/high left -> breaker tip callout
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "order-flow",
  moduleSlug: "part-2",
  title: { en: "Order Flow", tl: "Order Flow" },
  summary: {
    en: "Order flow is the market's current bias: it tells you whether price is heading up or down. Learn how a bullish and a bearish order flow behave, why a small move against the trend is only a retracement, and how the same pattern repeats across timeframes.",
    tl: "Ang order flow ang kasalukuyang bias ng market: sinasabi nito kung pataas o pababa ang presyo. Matutunan kung paano kumikilos ang bullish at bearish order flow, bakit retracement lang ang maliit na kontra-galaw, at paano paulit-ulit ang parehong pattern sa iba't ibang timeframe.",
  },
  estMinutes: 11,
  sourceFile: "Part 2/Part 2 Lesson 1 - Order Flow.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "Order flow is the direction the market is currently flowing in. From the words themselves, order flow tells us where price is heading: if the order flow is bullish, we expect price to keep going up; if it is bearish, we expect it to keep going down. Without reading the order flow first, you cannot tell whether the next big move is more likely up or down.",
        tl: "Ang order flow ay ang direksyon kung saan kasalukuyang dumadaloy ang market. Mula mismo sa salita, sinasabi ng order flow kung saan papunta ang presyo: kung bullish ang order flow, inaasahan nating tuloy pataas ang presyo; kung bearish, tuloy pababa. Kung hindi mo muna babasahin ang order flow, hindi mo malalaman kung mas malamang na pataas o pababa ang susunod na malaking galaw.",
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "Quick reminder: what is a PDRA?", tl: "Paalala: ano ang PDRA?" },
      text: {
        en: "PDRA (or PD array) means the price zones Smart Money reacts from: order blocks and fair value gaps from the earlier lessons, plus breaker blocks. \"Respected\" means price touches the zone and turns in the trend direction. \"Violated\" means price slices straight through it.",
        tl: "Ang PDRA (o PD array) ay ang mga price zone kung saan tumutugon ang Smart Money: ang order blocks at fair value gaps mula sa naunang lessons, kasama ang breaker blocks. \"Respected\" ibig sabihin hinahawakan ng presyo ang zone at lumiliko pasunod sa trend. \"Violated\" ibig sabihin dumadaan lang diretso ang presyo dito.",
      },
    },
    {
      kind: "heading",
      text: { en: "The two order flows", tl: "Ang dalawang order flow" },
    },
    {
      kind: "list",
      items: [
        {
          en: "Bullish order flow: bullish PDRAs (demand OBs and FVGs) give support and are respected, while bearish PDRAs get violated. Price runs the short-term highs and breaks structure UP, again and again. Pullbacks (retracements) go lower into a PDRA, then price expands up again.",
          tl: "Bullish order flow: ang bullish PDRAs (demand OBs at FVGs) ay nagbibigay ng support at nire-respeto, habang navavayolate ang bearish PDRAs. Rinarun ng presyo ang short-term highs at break of structure PATAAS, paulit-ulit. Ang pullback (retracement) ay bumababa papunta sa isang PDRA, tapos mag-eexpand pataas ulit.",
        },
        {
          en: "Bearish order flow: the mirror image. Bearish PDRAs (supply OBs and FVGs) act as resistance and are respected, while bullish PDRAs get violated. Price runs the short-term lows and breaks structure DOWN, again and again. Pullbacks go higher into a PDRA, then price expands down again.",
          tl: "Bearish order flow: ang kabaligtaran. Ang bearish PDRAs (supply OBs at FVGs) ay nagsisilbing resistance at nire-respeto, habang navavayolate ang bullish PDRAs. Rinarun ng presyo ang short-term lows at break of structure PABABA, paulit-ulit. Ang pullback ay umaakyat papunta sa isang PDRA, tapos mag-eexpand pababa ulit.",
        },
      ],
    },
    {
      kind: "chart",
      spec: {
        id: "of-flow-bull",
        title: { en: "A bullish order flow", tl: "Isang bullish order flow" },
        height: 380,
        candles: [
          { o: 100, h: 103, l: 99, c: 102 },
          { o: 102, h: 109, l: 101, c: 108 },
          { o: 108, h: 113, l: 107, c: 112 },
          { o: 112, h: 113, l: 106, c: 107 },
          { o: 107, h: 108, l: 102, c: 103 },
          { o: 103, h: 111, l: 103, c: 110 },
          { o: 110, h: 118, l: 109, c: 117 },
          { o: 117, h: 122, l: 116, c: 121 },
          { o: 121, h: 122, l: 113, c: 115 },
          { o: 115, h: 126, l: 114, c: 125 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 113, from: 2, to: 6, tone: "neutral", dashed: true, label: { en: "Previous high", tl: "Previous high" }, labelPlacement: "center", appearAtStep: 1 },
          { type: "box", kind: "ob", from: 4, to: 4, top: 107, bottom: 103, tone: "bull", label: { en: "Bullish OB", tl: "Bullish OB" }, appearAtStep: 2 },
          { type: "label", index: 4, price: 99, text: { en: "Retracement", tl: "Retracement" }, tone: "neutral", appearAtStep: 2 },
          { type: "marker", kind: "bos", index: 6, price: 118, tone: "bull", label: { en: "BOS", tl: "BOS" }, appearAtStep: 3 },
          { type: "label", index: 7, price: 125, text: { en: "HH", tl: "HH" }, tone: "bull", appearAtStep: 4 },
          { type: "label", index: 8, price: 110, text: { en: "HL", tl: "HL" }, tone: "bull", appearAtStep: 4 },
          { type: "marker", kind: "bos", index: 9, price: 126, tone: "bull", label: { en: "BOS", tl: "BOS" }, appearAtStep: 4 },
        ],
        steps: [
          {
            caption: { en: "Price pushes up with strong green candles and sets a high. This up-move is the tone of the market: so far, the order flow is bullish.", tl: "Tumutulak pataas ang presyo gamit ang malalakas na green candles at gumagawa ng high. Itong pataas na galaw ang tono ng market: sa ngayon, bullish ang order flow." },
            tip: { en: "Tall green bodies moving the same way (up) = a bullish push.", tl: "Matataas na green body na pareho ang direksyon (pataas) = bullish na push." },
            revealCandles: 3,
          },
          {
            caption: { en: "Now price drifts back down from that previous high (the dashed line). This is a retracement, a pullback against the up-move, not a turn. We expect it to find support at a bullish PDRA.", tl: "Ngayon bumababa pabalik ang presyo mula sa previous high na iyon (ang putol-putol na linya). Ito ay retracement, pullback kontra sa pataas, hindi liko. Inaasahan nating makakahanap ito ng support sa isang bullish PDRA." },
            tip: { en: "A few red candles drifting down, without breaking the up-trend, = a retracement.", tl: "Iilang red candles na bumababa, na hindi binabasag ang pataas na trend, = retracement." },
            revealCandles: 4,
          },
          {
            caption: { en: "The retracement lands on a bullish order block, the last down candle before the prior up-move. This is a bullish PDRA, and in a bullish order flow it should give support.", tl: "Ang retracement ay dumapo sa bullish order block, ang huling down candle bago ang naunang pataas. Ito ay bullish PDRA, at sa bullish order flow dapat itong magbigay ng support." },
            tip: { en: "The last red candle before a strong rally is the bullish OB. Watch for a reaction up off it.", tl: "Ang huling red candle bago ang malakas na rally ang bullish OB. Bantayan ang reaksyong pataas mula rito." },
            revealCandles: 5,
          },
          {
            caption: { en: "Price respects the OB and expands up, breaking above the previous high. That break is a BOS, a Break of Structure. Respecting bullish PDRAs and breaking structure up is exactly what a bullish order flow does.", tl: "Nire-respeto ng presyo ang OB at mag-eexpand pataas, lumalampas sa previous high. Ang break na iyon ay BOS, Break of Structure. Ang pag-respeto sa bullish PDRAs at pag-break ng structure pataas ang mismong ginagawa ng bullish order flow." },
            tip: { en: "Price closing above the previous high = a bullish BOS (the high was run).", tl: "Pag nag-close ang presyo above sa previous high = bullish BOS (na-run ang high)." },
            revealCandles: 7,
          },
          {
            caption: { en: "It keeps going: a higher high (HH), a shallow higher low (HL), then another BOS. Run the high, break structure up, retrace, repeat. That repeating staircase IS the bullish order flow, and it tells us to keep looking for buys.", tl: "Tuloy lang: higher high (HH), mababaw na higher low (HL), tapos isa pang BOS. Run ang high, break ng structure pataas, retrace, ulit. Itong paulit-ulit na hagdan AY ang bullish order flow, at sinasabi nito na patuloy tayong maghanap ng buys." },
            tip: { en: "Higher highs and higher lows stacking upward = the bias is up.", tl: "Mga higher high at higher low na nagsasalansan pataas = pataas ang bias." },
            revealCandles: 10,
          },
        ],
        caption: {
          en: "Bullish order flow: respect bullish PDRAs, run the highs, break structure up, retrace, repeat. A bearish order flow is the exact mirror, pointing down.",
          tl: "Bullish order flow: i-respeto ang bullish PDRAs, run ang highs, break ng structure pataas, retrace, ulit. Ang bearish order flow ay eksaktong kabaligtaran, nakaturo pababa.",
        },
      },
    },
    {
      kind: "heading",
      level: 3,
      text: { en: "Why it matters: wait for the retracement", tl: "Bakit mahalaga: hintayin ang retracement" },
    },
    {
      kind: "paragraph",
      text: {
        en: "Once you know the order flow, you do not chase. You wait for price to retrace against it, into a PDRA. When the retracement is over, you anticipate the market moving back in the direction of the order flow. In a bullish order flow you wait for a pullback into a bullish PDRA and then look for buys; in a bearish order flow you wait for a pullback up into a bearish PDRA and look for sells.",
        tl: "Kapag alam mo na ang order flow, hindi ka humahabol. Hinihintay mong mag-retrace ang presyo laban dito, papunta sa isang PDRA. Pagkatapos ng retracement, inaasahan mong babalik ang market sa direksyon ng order flow. Sa bullish order flow, hinihintay mo ang pullback papunta sa bullish PDRA tapos maghanap ng buys; sa bearish order flow, hinihintay mo ang pullback pataas papunta sa bearish PDRA tapos maghanap ng sells.",
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "The plan in one line", tl: "Ang plano sa isang linya" },
      text: {
        en: "Read the order flow, wait for the retracement into a PDRA, then trade in the direction of the order flow.",
        tl: "Basahin ang order flow, hintayin ang retracement papunta sa PDRA, tapos mag-trade sa direksyon ng order flow.",
      },
    },
    {
      kind: "heading",
      text: { en: "Order flow is fractal", tl: "Fractal ang order flow" },
    },
    {
      kind: "paragraph",
      text: {
        en: "Time is fractal: what happens on a higher timeframe can also happen, in miniature, on a lower timeframe. So when a higher-timeframe bullish order flow retraces, that one pullback can look like a full bearish move on the lower timeframe. It is NOT a change of bias. It is just the retracement, viewed up close. Always check the higher timeframe before you decide the trend has flipped.",
        tl: "Fractal ang oras: ang nangyayari sa higher timeframe ay pwede ring mangyari, sa maliit na sukat, sa lower timeframe. Kaya kapag nag-retrace ang isang higher-timeframe bullish order flow, ang isang pullback na iyon ay pwedeng magmukhang buong bearish move sa lower timeframe. HINDI ito pagbabago ng bias. Retracement lang iyon, tinitingnan ng malapitan. Laging tingnan ang higher timeframe bago mo desisyunan na lumipat na ang trend.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "of-fractal",
        title: { en: "A lower-timeframe pullback inside a bullish order flow", tl: "Lower-timeframe pullback sa loob ng bullish order flow" },
        height: 380,
        candles: [
          { o: 100, h: 108, l: 99, c: 107 },
          { o: 107, h: 114, l: 106, c: 113 },
          { o: 109, h: 109, l: 104, c: 105 },
          { o: 105, h: 111, l: 105, c: 110 },
          { o: 110, h: 110, l: 101, c: 102 },
          { o: 102, h: 103, l: 98, c: 100 },
          { o: 100, h: 112, l: 99, c: 111 },
          { o: 111, h: 120, l: 110, c: 119 },
        ],
        annotations: [
          { type: "label", index: 1, price: 117, text: { en: "HTF high", tl: "HTF high" }, tone: "bull", appearAtStep: 0 },
          { type: "line", kind: "level", price: 111, from: 3, to: 6, tone: "bear", dashed: true, label: { en: "Last lower high", tl: "Last lower high" }, labelPlacement: "center", appearAtStep: 1 },
          { type: "label", index: 4, price: 106, text: { en: "Looks bearish", tl: "Mukhang bearish" }, tone: "bear", appearAtStep: 1 },
          { type: "box", kind: "ob", from: 5, to: 5, top: 102, bottom: 100, tone: "bull", label: { en: "HTF PDRA", tl: "HTF PDRA" }, appearAtStep: 2 },
          { type: "marker", kind: "mss", index: 6, price: 112, tone: "bull", label: { en: "MSS", tl: "MSS" }, appearAtStep: 3 },
          { type: "label", index: 7, price: 119, text: { en: "Continuation", tl: "Continuation" }, tone: "bull", appearAtStep: 4 },
        ],
        steps: [
          {
            caption: { en: "On the higher timeframe the order flow is bullish: price has just made a high. Hold that thought as we zoom in.", tl: "Sa higher timeframe, bullish ang order flow: kagagawa lang ng presyo ng high. Tandaan ito habang nagza-zoom in tayo." },
            tip: { en: "The big-picture bias here is UP.", tl: "Ang big-picture bias dito ay PATAAS." },
            revealCandles: 2,
          },
          {
            caption: { en: "Now price pulls back and, up close, starts making lower highs and lower lows. On the lower timeframe this looks like a bearish move. Do not flip your bias: on the higher timeframe this is still just one retracement.", tl: "Ngayon nag-pullback ang presyo at, sa malapitan, nagsisimulang gumawa ng lower highs at lower lows. Sa lower timeframe mukhang bearish na galaw ito. Huwag baguhin ang bias: sa higher timeframe, isang retracement pa rin ito." },
            tip: { en: "Lower highs and lower lows = bearish, but only on this small timeframe.", tl: "Lower highs at lower lows = bearish, pero sa maliit na timeframe lang ito." },
            revealCandles: 4,
          },
          {
            caption: { en: "The pullback bottoms exactly on a higher-timeframe PDRA, a bullish order block, the point of interest where we expected support. This is where the higher-timeframe order flow should resume.", tl: "Ang pullback ay tumigil mismo sa isang higher-timeframe PDRA, isang bullish order block, ang point of interest kung saan inaasahan natin ang support. Dito dapat magpatuloy ang higher-timeframe order flow." },
            tip: { en: "The retracement landing right on a HTF OB/FVG is your point of interest.", tl: "Ang retracement na dumapo mismo sa HTF OB/FVG ang iyong point of interest." },
            revealCandles: 6,
          },
          {
            caption: { en: "Then price breaks above the last lower high. Remember the MSS, the Market Structure Shift, from the earlier lesson? That break is exactly the confirmation we needed that the retracement is over and the bullish order flow is back on.", tl: "Tapos break ng presyo ang last lower high. Tandaan ang MSS, ang Market Structure Shift, mula sa naunang lesson? Ang break na iyon ang eksaktong kumpirmasyon na tapos na ang retracement at bumalik na ang bullish order flow." },
            tip: { en: "Closing above the last lower high = MSS = the down-move is finished.", tl: "Pag nag-close above sa last lower high = MSS = tapos na ang pababang galaw." },
            revealCandles: 7,
          },
          {
            caption: { en: "Price expands up and makes a new higher high. The lower-timeframe \"bearish\" stretch was only the higher-timeframe retracement all along. That is why you always check the higher timeframe.", tl: "Mag-eexpand pataas ang presyo at gagawa ng bagong higher high. Ang lower-timeframe na \"bearish\" na bahagi ay retracement lang pala ng higher timeframe. Kaya laging tinitingnan ang higher timeframe." },
            tip: { en: "New higher high = the HTF bullish order flow continued, as planned.", tl: "Bagong higher high = nagpatuloy ang HTF bullish order flow, gaya ng plano." },
            revealCandles: 8,
          },
        ],
        caption: {
          en: "A lower-timeframe bearish-looking move can simply be the higher-timeframe retracement. Wait for the MSS at a HTF PDRA before you trade the continuation.",
          tl: "Ang isang lower-timeframe na mukhang bearish na galaw ay pwedeng retracement lang ng higher timeframe. Hintayin ang MSS sa HTF PDRA bago mag-trade ng continuation.",
        },
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Do not flip on a lower-timeframe move", tl: "Huwag baguhin ang bias dahil sa lower-timeframe move" },
      text: {
        en: "A bearish stretch on the lower timeframe does NOT mean the higher-timeframe bias switched. Until you see an MSS against the order flow on the higher timeframe, treat the move as a retracement and keep trading with the order flow.",
        tl: "Ang bearish na bahagi sa lower timeframe ay HINDI nangangahulugang lumipat na ang higher-timeframe bias. Hangga't wala kang nakikitang MSS laban sa order flow sa higher timeframe, ituring na retracement ang galaw at magpatuloy sa pag-trade kasama ang order flow.",
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
          en: "Bullish example (BTCUSD): after a swing low, price ran up and respected a bullish OB and FVG. On the lower timeframe the retracement back to the higher-timeframe swing low looked bearish, so they waited for the MSS before buying the continuation up.",
          tl: "Bullish example (BTCUSD): pagkatapos ng swing low, umakyat ang presyo at nirespeto ang bullish OB at FVG. Sa lower timeframe, mukhang bearish ang retracement pabalik sa higher-timeframe swing low, kaya hinintay nila ang MSS bago bumili ng continuation pataas.",
        },
        {
          en: "Bearish example (NASDAQ): bearish PDRAs were respected as resistance until price hit a higher-timeframe OB and swing high. On the lower timeframe an MSS down confirmed the sell, target was the next higher-timeframe OB.",
          tl: "Bearish example (NASDAQ): nirespeto ang bearish PDRAs bilang resistance hanggang tumama ang presyo sa higher-timeframe OB at swing high. Sa lower timeframe, isang MSS pababa ang nagkumpirma ng sell, target ang susunod na higher-timeframe OB.",
        },
        {
          en: "Bullish example (EURUSD): after an MSS, price respected a bullish FVG and kept rising. They entered on the lower timeframe once price tagged the OB and showed a reversal.",
          tl: "Bullish example (EURUSD): pagkatapos ng MSS, nirespeto ng presyo ang bullish FVG at patuloy na umakyat. Pumasok sila sa lower timeframe nang tamaan ng presyo ang OB at magpakita ng reversal.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "When there is no clean swing left: use a breaker", tl: "Kapag walang malinis na swing: gamitin ang breaker" },
      text: {
        en: "Sometimes after price hits its target there is no valid swing low or high left to base an MSS on. In that case look for a breaker block (a failed order block on the other side). Once price confirms off the breaker, it can confirm the continuation or reversal of the order flow.",
        tl: "Minsan pagkatapos tamaan ng presyo ang target, walang natitirang valid swing low o high para gawing batayan ng MSS. Sa ganoong sitwasyon, maghanap ng breaker block (isang failed order block sa kabilang panig). Kapag nag-confirm ang presyo mula sa breaker, pwede nitong kumpirmahin ang continuation o reversal ng order flow.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "Order flow is the market's bias and tells you where price is heading. Bullish: respect bullish PDRAs, run highs, break structure up. Bearish is the mirror. Wait for the retracement into a PDRA, then trade with the flow. Order flow is fractal, so a lower-timeframe counter-move can be the higher-timeframe retracement: wait for an MSS before you act.",
        tl: "Ang order flow ang bias ng market at sinasabi kung saan papunta ang presyo. Bullish: i-respeto ang bullish PDRAs, run ang highs, break ng structure pataas. Kabaligtaran ang bearish. Hintayin ang retracement papunta sa PDRA, tapos mag-trade kasama ang flow. Fractal ang order flow, kaya ang lower-timeframe counter-move ay pwedeng retracement ng higher timeframe: hintayin ang MSS bago kumilos.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "What does order flow tell you?",
        tl: "Ano ang sinasabi sa iyo ng order flow?",
      },
      options: [
        { id: "a", text: { en: "The exact entry price", tl: "Ang eksaktong entry price" } },
        { id: "b", text: { en: "Where the market is heading (the bias)", tl: "Kung saan papunta ang market (ang bias)" } },
        { id: "c", text: { en: "How much money to risk", tl: "Magkano ang irrisk na pera" } },
        { id: "d", text: { en: "The time of the next news event", tl: "Ang oras ng susunod na news event" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Order flow is the market's current direction or bias: bullish means up, bearish means down.",
        tl: "Ang order flow ay ang kasalukuyang direksyon o bias ng market: bullish ay pataas, bearish ay pababa.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "A PDRA (PD array) is best described as…",
        tl: "Ang PDRA (PD array) ay pinakamahusay ilarawan bilang…",
      },
      options: [
        { id: "a", text: { en: "A price zone Smart Money reacts from, like an OB or FVG", tl: "Isang price zone kung saan tumutugon ang Smart Money, gaya ng OB o FVG" } },
        { id: "b", text: { en: "A type of moving average", tl: "Isang uri ng moving average" } },
        { id: "c", text: { en: "A news indicator", tl: "Isang news indicator" } },
        { id: "d", text: { en: "The daily open price", tl: "Ang daily open price" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "PDRAs are the zones price reacts from: order blocks, fair value gaps, and breaker blocks.",
        tl: "Ang PDRAs ay ang mga zone kung saan tumutugon ang presyo: order blocks, fair value gaps, at breaker blocks.",
      },
    },
    {
      id: "q3",
      type: "truefalse",
      prompt: {
        en: "In a bullish order flow, bullish PDRAs are respected and give support.",
        tl: "Sa bullish order flow, nire-respeto ang bullish PDRAs at nagbibigay ng support.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. In a bullish order flow, price holds at bullish PDRAs (demand OBs/FVGs) and continues up.",
        tl: "Oo. Sa bullish order flow, humahawak ang presyo sa bullish PDRAs (demand OBs/FVGs) at tuloy pataas.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "In a bullish order flow, what happens to bearish PDRAs?",
        tl: "Sa bullish order flow, ano ang nangyayari sa bearish PDRAs?",
      },
      options: [
        { id: "a", text: { en: "They are respected and hold price down", tl: "Nire-respeto at pinipigil ang presyo pababa" } },
        { id: "b", text: { en: "They are violated (price slices through them)", tl: "Navavayolate (dumadaan diretso ang presyo)" } },
        { id: "c", text: { en: "They turn into support", tl: "Nagiging support" } },
        { id: "d", text: { en: "Nothing, they are ignored forever", tl: "Wala, balewala na sila habambuhay" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "In a bullish order flow, bearish PDRAs get violated. The opposite is true in a bearish order flow.",
        tl: "Sa bullish order flow, navavayolate ang bearish PDRAs. Kabaligtaran sa bearish order flow.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "What pattern does a bullish order flow repeat?",
        tl: "Anong pattern ang inuulit ng bullish order flow?",
      },
      options: [
        { id: "a", text: { en: "Run the highs, then break structure up", tl: "Run ang highs, tapos break ng structure pataas" } },
        { id: "b", text: { en: "Run the lows, then break structure down", tl: "Run ang lows, tapos break ng structure pababa" } },
        { id: "c", text: { en: "Stay flat with no breaks", tl: "Manatiling patag na walang break" } },
        { id: "d", text: { en: "Gap up every candle", tl: "Mag-gap up kada candle" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Bullish order flow runs the short-term highs and breaks structure up (BOS), again and again.",
        tl: "Rinarun ng bullish order flow ang short-term highs at break of structure pataas (BOS), paulit-ulit.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "In a bullish order flow, a retracement usually goes…",
        tl: "Sa bullish order flow, ang retracement ay kadalasang…",
      },
      options: [
        { id: "a", text: { en: "Higher, into a bearish PDRA", tl: "Pataas, papunta sa bearish PDRA" } },
        { id: "b", text: { en: "Lower, into a bullish PDRA, then price expands up again", tl: "Pababa, papunta sa bullish PDRA, tapos mag-eexpand pataas ulit" } },
        { id: "c", text: { en: "Sideways forever", tl: "Pa-gilid magpakailanman" } },
        { id: "d", text: { en: "Straight to a reversal with no PDRA", tl: "Diretso sa reversal na walang PDRA" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "The pullback drops into a bullish PDRA for support, then the order flow continues up.",
        tl: "Bumababa ang pullback papunta sa bullish PDRA para sa support, tapos tuloy pataas ang order flow.",
      },
    },
    {
      id: "q7",
      type: "truefalse",
      prompt: {
        en: "A bearish order flow respects bearish PDRAs as resistance and breaks structure down.",
        tl: "Ang bearish order flow ay nire-respeto ang bearish PDRAs bilang resistance at break ng structure pababa.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Bearish order flow is the mirror of bullish: bearish PDRAs hold, lows get run, structure breaks down.",
        tl: "Oo. Ang bearish order flow ay kabaligtaran ng bullish: humahawak ang bearish PDRAs, rinarun ang lows, break ng structure pababa.",
      },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: {
        en: "Once you know the order flow, what is the plan?",
        tl: "Kapag alam mo na ang order flow, ano ang plano?",
      },
      options: [
        { id: "a", text: { en: "Chase the price immediately", tl: "Habulin agad ang presyo" } },
        { id: "b", text: { en: "Wait for a retracement into a PDRA, then trade with the flow", tl: "Hintayin ang retracement papunta sa PDRA, tapos mag-trade kasama ang flow" } },
        { id: "c", text: { en: "Trade against the order flow", tl: "Mag-trade laban sa order flow" } },
        { id: "d", text: { en: "Close all charts and wait a week", tl: "Isara ang lahat ng chart at maghintay ng isang linggo" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "You wait for the retracement to finish at a PDRA, then anticipate the move in the order-flow direction.",
        tl: "Hinihintay mong matapos ang retracement sa isang PDRA, tapos inaasahan ang galaw sa direksyon ng order flow.",
      },
    },
    {
      id: "q9",
      type: "truefalse",
      prompt: {
        en: "A bearish stretch on the lower timeframe always means the higher-timeframe bias has flipped to bearish.",
        tl: "Ang bearish na bahagi sa lower timeframe ay laging nangangahulugang lumipat na sa bearish ang higher-timeframe bias.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. Order flow is fractal: that lower-timeframe move can just be the higher-timeframe retracement. Always check the higher timeframe.",
        tl: "Mali. Fractal ang order flow: ang lower-timeframe move na iyon ay pwedeng retracement lang ng higher timeframe. Laging tingnan ang higher timeframe.",
      },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: {
        en: "After a retracement lands on a higher-timeframe PDRA, what confirms it is safe to rejoin the order flow?",
        tl: "Pagkatapos dumapo ang retracement sa higher-timeframe PDRA, ano ang nagkukumpirma na ligtas nang sumali ulit sa order flow?",
      },
      options: [
        { id: "a", text: { en: "An MSS (Market Structure Shift) in the order-flow direction", tl: "Isang MSS (Market Structure Shift) sa direksyon ng order flow" } },
        { id: "b", text: { en: "A round number", tl: "Isang round number" } },
        { id: "c", text: { en: "A red candle", tl: "Isang red candle" } },
        { id: "d", text: { en: "The clock hitting midnight", tl: "Pag-hating gabi" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "You wait for an MSS at the PDRA, the confirmation that the retracement is over and the order flow has resumed.",
        tl: "Hinihintay mo ang MSS sa PDRA, ang kumpirmasyon na tapos na ang retracement at nagpatuloy na ang order flow.",
      },
    },
  ],
};
