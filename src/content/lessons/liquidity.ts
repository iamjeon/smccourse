// Source: Basic TradingCourse/Liquidity.txt (verified: matches title)
// COVERAGE (source: Basic TradingCourse/Liquidity.txt) — every point mapped:
// [x] liquidity is what we always look at; market makers mostly target retail stop losses -> intro + Q2
// [x] retail uses support/resistance/trendlines/indicators; we read naked charts -> intro
// [x] BSL = above resistance/highs (shorts' stops + breakout buy-stops) -> paragraph + liq-bsl-sweep chart + Q1
// [x] SSL = below support/lows (longs' stops) -> paragraph + SSL callout + Q5
// [x] taking out liquidity clears the orders, then smart money enters the other way -> paragraph + chart step2 + Q2
// [x] retail RTS/STR: a broken resistance becomes support and a broken support becomes resistance; smart money uses that expectation -> callout + Q6
// [x] a breakout above resistance is often a trap: the 'break' just sweeps liquidity then reverses -> warning callout + chart + Q3
// [x] SSL sweep mirror: a break below support takes the liquidity then reverses up, stopping out the shorts -> SSL callout + Q7
// [x] manipulation: both buy-side and sell-side can be swept to trap traders on both sides -> manipulation note + Q8
// [x] identify liquidity FIRST so your entries land on the right side -> warning callout + Q9
// [x] AMD: accumulation -> manipulation (the sweep) -> distribution (our entry) -> AMD paragraph + Q4, Q10
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "liquidity",
  moduleSlug: "basics",
  title: { en: "Liquidity", tl: "Liquidity" },
  summary: {
    en: "Why price hunts stop losses, and how buy-side / sell-side liquidity drives smart-money moves.",
    tl: "Bakit hinahabol ng price ang stop losses, at paano hinihila ng buy-side / sell-side liquidity ang galaw ng smart money.",
  },
  estMinutes: 10,
  sourceFile: "Basic TradingCourse/Liquidity.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "Liquidity is what we always look at as ICT / SMC traders. Market makers mostly target the stop losses of retail traders. Retail relies on concepts like support, resistance, and trendlines, often with indicators. We read the chart naked, without indicators, and focus on where that liquidity sits.",
        tl: "Ang liquidity ang laging tinitingnan natin bilang ICT / SMC trader. Kadalasan, ang stop losses ng retail traders ang tina-target ng market makers. Umaasa ang retail sa support, resistance, at trendlines, madalas may indicators. Tayo naman, naked chart, walang indicators, at nakapokus kung saan nakapwesto ang liquidity.",
      },
    },
    {
      kind: "heading",
      text: { en: "Buy-side vs sell-side liquidity", tl: "Buy-side vs sell-side liquidity" },
    },
    {
      kind: "paragraph",
      text: {
        en: "Resistance (highs) holds buy-side liquidity (BSL): the stop losses of shorts and the buy-stops of breakout traders sit just above it. Support (lows) holds sell-side liquidity (SSL): the stops of longs sit just below it. When that liquidity is 'taken out,' the orders there are cleared, and that's exactly when smart money enters the other way.",
        tl: "Ang resistance (highs) ay may buy-side liquidity (BSL): ang stop losses ng shorts at buy-stops ng breakout traders ay nasa itaas nito. Ang support (lows) ay may sell-side liquidity (SSL): ang stops ng longs ay nasa ilalim. Pag 'na-take out' ang liquidity na yan, nalilinis ang orders doon, at doon mismo pumapasok ang smart money sa kabilang side.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "How retail sees it (RTS / STR)", tl: "Paano ito tingnan ng retail (RTS / STR)" },
      text: {
        en: "Retail traders expect a broken resistance to become support ('resistance turn support'), and a broken support to become resistance ('support turn resistance'), then trade the bounce. Smart money uses that expectation: the 'break' often just grabs the liquidity resting there, then reverses.",
        tl: "Inaasahan ng retail na ang na-break na resistance ay magiging support ('resistance turn support'), at ang na-break na support ay magiging resistance ('support turn resistance'), tapos tinatrade ang bounce. Ginagamit ito ng smart money: ang 'break' ay madalas kinukuha lang ang liquidity doon, tapos mag-reverse.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "liq-bsl-sweep",
        title: { en: "Buy-side liquidity sweep", tl: "Buy-side liquidity sweep" },
        height: 360,
        candles: [
          { o: 100, h: 108, l: 98, c: 106 },
          { o: 106, h: 124, l: 105, c: 122 },
          { o: 122, h: 123, l: 108, c: 110 },
          { o: 110, h: 111, l: 100, c: 102 },
          { o: 102, h: 124, l: 101, c: 121 },
          { o: 121, h: 122, l: 112, c: 114 },
          { o: 114, h: 130, l: 113, c: 120 },
          { o: 120, h: 121, l: 106, c: 108 },
          { o: 108, h: 109, l: 96, c: 98 },
          { o: 98, h: 99, l: 86, c: 88 },
          { o: 88, h: 89, l: 78, c: 80 },
        ],
        annotations: [
          {
            type: "line",
            kind: "liquidity",
            price: 124,
            from: 1,
            to: 6,
            tone: "gold",
            label: { en: "BSL", tl: "BSL" },
            labelPlacement: "center",
            appearAtStep: 0,
          },
          { type: "marker", kind: "sweep", index: 6, price: 130, tone: "gold", label: { en: "Sweep", tl: "Sweep" }, appearAtStep: 1 },
          { type: "marker", kind: "entry", index: 7, price: 120, tone: "bear", label: { en: "Short", tl: "Short" }, appearAtStep: 2 },
        ],
        steps: [
          {
            caption: { en: "Two equal highs line up at the same price, building a pool of buy-side liquidity (BSL) just above them.", tl: "Dalawang pantay na highs ang pumapantay sa parehong presyo, gumagawa ng pool ng buy-side liquidity (BSL) sa itaas nila." },
            tip: { en: "Two highs at the same level = a BSL pool sits just above.", tl: "Dalawang high sa parehong level = may BSL pool sa itaas." },
            revealCandles: 5,
          },
          {
            caption: { en: "Price spikes ABOVE the equal highs. Breakout longs trigger and shorts get stopped out, exactly the liquidity smart money wanted.", tl: "Tumalbog ang price SA ITAAS ng equal highs. Nag-trigger ang breakout longs at na-stop out ang shorts, mismong liquidity na gusto ng smart money." },
            tip: { en: "A spike just above the equal highs = the sweep that grabs the BSL.", tl: "Pagtalbog lampas lang sa equal highs = ang sweep na kumukuha ng BSL." },
            revealCandles: 7,
          },
          {
            caption: { en: "It was a trap. With the liquidity taken, price reverses down hard. The short side is the right side here.", tl: "Trap pala. Nakuha na ang liquidity, malakas na bumaba ang price. Ang short side ang tamang side dito." },
            tip: { en: "A close back below the highs after the sweep = the reversal is on.", tl: "Close pabalik below ng highs pagkatapos ng sweep = nagsimula na ang reversal." },
            revealCandles: 11,
          },
        ],
        caption: {
          en: "Equal highs build BSL. Price sweeps above to grab it, then reverses down. The 'breakout' was a trap.",
          tl: "Pantay na highs ang gumawa ng BSL. Tumalbog pataas ang price para kunin ito, tapos bumaba. Trap ang 'breakout'.",
        },
      },
    },
    {
      kind: "callout",
      tone: "warning",
      title: { en: "Breakouts are often traps", tl: "Madalas trap ang breakouts" },
      text: {
        en: "When a 'resistance breaks,' retail buys expecting continuation. Often it doesn't truly break. It only takes the liquidity, then reverses. Identify liquidity first so your entries land on the right side.",
        tl: "Pag 'nag-break ang resistance,' bumibili ang retail na umaasa ng continuation. Madalas hindi ito totoong break. Kinukuha lang ang liquidity, tapos reversal. I-identify muna ang liquidity para tama ang entries mo.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "The sell-side mirror", tl: "Ang sell-side mirror" },
      text: {
        en: "The same trap works downward. When price breaks BELOW support, retail shorts the 'breakdown' and longs get stopped out, that is the sell-side liquidity (SSL). Once it is taken, price often reverses UP and the new shorts get trapped. Same game, flipped.",
        tl: "Gumagana rin ang parehong trap pababa. Pag nag-break ang price BELOW sa support, sinhort ng retail ang 'breakdown' at na-stop out ang longs, iyon ang sell-side liquidity (SSL). Kapag nakuha ito, madalas nag-reverse PATAAS ang price at na-trap ang bagong shorts. Parehong laro, binaliktad.",
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "This is why it is called manipulation: both the buy side and the sell side can be swept to trap traders on either side. The real sequence behind it is accumulation, then manipulation, then distribution (AMD). The sweep is the manipulation; our entry comes in the distribution that follows. We'll go deeper on AMD in later topics.",
        tl: "Kaya ito tinatawag na manipulation: pwedeng i-sweep ang buy side at ang sell side para ma-trap ang traders sa magkabila. Ang tunay na sequence dito ay accumulation, tapos manipulation, tapos distribution (AMD). Ang sweep ay ang manipulation; ang entry natin ay sa distribution na sumusunod. Mas malalim ang AMD sa susunod na topics.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: {
        en: "Where does buy-side liquidity (BSL) typically rest?",
        tl: "Saan kadalasan nakapwesto ang buy-side liquidity (BSL)?",
      },
      chart: {
        id: "q-liq",
        height: 220,
        candles: [
          { o: 100, h: 120, l: 99, c: 118 },
          { o: 118, h: 119, l: 110, c: 112 },
          { o: 112, h: 120, l: 108, c: 116 },
          { o: 116, h: 118, l: 112, c: 114 },
        ],
        annotations: [
          { type: "line", kind: "liquidity", price: 120, tone: "gold", label: { en: "? liquidity", tl: "? liquidity" } },
        ],
        caption: {
          en: "Equal highs leave a pool of liquidity at the dashed line. Where is it?",
          tl: "Pantay na highs ang nag-iwan ng liquidity sa dashed line. Nasaan ito?",
        },
      },
      options: [
        { id: "a", text: { en: "Below support / lows", tl: "Sa ilalim ng support / lows" } },
        { id: "b", text: { en: "Above resistance / highs", tl: "Sa itaas ng resistance / highs" } },
        { id: "c", text: { en: "Exactly at the open price", tl: "Sa mismong open price" } },
        { id: "d", text: { en: "Only on weekends", tl: "Tuwing weekend lang" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "BSL sits above highs/resistance, where shorts' stops and breakout buy-stops cluster.",
        tl: "Nasa itaas ng highs/resistance ang BSL, kung saan nag-cu-cluster ang stops ng shorts at buy-stops.",
      },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: {
        en: "What are market makers mostly targeting?",
        tl: "Ano ang kadalasang tina-target ng market makers?",
      },
      options: [
        { id: "a", text: { en: "Indicator signals", tl: "Mga signal ng indicator" } },
        { id: "b", text: { en: "The stop losses / liquidity of retail traders", tl: "Ang stop losses / liquidity ng retail traders" } },
        { id: "c", text: { en: "News headlines", tl: "Mga news headline" } },
        { id: "d", text: { en: "Round numbers only", tl: "Round numbers lang" } },
      ],
      correctOptionId: "b",
      explanation: {
        en: "Smart money seeks the pooled liquidity (stops/orders) that retail leaves behind.",
        tl: "Hinahanap ng smart money ang naka-pool na liquidity (stops/orders) na iniwan ng retail.",
      },
    },
    {
      id: "q3",
      type: "truefalse",
      prompt: {
        en: "A breakout above resistance always means price will keep going up.",
        tl: "Ang breakout above resistance ay laging nangangahulugang tuloy aakyat ang price.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: {
        en: "Often the 'breakout' only sweeps liquidity, then reverses: a trap.",
        tl: "Madalas, ang 'breakout' ay nag-sweep lang ng liquidity, tapos reversal: trap.",
      },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: {
        en: "The three-phase sequence behind a liquidity sweep is…",
        tl: "Ang tatlong-phase na sequence sa likod ng liquidity sweep ay…",
      },
      options: [
        { id: "a", text: { en: "Accumulation → Manipulation → Distribution", tl: "Accumulation → Manipulation → Distribution" } },
        { id: "b", text: { en: "Buy → Hold → Sell", tl: "Buy → Hold → Sell" } },
        { id: "c", text: { en: "Support → Trendline → Indicator", tl: "Support → Trendline → Indicator" } },
        { id: "d", text: { en: "Open → High → Close", tl: "Open → High → Close" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "AMD: accumulation, then a manipulation sweep, then distribution where we enter.",
        tl: "AMD: accumulation, tapos manipulation sweep, tapos distribution kung saan tayo pumapasok.",
      },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: {
        en: "Where does sell-side liquidity (SSL) typically rest?",
        tl: "Saan kadalasan nakapwesto ang sell-side liquidity (SSL)?",
      },
      options: [
        { id: "a", text: { en: "Below support / lows", tl: "Sa ilalim ng support / lows" } },
        { id: "b", text: { en: "Above resistance / highs", tl: "Sa itaas ng resistance / highs" } },
        { id: "c", text: { en: "At the candle's open", tl: "Sa open ng candle" } },
        { id: "d", text: { en: "There is no SSL", tl: "Walang SSL" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "SSL rests below lows/support, where longs' stop losses cluster.",
        tl: "Nasa ilalim ng lows/support ang SSL, kung saan nag-cu-cluster ang stop losses ng longs.",
      },
    },
    {
      id: "q6",
      type: "truefalse",
      prompt: {
        en: "Retail traders expect a broken resistance to turn into support (resistance turn support).",
        tl: "Inaasahan ng retail na ang na-break na resistance ay magiging support (resistance turn support).",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. That RTS / STR expectation is exactly what smart money exploits with a sweep.",
        tl: "Oo. Ang RTS / STR na expectation na iyon ang sinasamantala ng smart money sa pamamagitan ng sweep.",
      },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: {
        en: "After price breaks below support and sweeps the SSL, what often happens?",
        tl: "Pagkatapos mag-break ang price below sa support at i-sweep ang SSL, ano ang madalas mangyari?",
      },
      options: [
        { id: "a", text: { en: "Price reverses UP, trapping the new shorts", tl: "Nag-reverse PATAAS ang price, na-trap ang bagong shorts" } },
        { id: "b", text: { en: "Price keeps falling forever", tl: "Tuloy-tuloy bumababa ang price" } },
        { id: "c", text: { en: "Nothing ever happens", tl: "Walang nangyayari" } },
        { id: "d", text: { en: "The chart freezes", tl: "Nagfri-freeze ang chart" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Once SSL is taken, price often reverses up, the mirror of the buy-side trap.",
        tl: "Kapag nakuha ang SSL, madalas nag-reverse pataas ang price, ang mirror ng buy-side trap.",
      },
    },
    {
      id: "q8",
      type: "truefalse",
      prompt: {
        en: "Both buy-side and sell-side liquidity can be swept to trap traders on either side.",
        tl: "Pwedeng i-sweep ang buy-side at sell-side liquidity para ma-trap ang traders sa magkabila.",
      },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: {
        en: "Yes. That is manipulation: grabbing liquidity from whichever side traders are trapped on.",
        tl: "Oo. Iyon ang manipulation: pagkuha ng liquidity mula sa kung aling panig na-trap ang traders.",
      },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: {
        en: "Why do we identify liquidity first?",
        tl: "Bakit ina-identify muna ang liquidity?",
      },
      options: [
        { id: "a", text: { en: "So our entries land on the right side of the move", tl: "Para tama ang side ng entries natin" } },
        { id: "b", text: { en: "To pick a broker", tl: "Para pumili ng broker" } },
        { id: "c", text: { en: "To set leverage", tl: "Para itakda ang leverage" } },
        { id: "d", text: { en: "It does not matter", tl: "Walang pinagkaiba" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "Knowing where liquidity sits keeps you from buying tops and selling bottoms into a trap.",
        tl: "Ang pag-alam kung saan ang liquidity ay pumipigil sa'yo na bumili ng taas o magbenta ng baba papasok sa trap.",
      },
    },
    {
      id: "q10",
      type: "mcq",
      prompt: {
        en: "In AMD, the liquidity sweep is which phase?",
        tl: "Sa AMD, ang liquidity sweep ay aling phase?",
      },
      options: [
        { id: "a", text: { en: "Manipulation (entry comes in distribution)", tl: "Manipulation (ang entry ay sa distribution)" } },
        { id: "b", text: { en: "Accumulation", tl: "Accumulation" } },
        { id: "c", text: { en: "Distribution", tl: "Distribution" } },
        { id: "d", text: { en: "None of these", tl: "Wala sa mga ito" } },
      ],
      correctOptionId: "a",
      explanation: {
        en: "The sweep is the manipulation; we enter in the distribution that follows.",
        tl: "Ang sweep ay ang manipulation; pumapasok tayo sa distribution na sumusunod.",
      },
    },
  ],
};
