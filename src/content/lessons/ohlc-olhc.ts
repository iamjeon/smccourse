// Source: Part 1/Part 1 Lesson 2 - OHLC & OLHC.txt (verified: matches title)
// COVERAGE (source: Part 1/Part 1 Lesson 2 - OHLC & OLHC.txt) — every point mapped:
// [x] OHLC/OLHC = the ORDER price visits open/high/low/close inside one candle -> intro + Q1
// [x] bearish path = Open -> High -> Low -> Close (OHLC) -> list + bearish guided chart + Q2
// [x] bullish path = Open -> Low -> High -> Close (OLHC) -> list + bullish guided chart + Q3
// [x] daily candle opens at the midnight open = 12am New York (UTC-5) -> callout + chart step + Q4
// [x] bearish day: open, manipulation ABOVE (sweep high), distribution down, close near low -> bearish chart + Q5, Q10
// [x] bullish day: open, manipulation BELOW (sweep low), distribution up, close near high -> bullish chart
// [x] same pattern on monthly (from daily) / weekly (from 4h) / 12h -> "any timeframe" paragraph + Q
// [x] weekly open = Monday, monthly open = day 1 -> paragraph + Q6
// [x] WHY: midnight/weekly/monthly open reveals the manipulation within the period -> key callout + Q7
// [x] AMD callback (consolidation -> manipulation/take the high -> distribution) -> chart captions (ref States of the Market)
// [x] entry after the sweep = the breaker or FVG -> tip callout + Q8
// [x] distribution runs through London / New York sessions -> tip callout + Q9
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "ohlc-olhc",
  moduleSlug: "part-1",
  title: { en: "OHLC & OLHC", tl: "OHLC & OLHC" },
  summary: {
    en: "The order price visits open, high, low, and close inside a single candle, and how the manipulation hides there. Bearish days run O-H-L-C, bullish days run O-L-H-C.",
    tl: "Ang pagkakasunod ng pagbisita ng presyo sa open, high, low, at close sa loob ng isang candle, at kung paano nagtatago doon ang manipulation. Bearish days: O-H-L-C, bullish days: O-L-H-C.",
  },
  estMinutes: 8,
  sourceFile: "Part 1/Part 1 Lesson 2 - OHLC & OLHC.txt",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "Every candle has four prices: the open, the high, the low, and the close. OHLC and OLHC are about the ORDER in which price visits them inside one candle. That order hides where the manipulation happened, so it is worth learning.",
        tl: "Bawat candle ay may apat na presyo: open, high, low, at close. Ang OHLC at OLHC ay tungkol sa PAGKAKASUNOD ng pagbisita ng presyo sa kanila sa loob ng isang candle. Doon nagtatago kung saan nangyari ang manipulation, kaya sulit itong matutunan.",
      },
    },
    {
      kind: "heading",
      text: { en: "The two paths", tl: "Ang dalawang daan" },
    },
    {
      kind: "list",
      items: [
        {
          en: "Bearish candle: Open then High then Low then Close (OHLC). Price first pokes UP, then sells down and closes near the low.",
          tl: "Bearish candle: Open tapos High tapos Low tapos Close (OHLC). Tumutusok muna PATAAS, tapos bumababa at nag-close malapit sa low.",
        },
        {
          en: "Bullish candle: Open then Low then High then Close (OLHC). Price first dips DOWN, then rallies up and closes near the high.",
          tl: "Bullish candle: Open tapos Low tapos High tapos Close (OLHC). Bumababa muna PABABA, tapos umaakyat at nag-close malapit sa high.",
        },
      ],
    },
    {
      kind: "chart",
      spec: {
        id: "ohlc-bearish",
        title: { en: "Inside a bearish day: Open -> High -> Low -> Close", tl: "Sa loob ng bearish day: Open -> High -> Low -> Close" },
        height: 380,
        candles: [
          { o: 100, h: 101, l: 99, c: 100 },
          { o: 100, h: 106, l: 100, c: 105 },
          { o: 105, h: 110, l: 104, c: 109 },
          { o: 109, h: 110, l: 103, c: 104 },
          { o: 104, h: 105, l: 96, c: 98 },
          { o: 98, h: 99, l: 90, c: 92 },
          { o: 92, h: 95, l: 91, c: 94 },
          { o: 94, h: 96, l: 92, c: 95 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 100, from: 0, to: 7, tone: "neutral", dashed: true, appearAtStep: 0 },
          { type: "label", index: 0, price: 96, text: { en: "Open (12am NY)", tl: "Open (12am NY)" }, tone: "neutral", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 2, price: 112, tone: "gold", label: { en: "Manipulation", tl: "Manipulation" }, appearAtStep: 1 },
          { type: "label", index: 5, price: 86, text: { en: "Distribution", tl: "Distribution" }, tone: "bear", appearAtStep: 2 },
          { type: "label", index: 7, price: 89, text: { en: "Close", tl: "Close" }, tone: "bear", appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "A new day OPENS at the midnight open: 12am New York time (UTC-5). Mark that open price (the dashed line). Everything today is measured from here.", tl: "Nag-OPEN ang bagong araw sa midnight open: 12am New York time (UTC-5). Markahan ang open price na iyon (ang putol-putol na linya). Dito sinusukat ang buong araw." },
            tip: { en: "The daily open is always 12am New York time. It anchors the day.", tl: "Ang daily open ay lagi 12am New York time. Ito ang anchor ng araw." },
            revealCandles: 1,
          },
          {
            caption: { en: "First, price pushes UP above the open and pokes out a high. This is the MANIPULATION, a stop hunt that grabs the liquidity above. Remember liquidity and the sweep from the earlier lessons? This is that, happening inside the day.", tl: "Una, tumutulak PATAAS ang price lampas sa open at tumutusok ng high. Ito ang MANIPULATION, stop hunt na kumukuha ng liquidity sa itaas. Tandaan ang liquidity at ang sweep sa naunang lessons? Iyon ito, sa loob ng araw." },
            tip: { en: "A spike above the open that pokes out and comes back = the manipulation, not the real direction.", tl: "Spike pataas lampas sa open na tumutusok tapos bumabalik = manipulation, hindi ang totoong direksyon." },
            revealCandles: 3,
          },
          {
            caption: { en: "Then price reverses and DISTRIBUTES down, far below the open. This is the real move for the day. (Consolidation, manipulation, distribution: the same AMD from the States of the Market lesson.)", tl: "Tapos lumiko ang price at nag-DISTRIBUTE pababa, malayo sa ilalim ng open. Ito ang totoong galaw ng araw. (Consolidation, manipulation, distribution: ang parehong AMD mula sa States of the Market lesson.)" },
            tip: { en: "A strong move opposite to the sweep = distribution. It usually runs during London and New York.", tl: "Malakas na galaw kabaligtaran ng sweep = distribution. Kadalasan tumatakbo sa London at New York." },
            revealCandles: 6,
          },
          {
            caption: { en: "It closes near the low, below the open: a RED (bearish) daily candle. The path price took was Open, then High, then Low, then Close = OHLC.", tl: "Nag-close malapit sa low, below sa open: RED (bearish) daily candle. Ang dinaanan ng price ay Open, tapos High, tapos Low, tapos Close = OHLC." },
            tip: { en: "Close below the open = a bearish day. The high was only the manipulation.", tl: "Close below sa open = bearish day. Ang high ay manipulation lamang." },
            revealCandles: 8,
          },
        ],
        caption: {
          en: "A bearish day visits Open, High, Low, Close in that order (OHLC). The high is the manipulation; the close direction is the truth.",
          tl: "Ang bearish day ay bumibisita sa Open, High, Low, Close sa pagkakasunod na iyon (OHLC). Ang high ay manipulation; ang direksyon ng close ang totoo.",
        },
      },
    },
    {
      kind: "chart",
      spec: {
        id: "olhc-bullish",
        title: { en: "Inside a bullish day: Open -> Low -> High -> Close", tl: "Sa loob ng bullish day: Open -> Low -> High -> Close" },
        height: 380,
        candles: [
          { o: 100, h: 101, l: 99, c: 100 },
          { o: 100, h: 101, l: 94, c: 95 },
          { o: 95, h: 96, l: 90, c: 92 },
          { o: 92, h: 98, l: 91, c: 97 },
          { o: 97, h: 106, l: 96, c: 104 },
          { o: 104, h: 112, l: 103, c: 110 },
          { o: 110, h: 111, l: 106, c: 108 },
        ],
        annotations: [
          { type: "line", kind: "level", price: 100, from: 0, to: 6, tone: "neutral", dashed: true, appearAtStep: 0 },
          { type: "label", index: 0, price: 104, text: { en: "Open (12am NY)", tl: "Open (12am NY)" }, tone: "neutral", appearAtStep: 0 },
          { type: "marker", kind: "sweep", index: 2, price: 88, tone: "gold", label: { en: "Manipulation", tl: "Manipulation" }, appearAtStep: 1 },
          { type: "label", index: 5, price: 116, text: { en: "Distribution", tl: "Distribution" }, tone: "bull", appearAtStep: 2 },
          { type: "label", index: 6, price: 114, text: { en: "Close", tl: "Close" }, tone: "bull", appearAtStep: 3 },
        ],
        steps: [
          {
            caption: { en: "Same start: the day OPENS at midnight (12am New York). Mark the open (dashed line).", tl: "Parehong simula: nag-OPEN ang araw sa midnight (12am New York). Markahan ang open (putol-putol na linya)." },
            tip: { en: "Always anchor to the midnight open first.", tl: "Lagi munang i-anchor sa midnight open." },
            revealCandles: 1,
          },
          {
            caption: { en: "This time price first dips DOWN below the open and sweeps a low. That dip is the MANIPULATION, grabbing the liquidity below before the real move.", tl: "Ngayon, bumababa muna ang price PABABA sa open at nag-sweep ng low. Ang dip na iyon ay MANIPULATION, kinukuha ang liquidity sa ibaba bago ang totoong galaw." },
            tip: { en: "A dip below the open that snaps back up = the manipulation (a sweep of the low).", tl: "Dip pababa sa open na bumabalik pataas = manipulation (sweep ng low)." },
            revealCandles: 3,
          },
          {
            caption: { en: "Then price DISTRIBUTES up, far above the open. This is the real move, and it runs through London and New York.", tl: "Tapos nag-DISTRIBUTE pataas ang price, malayo sa itaas ng open. Ito ang totoong galaw, tumatakbo sa London at New York." },
            tip: { en: "A strong rally opposite the sweep = distribution.", tl: "Malakas na rally kabaligtaran ng sweep = distribution." },
            revealCandles: 6,
          },
          {
            caption: { en: "It closes near the high, above the open: a GREEN (bullish) daily candle. The path was Open, then Low, then High, then Close = OLHC.", tl: "Nag-close malapit sa high, above sa open: GREEN (bullish) daily candle. Ang dinaanan ay Open, tapos Low, tapos High, tapos Close = OLHC." },
            tip: { en: "Close above the open = a bullish day. The low was only the manipulation.", tl: "Close above sa open = bullish day. Ang low ay manipulation lamang." },
            revealCandles: 7,
          },
        ],
        caption: {
          en: "A bullish day visits Open, Low, High, Close in that order (OLHC). The low is the manipulation; the close direction is the truth.",
          tl: "Ang bullish day ay bumibisita sa Open, Low, High, Close sa pagkakasunod na iyon (OLHC). Ang low ay manipulation; ang direksyon ng close ang totoo.",
        },
      },
    },
    {
      kind: "callout",
      tone: "key",
      title: { en: "Mark the opens", tl: "Markahan ang mga open" },
      text: {
        en: "Identify the midnight open (12am New York, daily), the weekly open (Monday), and the monthly open (day 1). These opens are where you can see the manipulation within the period, so they anchor your read of the day, week, or month.",
        tl: "I-identify ang midnight open (12am New York, daily), weekly open (Monday), at monthly open (araw 1). Sa mga open na ito makikita ang manipulation sa loob ng period, kaya sila ang anchor ng pagbasa mo sa araw, linggo, o buwan.",
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "The same OHLC / OLHC pattern repeats on every timeframe. A monthly candle is built from daily candles, a weekly candle from 4-hour or daily candles, and so on. Whatever the timeframe, the higher candle still opens, gets manipulated, distributes, and closes.",
        tl: "Ang parehong OHLC / OLHC pattern ay paulit-ulit sa bawat timeframe. Ang monthly candle ay binubuo ng daily candles, ang weekly candle mula sa 4-hour o daily candles, at iba pa. Anuman ang timeframe, ang mas mataas na candle ay nag-o-open, nama-manipulate, nagdi-distribute, at nag-cclose pa rin.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Where to enter", tl: "Saan mag-enter" },
      text: {
        en: "Once the manipulation has taken out the high (or low), look for an entry at the breaker or the FVG it leaves behind, then ride the distribution. The distribution usually plays out during the London and New York sessions.",
        tl: "Kapag nakuha na ng manipulation ang high (o low), maghanap ng entry sa breaker o sa FVG na naiwan nito, tapos sakyan ang distribution. Kadalasan nangyayari ang distribution sa London at New York sessions.",
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "Key takeaways", tl: "Mga dapat tandaan" },
      text: {
        en: "Bearish day = OHLC (high first, then sells off). Bullish day = OLHC (low first, then rallies). The first poke past the open is the manipulation; the close direction is the real move. Mark the midnight, weekly, and monthly opens.",
        tl: "Bearish day = OHLC (high muna, tapos bagsak). Bullish day = OLHC (low muna, tapos rally). Ang unang tusok lampas sa open ay manipulation; ang direksyon ng close ang totoong galaw. Markahan ang midnight, weekly, at monthly opens.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: { en: "OHLC and OLHC describe…", tl: "Ang OHLC at OLHC ay naglalarawan ng…" },
      options: [
        { id: "a", text: { en: "The order price visits open, high, low, close inside a candle", tl: "Pagkakasunod ng pagbisita ng presyo sa open, high, low, close sa loob ng candle" } },
        { id: "b", text: { en: "Two brokers", tl: "Dalawang broker" } },
        { id: "c", text: { en: "Two indicators", tl: "Dalawang indicator" } },
        { id: "d", text: { en: "The size of the candle only", tl: "Ang laki lang ng candle" } },
      ],
      correctOptionId: "a",
      explanation: { en: "They describe the order price visits the four prices within one candle.", tl: "Inilalarawan nila ang pagkakasunod ng pagbisita ng presyo sa apat na presyo sa loob ng candle." },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: { en: "A bearish candle's internal path is…", tl: "Ang internal na daan ng bearish candle ay…" },
      options: [
        { id: "a", text: { en: "Open, Low, High, Close", tl: "Open, Low, High, Close" } },
        { id: "b", text: { en: "Open, High, Low, Close", tl: "Open, High, Low, Close" } },
        { id: "c", text: { en: "High, Low, Open, Close", tl: "High, Low, Open, Close" } },
        { id: "d", text: { en: "Close, Open, High, Low", tl: "Close, Open, High, Low" } },
      ],
      correctOptionId: "b",
      explanation: { en: "Bearish = OHLC: it pokes up to the high first, then sells down to the close.", tl: "Bearish = OHLC: tumutusok muna sa high, tapos bumababa papuntang close." },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: { en: "A bullish candle's internal path is…", tl: "Ang internal na daan ng bullish candle ay…" },
      options: [
        { id: "a", text: { en: "Open, Low, High, Close", tl: "Open, Low, High, Close" } },
        { id: "b", text: { en: "Open, High, Low, Close", tl: "Open, High, Low, Close" } },
        { id: "c", text: { en: "Low, High, Close, Open", tl: "Low, High, Close, Open" } },
        { id: "d", text: { en: "Open, High, Close, Low", tl: "Open, High, Close, Low" } },
      ],
      correctOptionId: "a",
      explanation: { en: "Bullish = OLHC: it dips to the low first, then rallies up to the close.", tl: "Bullish = OLHC: bumababa muna sa low, tapos umaakyat papuntang close." },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: { en: "The daily candle opens at…", tl: "Ang daily candle ay nag-o-open sa…" },
      options: [
        { id: "a", text: { en: "Midnight, 12am New York time", tl: "Hatinggabi, 12am New York time" } },
        { id: "b", text: { en: "8am London time", tl: "8am London time" } },
        { id: "c", text: { en: "Any time you want", tl: "Kahit anong oras" } },
        { id: "d", text: { en: "Only on Mondays", tl: "Tuwing Lunes lang" } },
      ],
      correctOptionId: "a",
      explanation: { en: "The midnight open is 12am New York time (UTC-5).", tl: "Ang midnight open ay 12am New York time (UTC-5)." },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: { en: "In a bearish day, the first push ABOVE the open is the…", tl: "Sa bearish day, ang unang tulak PATAAS sa open ay ang…" },
      options: [
        { id: "a", text: { en: "Manipulation (a sweep / stop hunt)", tl: "Manipulation (sweep / stop hunt)" } },
        { id: "b", text: { en: "The real trend", tl: "Ang totoong trend" } },
        { id: "c", text: { en: "A retracement only", tl: "Retracement lang" } },
        { id: "d", text: { en: "The close", tl: "Ang close" } },
      ],
      correctOptionId: "a",
      explanation: { en: "The poke above the open is the manipulation; the bearish close is the real move.", tl: "Ang tusok pataas sa open ay manipulation; ang bearish close ang totoong galaw." },
    },
    {
      id: "q6",
      type: "truefalse",
      prompt: { en: "The weekly candle opens on Monday and the monthly candle opens on day 1.", tl: "Ang weekly candle ay nag-o-open tuwing Lunes at ang monthly candle sa araw 1." },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: { en: "Weekly open = Monday; monthly open = the 1st. Both anchor the period.", tl: "Weekly open = Lunes; monthly open = ika-1. Pareho silang anchor ng period." },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: { en: "Why identify the midnight / weekly / monthly opens?", tl: "Bakit i-identify ang midnight / weekly / monthly opens?" },
      options: [
        { id: "a", text: { en: "They show where the manipulation happened within the period", tl: "Ipinapakita nila kung saan nangyari ang manipulation sa loob ng period" } },
        { id: "b", text: { en: "They are just decoration", tl: "Pampaganda lang sila" } },
        { id: "c", text: { en: "They guarantee profit", tl: "Sinisiguro nila ang kita" } },
        { id: "d", text: { en: "They replace stop losses", tl: "Pinapalitan nila ang stop loss" } },
      ],
      correctOptionId: "a",
      explanation: { en: "The opens reveal the manipulation within the day, week, or month.", tl: "Ipinapakita ng mga open ang manipulation sa loob ng araw, linggo, o buwan." },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: { en: "After the manipulation sweeps the high/low, a good entry is at…", tl: "Pagkatapos mag-sweep ng high/low ang manipulation, magandang entry sa…" },
      options: [
        { id: "a", text: { en: "The breaker or the FVG", tl: "Ang breaker o ang FVG" } },
        { id: "b", text: { en: "A random round number", tl: "Random na round number" } },
        { id: "c", text: { en: "The exact high", tl: "Ang mismong high" } },
        { id: "d", text: { en: "Anywhere", tl: "Kahit saan" } },
      ],
      correctOptionId: "a",
      explanation: { en: "Enter at the breaker or FVG the manipulation leaves behind, then ride the distribution.", tl: "Mag-enter sa breaker o FVG na naiwan ng manipulation, tapos sakyan ang distribution." },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: { en: "The real move after the sweep (toward the close) usually runs during…", tl: "Ang totoong galaw pagkatapos ng sweep (papuntang close) ay kadalasang tumatakbo sa…" },
      options: [
        { id: "a", text: { en: "The London and New York sessions", tl: "London at New York sessions" } },
        { id: "b", text: { en: "Weekends only", tl: "Weekends lang" } },
        { id: "c", text: { en: "Never", tl: "Hindi kailanman" } },
        { id: "d", text: { en: "Only at the monthly open", tl: "Sa monthly open lang" } },
      ],
      correctOptionId: "a",
      explanation: { en: "The distribution usually plays out during London and New York.", tl: "Kadalasan nangyayari ang distribution sa London at New York." },
    },
    {
      id: "q10",
      type: "truefalse",
      prompt: { en: "A long wick poking above the open that then closes far below means the high was the real direction.", tl: "Ang mahabang wick pataas sa open na nag-close malayo sa ibaba ay nangangahulugang ang high ang totoong direksyon." },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "f",
      explanation: { en: "False. That high was the manipulation; the bearish close is the real direction.", tl: "Mali. Ang high na iyon ay manipulation; ang bearish close ang totoong direksyon." },
    },
  ],
};
