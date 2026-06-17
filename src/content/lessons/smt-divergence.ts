// Source: Part 2/Part 2 Lesson 5 - SMT Divergence.txt (verified: matches title)
// COVERAGE (source: Part 2/Part 2 Lesson 5 - SMT Divergence.txt) — every point mapped:
// [x] SMT = confirmation tool to validate/invalidate a setup; shows smart money accumulation; look for the crack in correlation -> intro + key callout + Q1
// [x] SMT is additional confluence ONLY; useless without a higher-timeframe narrative/bias -> warning callout + Q2
// [x] top-down analysis: higher timeframe -> middle timeframe -> lower (entry) timeframe -> top-down list + Q3
// [x] correlated pairs (forex, indices, DXY); negative correlation example GBPUSD vs DXY (opposite directions) -> correlation list + negative callout + Q4
// [x] positive correlation examples (GBPUSD/EURUSD, NAS/DOW/S&P, BTC/ETH, AUDUSD/NZDUSD, JPY pairs) -> correlation list + how-pros list
// [x] stop hunt = takes out the level; failure swing = fails to take it out -> definitions + smt-a/smt-b charts + Q5, Q6
// [x] SMT exists when one pair stop-hunts and the other failure-swings; if both stop hunt there is no SMT -> divergence paragraph + warning callout + Q7
// [x] choose the failure-swing asset: bullish -> stronger (failure swing at the lows); bearish -> weaker (failure swing at the highs) -> which-asset callout + Q8, Q9
// [x] entry at FVG, breaker (after a stop hunt), or mitigation block (after a failure swing) -> smt-trade chart steps + entry callout
// [x] after SMT, price tends not to return to the recent leg; stops behind protected levels are safe; eventually breaks only after all PDRAs are violated -> protected callout + Q10
// [x] identify by eye, aligning swing highs/lows (crosshair); the indicator exists but is not accurate -> identify callout
// [x] practice tip: look for SMT only at first, it gets easier with reps -> practice callout
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "smt-divergence",
  moduleSlug: "part-2",
  title: { en: "SMT Divergence", tl: "SMT Divergence" },
  summary: {
    en: "SMT (Smart Money Technique) divergence compares two correlated assets. When one takes out a level (a stop hunt) and the other fails to (a failure swing), that crack in the correlation confirms your bias. It is extra confluence, never a stand-alone trade idea.",
    tl: "Inihahambing ng SMT (Smart Money Technique) divergence ang dalawang correlated na asset. Kapag ang isa ay kumuha ng level (stop hunt) at ang isa ay hindi (failure swing), ang biyak na iyon sa correlation ay nagkukumpirma ng iyong bias. Ito ay dagdag na confluence, hindi kailanman nag-iisang trade idea.",
  },
  estMinutes: 13,
  sourceFile: "Part 2/Part 2 Lesson 5 - SMT Divergence.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "SMT stands for Smart Money Technique. SMT divergence is a confirmation tool: it validates or invalidates a setup by showing real Smart Money accumulation in the price action. What you look for is the crack in the correlation between two closely related pairs. If they normally move together but suddenly disagree at a key level, that disagreement is your signal.",
        tl: "Ang SMT ay Smart Money Technique. Ang SMT divergence ay confirmation tool: kinukumpirma o pinapawalang-bisa nito ang isang setup sa pagpapakita ng tunay na Smart Money accumulation sa price action. Ang hinahanap mo ay ang biyak sa correlation ng dalawang malapit na magkaugnay na pair. Kung karaniwang magkasabay silang gumalaw pero biglang hindi nagkasundo sa isang mahalagang level, ang hindi pagkakasundong iyon ang signal mo.",
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Confluence only, never the idea by itself", tl: "Confluence lang, hindi mag-isang idea" },
      text: {
        en: "SMT is an additional confluence, not a trade idea on its own. Without a higher-timeframe narrative and bias to support it, SMT is a useless tool. First build your bias, then use SMT to check it.",
        tl: "Ang SMT ay dagdag na confluence, hindi nag-iisang trade idea. Kung walang higher-timeframe narrative at bias na sumusuporta rito, walang silbi ang SMT. Bumuo muna ng bias, tapos gamitin ang SMT para suriin ito.",
      },
    },
    {
      kind: "heading",
      text: { en: "Start with top-down analysis", tl: "Magsimula sa top-down analysis" },
    },
    {
      kind: "list",
      ordered: true,
      items: [
        { en: "Higher timeframe: the narrative and bias (where is price drawing to?).", tl: "Higher timeframe: ang narrative at bias (saan dumadraw ang presyo?)." },
        { en: "Middle timeframe: the structure that supports that bias.", tl: "Middle timeframe: ang structure na sumusuporta sa bias na iyon." },
        { en: "Lower timeframe: your entry, where SMT helps confirm the turn.", tl: "Lower timeframe: ang entry mo, kung saan tumutulong ang SMT kumpirmahin ang liko." },
      ],
    },
    {
      kind: "heading",
      text: { en: "Correlated pairs", tl: "Mga correlated na pair" },
    },
    {
      kind: "list",
      items: [
        {
          en: "Negative correlation: the two move opposite ways. Example, GBPUSD versus DXY (the dollar index): if GBPUSD rises, DXY falls, and the reverse.",
          tl: "Negative correlation: magkasalungat ang galaw. Halimbawa, GBPUSD versus DXY (ang dollar index): pag tumaas ang GBPUSD, bumababa ang DXY, at vice versa.",
        },
        {
          en: "Positive correlation: the two move the same way. Examples, GBPUSD and EURUSD, Nasdaq and Dow (or S&P), BTC and ETH, AUDUSD and NZDUSD, EURJPY and GBPJPY.",
          tl: "Positive correlation: magkasabay ang galaw. Halimbawa, GBPUSD at EURUSD, Nasdaq at Dow (o S&P), BTC at ETH, AUDUSD at NZDUSD, EURJPY at GBPJPY.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Negative correlation SMT", tl: "Negative correlation SMT" },
      text: {
        en: "With a negatively correlated pair, a valid SMT has one make a stop hunt while the other makes a failure swing on the matching side. Because they move opposite ways, the divergence shows up as one taking its level and the other refusing to.",
        tl: "Sa negatively correlated na pair, ang valid na SMT ay isang gagawa ng stop hunt habang ang isa ay gagawa ng failure swing sa katapat na panig. Dahil magkasalungat ang galaw, lumalabas ang divergence bilang isang kumukuha ng level at isang ayaw kumuha.",
      },
    },
    {
      kind: "heading",
      text: { en: "Stop hunt vs failure swing", tl: "Stop hunt vs failure swing" },
    },
    {
      kind: "paragraph",
      text: {
        en: "The whole technique rests on two simple ideas. A stop hunt is when price takes out a level (trades beyond a prior high or low, grabbing the liquidity there). A failure swing is when price fails to take that level out: it stops short. SMT appears when, between two correlated assets, one stop hunts and the other makes a failure swing. Compare the two charts below.",
        tl: "Ang buong teknik ay nakasalalay sa dalawang simpleng ideya. Ang stop hunt ay kapag kinuha ng presyo ang isang level (nag-trade lampas sa naunang high o low, kinukuha ang liquidity doon). Ang failure swing ay kapag hindi nakuha ng presyo ang level na iyon: kulang. Lumalabas ang SMT kapag, sa pagitan ng dalawang correlated na asset, ang isa ay nag-stop hunt at ang isa ay gumawa ng failure swing. Ihambing ang dalawang chart sa ibaba.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "smt-a",
        title: { en: "Asset A: a stop hunt (took the high)", tl: "Asset A: stop hunt (kinuha ang high)" },
        height: 300,
        candles: [
          { o: 104, h: 110, l: 103, c: 109 },
          { o: 109, h: 110, l: 104, c: 105 },
          { o: 105, h: 107, l: 102, c: 106 },
          { o: 106, h: 113, l: 105, c: 107 },
          { o: 107, h: 108, l: 100, c: 101 },
          { o: 101, h: 102, l: 95, c: 96 },
        ],
        annotations: [
          { type: "line", kind: "liquidity", price: 110, from: 0, to: 3, tone: "gold", dashed: true, label: { en: "Equal highs (BSL)", tl: "Equal highs (BSL)" }, labelPlacement: "center" },
          { type: "marker", kind: "sweep", index: 3, price: 113, tone: "bear", label: { en: "Stop hunt", tl: "Stop hunt" } },
        ],
        caption: {
          en: "Asset A trades ABOVE its equal highs, grabbing the liquidity. That is a stop hunt.",
          tl: "Nag-trade ang Asset A LAMPAS sa equal highs nito, kinuha ang liquidity. Iyon ang stop hunt.",
        },
      },
    },
    {
      kind: "chart",
      spec: {
        id: "smt-b",
        title: { en: "Asset B: a failure swing (did not take the high)", tl: "Asset B: failure swing (hindi kinuha ang high)" },
        height: 300,
        candles: [
          { o: 104, h: 110, l: 103, c: 109 },
          { o: 109, h: 110, l: 104, c: 105 },
          { o: 105, h: 107, l: 102, c: 106 },
          { o: 106, h: 108, l: 104, c: 107 },
          { o: 107, h: 108, l: 100, c: 101 },
          { o: 101, h: 102, l: 94, c: 95 },
        ],
        annotations: [
          { type: "line", kind: "liquidity", price: 110, from: 0, to: 3, tone: "gold", dashed: true, label: { en: "Same high (BSL)", tl: "Parehong high (BSL)" }, labelPlacement: "center" },
          { type: "label", index: 3, price: 112, text: { en: "Failure swing", tl: "Failure swing" }, tone: "bear" },
        ],
        caption: {
          en: "Asset B stops SHORT of the same high. It failed to take the liquidity: a failure swing. A took its high, B did not, so we have SMT divergence.",
          tl: "Huminto ang Asset B BAGO ang parehong high. Hindi nito nakuha ang liquidity: failure swing. Kinuha ng A ang high nito, hindi ng B, kaya may SMT divergence tayo.",
        },
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "If both do the same thing, there is no SMT", tl: "Kung pareho ang ginawa, walang SMT" },
      text: {
        en: "There is only SMT when the two disagree: one stop hunts, the other makes a failure swing. If both stop hunt, or both fail, there is no divergence and no signal.",
        tl: "May SMT lang kapag hindi sila magkasundo: isa ang nag-stop hunt, ang isa ay gumawa ng failure swing. Kung pareho silang nag-stop hunt, o pareho silang nabigo, walang divergence at walang signal.",
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "Which asset do you trade?", tl: "Aling asset ang ititrade mo?" },
      text: {
        en: "Always trade the failure-swing asset. In a bullish bias, that is the STRONGER asset (it failed to take the lows, so it rises faster). In a bearish bias, that is the WEAKER asset (it failed to take the highs, so it falls faster).",
        tl: "Palaging i-trade ang failure-swing na asset. Sa bullish bias, iyon ang mas MALAKAS na asset (hindi nito nakuha ang lows, kaya mas mabilis umakyat). Sa bearish bias, iyon ang mas MAHINANG asset (hindi nito nakuha ang highs, kaya mas mabilis bumaba).",
      },
    },
    {
      kind: "heading",
      text: { en: "Trading the divergence", tl: "Pag-trade ng divergence" },
    },
    {
      kind: "chart",
      spec: {
        id: "smt-trade",
        title: { en: "Trade the failure-swing asset (bearish)", tl: "I-trade ang failure-swing asset (bearish)" },
        height: 380,
        candles: [
          { o: 104, h: 110, l: 103, c: 109 },
          { o: 109, h: 110, l: 104, c: 105 },
          { o: 105, h: 107, l: 101, c: 102 },
          { o: 102, h: 108, l: 102, c: 107 },
          { o: 107, h: 108, l: 100, c: 101 },
          { o: 101, h: 102, l: 92, c: 93 },
          { o: 93, h: 97, l: 92, c: 96 },
          { o: 96, h: 100, l: 95, c: 96 },
          { o: 96, h: 97, l: 88, c: 89 },
          { o: 89, h: 90, l: 84, c: 85 },
        ],
        annotations: [
          { type: "line", kind: "liquidity", price: 110, from: 0, to: 3, tone: "gold", dashed: true, label: { en: "Protected high", tl: "Protected high" }, labelPlacement: "center", appearAtStep: 0 },
          { type: "label", index: 3, price: 112, text: { en: "Failure swing", tl: "Failure swing" }, tone: "bear", appearAtStep: 0 },
          { type: "marker", kind: "mss", index: 4, price: 100, tone: "bear", label: { en: "MSS", tl: "MSS" }, appearAtStep: 1 },
          { type: "box", kind: "fvg", from: 4, to: 6, bottom: 97, top: 100, tone: "bear", label: { en: "FVG entry", tl: "FVG entry" }, appearAtStep: 2 },
          { type: "marker", kind: "entry", index: 7, price: 100, tone: "bear", label: { en: "Entry", tl: "Entry" }, appearAtStep: 2 },
          { type: "marker", kind: "sl", index: 0, price: 111, tone: "bear", label: { en: "Stop loss", tl: "Stop loss" }, appearAtStep: 2 },
          { type: "marker", kind: "tp", index: 9, price: 85, tone: "bear", label: { en: "Target", tl: "Target" }, appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "This is the asset we chose to trade: the one that made a failure swing at the high. Its correlated pair took that high (a stop hunt), this one did not, which is the SMT confirming a bearish bias.", tl: "Ito ang asset na pinili nating i-trade: ang gumawa ng failure swing sa high. Kinuha ng correlated pair nito ang high na iyon (stop hunt), hindi ng isang ito, na siyang SMT na nagkukumpirma ng bearish bias." },
            tip: { en: "Failure swing on the asset you trade = the weaker side in a bearish bias.", tl: "Failure swing sa asset na ti-trade mo = ang mas mahinang panig sa bearish bias." },
            revealCandles: 4,
          },
          {
            caption: { en: "Price breaks the last short-term low. That MSS down confirms sellers are in control and the divergence is playing out.", tl: "Binasag ng presyo ang huling short-term low. Itong MSS pababa ang nagkukumpirma na hawak ng sellers ang kontrol at nagaganap ang divergence." },
            tip: { en: "A close below the last swing low = bearish MSS.", tl: "Pag nag-close below sa huling swing low = bearish MSS." },
            revealCandles: 5,
          },
          {
            caption: { en: "Price drops, leaves a bearish FVG, then retraces up into it: our entry. The high is protected, so the stop loss sits just above it, not on a short-term level.", tl: "Bumaba ang presyo, nag-iwan ng bearish FVG, tapos nag-retrace pataas papasok dito: ang entry natin. Protected ang high, kaya nasa itaas lang nito ang stop loss, hindi sa short-term level." },
            tip: { en: "Enter at the FVG (or a breaker / mitigation block); hide the stop above the protected high.", tl: "Pumasok sa FVG (o breaker / mitigation block); itago ang stop sa itaas ng protected high." },
            revealCandles: 8,
          },
          {
            caption: { en: "Price expands down to the target and does not return to the recent leg. SMT did its job: it was the confluence that confirmed the move, not the idea by itself.", tl: "Mag-eexpand pababa ang presyo papunta sa target at hindi babalik sa kamakailang leg. Ginawa ng SMT ang trabaho nito: ito ang confluence na nagkumpirma ng galaw, hindi ang idea mismo." },
            tip: { en: "After SMT, price tends to keep going and not revisit the leg it left.", tl: "Pagkatapos ng SMT, tuloy-tuloy ang presyo at hindi binabalikan ang leg na iniwan nito." },
            revealCandles: 10,
          },
        ],
        caption: {
          en: "Failure swing + MSS + FVG entry, stop above the protected high. SMT confirmed the bearish bias from the correlated pair.",
          tl: "Failure swing + MSS + FVG entry, stop sa itaas ng protected high. Kinumpirma ng SMT ang bearish bias mula sa correlated pair.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Entry models at the divergence", tl: "Mga entry model sa divergence" },
      text: {
        en: "Enter from a fair value gap, a breaker block, or a mitigation block. A breaker forms when there was a stop hunt; a mitigation block forms when there was a failure swing (no stop hunt). Either way, the entry sits in the divergence zone.",
        tl: "Pumasok mula sa fair value gap, breaker block, o mitigation block. Ang breaker ay nabubuo kapag may stop hunt; ang mitigation block ay nabubuo kapag may failure swing (walang stop hunt). Anuman ito, nasa divergence zone ang entry.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Why SMT keeps you safe: protected levels", tl: "Bakit ka pinananatiling ligtas ng SMT: protected levels" },
      text: {
        en: "After a valid SMT, price tends not to return to the most recent leg, so a stop hidden behind the protected high or low is safe. It can only come back once all the PDRAs in between are violated, and that is usually much later, not on the most recent price.",
        tl: "Pagkatapos ng valid na SMT, hindi karaniwang bumabalik ang presyo sa pinakabagong leg, kaya ligtas ang stop na nakatago sa likod ng protected high o low. Babalik lang ito kapag nawalang-bisa na lahat ng PDRA sa pagitan, at iyon ay kadalasang mas huli, hindi sa pinakabagong presyo.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "How to spot it: use your eyes", tl: "Paano makilala: gamitin ang mata mo" },
      text: {
        en: "Line up the matching swing highs (or lows) on the two charts, side by side. Check the same swing on each: did one take it out while the other fell short? An indicator exists for this, but it is not accurate. Your eyes spotting the matching swings work better.",
        tl: "Ihanay ang katugmang swing highs (o lows) ng dalawang chart, magkatabi. Suriin ang parehong swing sa bawat isa: kinuha ba ng isa habang kumulang ang isa? May indicator para dito, pero hindi tumpak. Mas mabuti ang mata mo sa paghahanap ng katugmang swings.",
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
          en: "Bearish on GBPUSD/EURUSD: they trade the failure-swing pair (the weaker asset), which falls faster.",
          tl: "Bearish sa GBPUSD/EURUSD: ti-trade nila ang failure-swing pair (ang mas mahinang asset), na mas mabilis bumaba.",
        },
        {
          en: "Bullish on Nasdaq/Dow: they trade the failure-swing index (the stronger asset), which rises faster.",
          tl: "Bullish sa Nasdaq/Dow: ti-trade nila ang failure-swing index (ang mas malakas na asset), na mas mabilis umakyat.",
        },
        {
          en: "Bearish on BTC/ETH: they trade the weaker coin (the one that fell faster), confirmed with breaker-block entries.",
          tl: "Bearish sa BTC/ETH: ti-trade nila ang mas mahinang coin (ang mas mabilis bumaba), kinumpirma ng breaker-block entries.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Practice", tl: "Pagsasanay" },
      text: {
        en: "At first SMT is not easy to see. For now, just practice spotting SMT on the charts, nothing else. With reps over time it becomes quick and natural.",
        tl: "Sa simula, hindi madaling makita ang SMT. Sa ngayon, magsanay lang humanap ng SMT sa charts, wala nang iba. Sa pag-uulit sa paglipas ng panahon, magiging mabilis at natural ito.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "SMT compares two correlated assets and reads the crack in their correlation: one stop hunts, the other makes a failure swing. It is confluence only, on top of a higher-timeframe bias. Always trade the failure-swing asset (stronger in bullish, weaker in bearish), enter at an FVG/breaker/mitigation block, and hide the stop behind the protected level.",
        tl: "Inihahambing ng SMT ang dalawang correlated na asset at binabasa ang biyak sa correlation nila: isa ang nag-stop hunt, ang isa ay gumawa ng failure swing. Confluence lang ito, dagdag sa higher-timeframe bias. Palaging i-trade ang failure-swing na asset (mas malakas sa bullish, mas mahina sa bearish), pumasok sa FVG/breaker/mitigation block, at itago ang stop sa likod ng protected level.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "What is SMT divergence used for?",
        tl: "Para saan ang SMT divergence?",
      },
      options: [
        { id: "a", text: { en: "As a confirmation tool to validate or invalidate a setup", tl: "Bilang confirmation tool para kumpirmahin o pawalang-bisa ang setup" } },
        { id: "b", text: { en: "To set your account leverage", tl: "Para itakda ang leverage ng account" } },
        { id: "c", text: { en: "To predict news releases", tl: "Para hulaan ang news releases" } },
        { id: "d", text: { en: "To pick a broker", tl: "Para pumili ng broker" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "SMT is a confirmation tool: it reads the crack in correlation between two related pairs to validate or invalidate a setup.",
        tl: "Ang SMT ay confirmation tool: binabasa nito ang biyak sa correlation ng dalawang magkaugnay na pair para kumpirmahin o pawalang-bisa ang setup.",
      },
    },
    {
      id: "q2",
      type: "truefalse",
      prompt: {
        en: "SMT can be used as a stand-alone trade idea, even without a higher-timeframe bias.",
        tl: "Pwedeng gamitin ang SMT bilang nag-iisang trade idea, kahit walang higher-timeframe bias.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. SMT is confluence only. Without a higher-timeframe narrative and bias, it is useless.",
        tl: "Mali. Confluence lang ang SMT. Kung walang higher-timeframe narrative at bias, walang silbi ito.",
      },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: {
        en: "What order should your analysis follow?",
        tl: "Anong pagkakasunod dapat ang analysis mo?",
      },
      options: [
        { id: "a", text: { en: "Lower timeframe first, ignore the rest", tl: "Lower timeframe muna, balewalain ang iba" } },
        { id: "b", text: { en: "Top-down: higher timeframe, then middle, then lower (entry)", tl: "Top-down: higher timeframe, tapos middle, tapos lower (entry)" } },
        { id: "c", text: { en: "Only the entry timeframe", tl: "Ang entry timeframe lamang" } },
        { id: "d", text: { en: "Random order", tl: "Random na pagkakasunod" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Top-down: build the bias on the higher timeframe, refine on the middle, enter on the lower timeframe.",
        tl: "Top-down: bumuo ng bias sa higher timeframe, pinuhin sa middle, pumasok sa lower timeframe.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "GBPUSD and DXY are an example of which correlation?",
        tl: "Ang GBPUSD at DXY ay halimbawa ng anong correlation?",
      },
      options: [
        { id: "a", text: { en: "Negative (they move opposite ways)", tl: "Negative (magkasalungat ang galaw)" } },
        { id: "b", text: { en: "Positive (they move together)", tl: "Positive (magkasabay ang galaw)" } },
        { id: "c", text: { en: "No correlation", tl: "Walang correlation" } },
        { id: "d", text: { en: "They are the same asset", tl: "Pareho silang asset" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "GBPUSD and DXY are negatively correlated: when one rises, the other falls.",
        tl: "Negatively correlated ang GBPUSD at DXY: pag tumaas ang isa, bumababa ang isa.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "A stop hunt is when price…",
        tl: "Ang stop hunt ay kapag ang presyo ay…",
      },
      options: [
        { id: "a", text: { en: "Takes out a level (trades beyond a prior high or low)", tl: "Kinukuha ang isang level (nag-trade lampas sa naunang high o low)" } },
        { id: "b", text: { en: "Stops short of the level", tl: "Huminto bago ang level" } },
        { id: "c", text: { en: "Moves sideways", tl: "Gumagalaw pa-gilid" } },
        { id: "d", text: { en: "Gaps on the open", tl: "Nag-gap sa open" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "A stop hunt takes out the level, grabbing the liquidity beyond it.",
        tl: "Ang stop hunt ay kinukuha ang level, kinukuha ang liquidity lampas dito.",
      },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: {
        en: "A failure swing is when price…",
        tl: "Ang failure swing ay kapag ang presyo ay…",
      },
      options: [
        { id: "a", text: { en: "Fails to take out the level (stops short)", tl: "Hindi nakukuha ang level (kulang)" } },
        { id: "b", text: { en: "Takes out the level by a lot", tl: "Kinukuha ang level nang malayo" } },
        { id: "c", text: { en: "Doubles in size", tl: "Nagdodoble ang laki" } },
        { id: "d", text: { en: "Always reverses the trend", tl: "Palaging binabaliktad ang trend" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "A failure swing falls short of the level. SMT appears when one asset stop hunts and the other makes a failure swing.",
        tl: "Ang failure swing ay kulang sa level. Lumalabas ang SMT kapag ang isang asset ay nag-stop hunt at ang isa ay gumawa ng failure swing.",
      },
    },
    {
      id: "q7",
      type: "truefalse",
      prompt: {
        en: "If both correlated assets stop hunt the same level, there is still a valid SMT.",
        tl: "Kung parehong nag-stop hunt ang dalawang correlated asset sa parehong level, may valid pa ring SMT.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "False. SMT needs disagreement: one stop hunts, the other fails. If both do the same, there is no divergence.",
        tl: "Mali. Kailangan ng SMT ang hindi pagkakasundo: isa ang nag-stop hunt, isa ang nabigo. Kung pareho, walang divergence.",
      },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: {
        en: "In a bearish bias, which asset do you trade?",
        tl: "Sa bearish bias, aling asset ang ititrade mo?",
      },
      options: [
        { id: "a", text: { en: "The weaker asset, the one with the failure swing at the highs", tl: "Ang mas mahinang asset, ang may failure swing sa highs" } },
        { id: "b", text: { en: "The one that stop hunted the high", tl: "Ang nag-stop hunt sa high" } },
        { id: "c", text: { en: "Whichever has more volume", tl: "Alinmang mas maraming volume" } },
        { id: "d", text: { en: "Neither, you skip", tl: "Wala, lalaktawan mo" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Bearish: trade the weaker, failure-swing asset; it falls faster. Always trade the failure-swing side.",
        tl: "Bearish: i-trade ang mas mahina, failure-swing na asset; mas mabilis bumaba. Palaging i-trade ang failure-swing na panig.",
      },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: {
        en: "In a bullish bias, the failure-swing asset is…",
        tl: "Sa bullish bias, ang failure-swing na asset ay…",
      },
      options: [
        { id: "a", text: { en: "The stronger asset (failed to take the lows, so it rises faster)", tl: "Ang mas malakas na asset (hindi kinuha ang lows, kaya mas mabilis umakyat)" } },
        { id: "b", text: { en: "The weaker asset", tl: "Ang mas mahinang asset" } },
        { id: "c", text: { en: "Always DXY", tl: "Palaging DXY" } },
        { id: "d", text: { en: "Irrelevant in a bullish bias", tl: "Walang kaugnayan sa bullish bias" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Bullish: the failure-swing asset is the stronger one (it refused to take the lows), so it rises faster.",
        tl: "Bullish: ang failure-swing na asset ay ang mas malakas (ayaw kumuha ng lows), kaya mas mabilis umakyat.",
      },
    },
    {
      id: "q10",
      type: "truefalse",
      prompt: {
        en: "After a valid SMT, price tends not to return to the most recent leg, so a stop behind the protected level is safe.",
        tl: "Pagkatapos ng valid na SMT, hindi karaniwang bumabalik ang presyo sa pinakabagong leg, kaya ligtas ang stop sa likod ng protected level.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. Price usually keeps going; it only revisits the leg much later, once the PDRAs in between are violated.",
        tl: "Oo. Kadalasang tuloy ang presyo; binabalikan lang ang leg nang mas huli, kapag nawalang-bisa na ang mga PDRA sa pagitan.",
      },
    },
  ],
};
