// Source: Part 2/Part 2 Lesson 3 - ERL & IRL.txt (verified: matches title)
// COVERAGE (source: Part 2/Part 2 Lesson 3 - ERL & IRL.txt) — every point mapped:
// [x] IRL (internal range liquidity) = an FVG inside a range -> intro + definitions list + range chart step0 + Q1, Q3
// [x] ERL (external range liquidity) = a high or low of the range (swing high/swing low) -> intro + definitions list + range chart step1,2 + Q2, Q4
// [x] the draw on liquidity cycles IRL <-> ERL; use it as a higher-timeframe bias -> range chart step3 + key callout + Q5
// [x] from an IRL the next target is the ERL -> cycle explanation + Q6
// [x] from an ERL the next target is the IRL -> erl-irl-apply chart + Q7
// [x] confirmation: HTF PDRA (FVG) hit -> drop to LTF; reversal confirmation means it was only a retracement, then enter toward the ERL -> apply chart steps + LTF callout
// [x] if the FVG (IRL) is violated/disrespected, price can bounce and target the ERL instead -> warning callout + Q8
// [x] ERL-to-IRL worked flow (take out the swing high, then target the FVG below) -> erl-irl-apply chart steps + Q7
// [x] examples (AUDUSD IRL->ERL, NASDAQ monthly ERL->IRL, swing-high taken then FVG target) -> how-pros list
// [x] the nearest liquidity is the most probable draw but not guaranteed; always confirm on the lower timeframe -> warning callout + Q9, Q10
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "erl-irl",
  moduleSlug: "part-2",
  title: { en: "ERL & IRL", tl: "ERL & IRL" },
  summary: {
    en: "Inside any range there are two kinds of liquidity: the edges (swing high and low = ERL) and an FVG in the middle (IRL). Price draws back and forth between them, and that cycle gives you a higher-timeframe bias for where it is likely to go next.",
    tl: "Sa loob ng anumang range, may dalawang uri ng liquidity: ang mga gilid (swing high at low = ERL) at isang FVG sa gitna (IRL). Pabalik-balik ang draw ng presyo sa pagitan nila, at ang cycle na iyon ang nagbibigay sa iyo ng higher-timeframe bias kung saan malamang pupunta.",
  },
  estMinutes: 11,
  sourceFile: "Part 2/Part 2 Lesson 3 - ERL & IRL.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "ERL and IRL describe where the liquidity sits inside a range. Internal range liquidity (IRL) is a fair value gap inside the range. External range liquidity (ERL) is the high or the low of the range, in other words a swing high or a swing low. Always remember it this way: IRL is the FVG, ERL is the swing high or swing low.",
        tl: "Inilalarawan ng ERL at IRL kung saan naroon ang liquidity sa loob ng range. Ang internal range liquidity (IRL) ay isang fair value gap sa loob ng range. Ang external range liquidity (ERL) ay ang high o low ng range, sa madaling salita ay swing high o swing low. Tandaan lagi ito: IRL ay ang FVG, ERL ay ang swing high o swing low.",
      },
    },
    {
      kind: "list",
      items: [
        {
          en: "IRL (internal range liquidity): a fair value gap sitting inside the range. Remember the FVG lesson? That gap is the IRL.",
          tl: "IRL (internal range liquidity): isang fair value gap sa loob ng range. Tandaan ang FVG lesson? Ang gap na iyon ang IRL.",
        },
        {
          en: "ERL (external range liquidity): the edge of the range, a swing high above or a swing low below.",
          tl: "ERL (external range liquidity): ang gilid ng range, isang swing high sa itaas o swing low sa ibaba.",
        },
      ],
    },
    {
      kind: "chart",
      spec: {
        id: "ei-range",
        title: { en: "A range: ERL at the edges, IRL in the middle", tl: "Isang range: ERL sa gilid, IRL sa gitna" },
        height: 380,
        candles: [
          { o: 100, h: 102, l: 98, c: 101 },
          { o: 102, h: 109, l: 101, c: 108 },
          { o: 108, h: 114, l: 106, c: 113 },
          { o: 113, h: 119, l: 112, c: 118 },
          { o: 118, h: 118, l: 110, c: 111 },
          { o: 111, h: 112, l: 103, c: 104 },
          { o: 104, h: 105, l: 99, c: 100 },
          { o: 100, h: 106, l: 99, c: 105 },
        ],
        annotations: [
          { type: "box", kind: "fvg", from: 0, to: 2, bottom: 102, top: 106, tone: "bull", label: { en: "IRL (FVG)", tl: "IRL (FVG)" }, appearAtStep: 0 },
          { type: "line", kind: "level", price: 119, from: 3, to: 7, tone: "neutral", dashed: true, label: { en: "ERL (range high)", tl: "ERL (range high)" }, labelPlacement: "center", appearAtStep: 1 },
          { type: "line", kind: "level", price: 99, from: 4, to: 7, tone: "neutral", dashed: true, label: { en: "ERL (range low)", tl: "ERL (range low)" }, labelPlacement: "center", appearAtStep: 2 },
        ],
        steps: [
          {
            caption: { en: "As price rallies it leaves a gap between candles: a fair value gap. An FVG that sits inside a range is the Internal Range Liquidity, the IRL.", tl: "Habang umaakyat ang presyo, nag-iiwan ito ng puwang sa pagitan ng candles: isang fair value gap. Ang FVG na nasa loob ng range ay ang Internal Range Liquidity, ang IRL." },
            tip: { en: "A 3-candle gap (the FVG from the earlier lesson) inside the range = the IRL.", tl: "Isang 3-candle na gap (ang FVG mula sa naunang lesson) sa loob ng range = ang IRL." },
            revealCandles: 3,
          },
          {
            caption: { en: "Price pushes up to a swing high. The high at the top edge of the range is the External Range Liquidity, the ERL.", tl: "Tumulak pataas ang presyo papuntang swing high. Ang high sa itaas na gilid ng range ay ang External Range Liquidity, ang ERL." },
            tip: { en: "The swing high (top of the range) holds ERL: buy-side liquidity above it.", tl: "Ang swing high (taas ng range) ay may ERL: buy-side liquidity sa itaas nito." },
            revealCandles: 4,
          },
          {
            caption: { en: "Then price falls back and makes a swing low. That low at the bottom edge is the other ERL. So a range has ERL at both edges and IRL (the FVG) in the middle.", tl: "Tapos bumaba pabalik ang presyo at gumawa ng swing low. Ang low sa ibabang gilid ay ang kabilang ERL. Kaya ang range ay may ERL sa magkabilang gilid at IRL (ang FVG) sa gitna." },
            tip: { en: "The swing low (bottom of the range) holds ERL: sell-side liquidity below it.", tl: "Ang swing low (ilalim ng range) ay may ERL: sell-side liquidity sa ilalim nito." },
            revealCandles: 8,
          },
          {
            caption: { en: "The draw on liquidity cycles between them. From the IRL, the next target is the ERL. From the ERL, the next target is the IRL. Watching this cycle on the higher timeframe gives you a bias for where price is most likely to go next.", tl: "Pabalik-balik ang draw on liquidity sa pagitan nila. Mula sa IRL, ang susunod na target ay ang ERL. Mula sa ERL, ang susunod na target ay ang IRL. Ang pagmamasid sa cycle na ito sa higher timeframe ang nagbibigay sa iyo ng bias kung saan malamang pupunta ang presyo." },
            tip: { en: "IRL to ERL, then ERL to IRL: the alternation IS your higher-timeframe bias.", tl: "IRL papuntang ERL, tapos ERL papuntang IRL: ang pagsasalitan AY ang iyong higher-timeframe bias." },
            revealCandles: 8,
          },
        ],
        caption: {
          en: "ERL = the swing high/low at the edges. IRL = the FVG in the middle. Price draws from one to the other, back and forth.",
          tl: "ERL = ang swing high/low sa gilid. IRL = ang FVG sa gitna. Mula sa isa papunta sa isa, pabalik-balik ang draw ng presyo.",
        },
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "The cycle in one line", tl: "Ang cycle sa isang linya" },
      text: {
        en: "From an IRL price draws to the ERL; from an ERL it draws back to the IRL. That back-and-forth is the draw on liquidity, your higher-timeframe bias.",
        tl: "Mula sa IRL, dumadraw ang presyo papuntang ERL; mula sa ERL, dumadraw pabalik sa IRL. Ang pabalik-balik na iyon ang draw on liquidity, ang iyong higher-timeframe bias.",
      },
    },
    {
      kind: "heading",
      text: { en: "Trading the cycle: ERL to IRL", tl: "Pag-trade ng cycle: ERL papuntang IRL" },
    },
    {
      kind: "paragraph",
      text: {
        en: "Here is the cycle in action. Price takes out a swing high (the ERL), grabbing the liquidity above it. Once that ERL is taken, the next draw is the IRL, the FVG. You drop to the lower timeframe, wait for confirmation, then trade toward the FVG.",
        tl: "Narito ang cycle sa aksyon. Kinukuha ng presyo ang isang swing high (ang ERL), kinukuha ang liquidity sa itaas nito. Kapag nakuha na ang ERL, ang susunod na draw ay ang IRL, ang FVG. Bumababa ka sa lower timeframe, hihintayin ang confirmation, tapos mag-trade papunta sa FVG.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "ei-apply",
        title: { en: "ERL taken, then price draws to the IRL", tl: "Nakuha ang ERL, tapos dumadraw ang presyo sa IRL" },
        height: 380,
        candles: [
          { o: 100, h: 102, l: 99, c: 101 },
          { o: 101, h: 108, l: 100, c: 107 },
          { o: 107, h: 113, l: 105, c: 112 },
          { o: 112, h: 117, l: 111, c: 116 },
          { o: 116, h: 117, l: 110, c: 111 },
          { o: 111, h: 112, l: 106, c: 107 },
          { o: 107, h: 120, l: 106, c: 119 },
          { o: 119, h: 120, l: 112, c: 113 },
          { o: 113, h: 114, l: 104, c: 105 },
          { o: 105, h: 106, l: 102, c: 103 },
        ],
        annotations: [
          { type: "box", kind: "fvg", from: 0, to: 2, bottom: 102, top: 105, tone: "bull", label: { en: "IRL (FVG) target", tl: "IRL (FVG) target" }, appearAtStep: 0 },
          { type: "line", kind: "level", price: 117, from: 3, to: 6, tone: "neutral", dashed: true, label: { en: "ERL (swing high)", tl: "ERL (swing high)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 6, price: 120, tone: "bear", label: { en: "ERL taken", tl: "ERL taken" }, appearAtStep: 1 },
          { type: "marker", kind: "mss", index: 8, price: 104, tone: "bear", label: { en: "MSS", tl: "MSS" }, appearAtStep: 2 },
          { type: "marker", kind: "tp", index: 9, price: 102, tone: "bear", label: { en: "IRL hit", tl: "IRL hit" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Set the scene: earlier price left an FVG (the IRL) and built a swing high (the ERL). By the cycle, we expect the draw to move between them.", tl: "Itakda ang eksena: dati nag-iwan ang presyo ng FVG (ang IRL) at gumawa ng swing high (ang ERL). Ayon sa cycle, inaasahan nating gagalaw ang draw sa pagitan nila." },
            tip: { en: "Spot the FVG (IRL) and the swing high (ERL) before anything moves.", tl: "Tukuyin ang FVG (IRL) at ang swing high (ERL) bago pa man may gumalaw." },
            revealCandles: 4,
          },
          {
            caption: { en: "Price rallies and trades above the swing high, taking out the ERL and grabbing the buy-side liquidity resting there.", tl: "Umakyat ang presyo at nag-trade lampas sa swing high, kinuha ang ERL at ang buy-side liquidity na nakahimpil doon." },
            tip: { en: "A wick or close above the prior swing high = the ERL was taken.", tl: "Isang wick o close lampas sa naunang swing high = nakuha ang ERL." },
            revealCandles: 7,
          },
          {
            caption: { en: "Then price reverses. An MSS down confirms the turn. With the ERL taken, the next draw on liquidity is the IRL, the FVG below.", tl: "Tapos bumaliktad ang presyo. Isang MSS pababa ang nagkumpirma ng liko. Dahil nakuha na ang ERL, ang susunod na draw on liquidity ay ang IRL, ang FVG sa ibaba." },
            tip: { en: "After the ERL is swept, a bearish MSS points the draw toward the IRL.", tl: "Pagkatapos ma-sweep ang ERL, isang bearish MSS ang nagtuturo ng draw papunta sa IRL." },
            revealCandles: 9,
          },
          {
            caption: { en: "Price drops straight into the FVG, the IRL. ERL taken, then IRL filled: that is one full turn of the cycle, and it is your bias confirmed.", tl: "Bumaba nang diretso ang presyo papunta sa FVG, ang IRL. Nakuha ang ERL, tapos napunan ang IRL: iyon ang isang buong ikot ng cycle, at iyon ang kumpirmadong bias mo." },
            tip: { en: "Price reaching the FVG = the IRL draw is complete.", tl: "Pag-abot ng presyo sa FVG = kumpleto na ang IRL draw." },
            revealCandles: 10,
          },
        ],
        caption: {
          en: "Take the ERL (swing high), confirm with an MSS, then draw to the IRL (the FVG). The reverse, IRL to ERL, works the same way.",
          tl: "Kunin ang ERL (swing high), kumpirmahin gamit ang MSS, tapos dumraw papunta sa IRL (ang FVG). Ang baligtad, IRL papuntang ERL, ay ganoon din.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Confirm on the lower timeframe", tl: "Kumpirmahin sa lower timeframe" },
      text: {
        en: "When a higher-timeframe PDRA (like the FVG) is hit, drop to the lower timeframe and wait for confirmation. A reversal there tells you it was only a retracement, so you can enter toward the next ERL. If price instead violates the FVG (the IRL), treat that as the IRL no longer holding, and look for it to draw to the ERL instead.",
        tl: "Kapag natamaan ang higher-timeframe PDRA (gaya ng FVG), bumaba sa lower timeframe at hintayin ang confirmation. Ang reversal doon ay nagsasabing retracement lang iyon, kaya pwede kang pumasok papunta sa susunod na ERL. Kung sa halip ay vinayolate ng presyo ang FVG (ang IRL), ituring na hindi na humawak ang IRL, at asahan na dumraw ito papunta sa ERL.",
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
          en: "IRL to ERL (AUDUSD): the IRL was an FVG. After it was taken, they dropped to the 1-hour, got confirmation that price would fall, entered, and targeted the ERL.",
          tl: "IRL papuntang ERL (AUDUSD): ang IRL ay isang FVG. Pagkatapos itong makuha, bumaba sila sa 1-hour, nakakuha ng confirmation na bababa ang presyo, pumasok, at tinarget ang ERL.",
        },
        {
          en: "ERL to IRL (NASDAQ monthly): a swing high (ERL) was taken out. The next target became the FVG (IRL) lower. They got confirmation and entered short.",
          tl: "ERL papuntang IRL (NASDAQ monthly): isang swing high (ERL) ang nakuha. Ang susunod na target ay naging FVG (IRL) sa ibaba. Nakakuha sila ng confirmation at pumasok ng short.",
        },
        {
          en: "ERL to IRL again: after taking out a high, they entered on the lower timeframe going lower, targeting the FVG (IRL).",
          tl: "ERL papuntang IRL ulit: pagkatapos kunin ang isang high, pumasok sila sa lower timeframe pababa, tinarget ang FVG (IRL).",
        },
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Nearest is most probable, not guaranteed", tl: "Pinakamalapit ang pinaka-malamang, hindi garantisado" },
      text: {
        en: "The nearest liquidity (the closest ERL or IRL) is the most probable draw, but it is never guaranteed. That is exactly why you confirm on the lower timeframe before you enter, instead of assuming price must go there.",
        tl: "Ang pinakamalapit na liquidity (ang pinakamalapit na ERL o IRL) ang pinaka-malamang na draw, pero hindi ito garantisado. Kaya nga kinukumpirma mo sa lower timeframe bago pumasok, sa halip na ipagpalagay na kailangang pumunta doon ang presyo.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "IRL is the FVG inside the range. ERL is the swing high or low at the edges. The draw on liquidity cycles IRL to ERL to IRL, and that cycle is your higher-timeframe bias. Trade it by waiting for the PDRA to be hit and confirming on the lower timeframe. The nearest pool is most probable but never guaranteed.",
        tl: "Ang IRL ay ang FVG sa loob ng range. Ang ERL ay ang swing high o low sa mga gilid. Ang draw on liquidity ay umiikot IRL papuntang ERL papuntang IRL, at ang cycle na iyon ang iyong higher-timeframe bias. I-trade ito sa pamamagitan ng paghihintay na matamaan ang PDRA at pagkumpirma sa lower timeframe. Ang pinakamalapit na pool ang pinaka-malamang pero hindi garantisado.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "What is internal range liquidity (IRL)?",
        tl: "Ano ang internal range liquidity (IRL)?",
      },
      options: [
        { id: "a", text: { en: "A fair value gap inside the range", tl: "Isang fair value gap sa loob ng range" } },
        { id: "b", text: { en: "The swing high of the range", tl: "Ang swing high ng range" } },
        { id: "c", text: { en: "The daily open", tl: "Ang daily open" } },
        { id: "d", text: { en: "A moving average", tl: "Isang moving average" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "IRL is the FVG sitting inside the range.",
        tl: "Ang IRL ay ang FVG na nasa loob ng range.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "What is external range liquidity (ERL)?",
        tl: "Ano ang external range liquidity (ERL)?",
      },
      options: [
        { id: "a", text: { en: "The FVG in the middle", tl: "Ang FVG sa gitna" } },
        { id: "b", text: { en: "The high or low of the range (a swing high or swing low)", tl: "Ang high o low ng range (swing high o swing low)" } },
        { id: "c", text: { en: "The spread", tl: "Ang spread" } },
        { id: "d", text: { en: "A news event", tl: "Isang news event" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "ERL is the edge of the range: a swing high above or a swing low below.",
        tl: "Ang ERL ay ang gilid ng range: swing high sa itaas o swing low sa ibaba.",
      },
    },
    {
      id: "q3",
      type: "truefalse",
      prompt: {
        en: "An FVG inside a range is the IRL.",
        tl: "Ang FVG sa loob ng range ay ang IRL.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. IRL is the FVG; ERL is the swing high or low.",
        tl: "Oo. Ang IRL ay ang FVG; ang ERL ay ang swing high o low.",
      },
    },
    {
      id: "q4",
      type: "truefalse",
      prompt: {
        en: "The swing high and swing low at the edges of a range are both ERL.",
        tl: "Ang swing high at swing low sa mga gilid ng range ay parehong ERL.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. ERL sits at both edges: buy-side above the swing high, sell-side below the swing low.",
        tl: "Oo. Nasa magkabilang gilid ang ERL: buy-side sa itaas ng swing high, sell-side sa ilalim ng swing low.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "The back-and-forth between IRL and ERL is called…",
        tl: "Ang pabalik-balik sa pagitan ng IRL at ERL ay tinatawag na…",
      },
      options: [
        { id: "a", text: { en: "The draw on liquidity (your higher-timeframe bias)", tl: "Ang draw on liquidity (ang higher-timeframe bias mo)" } },
        { id: "b", text: { en: "A spread", tl: "Isang spread" } },
        { id: "c", text: { en: "A candlestick wick", tl: "Isang candlestick wick" } },
        { id: "d", text: { en: "A breakout", tl: "Isang breakout" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The cycle IRL to ERL to IRL is the draw on liquidity, which you use as a higher-timeframe bias.",
        tl: "Ang cycle na IRL papuntang ERL papuntang IRL ay ang draw on liquidity, na ginagamit bilang higher-timeframe bias.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "If price is coming from the IRL, what is the next likely target?",
        tl: "Kung galing ang presyo sa IRL, ano ang susunod na malamang na target?",
      },
      options: [
        { id: "a", text: { en: "The ERL (the swing high or low)", tl: "Ang ERL (ang swing high o low)" } },
        { id: "b", text: { en: "Another FVG only", tl: "Isa pang FVG lamang" } },
        { id: "c", text: { en: "The session open", tl: "Ang session open" } },
        { id: "d", text: { en: "It stays still", tl: "Nananatili ito" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "From the IRL, the draw moves to the ERL. From the ERL, it moves back to the IRL.",
        tl: "Mula sa IRL, gumagalaw ang draw papunta sa ERL. Mula sa ERL, bumabalik ito sa IRL.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "After price takes out a swing high (the ERL), what becomes the next draw?",
        tl: "Pagkatapos kunin ng presyo ang swing high (ang ERL), ano ang nagiging susunod na draw?",
      },
      options: [
        { id: "a", text: { en: "The IRL, the FVG", tl: "Ang IRL, ang FVG" } },
        { id: "b", text: { en: "A higher swing high forever", tl: "Mas mataas na swing high magpakailanman" } },
        { id: "c", text: { en: "Nothing", tl: "Wala" } },
        { id: "d", text: { en: "The spread", tl: "Ang spread" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Once the ERL is taken, the next draw on liquidity is the IRL (the FVG).",
        tl: "Kapag nakuha ang ERL, ang susunod na draw on liquidity ay ang IRL (ang FVG).",
      },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: {
        en: "If price violates the FVG (the IRL) instead of holding, what is more likely next?",
        tl: "Kung vinayolate ng presyo ang FVG (ang IRL) imbes na humawak, ano ang mas malamang sunod?",
      },
      options: [
        { id: "a", text: { en: "It draws to the ERL instead", tl: "Dumdraw ito papunta sa ERL" } },
        { id: "b", text: { en: "It stops trading", tl: "Tumitigil sa pag-trade" } },
        { id: "c", text: { en: "It guarantees a reversal", tl: "Sigurado ang reversal" } },
        { id: "d", text: { en: "Nothing changes", tl: "Walang nagbabago" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "A violated IRL is no longer holding, so price can bounce and draw toward the ERL instead.",
        tl: "Ang vinayolate na IRL ay hindi na humahawak, kaya pwedeng mag-bounce ang presyo at dumraw papunta sa ERL.",
      },
    },
    {
      id: "q9",
      type: "truefalse",
      prompt: {
        en: "The nearest liquidity is the most probable draw, but it is not guaranteed.",
        tl: "Ang pinakamalapit na liquidity ang pinaka-malamang na draw, pero hindi ito garantisado.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Nearest is most probable, but you still confirm on the lower timeframe.",
        tl: "Oo. Pinakamalapit ang pinaka-malamang, pero kinukumpirma mo pa rin sa lower timeframe.",
      },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: {
        en: "Before entering toward the next draw, what should you do?",
        tl: "Bago pumasok papunta sa susunod na draw, ano ang dapat mong gawin?",
      },
      options: [
        { id: "a", text: { en: "Wait for confirmation on the lower timeframe", tl: "Hintayin ang confirmation sa lower timeframe" } },
        { id: "b", text: { en: "Enter immediately with no confirmation", tl: "Pumasok agad nang walang confirmation" } },
        { id: "c", text: { en: "Double your position size", tl: "Doblehin ang position size" } },
        { id: "d", text: { en: "Ignore the higher timeframe", tl: "Balewalain ang higher timeframe" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Because the draw is probable not guaranteed, you confirm on the lower timeframe first.",
        tl: "Dahil malamang lang at hindi garantisado ang draw, kinukumpirma mo muna sa lower timeframe.",
      },
    },
  ],
};
