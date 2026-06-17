// Source: Part 4/Part 4 Lesson 3 - Previous Day High & Low Model.txt (verified: matches title)
// COVERAGE (source: Part 4/Part 4 Lesson 3 - Previous Day High & Low Model.txt) — every point mapped:
// [x] the model is a reference for entries off the previous day's high and low -> intro + Q1
// [x] entries on M5; higher timeframes are 1H and daily -> rules list + Q2
// [x] entries inside the London or New York kill zone (Asian kill zone is fine for AUD/NZD/JPY pairs) -> rules list + killzone callout + Q3, Q8
// [x] use any PDRA for entry: FVG, inversion, breaker (or a combination); the 50% Fibonacci adds confluence -> rules list + tools note + Q5
// [x] mark the previous day high/low; once an extreme is taken out, wait for a reversal (an MSS); if it just continues (no MSS) the model does not apply -> pd-bull chart + pd-invalid chart + continuation callout + Q6, Q10
// [x] bullish: PD low taken -> MSS up -> entry -> target the PD high -> pd-bull chart steps + Q7
// [x] bearish: PD high taken -> MSS down -> entry -> target the PD low (mirror) -> bearish callout + Q7
// [x] STH-ITH-STH formation; SL at the protected ITH/ITL -> structure callout + pd-bull chart step2 + Q9
// [x] kill zone is critical; wait for it even if the pattern forms early -> killzone callout + Q8
// [x] trading is a game of probability; no 100% strategy; follow the rules for good psychology -> psychology callout + Q4
// [x] targets: the opposite previous-day extreme, or a fixed 1:2 / 1:3 -> targets note + Q7
// [x] worked examples (M5 previous-day levels, GBPUSD breaker + FVG + 50%, bullish PD-low reversal) -> how-pros list
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "previous-day-model",
  moduleSlug: "part-4",
  title: { en: "Previous Day High & Low Model", tl: "Previous Day High & Low Model" },
  summary: {
    en: "Mark yesterday's high and low. When price takes one out and then shows an MSS reversal inside a kill zone, you enter at a PDRA on M5 and target the opposite previous-day extreme. If there is no MSS, it is a continuation and the model does not apply.",
    tl: "Markahan ang high at low kahapon. Kapag kinuha ng presyo ang isa tapos nagpakita ng MSS reversal sa loob ng kill zone, pumapasok ka sa PDRA sa M5 at tinatarget ang kabilang previous-day extreme. Kung walang MSS, continuation iyon at hindi applicable ang model.",
  },
  estMinutes: 12,
  sourceFile: "Part 4/Part 4 Lesson 3 - Previous Day High & Low Model.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "This model uses the previous day's high and low as your reference for entries. When price takes out one of them and reverses, you have a clean, repeatable trade toward the other side. It is a sibling of the Asian Session model, just anchored to the previous day instead of the Asian range.",
        tl: "Ginagamit ng model na ito ang high at low ng nakaraang araw bilang reference para sa entries. Kapag kinuha ng presyo ang isa sa mga ito at nag-reverse, may malinis at paulit-ulit kang trade papunta sa kabilang panig. Kapatid ito ng Asian Session model, naka-anchor lang sa nakaraang araw imbes na sa Asian range.",
      },
    },
    {
      kind: "list",
      items: [
        { en: "Entries on M5. Your higher timeframes are the 1-hour and the daily.", tl: "Entries sa M5. Ang higher timeframes mo ay ang 1-hour at ang daily." },
        { en: "Entries inside the London or New York kill zone. For AUD, NZD, and JPY pairs, the Asian kill zone is also fine.", tl: "Entries sa loob ng London o New York kill zone. Para sa AUD, NZD, at JPY pairs, okay rin ang Asian kill zone." },
        { en: "Use any PDRA for entry: an FVG, an inversion FVG, a breaker, or a combination. The 50% Fibonacci adds confluence.", tl: "Gamitin ang anumang PDRA para sa entry: FVG, inversion FVG, breaker, o kombinasyon. Nagdadagdag ng confluence ang 50% Fibonacci." },
      ],
    },
    {
      kind: "heading",
      text: { en: "A reversal from the previous day low", tl: "Reversal mula sa previous day low" },
    },
    {
      kind: "chart",
      spec: {
        id: "pd-bull",
        title: { en: "Take the PD low, reverse, target the PD high", tl: "Kunin ang PD low, mag-reverse, target ang PD high" },
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
          { type: "line", kind: "level", price: 98, from: 0, to: 3, tone: "neutral", dashed: true, label: { en: "Previous day low", tl: "Previous day low" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "line", kind: "level", price: 118, from: 0, to: 10, tone: "bull", dashed: true, label: { en: "Previous day high (target)", tl: "Previous day high (target)" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 3, price: 93, tone: "bull", label: { en: "Sweep PD low", tl: "Sweep PD low" }, appearAtStep: 0 },
          { type: "marker", kind: "mss", index: 4, price: 109, tone: "bull", label: { en: "MSS", tl: "MSS" }, appearAtStep: 1 },
          { type: "box", kind: "fvg", from: 3, to: 5, bottom: 101, top: 103, tone: "bull", label: { en: "FVG entry (~50%)", tl: "FVG entry (~50%)" }, appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 6, price: 101, tone: "bull", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "marker", kind: "sl", index: 3, price: 93, tone: "bull", label: { en: "SL below PD low", tl: "SL below PD low" }, appearAtStep: 2 },
          { type: "label", index: 9, price: 112, text: { en: "Expansion", tl: "Expansion" }, tone: "bull", appearAtStep: 3 },
          { type: "marker", kind: "tp", index: 10, price: 118, tone: "bull", label: { en: "PD high hit", tl: "PD high hit" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Mark the previous day high and low. Price trades down and sweeps the previous day low, taking the liquidity below it. This model only works if a reversal follows.", tl: "Markahan ang previous day high at low. Bumababa ang presyo at sinisweep ang previous day low, kinukuha ang liquidity sa ilalim nito. Gumagana lang ang model na ito kung may sumusunod na reversal." },
            tip: { en: "A poke below the previous day low = the sweep.", tl: "Pagtusok sa ilalim ng previous day low = ang sweep." },
            revealCandles: 4,
          },
          {
            caption: { en: "An MSS up confirms the reversal. This is the green light. Without an MSS it is just a continuation, and then the model does not apply.", tl: "Isang MSS pataas ang nagkukumpirma ng reversal. Ito ang green light. Kung walang MSS, continuation lang iyon, at hindi applicable ang model." },
            tip: { en: "No MSS up = no reversal = do not trade this model.", tl: "Walang MSS pataas = walang reversal = huwag i-trade ang model na ito." },
            revealCandles: 5,
          },
          {
            caption: { en: "Enter at a PDRA, an FVG, breaker, or the 50% Fibonacci, inside the London or New York kill zone, with the stop below the previous day low.", tl: "Pumasok sa PDRA, FVG, breaker, o sa 50% Fibonacci, sa loob ng London o New York kill zone, na ang stop ay sa ilalim ng previous day low." },
            tip: { en: "Enter at the FVG / 50%; hide the stop below the protected low.", tl: "Pumasok sa FVG / 50%; itago ang stop sa ilalim ng protected low." },
            revealCandles: 7,
          },
          {
            caption: { en: "Price expands up to the previous day high, your target. You can also bank a fixed 1:2 or 1:3.", tl: "Nag-eexpand pataas ang presyo papunta sa previous day high, ang target mo. Pwede ring kumuha ng fixed 1:2 o 1:3." },
            tip: { en: "Target the opposite previous-day extreme, or a fixed 1:2 / 1:3.", tl: "I-target ang kabilang previous-day extreme, o fixed 1:2 / 1:3." },
            revealCandles: 11,
          },
        ],
        caption: {
          en: "Sweep the previous day low, MSS up, enter at the FVG / 50% in the kill zone, target the previous day high.",
          tl: "I-sweep ang previous day low, MSS pataas, pumasok sa FVG / 50% sa kill zone, target ang previous day high.",
        },
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "No MSS? It is a continuation, not a trade", tl: "Walang MSS? Continuation iyon, hindi trade" },
      text: {
        en: "Sometimes price takes out the previous day low and just keeps falling. With no MSS reversal, the model does not apply. Do not enter, you would be trading into a continuation. Wait for the MSS, or skip the trade.",
        tl: "Minsan kinukuha ng presyo ang previous day low tapos tuloy lang bumababa. Kung walang MSS reversal, hindi applicable ang model. Huwag pumasok, papasok ka sa continuation. Hintayin ang MSS, o laktawan ang trade.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "pd-invalid",
        title: { en: "When the model does NOT apply", tl: "Kapag HINDI applicable ang model" },
        height: 320,
        candles: [
          { o: 110, h: 111, l: 104, c: 105 },
          { o: 105, h: 106, l: 99, c: 100 },
          { o: 100, h: 101, l: 96, c: 97 },
          { o: 97, h: 98, l: 91, c: 92 },
          { o: 92, h: 93, l: 86, c: 87 },
          { o: 87, h: 88, l: 82, c: 83 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 98, from: 0, to: 5, tone: "neutral", dashed: true, label: { en: "Previous day low", tl: "Previous day low" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 2, price: 95, tone: "bear", label: { en: "Swept, but...", tl: "Na-sweep, pero..." }, appearAtStep: 1 },
          { type: "label", index: 4, price: 92, text: { en: "No MSS up", tl: "Walang MSS up" }, tone: "bear", appearAtStep: 2 },
        ],
        steps: [
          {
            caption: { en: "Price reaches and sweeps the previous day low, just like before.", tl: "Inaabot at sinisweep ng presyo ang previous day low, gaya ng dati." },
            tip: { en: "Same start: the previous day low is taken.", tl: "Parehong simula: nakuha ang previous day low." },
            revealCandles: 3,
          },
          {
            caption: { en: "But there is no MSS up. Price just keeps falling. This is a continuation, not a reversal.", tl: "Pero walang MSS pataas. Tuloy lang bumababa ang presyo. Continuation ito, hindi reversal." },
            tip: { en: "Lower lows with no up-break = continuation.", tl: "Lower lows na walang up-break = continuation." },
            revealCandles: 4,
          },
          {
            caption: { en: "With no MSS, the model does not apply. Do not enter long here. Wait for an MSS, or leave the trade alone.", tl: "Kung walang MSS, hindi applicable ang model. Huwag pumasok ng long dito. Hintayin ang MSS, o iwanan ang trade." },
            tip: { en: "No MSS, no trade. Protect your account by waiting.", tl: "Walang MSS, walang trade. Protektahan ang account sa paghihintay." },
            revealCandles: 6,
          },
        ],
        caption: {
          en: "Taking the previous day low is not enough. Without an MSS reversal, it is a continuation and you stand aside.",
          tl: "Hindi sapat ang pagkuha sa previous day low. Kung walang MSS reversal, continuation iyon at tumabi ka.",
        },
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Enter only in the kill zone", tl: "Pumasok lang sa kill zone" },
      text: {
        en: "The strategy is useless if you enter at the wrong time. Even if the STH-ITH-STH pattern forms early, do not enter until you are inside the kill zone (London or New York; Asian for AUD/NZD/JPY). Outside the kill zone, price often just keeps drifting and the PDRAs are not respected.",
        tl: "Walang silbi ang strategy kung pumasok ka sa maling oras. Kahit maaga mabuo ang STH-ITH-STH pattern, huwag pumasok hangga't wala ka sa loob ng kill zone (London o New York; Asian para sa AUD/NZD/JPY). Sa labas ng kill zone, madalas tuloy lang ang presyo at hindi nire-respeto ang mga PDRA.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Structure and stops", tl: "Structure at stops" },
      text: {
        en: "After the MSS, wait for the short-term high, intermediate-term high, short-term high (or the low version) to form, then enter on the pattern. Place the stop beyond the protected intermediate-term high or low.",
        tl: "Pagkatapos ng MSS, hintayin na mabuo ang short-term high, intermediate-term high, short-term high (o ang low na bersyon), tapos pumasok sa pattern. Ilagay ang stop lampas sa protected intermediate-term high o low.",
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "The bearish version", tl: "Ang bearish na bersyon" },
      text: {
        en: "It is the mirror. When price takes out the previous day high, wait for an MSS down (a break of the latest pullback from the highest high), then enter at an FVG, breaker, or the 50%, and target the previous day low. The stop sits above the protected high.",
        tl: "Ito ang kabaligtaran. Kapag kinuha ng presyo ang previous day high, hintayin ang MSS pababa (pagbasag sa pinakabagong pullback mula sa highest high), tapos pumasok sa FVG, breaker, o 50%, at i-target ang previous day low. Ang stop ay sa itaas ng protected high.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Trading is a game of probability", tl: "Ang trading ay laro ng probability" },
      text: {
        en: "No strategy wins 100% of the time. Some trades lose, even after an MSS, and that is normal. Your job is to follow the rules and target correctly. When you respect the rules, the losses are easier on your psychology, and over time, consistency comes from sticking to one model instead of jumping between strategies.",
        tl: "Walang strategy na nananalo 100% ng oras. May mga trade na natatalo, kahit pagkatapos ng MSS, at normal iyon. Ang trabaho mo ay sundin ang rules at mag-target nang tama. Kapag ginagalang mo ang rules, mas magaan sa psychology ang mga talo, at sa paglipas ng panahon, nanggagaling ang consistency sa pananatili sa isang model imbes na lumipat-lipat ng strategy.",
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
          en: "M5 example: the previous day high and low were marked. After a sweep, the entry waited for the kill zone, even though the pattern formed earlier, then ran to the previous day low.",
          tl: "M5 example: minarkahan ang previous day high at low. Pagkatapos ng sweep, naghintay ang entry sa kill zone, kahit naunang nabuo ang pattern, tapos tumakbo sa previous day low.",
        },
        {
          en: "GBPUSD (M5): after the high was taken, an MSS down confirmed, and the entry was the 50% Fibonacci, with a breaker and an FVG as PDRAs, targeting the previous day low.",
          tl: "GBPUSD (M5): pagkatapos kunin ang high, nagkumpirma ang MSS pababa, at ang entry ay ang 50% Fibonacci, na may breaker at FVG bilang PDRAs, tinarget ang previous day low.",
        },
        {
          en: "A bullish previous-day-low reversal: after the MSS up and the STL-ITL-STL, the entry was an anticipation in the kill zone, targeting the previous day high, with the stop at the protected intermediate-term low.",
          tl: "Isang bullish previous-day-low reversal: pagkatapos ng MSS pataas at ng STL-ITL-STL, ang entry ay anticipation sa kill zone, tinarget ang previous day high, na ang stop ay sa protected intermediate-term low.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "Mark the previous day high and low. When one is taken out AND an MSS reverses inside a kill zone, enter at a PDRA on M5 (FVG, inversion, breaker, or 50%), stop beyond the protected level, and target the opposite extreme. No MSS means continuation, so stand aside. Follow the rules, it is a game of probability.",
        tl: "Markahan ang previous day high at low. Kapag nakuha ang isa AT nag-reverse ang MSS sa loob ng kill zone, pumasok sa PDRA sa M5 (FVG, inversion, breaker, o 50%), stop lampas sa protected level, at i-target ang kabilang extreme. Walang MSS ibig sabihin continuation, kaya tumabi. Sundin ang rules, laro ito ng probability.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "What does this model use as its reference?",
        tl: "Ano ang ginagamit ng model na ito bilang reference?",
      },
      options: [
        { id: "a", text: { en: "The previous day's high and low", tl: "Ang high at low ng nakaraang araw" } },
        { id: "b", text: { en: "A moving average", tl: "Isang moving average" } },
        { id: "c", text: { en: "The yearly open", tl: "Ang yearly open" } },
        { id: "d", text: { en: "A random level", tl: "Isang random na level" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "It references the previous day's high and low for entries.",
        tl: "Ginagamit nito ang high at low ng nakaraang araw para sa entries.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "What is the entry timeframe?",
        tl: "Ano ang entry timeframe?",
      },
      options: [
        { id: "a", text: { en: "M5 (with 1H and daily as higher timeframes)", tl: "M5 (na may 1H at daily bilang higher timeframes)" } },
        { id: "b", text: { en: "The monthly", tl: "Ang monthly" } },
        { id: "c", text: { en: "The weekly only", tl: "Ang weekly lamang" } },
        { id: "d", text: { en: "Any timeframe", tl: "Kahit anong timeframe" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Entries are on M5; the higher timeframes are the 1-hour and the daily.",
        tl: "Ang entries ay sa M5; ang higher timeframes ay ang 1-hour at daily.",
      },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: {
        en: "When can you enter this model?",
        tl: "Kailan ka pwedeng pumasok sa model na ito?",
      },
      options: [
        { id: "a", text: { en: "Inside the London or New York kill zone (Asian for AUD/NZD/JPY)", tl: "Sa loob ng London o New York kill zone (Asian para sa AUD/NZD/JPY)" } },
        { id: "b", text: { en: "Any time of day", tl: "Kahit anong oras ng araw" } },
        { id: "c", text: { en: "Only on weekends", tl: "Tuwing weekend lamang" } },
        { id: "d", text: { en: "Only at midnight", tl: "Sa hatinggabi lamang" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Enter inside the London or New York kill zone; the Asian kill zone is fine for AUD/NZD/JPY pairs.",
        tl: "Pumasok sa loob ng London o New York kill zone; okay ang Asian kill zone para sa AUD/NZD/JPY pairs.",
      },
    },
    {
      id: "q4",
      type: "truefalse",
      prompt: {
        en: "There is a 100% winning strategy in trading if you follow this model exactly.",
        tl: "May 100% na panalong strategy sa trading kung susundin mo nang eksakto ang model na ito.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. Trading is a game of probability; no strategy wins every time. Follow the rules and target correctly.",
        tl: "Mali. Laro ng probability ang trading; walang strategy na laging nananalo. Sundin ang rules at mag-target nang tama.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "Which can you use for the entry PDRA?",
        tl: "Alin ang pwede mong gamitin para sa entry PDRA?",
      },
      options: [
        { id: "a", text: { en: "An FVG, inversion FVG, breaker, or the 50% Fibonacci", tl: "FVG, inversion FVG, breaker, o 50% Fibonacci" } },
        { id: "b", text: { en: "Only a moving average", tl: "Isang moving average lamang" } },
        { id: "c", text: { en: "Only a round number", tl: "Isang round number lamang" } },
        { id: "d", text: { en: "Nothing, you guess", tl: "Wala, hinuhulaan mo" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Use any PDRA, an FVG, inversion FVG, or breaker, and add the 50% Fibonacci as confluence.",
        tl: "Gamitin ang anumang PDRA, FVG, inversion FVG, o breaker, at idagdag ang 50% Fibonacci bilang confluence.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "After price takes the previous day low, what must happen for the model to apply?",
        tl: "Pagkatapos kunin ng presyo ang previous day low, ano ang dapat mangyari para maging applicable ang model?",
      },
      options: [
        { id: "a", text: { en: "An MSS up (a reversal)", tl: "Isang MSS pataas (reversal)" } },
        { id: "b", text: { en: "Nothing, just enter", tl: "Wala, pumasok lang" } },
        { id: "c", text: { en: "Price must keep falling", tl: "Dapat tuloy bumaba ang presyo" } },
        { id: "d", text: { en: "A news release", tl: "Isang news release" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "You need an MSS reversal. If price just continues with no MSS, the model does not apply.",
        tl: "Kailangan ng MSS reversal. Kung tuloy lang ang presyo na walang MSS, hindi applicable ang model.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "On a reversal from the previous day low, what is the target?",
        tl: "Sa reversal mula sa previous day low, ano ang target?",
      },
      options: [
        { id: "a", text: { en: "The previous day high (or a fixed 1:2 / 1:3)", tl: "Ang previous day high (o fixed 1:2 / 1:3)" } },
        { id: "b", text: { en: "An even lower low", tl: "Isang mas mababa pang low" } },
        { id: "c", text: { en: "The same previous day low", tl: "Ang parehong previous day low" } },
        { id: "d", text: { en: "No target", tl: "Walang target" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Target the opposite extreme, the previous day high, or bank a fixed 1:2 / 1:3.",
        tl: "I-target ang kabilang extreme, ang previous day high, o kumuha ng fixed 1:2 / 1:3.",
      },
    },
    {
      id: "q8",
      type: "truefalse",
      prompt: {
        en: "If the pattern forms before the kill zone, you should still wait for the kill zone to enter.",
        tl: "Kung nabuo ang pattern bago ang kill zone, dapat ka pa ring maghintay ng kill zone bago pumasok.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. The strategy is useless at the wrong time. Wait until you are inside the kill zone.",
        tl: "Oo. Walang silbi ang strategy sa maling oras. Maghintay hanggang nasa loob ka ng kill zone.",
      },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: {
        en: "Where does the stop loss go on a bullish entry?",
        tl: "Saan inilalagay ang stop loss sa bullish entry?",
      },
      options: [
        { id: "a", text: { en: "Below the protected low (the previous day low / ITL)", tl: "Sa ilalim ng protected low (ang previous day low / ITL)" } },
        { id: "b", text: { en: "Above the entry", tl: "Sa itaas ng entry" } },
        { id: "c", text: { en: "At the target", tl: "Sa target" } },
        { id: "d", text: { en: "There is no stop", tl: "Walang stop" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The stop goes below the protected low (the previous day low / intermediate-term low).",
        tl: "Ang stop ay sa ilalim ng protected low (ang previous day low / intermediate-term low).",
      },
    },
    {
      id: "q10",
      type: "truefalse",
      prompt: {
        en: "If price takes out the previous day low and just keeps falling with no MSS, you should still buy.",
        tl: "Kung kinuha ng presyo ang previous day low tapos tuloy bumaba nang walang MSS, dapat ka pa ring bumili.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. With no MSS it is a continuation; do not enter. Wait for the MSS or skip the trade.",
        tl: "Mali. Kung walang MSS, continuation iyon; huwag pumasok. Hintayin ang MSS o laktawan ang trade.",
      },
    },
  ],
};
