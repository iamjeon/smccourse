// Source: Part 2/Part 2 Lesson 2 - Generated Liquidity.txt (verified: matches title)
// COVERAGE (source: Part 2/Part 2 Lesson 2 - Generated Liquidity.txt) — every point mapped:
// [x] generated liquidity = algorithm engineers liquidity to attract traders' stops, then takes them out -> intro + key callout + Q1, Q2
// [x] examples/methods of generated liquidity: consolidation, equal highs/lows, LRLR -> types list + Q3
// [x] consolidation = no trend, sideways/equal market -> gl-consolidation chart step0 + Q4
// [x] equal highs and equal lows (BSL above / SSL below) -> gl-consolidation chart step1,2 + Q5
// [x] LRLR (low resistance liquidity run): smooth one-direction run, the counter-swings are failure swings -> LRLR callout + Q6
// [x] failure swing = price fails to take out the previous high (or low) -> LRLR callout + Q7
// [x] HRLR (high resistance liquidity run): price takes out the previous high/low each leg (grinds through liquidity) -> HRLR callout + Q8
// [x] usage: after a HTF PDRA is hit, target the LRLR / equal lows; move is fast (high volatility) because the target is strong -> gl-target chart + Q9
// [x] worked examples (hit the high then drop to LRLR; MSS re-entry at OB then target LRLR) -> gl-target chart steps + how-pros list
// [x] only trade within the order flow; do not target counter-trend; wait for LTF confirmation after the POI/PDRA is hit -> warning callout + Q10
// [x] bearish vs bullish application (look for LRLR/entry on the correct side, targets ahead in the trend) -> how-pros list
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "generated-liquidity",
  moduleSlug: "part-2",
  title: { en: "Generated Liquidity", tl: "Generated Liquidity" },
  summary: {
    en: "Smart Money engineers liquidity on purpose to trap traders' stop orders, then takes it out. Learn the forms it takes (consolidation, equal highs and lows, and liquidity runs), the difference between a low- and high-resistance run, and how pros use these pools as targets.",
    tl: "Sadyang gumagawa ang Smart Money ng liquidity para ma-trap ang stop orders ng mga trader, tapos kukunin ito. Matutunan ang mga anyo nito (consolidation, equal highs at lows, at liquidity runs), ang pagkakaiba ng low- at high-resistance run, at paano ginagamit ng mga pro ang mga pool na ito bilang target.",
  },
  estMinutes: 11,
  sourceFile: "Part 2/Part 2 Lesson 2 - Generated Liquidity.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "When the algorithm engineers liquidity in the market on purpose, we call it generated liquidity. It is created to attract traders into placing their stop orders there, so the algorithm can later take those orders out and fuel its move. Remember liquidity from the earlier lesson? Those resting stop orders are the fuel. Generated liquidity is Smart Money deliberately building a fresh pool of that fuel.",
        tl: "Kapag sadyang gumagawa ang algorithm ng liquidity sa market, tinatawag natin itong generated liquidity. Ginagawa ito para akitin ang mga trader na maglagay ng stop orders doon, para sa bandang huli ay makuha ng algorithm ang mga order na iyon at gawing gatong ng galaw nito. Tandaan ang liquidity sa naunang lesson? Ang mga nakahimpil na stop orders ang gatong. Ang generated liquidity ay sinadyang paggawa ng Smart Money ng bagong pool ng gatong na iyon.",
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "The whole idea in one line", tl: "Ang buong ideya sa isang linya" },
      text: {
        en: "Generated liquidity = liquidity the algorithm builds on purpose, to lure stop orders it plans to take out.",
        tl: "Generated liquidity = liquidity na sinadyang gawin ng algorithm, para akitin ang stop orders na balak nitong kunin.",
      },
    },
    {
      kind: "heading",
      text: { en: "The forms generated liquidity takes", tl: "Mga anyo ng generated liquidity" },
    },
    {
      kind: "list",
      items: [
        {
          en: "Consolidation: a sideways, non-trending range where the highs and lows sit at about the same level.",
          tl: "Consolidation: pa-gilid at hindi-trending na range kung saan halos pantay ang highs at lows.",
        },
        {
          en: "Equal highs and equal lows: matching highs (buy-side liquidity, BSL, above) and matching lows (sell-side liquidity, SSL, below).",
          tl: "Equal highs at equal lows: magkapantay na highs (buy-side liquidity, BSL, sa itaas) at magkapantay na lows (sell-side liquidity, SSL, sa ibaba).",
        },
        {
          en: "Liquidity runs: a low resistance liquidity run (LRLR) or a high resistance liquidity run (HRLR), explained below.",
          tl: "Liquidity runs: low resistance liquidity run (LRLR) o high resistance liquidity run (HRLR), ipapaliwanag sa ibaba.",
        },
      ],
    },
    {
      kind: "chart",
      spec: {
        id: "gl-consolidation",
        title: { en: "Consolidation builds equal highs and lows", tl: "Ang consolidation ay gumagawa ng equal highs at lows" },
        height: 360,
        candles: [
          { o: 102, h: 110, l: 101, c: 104 },
          { o: 104, h: 109, l: 100, c: 103 },
          { o: 103, h: 110, l: 101, c: 105 },
          { o: 105, h: 109, l: 100, c: 104 },
          { o: 104, h: 110, l: 101, c: 106 },
        ],
        annotations: [
          { type: "line", kind: "liquidity", price: 110, from: 0, to: 4, tone: "gold", dashed: true, label: { en: "Equal highs (BSL)", tl: "Equal highs (BSL)" }, labelPlacement: "center", appearAtStep: 1 },
          { type: "line", kind: "liquidity", price: 100, from: 0, to: 4, tone: "gold", dashed: true, label: { en: "Equal lows (SSL)", tl: "Equal lows (SSL)" }, labelPlacement: "center", appearAtStep: 1 },
        ],
        steps: [
          {
            caption: { en: "Price moves sideways. There is no trend here, just candles bouncing inside the same band. This is a consolidation, the simplest kind of generated liquidity.", tl: "Pa-gilid ang presyo. Walang trend dito, candles lang na tumatalbog sa loob ng parehong band. Ito ay consolidation, ang pinakasimpleng uri ng generated liquidity." },
            tip: { en: "Overlapping candles with no clear staircase up or down = consolidation.", tl: "Mga nag-o-overlap na candle na walang malinaw na hagdan = consolidation." },
            revealCandles: 3,
          },
          {
            caption: { en: "Notice the highs all stop at the same line, and the lows all stop at the same line. These are equal highs and equal lows.", tl: "Pansinin na ang mga high ay huminto lahat sa parehong linya, at ang mga low ay huminto lahat sa parehong linya. Ito ang equal highs at equal lows." },
            tip: { en: "Two or more highs (or lows) touching one price = an equal-highs (or equal-lows) level.", tl: "Dalawa o higit pang highs (o lows) na tumama sa iisang presyo = equal-highs (o equal-lows) level." },
            revealCandles: 5,
          },
          {
            caption: { en: "Those equal levels are generated liquidity. Above sits buy-side liquidity (BSL); below sits sell-side liquidity (SSL). Traders pile their stops just past these lines, and that is exactly the fuel the algorithm engineered to grab.", tl: "Ang mga pantay na level na iyon ay generated liquidity. Sa itaas ay buy-side liquidity (BSL); sa ibaba ay sell-side liquidity (SSL). Nagsusunod ang mga trader ng stops lampas sa mga linyang ito, at iyon mismo ang gatong na inengineer ng algorithm para kunin." },
            tip: { en: "BSL above equal highs, SSL below equal lows: that is where stops (the fuel) sit.", tl: "BSL sa itaas ng equal highs, SSL sa ilalim ng equal lows: doon naroon ang stops (ang gatong)." },
            revealCandles: 5,
          },
        ],
        caption: {
          en: "Consolidation parks equal highs (BSL) and equal lows (SSL). These engineered pools become the algorithm's targets.",
          tl: "Ang consolidation ay nag-iiwan ng equal highs (BSL) at equal lows (SSL). Ang mga inengineer na pool na ito ang nagiging target ng algorithm.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Low resistance liquidity run (LRLR)", tl: "Low resistance liquidity run (LRLR)" },
      text: {
        en: "An LRLR is a smooth, one-direction run. The pullbacks against the trend are failure swings: they fail to take out the previous low (in an up-run) or the previous high (in a down-run). Because almost nothing resists it, the run glides, and the liquidity it leaves behind becomes a strong target.",
        tl: "Ang LRLR ay maayos at isang-direksyong run. Ang mga pullback laban sa trend ay failure swings: hindi nila nakukuha ang nakaraang low (sa up-run) o nakaraang high (sa down-run). Dahil halos walang humaharang dito, gumagliding ang run, at ang liquidity na naiiwan nito ay nagiging malakas na target.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "What is a failure swing?", tl: "Ano ang failure swing?" },
      text: {
        en: "A failure swing is a swing that fails to take out the previous high or the previous low. In an up-trending LRLR, each pullback low fails to break the prior low, so the trend just keeps going.",
        tl: "Ang failure swing ay isang swing na hindi nakukuha ang nakaraang high o nakaraang low. Sa up-trending na LRLR, ang bawat pullback low ay hindi nababasag ang naunang low, kaya tuloy-tuloy lang ang trend.",
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "High resistance liquidity run (HRLR)", tl: "High resistance liquidity run (HRLR)" },
      text: {
        en: "An HRLR is the opposite: price takes out the previous high (or low) on every leg before it can continue. It grinds through liquidity, so it is slower and choppier. Bullish HRLR takes out liquidity before going higher; bearish HRLR takes out the previous high before going lower.",
        tl: "Ang HRLR ay kabaligtaran: kinukuha ng presyo ang nakaraang high (o low) sa bawat leg bago ito makapagpatuloy. Dumadaan ito sa liquidity, kaya mas mabagal at magulo. Ang bullish HRLR ay kumukuha ng liquidity bago umakyat; ang bearish HRLR ay kumukuha ng nakaraang high bago bumaba.",
      },
    },
    {
      kind: "heading",
      text: { en: "How pros use it: liquidity as a target", tl: "Paano ginagamit ng pro: liquidity bilang target" },
    },
    {
      kind: "paragraph",
      text: {
        en: "The play is simple. On the higher timeframe, wait for price to hit a higher-timeframe PDRA (an order block or FVG). Once it is hit, find your entry, and target the resting liquidity on the other side: an LRLR or a set of equal lows/highs. Because that liquidity is a strong magnet, the move into it is often fast, with high volatility.",
        tl: "Simple lang ang laro. Sa higher timeframe, hintayin na tamaan ng presyo ang isang higher-timeframe PDRA (order block o FVG). Kapag natamaan, hanapin ang entry, at i-target ang nakahimpil na liquidity sa kabilang panig: isang LRLR o set ng equal lows/highs. Dahil malakas na magnet ang liquidity na iyon, ang galaw papunta rito ay kadalasang mabilis, may mataas na volatility.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "gl-target",
        title: { en: "PDRA hit, then a fast run to the LRLR target", tl: "Tamaan ang PDRA, tapos mabilis na run papunta sa LRLR target" },
        height: 380,
        candles: [
          { o: 100, h: 106, l: 99, c: 105 },
          { o: 105, h: 113, l: 104, c: 112 },
          { o: 109, h: 109, l: 103, c: 104 },
          { o: 104, h: 111, l: 104, c: 110 },
          { o: 110, h: 111, l: 100, c: 101 },
          { o: 101, h: 102, l: 92, c: 93 },
          { o: 93, h: 94, l: 86, c: 88 },
          { o: 88, h: 89, l: 86, c: 87 },
        ],
        annotations: [
          { type: "box", kind: "ob", from: 3, to: 3, top: 110, bottom: 104, tone: "bear", label: { en: "Supply OB (PDRA)", tl: "Supply OB (PDRA)" }, appearAtStep: 0 },
          { type: "label", index: 3, price: 115, text: { en: "HTF PDRA hit", tl: "HTF PDRA hit" }, tone: "bear", appearAtStep: 0 },
          { type: "line", kind: "liquidity", price: 86, from: 0, to: 7, tone: "gold", dashed: true, label: { en: "LRLR / equal lows (target)", tl: "LRLR / equal lows (target)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "mss", index: 4, price: 100, tone: "bear", label: { en: "MSS", tl: "MSS" }, appearAtStep: 1 },
          { type: "label", index: 5, price: 99, text: { en: "Fast drop", tl: "Mabilis na bagsak" }, tone: "bear", appearAtStep: 2 },
          { type: "marker", kind: "tp", index: 7, price: 86, tone: "bear", label: { en: "Target hit", tl: "Tinamaan ang target" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Price rallies up and taps a higher-timeframe supply PDRA, a bearish order block, then gets rejected. Down at the bottom is resting liquidity (an LRLR / equal lows). That is the target we expect price to run to.", tl: "Umakyat ang presyo at tinamaan ang higher-timeframe supply PDRA, isang bearish order block, tapos na-reject. Sa ibaba ay may nakahimpil na liquidity (isang LRLR / equal lows). Iyon ang target na inaasahan nating tatakbuhan ng presyo." },
            tip: { en: "Price reacting down off a supply OB = the PDRA was hit. Look for the liquidity it can target below.", tl: "Pag bumaba ang presyo mula sa supply OB = natamaan ang PDRA. Hanapin ang liquidity na pwede nitong target sa ibaba." },
            revealCandles: 4,
          },
          {
            caption: { en: "Price breaks the last short-term low. Remember the MSS from the earlier lessons? This Market Structure Shift down confirms sellers are in control.", tl: "Binasag ng presyo ang huling short-term low. Tandaan ang MSS mula sa naunang lessons? Itong Market Structure Shift pababa ang nagkukumpirma na hawak ng sellers ang kontrol." },
            tip: { en: "A close below the last swing low = bearish MSS = bias confirmed down.", tl: "Pag nag-close below sa huling swing low = bearish MSS = kumpirmadong pababa ang bias." },
            revealCandles: 5,
          },
          {
            caption: { en: "Now price drops fast. There is little in the way, a low-resistance run, so volatility picks up as it heads for the target.", tl: "Ngayon mabilis na bumaba ang presyo. Kakaunti ang humaharang, isang low-resistance run, kaya tumataas ang volatility habang papunta sa target." },
            tip: { en: "A fast, clean one-direction drop = a low-resistance run toward strong liquidity.", tl: "Mabilis at malinis na isang-direksyong bagsak = low-resistance run papunta sa malakas na liquidity." },
            revealCandles: 6,
          },
          {
            caption: { en: "Price runs straight into the LRLR / equal lows and takes the liquidity. A strong target like this is exactly why the move was so quick.", tl: "Tumakbo nang diretso ang presyo papunta sa LRLR / equal lows at kinuha ang liquidity. Ang malakas na target na ito ang dahilan kung bakit napakabilis ng galaw." },
            tip: { en: "Price reaching the equal lows = the generated liquidity was taken, the target is met.", tl: "Pag-abot ng presyo sa equal lows = nakuha ang generated liquidity, natamaan ang target." },
            revealCandles: 8,
          },
        ],
        caption: {
          en: "A higher-timeframe PDRA gets hit, then price runs fast to the LRLR / equal lows. Liquidity is the target.",
          tl: "Natamaan ang higher-timeframe PDRA, tapos mabilis na tumakbo ang presyo papunta sa LRLR / equal lows. Liquidity ang target.",
        },
      },
    },
    {
      kind: "list",
      items: [
        {
          en: "Bullish order flow: after a higher-timeframe PDRA is hit, look for your entry inside the lower timeframe, then target the LRLR / equal highs above. Keep entries WITH the trend.",
          tl: "Bullish order flow: pagkatapos tamaan ang higher-timeframe PDRA, hanapin ang entry sa loob ng lower timeframe, tapos i-target ang LRLR / equal highs sa itaas. Panatilihing KASAMA ng trend ang entries.",
        },
        {
          en: "Bearish order flow: same idea flipped. Find your entry, then target the LRLR / equal lows below.",
          tl: "Bearish order flow: parehong ideya, binaliktad. Hanapin ang entry, tapos i-target ang LRLR / equal lows sa ibaba.",
        },
        {
          en: "Always wait for confirmation on the lower timeframe (an MSS) once the POI or higher-timeframe PDRA is hit, before entering.",
          tl: "Laging hintayin ang confirmation sa lower timeframe (isang MSS) kapag natamaan ang POI o higher-timeframe PDRA, bago pumasok.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Trade with the order flow, not against it", tl: "Mag-trade kasama ang order flow, hindi laban" },
      text: {
        en: "Only target liquidity that lies in the direction of the order flow. Entering counter-trend, chasing liquidity against the flow, has a much lower probability of working. Keep your entries within the trend.",
        tl: "I-target lamang ang liquidity na nasa direksyon ng order flow. Ang pagpasok nang counter-trend, paghabol sa liquidity laban sa flow, ay mababa ang tsansang gumana. Panatilihing nasa loob ng trend ang iyong entries.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "Generated liquidity is engineered on purpose to trap stops. It appears as consolidation, equal highs/lows, and liquidity runs. An LRLR glides (failure swings); an HRLR grinds (takes out each high/low). Pros wait for a PDRA to be hit, then target the LRLR / equal levels in the order-flow direction, where the move is usually fast.",
        tl: "Ang generated liquidity ay sinadyang gawin para ma-trap ang stops. Lumalabas ito bilang consolidation, equal highs/lows, at liquidity runs. Ang LRLR ay gumagliding (failure swings); ang HRLR ay naggiling (kinukuha ang bawat high/low). Hinihintay ng pro na matamaan ang PDRA, tapos i-target ang LRLR / equal levels sa direksyon ng order flow, kung saan kadalasang mabilis ang galaw.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "What is generated liquidity?",
        tl: "Ano ang generated liquidity?",
      },
      options: [
        { id: "a", text: { en: "Liquidity the algorithm engineers on purpose to attract and later take out stop orders", tl: "Liquidity na sinadyang gawin ng algorithm para akitin at kunin ang stop orders" } },
        { id: "b", text: { en: "Money a broker lends you", tl: "Pera na pinapahiram ng broker" } },
        { id: "c", text: { en: "A type of moving average", tl: "Isang uri ng moving average" } },
        { id: "d", text: { en: "The spread on a pair", tl: "Ang spread sa isang pair" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "It is liquidity built deliberately to lure traders' stops, which the algorithm plans to take out.",
        tl: "Ito ay liquidity na sinadyang gawin para akitin ang stops ng mga trader, na balak kunin ng algorithm.",
      },
    },
    {
      id: "q2",
      type: "truefalse",
      prompt: {
        en: "Generated liquidity is created to attract stop orders that the algorithm later takes out.",
        tl: "Ginagawa ang generated liquidity para akitin ang stop orders na kukunin ng algorithm sa bandang huli.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. That is the whole purpose: lure the stops, then take them to fuel the move.",
        tl: "Oo. Iyon ang buong layunin: akitin ang stops, tapos kunin para gawing gatong ng galaw.",
      },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: {
        en: "Which of these is a form of generated liquidity?",
        tl: "Alin sa mga ito ang anyo ng generated liquidity?",
      },
      options: [
        { id: "a", text: { en: "A consolidation with equal highs and lows", tl: "Consolidation na may equal highs at lows" } },
        { id: "b", text: { en: "A news headline", tl: "Isang news headline" } },
        { id: "c", text: { en: "The broker's commission", tl: "Ang komisyon ng broker" } },
        { id: "d", text: { en: "A round-number price", tl: "Isang round-number na presyo" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Consolidation, equal highs/lows, and liquidity runs are all forms of generated liquidity.",
        tl: "Ang consolidation, equal highs/lows, at liquidity runs ay lahat anyo ng generated liquidity.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "A consolidation is best described as…",
        tl: "Ang consolidation ay pinakamahusay ilarawan bilang…",
      },
      options: [
        { id: "a", text: { en: "A strong trending move", tl: "Malakas na trending move" } },
        { id: "b", text: { en: "A sideways, non-trending range with roughly equal highs and lows", tl: "Pa-gilid at hindi-trending na range na halos pantay ang highs at lows" } },
        { id: "c", text: { en: "A single huge candle", tl: "Isang malaking candle" } },
        { id: "d", text: { en: "A gap on the chart", tl: "Isang gap sa chart" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Consolidation is sideways price with no trend, leaving equal highs and lows.",
        tl: "Ang consolidation ay pa-gilid na presyo na walang trend, nag-iiwan ng equal highs at lows.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "Equal highs hold which type of liquidity?",
        tl: "Ang equal highs ay may anong uri ng liquidity?",
      },
      options: [
        { id: "a", text: { en: "Buy-side liquidity (BSL), above price", tl: "Buy-side liquidity (BSL), sa itaas ng presyo" } },
        { id: "b", text: { en: "Sell-side liquidity (SSL), below price", tl: "Sell-side liquidity (SSL), sa ilalim ng presyo" } },
        { id: "c", text: { en: "No liquidity at all", tl: "Walang liquidity" } },
        { id: "d", text: { en: "Only broker liquidity", tl: "Liquidity lang ng broker" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Equal highs rest above price and hold buy-side liquidity (BSL). Equal lows hold SSL below.",
        tl: "Ang equal highs ay nasa itaas ng presyo at may buy-side liquidity (BSL). Ang equal lows ay may SSL sa ibaba.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "In a low resistance liquidity run (LRLR), the counter-trend pullbacks are…",
        tl: "Sa low resistance liquidity run (LRLR), ang mga counter-trend pullback ay…",
      },
      options: [
        { id: "a", text: { en: "Failure swings that do not take out the previous swing", tl: "Failure swings na hindi kinukuha ang nakaraang swing" } },
        { id: "b", text: { en: "Always reversals", tl: "Palaging reversal" } },
        { id: "c", text: { en: "Gaps", tl: "Mga gap" } },
        { id: "d", text: { en: "Consolidations", tl: "Mga consolidation" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "An LRLR glides because its pullbacks are failure swings; nothing resists the run.",
        tl: "Gumagliding ang LRLR dahil failure swings ang mga pullback nito; walang humaharang sa run.",
      },
    },
    {
      id: "q7",
      type: "truefalse",
      prompt: {
        en: "A failure swing is a swing that fails to take out the previous high or low.",
        tl: "Ang failure swing ay isang swing na hindi nakukuha ang nakaraang high o low.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. It fails to break the prior swing, so the trend simply continues.",
        tl: "Oo. Hindi nito nababasag ang naunang swing, kaya tuloy-tuloy lang ang trend.",
      },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: {
        en: "How is a high resistance liquidity run (HRLR) different from an LRLR?",
        tl: "Paano naiiba ang high resistance liquidity run (HRLR) sa LRLR?",
      },
      options: [
        { id: "a", text: { en: "It takes out the previous high or low on each leg, grinding through liquidity", tl: "Kinukuha nito ang nakaraang high o low sa bawat leg, dumadaan sa liquidity" } },
        { id: "b", text: { en: "It never moves price", tl: "Hindi nito ginagalaw ang presyo" } },
        { id: "c", text: { en: "It only happens on weekends", tl: "Nangyayari lang tuwing weekend" } },
        { id: "d", text: { en: "It is the same thing as an LRLR", tl: "Pareho lang ito ng LRLR" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "An HRLR grinds: it takes out the previous high/low each leg, so it is slower and choppier than an LRLR.",
        tl: "Naggiling ang HRLR: kinukuha ang nakaraang high/low kada leg, kaya mas mabagal at magulo kaysa LRLR.",
      },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: {
        en: "After a higher-timeframe PDRA is hit, what do pros target?",
        tl: "Pagkatapos matamaan ang higher-timeframe PDRA, ano ang tinatarget ng mga pro?",
      },
      options: [
        { id: "a", text: { en: "The resting liquidity (LRLR / equal highs or lows) in the order-flow direction", tl: "Ang nakahimpil na liquidity (LRLR / equal highs o lows) sa direksyon ng order flow" } },
        { id: "b", text: { en: "The middle of the candle", tl: "Ang gitna ng candle" } },
        { id: "c", text: { en: "A random price", tl: "Isang random na presyo" } },
        { id: "d", text: { en: "Nothing, they close the chart", tl: "Wala, isinasara nila ang chart" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The resting liquidity is the target, and the move into it is often fast because that liquidity is a strong magnet.",
        tl: "Ang nakahimpil na liquidity ang target, at kadalasang mabilis ang galaw papunta rito dahil malakas itong magnet.",
      },
    },
    {
      id: "q10",
      type: "truefalse",
      prompt: {
        en: "It is fine to target liquidity against the order flow as long as it is close.",
        tl: "Okay lang i-target ang liquidity laban sa order flow basta't malapit lang.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. Counter-trend entries are lower probability; keep entries and targets within the order flow.",
        tl: "Mali. Mababa ang probability ng counter-trend entries; panatilihing nasa loob ng order flow ang entries at targets.",
      },
    },
  ],
};
