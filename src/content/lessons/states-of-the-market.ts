// Source: Part 1/Part 1 Lesson 1 - States of the Market.txt (verified: matches title)
// COVERAGE (source: Part 1/Part 1 Lesson 1 - States of the Market.txt) — every point mapped:
// [x] 4 states (consolidation, expansion, retracement, reversal) -> intro list
// [x] "one of the most important lessons to memorize" -> intro paragraph
// [x] price always consolidation -> expansion -> paragraph + Q2
// [x] expansion -> retracement / reversal / consolidation -> paragraph
// [x] never consolidation -> reversal, never consolidation -> retracement -> paragraph + key callout + Q3, Q4
// [x] consolidation->reversal "look" = trap, then AMD reversal pattern -> warning callout + Q10
// [x] expansion -> retracement returns to OB/FVG for continuation -> allowed-path callout + Q8
// [x] AMD = accumulation/manipulation/distribution; accumulation = consolidation -> paragraph + som-amd chart + Q5, Q6
// [x] cannot reverse straight from a range; manipulate (sweep) first -> paragraph + som-amd chart + Q7
// [x] retracement = a pullback -> intro list + Q9
// [x] the cycle diagram he draws -> som-cycle guided chart
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "states-of-the-market",
  moduleSlug: "part-1",
  title: { en: "States of the Market", tl: "States of the Market" },
  summary: {
    en: "The four states price moves through, the transitions that are allowed (and the ones that are traps), and how they map to accumulation, manipulation, and distribution.",
    tl: "Ang apat na estado ng paggalaw ng presyo, ang mga transition na pwede (at ang mga trap), at paano sila tumutugma sa accumulation, manipulation, at distribution.",
  },
  estMinutes: 9,
  sourceFile: "Part 1/Part 1 Lesson 1 - States of the Market.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "States of the market is one of the foundations you should memorize. Price is always doing one of four things, and knowing which state it is in tells you what can happen next and what cannot.",
        tl: "Isa sa mga pundasyon na dapat itatak ang states of the market. Lagi lang apat na bagay ang ginagawa ng presyo, at kapag alam mo kung anong estado siya, alam mo kung ano ang pwedeng mangyari at kung ano ang hindi.",
      },
    },
    {
      kind: "heading",
      text: { en: "The four states", tl: "Ang apat na estado" },
    },
    {
      kind: "list",
      items: [
        {
          en: "Consolidation: price moves sideways in a range, building orders. This is the accumulation phase.",
          tl: "Consolidation: pa-gilid ang presyo sa loob ng range, nag-iipon ng orders. Ito ang accumulation phase.",
        },
        {
          en: "Expansion: a strong, directional move out of the range.",
          tl: "Expansion: malakas at may direksyong move palabas ng range.",
        },
        {
          en: "Retracement: a pullback against the expansion, usually back to an order block or fair value gap.",
          tl: "Retracement: pullback kontra sa expansion, kadalasang balik sa order block o fair value gap.",
        },
        {
          en: "Reversal: price changes direction, ending the previous move.",
          tl: "Reversal: nagbabago ng direksyon ang presyo, tapos na ang naunang move.",
        },
      ],
    },
    {
      kind: "heading",
      level: 3,
      text: { en: "What price can and cannot do", tl: "Ano ang pwede at hindi pwede ng presyo" },
    },
    {
      kind: "paragraph",
      text: {
        en: "Price always goes from a consolidation to an expansion first. From an expansion it can move to a retracement, a reversal, or back into a consolidation. The key rule: price can NEVER go straight from a consolidation to a reversal, and never straight from a consolidation to a retracement. Those moves only come after an expansion.",
        tl: "Laging mula consolidation papuntang expansion muna ang presyo. Mula sa expansion, pwede siyang pumunta sa retracement, reversal, o balik sa consolidation. Ang importanteng rule: HINDI pwedeng diretso mula consolidation papuntang reversal, at hindi rin diretso mula consolidation papuntang retracement. Pagkatapos lang ng expansion nangyayari ang mga iyon.",
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "The allowed path", tl: "Ang pinapayagang daan" },
      text: {
        en: "Consolidation leads to expansion. After an expansion you get a retracement (continuation) or a reversal. A retracement that holds returns to an OB or FVG, then price expands again.",
        tl: "Consolidation papuntang expansion. Pagkatapos ng expansion, may retracement (continuation) o reversal. Ang retracement na humawak ay babalik sa OB o FVG, tapos mag-eexpand ulit ang presyo.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "som-cycle",
        title: { en: "The cycle: consolidation, expansion, retracement, reversal", tl: "Ang cycle: consolidation, expansion, retracement, reversal" },
        height: 380,
        candles: [
          { o: 100, h: 102, l: 99, c: 101 },
          { o: 101, h: 103, l: 99, c: 100 },
          { o: 100, h: 102, l: 98, c: 101 },
          { o: 101, h: 103, l: 100, c: 102 },
          { o: 102, h: 112, l: 101, c: 111 },
          { o: 111, h: 122, l: 110, c: 121 },
          { o: 121, h: 123, l: 114, c: 116 },
          { o: 116, h: 118, l: 112, c: 114 },
          { o: 114, h: 126, l: 113, c: 124 },
          { o: 124, h: 134, l: 123, c: 132 },
          { o: 132, h: 135, l: 126, c: 128 },
          { o: 128, h: 129, l: 118, c: 120 },
          { o: 120, h: 121, l: 110, c: 112 },
          { o: 112, h: 114, l: 104, c: 106 },
        ],
        annotations: [
          { type: "label", index: 1, price: 95, text: { en: "Consolidation", tl: "Consolidation" }, tone: "neutral", appearAtStep: 0 },
          { type: "label", index: 5, price: 127, text: { en: "Expansion", tl: "Expansion" }, tone: "bull", appearAtStep: 1 },
          { type: "label", index: 7, price: 108, text: { en: "Retracement", tl: "Retracement" }, tone: "neutral", appearAtStep: 2 },
          { type: "label", index: 9, price: 139, text: { en: "Expansion", tl: "Expansion" }, tone: "bull", appearAtStep: 3 },
          { type: "line", kind: "level", price: 112, from: 7, to: 12, tone: "bear", dashed: true, label: { en: "Last higher low", tl: "Huling higher low" }, labelPlacement: "center", appearAtStep: 4 },
          { type: "marker", kind: "mss", index: 12, price: 112, tone: "bear", label: { en: "MSS", tl: "MSS" }, appearAtStep: 4 },
          { type: "label", index: 11, price: 138, text: { en: "Reversal", tl: "Reversal" }, tone: "bear", appearAtStep: 4 },
        ],
        steps: [
          {
            caption: { en: "Look at these first candles. They barely move and overlap each other in a tight sideways band. Price is resting and undecided. We call this a CONSOLIDATION.", tl: "Tingnan ang unang candles. Halos hindi gumagalaw at nag-o-overlap sa makitid na sideways band. Nagpapahinga at undecided ang price. Tinatawag itong CONSOLIDATION." },
            tip: { en: "Highs and lows are about equal and the candles overlap: no clear staircase up or down.", tl: "Halos pantay ang highs at lows at nag-o-overlap ang candles: walang malinaw na hagdan pataas o pababa." },
            revealCandles: 4,
          },
          {
            caption: { en: "Now strong, tall candles push UP and break out of the band. This fast, one-direction move is an EXPANSION.", tl: "Ngayon, malalakas at matataas na candles ang tumutulak PATAAS at lumalabas sa band. Itong mabilis at isang-direksyong galaw ay EXPANSION." },
            tip: { en: "One or more long candle bodies leave the range in the same direction.", tl: "Isa o higit pang mahahabang body ng candle ang umaalis sa range sa parehong direksyon." },
            revealCandles: 6,
          },
          {
            caption: { en: "Price pulls back DOWN a little against the up-move, but does not fully turn around. This pause is a RETRACEMENT (a pullback). It usually returns to a zone, then price continues up.", tl: "Bahagyang bumaba ang price kontra sa pataas na galaw, pero hindi tuluyang lumiko. Itong pahinga ay RETRACEMENT (pullback). Kadalasan bumabalik sa isang zone, tapos tuloy pataas ulit." },
            tip: { en: "A few smaller candles drift against the trend without breaking the previous low.", tl: "Iilang mas maliliit na candles na pasalungat sa trend na hindi binabasag ang nakaraang low." },
            revealCandles: 8,
          },
          {
            caption: { en: "Price expands UP again and makes a higher high. The up-move continues, so that retracement was only a pause.", tl: "Mag-eexpand PATAAS ulit ang price at gagawa ng mas mataas na high. Tuloy ang pataas, kaya pahinga lang pala ang retracement na iyon." },
            tip: { en: "Price makes a new high above the previous high.", tl: "Gumagawa ang price ng bagong high na mas mataas sa nakaraang high." },
            revealCandles: 10,
          },
          {
            caption: { en: "Finally price turns and breaks DOWN through the last higher low (the dashed line). Remember the MSS, the Market Structure Shift, from the earlier lesson? This break is exactly that, and it is what confirms a REVERSAL. Notice it only happened AFTER an expansion, never straight out of the first range.", tl: "Sa huli, lumiko ang price at bumaba lampas sa huling higher low (ang putol-putol na linya). Tandaan ang MSS, ang Market Structure Shift, mula sa naunang lesson? Ito mismo iyon, at ito ang nagkukumpirma ng REVERSAL. Pansinin: pagkatapos lang ng expansion ito nangyari, hindi diretso mula sa unang range." },
            tip: { en: "Price closes below the last higher low, the level that had been holding the up-trend up.", tl: "Nag-close ang price below sa huling higher low, ang level na humahawak sa pataas na trend." },
            revealCandles: 14,
          },
        ],
        caption: {
          en: "Recap: consolidation, then expansion, a retracement (pause), expansion again, then a reversal. Price never jumps straight from a range to a reversal.",
          tl: "Recap: consolidation, tapos expansion, retracement (pahinga), expansion ulit, tapos reversal. Hindi diretso tumatalon ang price mula range papuntang reversal.",
        },
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "The consolidation-to-reversal trap", tl: "Ang trap na consolidation papuntang reversal" },
      text: {
        en: "When price looks like it is going straight from a consolidation into a reversal, treat it as a trap. A real turn comes with an AMD reversal pattern: price manipulates first (a liquidity sweep) before it distributes the other way.",
        tl: "Kapag mukhang diretso ang presyo mula consolidation papuntang reversal, ituring mo itong trap. Ang totoong liko ay may AMD reversal pattern: nagma-manipulate muna ang presyo (liquidity sweep) bago siya mag-distribute pakabila.",
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "AMD is accumulation, manipulation, and distribution. The accumulation is the consolidation. Price cannot reverse straight out of it: first it manipulates, usually by sweeping the liquidity just outside the range, and only then does it distribute into the new direction.",
        tl: "Ang AMD ay accumulation, manipulation, at distribution. Ang accumulation ay ang consolidation. Hindi pwedeng diretsong mag-reverse mula rito: nagma-manipulate muna, kadalasan sa pag-sweep ng liquidity sa labas ng range, saka lang siya mag-di-distribute papunta sa bagong direksyon.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "som-amd",
        title: { en: "AMD: accumulation, manipulation, distribution", tl: "AMD: accumulation, manipulation, distribution" },
        height: 360,
        candles: [
          { o: 102, h: 104, l: 100, c: 103 },
          { o: 103, h: 105, l: 100, c: 101 },
          { o: 101, h: 104, l: 99, c: 102 },
          { o: 102, h: 105, l: 100, c: 103 },
          { o: 103, h: 104, l: 95, c: 98 },
          { o: 98, h: 108, l: 97, c: 106 },
          { o: 106, h: 118, l: 105, c: 116 },
          { o: 116, h: 126, l: 115, c: 124 },
        ],
        annotations: [
          { type: "label", index: 1, price: 110, text: { en: "Accumulation", tl: "Accumulation" }, tone: "neutral", appearAtStep: 0 },
          { type: "line", kind: "liquidity", price: 100, from: 0, to: 4, tone: "gold", dashed: true, label: { en: "SSL", tl: "SSL" }, appearAtStep: 0 },
          { type: "label", index: 4, price: 90, text: { en: "Manipulation", tl: "Manipulation" }, tone: "bear", appearAtStep: 1 },
          { type: "label", index: 6, price: 122, text: { en: "Distribution", tl: "Distribution" }, tone: "bull", appearAtStep: 2 },
        ],
        steps: [
          {
            caption: { en: "First, price moves sideways in a range, building up orders. This is ACCUMULATION, the same thing as a consolidation. The matching lows line up into a level. Remember liquidity from the earlier lesson? That level is sell-side liquidity (SSL): a pool of stop orders resting just under the range.", tl: "Una, pa-gilid ang price sa range, nag-iipon ng orders. Ito ang ACCUMULATION, kapareho ng consolidation. Pumapantay ang lows at bumubuo ng level. Tandaan ang liquidity sa naunang lesson? Ang level na iyon ay sell-side liquidity (SSL): pool ng stop orders sa ilalim ng range." },
            tip: { en: "Two or more lows lining up at the same price = a liquidity level (SSL).", tl: "Dalawa o higit pang lows na pumapantay sa parehong presyo = liquidity level (SSL)." },
            revealCandles: 4,
          },
          {
            caption: { en: "Watch the next candle stab BELOW the range and the SSL line, then close back up inside. This fake-out is MANIPULATION: it grabs the orders sitting below before the real move.", tl: "Bantayan ang susunod na candle na tumutusok sa ILALIM ng range at ng SSL line, tapos nag-close pabalik sa loob. Itong pekeng galaw ay MANIPULATION: kinukuha nito ang orders sa ibaba bago ang totoong galaw." },
            tip: { en: "A candle pokes below the level (a long lower wick / sweep), then closes back inside the range.", tl: "May candle na tumutusok pababa sa level (mahabang lower wick / sweep), tapos nag-close pabalik sa loob ng range." },
            revealCandles: 5,
          },
          {
            caption: { en: "Now price drives UP and away from the range. This is DISTRIBUTION, the real expansion. This accumulation, manipulation, distribution order is exactly why a turn never comes straight out of a range: the sweep has to happen first.", tl: "Ngayon, tumutulak PATAAS ang price palayo sa range. Ito ang DISTRIBUTION, ang totoong expansion. Ang pagkakasunod na accumulation, manipulation, distribution ang dahilan kaya hindi diretso ang liko mula sa range: kailangan munang mangyari ang sweep." },
            tip: { en: "A strong, one-direction move away from the range, right after the sweep.", tl: "Malakas at isang-direksyong galaw palayo sa range, kaagad pagkatapos ng sweep." },
            revealCandles: 8,
          },
        ],
        caption: {
          en: "Recap: accumulation (range), manipulation (sweep of the SSL below), then distribution (the real move up). The sweep is why a reversal never comes straight from a consolidation.",
          tl: "Recap: accumulation (range), manipulation (sweep ng SSL sa ibaba), tapos distribution (ang totoong galaw pataas). Ang sweep ang dahilan kaya hindi diretso ang reversal mula consolidation.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "Four states: consolidation, expansion, retracement, reversal. Consolidation always leads to expansion. A reversal or retracement only comes after an expansion, never straight from a range. A turn out of a range needs a manipulation (sweep) first.",
        tl: "Apat na estado: consolidation, expansion, retracement, reversal. Lagi papuntang expansion ang consolidation. Ang reversal o retracement ay pagkatapos lang ng expansion, hindi diretso mula sa range. Ang liko palabas ng range ay kailangan ng manipulation (sweep) muna.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "How many states of the market are there?",
        tl: "Ilan ang states of the market?",
      },
      options: [
        { id: "a", text: { en: "Two", tl: "Dalawa" } },
        { id: "b", text: { en: "Three", tl: "Tatlo" } },
        { id: "c", text: { en: "Four", tl: "Apat" } },
        { id: "d", text: { en: "Five", tl: "Lima" } },
      ],
      correctOptionId: "c",
      explanation: {
        en: "Four: consolidation, expansion, retracement, and reversal.",
        tl: "Apat: consolidation, expansion, retracement, at reversal.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "Price always moves from a consolidation to which state next?",
        tl: "Mula consolidation, papuntang anong estado lagi ang presyo?",
      },
      options: [
        { id: "a", text: { en: "Reversal", tl: "Reversal" } },
        { id: "b", text: { en: "Expansion", tl: "Expansion" } },
        { id: "c", text: { en: "Retracement", tl: "Retracement" } },
        { id: "d", text: { en: "Another consolidation", tl: "Ibang consolidation" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "A consolidation always leads to an expansion first.",
        tl: "Laging papuntang expansion muna ang consolidation.",
      },
    },
    {
      id: "q3",
      type: "truefalse",
      prompt: {
        en: "Price can move directly from a consolidation into a reversal.",
        tl: "Pwedeng diretso ang presyo mula consolidation papuntang reversal.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "No. A reversal only comes after an expansion; straight from a range it is a trap.",
        tl: "Hindi. Pagkatapos lang ng expansion ang reversal; kung diretso mula range, trap iyon.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "Which transition is NOT allowed?",
        tl: "Aling transition ang HINDI pinapayagan?",
      },
      options: [
        { id: "a", text: { en: "Consolidation to expansion", tl: "Consolidation papuntang expansion" } },
        { id: "b", text: { en: "Expansion to retracement", tl: "Expansion papuntang retracement" } },
        { id: "c", text: { en: "Consolidation to retracement", tl: "Consolidation papuntang retracement" } },
        { id: "d", text: { en: "Expansion to consolidation", tl: "Expansion papuntang consolidation" } },
      ],
      correctOptionId: "c",
      explanation: {
        en: "Price never goes straight from a consolidation to a retracement (or a reversal).",
        tl: "Hindi kailanman diretso ang presyo mula consolidation papuntang retracement (o reversal).",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "What does AMD stand for?",
        tl: "Ano ang ibig sabihin ng AMD?",
      },
      options: [
        { id: "a", text: { en: "Average, Median, Deviation", tl: "Average, Median, Deviation" } },
        { id: "b", text: { en: "Accumulation, Manipulation, Distribution", tl: "Accumulation, Manipulation, Distribution" } },
        { id: "c", text: { en: "Accumulation, Momentum, Direction", tl: "Accumulation, Momentum, Direction" } },
        { id: "d", text: { en: "Advance, Mark-up, Decline", tl: "Advance, Mark-up, Decline" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "AMD = accumulation, manipulation, distribution.",
        tl: "AMD = accumulation, manipulation, distribution.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "In AMD, the accumulation phase is the same as which market state?",
        tl: "Sa AMD, ang accumulation phase ay katumbas ng anong market state?",
      },
      options: [
        { id: "a", text: { en: "Expansion", tl: "Expansion" } },
        { id: "b", text: { en: "Retracement", tl: "Retracement" } },
        { id: "c", text: { en: "Consolidation", tl: "Consolidation" } },
        { id: "d", text: { en: "Reversal", tl: "Reversal" } },
      ],
      correctOptionId: "c",
      explanation: {
        en: "Accumulation is the consolidation (the range where orders build).",
        tl: "Ang accumulation ay ang consolidation (ang range kung saan nag-iipon ng orders).",
      },
    },
    {
      id: "q7",
      type: "truefalse",
      prompt: {
        en: "Before price can reverse out of a range, it usually manipulates first by sweeping liquidity.",
        tl: "Bago mag-reverse ang presyo palabas ng range, kadalasang nagma-manipulate muna ito sa pag-sweep ng liquidity.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. The manipulation (a liquidity sweep) comes before distribution into the new direction.",
        tl: "Oo. Nauuna ang manipulation (liquidity sweep) bago ang distribution papunta sa bagong direksyon.",
      },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: {
        en: "After an expansion, a retracement usually returns to what, before continuing?",
        tl: "Pagkatapos ng expansion, saan kadalasang bumabalik ang retracement bago magpatuloy?",
      },
      options: [
        { id: "a", text: { en: "A round number", tl: "Isang round number" } },
        { id: "b", text: { en: "An order block or fair value gap", tl: "Isang order block o fair value gap" } },
        { id: "c", text: { en: "A moving average", tl: "Isang moving average" } },
        { id: "d", text: { en: "The session open", tl: "Ang session open" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "A continuation retracement returns to an OB or FVG, then price expands again.",
        tl: "Ang continuation retracement ay babalik sa OB o FVG, tapos mag-eexpand ulit ang presyo.",
      },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: {
        en: "A retracement is best described as…",
        tl: "Ang retracement ay pinakamahusay na ilarawan bilang…",
      },
      options: [
        { id: "a", text: { en: "A full change of direction", tl: "Buong pagbabago ng direksyon" } },
        { id: "b", text: { en: "A pullback against the expansion", tl: "Pullback kontra sa expansion" } },
        { id: "c", text: { en: "A sideways range", tl: "Pa-gilid na range" } },
        { id: "d", text: { en: "A news spike", tl: "Spike dahil sa balita" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "A retracement is a pullback within the move, not a reversal.",
        tl: "Ang retracement ay pullback sa loob ng move, hindi reversal.",
      },
    },
    {
      id: "q10",
      type: "truefalse",
      prompt: {
        en: "A move that appears to go consolidation to reversal with no manipulation should be trusted as a clean reversal.",
        tl: "Ang move na mukhang consolidation papuntang reversal na walang manipulation ay dapat pagkatiwalaan bilang malinis na reversal.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. That pattern is a trap; a genuine turn shows an AMD reversal (manipulation first).",
        tl: "Mali. Trap ang pattern na iyon; ang totoong liko ay may AMD reversal (manipulation muna).",
      },
    },
  ],
};
