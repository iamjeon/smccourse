// Source: Part 2/Part 2 Lesson 6 - Standard Deviation Projection.txt (verified: matches title)
// COVERAGE (source: Part 2/Part 2 Lesson 6 - Standard Deviation Projection.txt) — every point mapped:
// [x] combines AMD / PO3 (power of three) with standard deviation projection -> intro + sdp-amd chart + Q1
// [x] AMD recap: accumulation, manipulation, distribution (callback to States of the Market) -> amd paragraph + sdp-amd chart + Q2
// [x] you can trade the manipulation but with a realistic target (~ -2) since it is against the trend; best entry is at distribution -> manipulation callout + Q3
// [x] sessions: accumulation = Asian, manipulation = London, distribution = New York (EURUSD/GBPUSD) -> sessions list + sdp-amd chart steps + Q4
// [x] candle/OHLC representation; bullish and bearish; distribution is clean and directional -> sdp-amd chart step2 + Q5
// [x] standard deviation projection: measure the manipulation leg (0 and 1), then project the targets -> sdp-project chart + Q6
// [x] targets: -2 is the first/main target; -2 to -2.5 is the safest take-profit; -3.5 (to -4) is the extended target; reversal area at -2/-2.5 and -3.5 -> sdp-project chart steps + targets callout + Q7, Q8
// [x] price reacts at -2: it may reverse or just retrace, sometimes pop up then continue to -3.5/-4 -> sdp-project chart step2 + Q8
// [x] measure from the highest high to the nearest VALID swing low (valid swing low = lower than the candle on its left and right; valid swing high = higher than both) -> valid-swing callout + sdp-project chart step1 + Q9
// [x] if the manipulation leg is large, drop to a lower timeframe (1 min) to measure it; usually measured on 5 min, often from the Asian range -> timeframe callout
// [x] a reversal at a projection level needs a confluent higher-timeframe PDRA -> confluence callout + Q10
// [x] combine with SMT and IRL/ERL top-down (the EURUSD vs GBPUSD worked trade, 2.79R) -> how-pros list
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "standard-deviation-projection",
  moduleSlug: "part-2",
  title: { en: "Standard Deviation Projection", tl: "Standard Deviation Projection" },
  summary: {
    en: "Standard deviation projection turns the manipulation leg of an AMD move into measured targets. Measure the leg, then project the standard deviations: -2 to -2.5 is your safest take-profit, -3.5 the extended one. Pair it with sessions, SMT, and a higher-timeframe PDRA.",
    tl: "Ginagawang sinukat na targets ng standard deviation projection ang manipulation leg ng isang AMD move. Sukatin ang leg, tapos i-project ang mga standard deviation: ang -2 hanggang -2.5 ang pinakaligtas na take-profit, ang -3.5 ang extended. Isama ito sa sessions, SMT, at higher-timeframe PDRA.",
  },
  estMinutes: 13,
  sourceFile: "Part 2/Part 2 Lesson 6 - Standard Deviation Projection.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "Standard deviation projection is a tool for measuring targets, and it works best combined with AMD, also called PO3 (the power of three): accumulation, manipulation, distribution. Remember AMD from the States of the Market lesson? Here we use it to find the leg we measure, then project where price is likely to go.",
        tl: "Ang standard deviation projection ay tool para sa pagsukat ng targets, at pinakamabisa ito kapag isinama sa AMD, tinatawag ding PO3 (power of three): accumulation, manipulation, distribution. Tandaan ang AMD mula sa States of the Market lesson? Dito natin ito ginagamit para hanapin ang leg na susukatin, tapos i-project kung saan malamang pupunta ang presyo.",
      },
    },
    {
      kind: "heading",
      text: { en: "AMD and the trading session", tl: "Ang AMD at ang trading session" },
    },
    {
      kind: "list",
      items: [
        { en: "Accumulation: price ranges sideways, building orders. On EURUSD/GBPUSD this usually happens in the Asian session.", tl: "Accumulation: pa-gilid ang presyo, nag-iipon ng orders. Sa EURUSD/GBPUSD kadalasang nangyayari ito sa Asian session." },
        { en: "Manipulation: price sweeps one side to grab liquidity. This usually happens in the London session.", tl: "Manipulation: sinisweep ng presyo ang isang panig para kumuha ng liquidity. Kadalasang nangyayari ito sa London session." },
        { en: "Distribution: the real, clean directional move. This is the New York session, and the best place to enter.", tl: "Distribution: ang totoo at malinis na may-direksyong galaw. Ito ang New York session, at ang pinakamagandang pasukan." },
      ],
    },
    {
      kind: "chart",
      spec: {
        id: "sdp-amd",
        title: { en: "AMD across the sessions (bearish PO3)", tl: "AMD sa mga session (bearish PO3)" },
        height: 360,
        candles: [
          { o: 100, h: 103, l: 99, c: 101 },
          { o: 101, h: 103, l: 98, c: 100 },
          { o: 100, h: 103, l: 98, c: 101 },
          { o: 101, h: 109, l: 100, c: 103 },
          { o: 103, h: 110, l: 102, c: 104 },
          { o: 104, h: 105, l: 95, c: 96 },
          { o: 96, h: 97, l: 88, c: 89 },
          { o: 89, h: 90, l: 82, c: 83 },
        ],
        annotations: [
          { type: "box", kind: "zone", from: 0, to: 2, top: 103, bottom: 98, tone: "zone", label: { en: "Accumulation (Asian)", tl: "Accumulation (Asian)" }, appearAtStep: 0 },
          { type: "line", kind: "liquidity", price: 103, from: 0, to: 4, tone: "gold", dashed: true, label: { en: "Buy-side liquidity", tl: "Buy-side liquidity" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 4, price: 110, tone: "bull", label: { en: "Manipulation (London)", tl: "Manipulation (London)" }, appearAtStep: 1 },
          { type: "label", index: 6, price: 94, text: { en: "Distribution (New York)", tl: "Distribution (New York)" }, tone: "bear", appearAtStep: 2 },
        ],
        steps: [
          {
            caption: { en: "First, price ranges sideways: accumulation. On EURUSD or GBPUSD this is usually the Asian session. This is the A in AMD from the earlier lesson, and it leaves buy-side liquidity at the equal highs.", tl: "Una, pa-gilid ang presyo: accumulation. Sa EURUSD o GBPUSD ito ang Asian session kadalasan. Ito ang A sa AMD mula sa naunang lesson, at nag-iiwan ng buy-side liquidity sa equal highs." },
            tip: { en: "A tight sideways range with equal highs = accumulation (the Asian range).", tl: "Makitid na sideways range na may equal highs = accumulation (ang Asian range)." },
            revealCandles: 3,
          },
          {
            caption: { en: "Then a manipulation: price sweeps above the range and grabs the buy-side liquidity. This usually happens in the London session. It is a fake-out against the real direction.", tl: "Tapos manipulation: sinisweep ng presyo ang itaas ng range at kinukuha ang buy-side liquidity. Kadalasang nangyayari ito sa London session. Pekeng galaw ito laban sa totoong direksyon." },
            tip: { en: "A poke above the range high that grabs liquidity = the manipulation.", tl: "Pagtusok lampas sa range high na kumukuha ng liquidity = ang manipulation." },
            revealCandles: 5,
          },
          {
            caption: { en: "Finally distribution: the real move, clean and directional, down. This is the New York session and the best place to enter. The whole AMD is one OHLC candle: open, the manipulation high, the distribution low, then close.", tl: "Sa huli, distribution: ang totoong galaw, malinis at may direksyon, pababa. Ito ang New York session at ang pinakamagandang pasukan. Ang buong AMD ay isang OHLC candle: open, ang manipulation high, ang distribution low, tapos close." },
            tip: { en: "A strong one-direction drop after the sweep = distribution, your entry leg.", tl: "Malakas na isang-direksyong bagsak pagkatapos ng sweep = distribution, ang entry leg mo." },
            revealCandles: 8,
          },
        ],
        caption: {
          en: "Accumulation (Asian), manipulation (London sweep), distribution (New York). The bullish version is the exact mirror.",
          tl: "Accumulation (Asian), manipulation (London sweep), distribution (New York). Ang bullish na bersyon ay eksaktong kabaligtaran.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Trading the manipulation vs the distribution", tl: "Pag-trade ng manipulation vs distribution" },
      text: {
        en: "You can trade the manipulation, but set a realistic target (around the -2 projection) because it is against the real direction. The best, cleanest entry is at the distribution, where price moves with the trend.",
        tl: "Pwede mong i-trade ang manipulation, pero maglagay ng realistic na target (mga -2 projection) dahil laban ito sa totoong direksyon. Ang pinakamaganda at pinakamalinis na entry ay sa distribution, kung saan kasama ng trend ang galaw ng presyo.",
      },
    },
    {
      kind: "heading",
      text: { en: "How to project the standard deviations", tl: "Paano i-project ang standard deviations" },
    },
    {
      kind: "paragraph",
      text: {
        en: "Measure the manipulation leg: place 0 at the highest high of the manipulation and 1.0 at the nearest valid swing low (for a bearish move). The tool then projects the deviations beyond the leg. The negative numbers are simply those projection levels in the distribution direction.",
        tl: "Sukatin ang manipulation leg: ilagay ang 0 sa pinakamataas na high ng manipulation at 1.0 sa pinakamalapit na valid swing low (para sa bearish move). Ipo-project ng tool ang mga deviation lampas sa leg. Ang mga negatibong numero ay ang mga projection level lang sa direksyon ng distribution.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "What is a valid swing?", tl: "Ano ang valid swing?" },
      text: {
        en: "A valid swing low has a candle on its left AND right that are both higher than it. A valid swing high has a candle on its left and right that are both lower than it. You measure from the highest high to the nearest valid swing low (or the lowest low to the nearest valid swing high).",
        tl: "Ang valid swing low ay may candle sa kaliwa AT kanan na parehong mas mataas dito. Ang valid swing high ay may candle sa kaliwa at kanan na parehong mas mababa dito. Sumusukat ka mula sa pinakamataas na high papunta sa pinakamalapit na valid swing low (o mula sa pinakamababang low papunta sa pinakamalapit na valid swing high).",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "sdp-project",
        title: { en: "Projecting targets from the manipulation leg", tl: "Pag-project ng targets mula sa manipulation leg" },
        height: 420,
        candles: [
          { o: 113, h: 116, l: 111, c: 112 },
          { o: 112, h: 116, l: 110, c: 114 },
          { o: 114, h: 122, l: 113, c: 115 },
          { o: 115, h: 116, l: 112, c: 113 },
          { o: 113, h: 114, l: 103, c: 104 },
          { o: 104, h: 105, l: 97, c: 98 },
          { o: 98, h: 103, l: 97, c: 102 },
          { o: 102, h: 103, l: 92, c: 93 },
          { o: 93, h: 94, l: 87, c: 88 },
          { o: 88, h: 90, l: 86, c: 89 },
        ],
        annotations: [
          { type: "marker", kind: "sweep", index: 2, price: 122, tone: "bull", label: { en: "Manipulation", tl: "Manipulation" }, appearAtStep: 0 },
          { type: "line", kind: "level", price: 122, from: 2, to: 9, tone: "gold", dashed: true, label: { en: "0 (manipulation high)", tl: "0 (manipulation high)" }, labelPlacement: "center", appearAtStep: 1 },
          { type: "line", kind: "level", price: 112, from: 3, to: 9, tone: "gold", dashed: true, label: { en: "1.0 (swing low)", tl: "1.0 (swing low)" }, labelPlacement: "center", appearAtStep: 1 },
          { type: "box", kind: "zone", from: 4, to: 9, top: 102, bottom: 97, tone: "zone", label: { en: "Safest TP: -2 to -2.5", tl: "Safest TP: -2 to -2.5" }, appearAtStep: 2 },
          { type: "label", index: 4, price: 108, text: { en: "Distribution", tl: "Distribution" }, tone: "bear", appearAtStep: 2 },
          { type: "line", kind: "level", price: 87, from: 5, to: 9, tone: "bear", dashed: true, label: { en: "-3.5 (extended target)", tl: "-3.5 (extended target)" }, labelPlacement: "center", appearAtStep: 3 },
          { type: "marker", kind: "tp", index: 8, price: 87, tone: "bear", label: { en: "Target", tl: "Target" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Accumulation, then a manipulation that sweeps the highs. The highest high of that manipulation is our top anchor.", tl: "Accumulation, tapos manipulation na sinisweep ang highs. Ang pinakamataas na high ng manipulation na iyon ang taas nating anchor." },
            tip: { en: "The peak of the manipulation sweep = where 0 goes.", tl: "Ang tuktok ng manipulation sweep = kung saan ilalagay ang 0." },
            revealCandles: 3,
          },
          {
            caption: { en: "Measure the leg: 0 at the highest high, 1.0 at the nearest valid swing low. That distance is one standard deviation, and the tool projects multiples of it downward.", tl: "Sukatin ang leg: 0 sa pinakamataas na high, 1.0 sa pinakamalapit na valid swing low. Ang distansyang iyon ay isang standard deviation, at ipo-project ng tool ang mga multiplo nito pababa." },
            tip: { en: "Anchor 0 to the high and 1.0 to the valid swing low. The leg length is your unit.", tl: "I-anchor ang 0 sa high at 1.0 sa valid swing low. Ang haba ng leg ang yunit mo." },
            revealCandles: 4,
          },
          {
            caption: { en: "Now project the deviations downward. The first and safest target zone is -2 to -2.5. Price distributes down and reacts there: it may reverse, or just retrace, sometimes popping up before continuing.", tl: "Ngayon i-project ang mga deviation pababa. Ang una at pinakaligtas na target zone ay -2 hanggang -2.5. Bumababa ang distribution at tumutugon doon: pwedeng mag-reverse, o mag-retrace lang, minsan pumapaitaas bago magpatuloy." },
            tip: { en: "-2 to -2.5 is your safe take-profit. Watch for a reaction when price reaches it.", tl: "Ang -2 hanggang -2.5 ang ligtas na take-profit. Bantayan ang reaksyon pag-abot ng presyo dito." },
            revealCandles: 6,
          },
          {
            caption: { en: "Here price pushes through, so the next target is -3.5 (down to -4). A reversal at any of these levels needs a higher-timeframe PDRA lining up for confluence.", tl: "Dito lumampas ang presyo, kaya ang susunod na target ay -3.5 (hanggang -4). Ang reversal sa alinmang level na ito ay kailangan ng higher-timeframe PDRA na nakahanay para sa confluence." },
            tip: { en: "If price ignores -2/-2.5, target -3.5. Always pair it with a HTF PDRA.", tl: "Kung balewalain ng presyo ang -2/-2.5, i-target ang -3.5. Laging isama ang HTF PDRA." },
            revealCandles: 10,
          },
        ],
        caption: {
          en: "Measure 0 to 1.0 on the manipulation leg, then project. -2 to -2.5 is the safe target; -3.5 is the extended one. Confirm with a higher-timeframe PDRA.",
          tl: "Sukatin ang 0 hanggang 1.0 sa manipulation leg, tapos i-project. Ang -2 hanggang -2.5 ang ligtas na target; ang -3.5 ang extended. Kumpirmahin gamit ang higher-timeframe PDRA.",
        },
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "The projection targets", tl: "Ang mga projection target" },
      text: {
        en: "First / main target: -2. Safest take-profit zone: -2 to -2.5 (this is usually enough). Extended target: -3.5, sometimes to -4. The areas of reversal are around -2/-2.5 and around -3.5.",
        tl: "Una / pangunahing target: -2. Pinakaligtas na take-profit zone: -2 hanggang -2.5 (kadalasan sapat na ito). Extended target: -3.5, minsan hanggang -4. Ang mga area ng reversal ay nasa paligid ng -2/-2.5 at sa paligid ng -3.5.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Pick the right timeframe to measure", tl: "Piliin ang tamang timeframe na susukatin" },
      text: {
        en: "Usually measure the manipulation leg on the 5-minute chart, often starting from the Asian range. If the manipulation leg is very large, drop to a lower timeframe (like 1 minute) to measure it cleanly, then come back up to manage the trade.",
        tl: "Kadalasan, sukatin ang manipulation leg sa 5-minute chart, madalas mula sa Asian range. Kung sobrang laki ng manipulation leg, bumaba sa mas mababang timeframe (gaya ng 1 minuto) para masukat nang malinis, tapos bumalik pataas para i-manage ang trade.",
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "A level alone is not a signal", tl: "Ang level lang ay hindi signal" },
      text: {
        en: "A projection level only matters when a higher-timeframe PDRA (an order block, breaker, or FVG) lines up with it. That confluence is what gives you the confidence to expect a reaction or reversal there.",
        tl: "Ang projection level ay may saysay lamang kapag may higher-timeframe PDRA (order block, breaker, o FVG) na nakahanay dito. Ang confluence na iyon ang nagbibigay sa iyo ng tiwala na umasa ng reaksyon o reversal doon.",
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
          en: "Top-down first: an SMT divergence between EURUSD and GBPUSD, plus a daily IRL-to-ERL draw, set the bearish bias.",
          tl: "Top-down muna: isang SMT divergence sa pagitan ng EURUSD at GBPUSD, kasama ang daily IRL-papuntang-ERL na draw, ang nagtakda ng bearish bias.",
        },
        {
          en: "A 4-hour order block (a breaker) was the confluent higher-timeframe PDRA. After price mitigated it, they looked for entries down.",
          tl: "Isang 4-hour order block (breaker) ang naging confluent higher-timeframe PDRA. Pagkatapos i-mitigate ito ng presyo, naghanap sila ng entries pababa.",
        },
        {
          en: "They measured the manipulation leg, targeted the -2 to -2.5 area (aligned with the Asian high), and the trade paid 2.79R.",
          tl: "Sinukat nila ang manipulation leg, tinarget ang -2 hanggang -2.5 na area (nakahanay sa Asian high), at nagbayad ang trade ng 2.79R.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "Standard deviation projection measures the manipulation leg of an AMD move (accumulation = Asian, manipulation = London, distribution = New York) and projects targets. Set 0 at the high and 1.0 at the valid swing low. The -2 to -2.5 zone is the safest take-profit; -3.5 is the extended target. Always require a higher-timeframe PDRA at the level, and combine it with SMT and IRL/ERL.",
        tl: "Sinusukat ng standard deviation projection ang manipulation leg ng AMD move (accumulation = Asian, manipulation = London, distribution = New York) at ipo-project ang targets. Ilagay ang 0 sa high at 1.0 sa valid swing low. Ang -2 hanggang -2.5 na zone ang pinakaligtas na take-profit; ang -3.5 ang extended target. Laging humingi ng higher-timeframe PDRA sa level, at isama ito sa SMT at IRL/ERL.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "Standard deviation projection works best combined with what concept?",
        tl: "Ang standard deviation projection ay pinakamabisa kapag isinama sa anong konsepto?",
      },
      options: [
        { id: "a", text: { en: "AMD / PO3 (accumulation, manipulation, distribution)", tl: "AMD / PO3 (accumulation, manipulation, distribution)" } },
        { id: "b", text: { en: "Moving average crossovers", tl: "Moving average crossovers" } },
        { id: "c", text: { en: "Random entries", tl: "Random na entries" } },
        { id: "d", text: { en: "News trading only", tl: "News trading lamang" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "It is built on AMD (PO3): you measure the manipulation leg and project the targets.",
        tl: "Nakabase ito sa AMD (PO3): sinusukat mo ang manipulation leg at ipo-project ang targets.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "What does AMD stand for?",
        tl: "Ano ang ibig sabihin ng AMD?",
      },
      options: [
        { id: "a", text: { en: "Accumulation, Manipulation, Distribution", tl: "Accumulation, Manipulation, Distribution" } },
        { id: "b", text: { en: "Average, Median, Deviation", tl: "Average, Median, Deviation" } },
        { id: "c", text: { en: "Ask, Mid, Demand", tl: "Ask, Mid, Demand" } },
        { id: "d", text: { en: "Advance, Move, Decline", tl: "Advance, Move, Decline" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "AMD = accumulation, manipulation, distribution, the same concept from the States of the Market lesson.",
        tl: "AMD = accumulation, manipulation, distribution, ang parehong konsepto mula sa States of the Market lesson.",
      },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: {
        en: "Where is the best, cleanest place to enter?",
        tl: "Saan ang pinakamaganda at pinakamalinis na pasukan?",
      },
      options: [
        { id: "a", text: { en: "The distribution (with the trend)", tl: "Ang distribution (kasama ng trend)" } },
        { id: "b", text: { en: "The accumulation range", tl: "Ang accumulation range" } },
        { id: "c", text: { en: "The manipulation, always", tl: "Ang manipulation, palagi" } },
        { id: "d", text: { en: "Anywhere", tl: "Kahit saan" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The distribution is the cleanest entry. You can trade the manipulation, but only with a realistic target since it is against the trend.",
        tl: "Ang distribution ang pinakamalinis na entry. Pwede i-trade ang manipulation, pero may realistic na target lang dahil laban ito sa trend.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "On EURUSD/GBPUSD, which session usually holds the manipulation?",
        tl: "Sa EURUSD/GBPUSD, aling session kadalasang may manipulation?",
      },
      options: [
        { id: "a", text: { en: "London", tl: "London" } },
        { id: "b", text: { en: "Asian", tl: "Asian" } },
        { id: "c", text: { en: "New York", tl: "New York" } },
        { id: "d", text: { en: "Sydney only", tl: "Sydney lamang" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Accumulation is usually Asian, manipulation usually London, distribution usually New York.",
        tl: "Ang accumulation ay kadalasang Asian, manipulation kadalasang London, distribution kadalasang New York.",
      },
    },
    {
      id: "q5",
      type: "truefalse",
      prompt: {
        en: "The distribution leg is a clean, directional move.",
        tl: "Ang distribution leg ay malinis at may-direksyong galaw.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Distribution is the real, clean move, the opposite of the choppy accumulation.",
        tl: "Oo. Ang distribution ay ang totoo at malinis na galaw, kabaligtaran ng magulong accumulation.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "To project the standard deviations, you measure…",
        tl: "Para i-project ang standard deviations, sinusukat mo ang…",
      },
      options: [
        { id: "a", text: { en: "The manipulation leg (0 at the high, 1.0 at the valid swing low)", tl: "Ang manipulation leg (0 sa high, 1.0 sa valid swing low)" } },
        { id: "b", text: { en: "The whole day's range", tl: "Ang buong range ng araw" } },
        { id: "c", text: { en: "Two random candles", tl: "Dalawang random na candle" } },
        { id: "d", text: { en: "The spread", tl: "Ang spread" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Anchor 0 to the manipulation high and 1.0 to the nearest valid swing low; that leg is your unit.",
        tl: "I-anchor ang 0 sa manipulation high at 1.0 sa pinakamalapit na valid swing low; ang leg na iyon ang yunit mo.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "Which is the safest take-profit zone?",
        tl: "Alin ang pinakaligtas na take-profit zone?",
      },
      options: [
        { id: "a", text: { en: "-2 to -2.5", tl: "-2 hanggang -2.5" } },
        { id: "b", text: { en: "0 to 1.0", tl: "0 hanggang 1.0" } },
        { id: "c", text: { en: "-10", tl: "-10" } },
        { id: "d", text: { en: "+2", tl: "+2" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "-2 to -2.5 is the safest target and is usually enough. -3.5 (to -4) is the extended target.",
        tl: "Ang -2 hanggang -2.5 ang pinakaligtas na target at kadalasang sapat na. Ang -3.5 (hanggang -4) ang extended target.",
      },
    },
    {
      id: "q8",
      type: "truefalse",
      prompt: {
        en: "When price reaches the -2 zone, it may reverse or just retrace before continuing.",
        tl: "Pag-abot ng presyo sa -2 zone, pwedeng mag-reverse o mag-retrace lang bago magpatuloy.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Price reacts at -2: sometimes it reverses, sometimes it just retraces, then continues toward -3.5.",
        tl: "Oo. Tumutugon ang presyo sa -2: minsan nag-reverse, minsan nag-retrace lang, tapos tuloy papuntang -3.5.",
      },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: {
        en: "A valid swing low has…",
        tl: "Ang valid swing low ay may…",
      },
      options: [
        { id: "a", text: { en: "A higher candle on both its left and right", tl: "Mas mataas na candle sa kaliwa at kanan nito" } },
        { id: "b", text: { en: "A lower candle on both sides", tl: "Mas mababang candle sa magkabilang gilid" } },
        { id: "c", text: { en: "No candles around it", tl: "Walang candle sa paligid" } },
        { id: "d", text: { en: "Exactly equal candles on both sides", tl: "Eksaktong pantay na candle sa magkabilang gilid" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "A valid swing low is lower than the candle on its left AND right. (A valid swing high is higher than both.)",
        tl: "Ang valid swing low ay mas mababa sa candle sa kaliwa AT kanan nito. (Ang valid swing high ay mas mataas sa pareho.)",
      },
    },
    {
      id: "q10",
      type: "truefalse",
      prompt: {
        en: "A projection level is a reliable reversal spot even with no higher-timeframe PDRA there.",
        tl: "Ang projection level ay maaasahang reversal spot kahit walang higher-timeframe PDRA doon.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. A level only matters with a confluent higher-timeframe PDRA. The projection is confluence, not a stand-alone signal.",
        tl: "Mali. May saysay lang ang level kapag may confluent na higher-timeframe PDRA. Ang projection ay confluence, hindi nag-iisang signal.",
      },
    },
  ],
};
