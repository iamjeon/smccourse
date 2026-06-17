// Beginner primer (no transcript): teaches absolute basics of reading our charts.
// Placed first so every later lesson can build on it (with reminders, never assuming).
// COVERAGE (source: beginner primer, authored) — concepts mapped:
// [x] a candle = one slice of time -> chart step 1 + Q1
// [x] body = open to close -> chart step 2 + Q2, Q3
// [x] wicks = highest/lowest price -> chart step 3 + Q4, Q7
// [x] green = closed up, red = closed down -> chart step 4 + tip callout + Q5, Q6
// [x] read left to right (time flow) -> chart step 5 + Q10
// [x] our marks: shaded box = zone, dashed line = key level -> chart step 5 + Q8, Q9
import type { Lesson } from "../schema";

export const lesson: Lesson = {
  slug: "how-to-read-charts",
  moduleSlug: "basics",
  title: { en: "How to Read a Candlestick Chart", tl: "Paano Basahin ang Candlestick Chart" },
  summary: {
    en: "Start here. What a candlestick is, the body and wicks, green vs red, and what the boxes and lines in our charts mean. No prior knowledge needed.",
    tl: "Magsimula dito. Ano ang candlestick, ang body at wicks, green vs red, at ano ang ibig sabihin ng mga box at linya sa charts natin. Walang kailangang dating alam.",
  },
  estMinutes: 6,
  sourceFile: "(beginner primer, authored)",
  blocks: [
    {
      kind: "paragraph",
      text: {
        en: "A price chart can look scary at first, but it is just a row of little bars called candlesticks. Each candlestick tells you four things about one slice of time: where price opened, where it closed, the highest it went, and the lowest. Let's walk through one slowly.",
        tl: "Nakakatakot tingnan ang chart sa simula, pero hilera lang ito ng maliliit na bar na tinatawag na candlesticks. Bawat candlestick ay nagsasabi ng apat na bagay para sa isang piraso ng oras: saan nag-open ang price, saan nag-close, ang pinakataas, at ang pinakababa. Dahan-dahan nating tingnan ang isa.",
      },
    },
    {
      kind: "chart",
      spec: {
        id: "candle-anatomy",
        title: { en: "Anatomy of a candlestick", tl: "Mga bahagi ng candlestick" },
        height: 360,
        candles: [
          { o: 106, h: 112, l: 104, c: 110 },
          { o: 110, h: 111, l: 102, c: 104 },
          { o: 104, h: 108, l: 103, c: 107 },
          { o: 107, h: 109, l: 101, c: 103 },
          { o: 103, h: 110, l: 102, c: 109 },
          { o: 109, h: 114, l: 108, c: 113 },
        ],
        annotations: [
          { type: "box", kind: "zone", from: 0, to: 0, top: 110, bottom: 106, tone: "zone", label: { en: "Body", tl: "Body" }, appearAtStep: 1 },
          { type: "label", index: 0, price: 116, text: { en: "Highest price", tl: "Pinakataas" }, tone: "neutral", appearAtStep: 2 },
          { type: "label", index: 0, price: 99, text: { en: "Lowest price", tl: "Pinakababa" }, tone: "neutral", appearAtStep: 2 },
          { type: "box", kind: "zone", from: 4, to: 5, top: 114, bottom: 108, tone: "zone", label: { en: "A zone we watch", tl: "Zone na binabantayan" }, appearAtStep: 4 },
          { type: "line", kind: "level", price: 108, from: 4, to: 5, tone: "neutral", dashed: true, label: { en: "A key level", tl: "Key level" }, appearAtStep: 4 },
        ],
        steps: [
          { caption: { en: "This is ONE candlestick. It shows what price did during one slice of time (say, one hour). Tap Next to take it apart.", tl: "Ito ay ISANG candlestick. Ipinapakita nito ang ginawa ng price sa isang piraso ng oras (halimbawa, isang oras). I-tap ang Next para hatiin ito." }, revealCandles: 1 },
          { caption: { en: "The fat middle is the BODY. It runs from the OPEN price (where the hour started) to the CLOSE price (where it ended).", tl: "Ang matabang gitna ay ang BODY. Mula ito sa OPEN price (simula ng oras) hanggang sa CLOSE price (katapusan)." }, revealCandles: 1 },
          { caption: { en: "The thin lines sticking out are the WICKS. The very top is the HIGHEST price reached that hour; the very bottom is the LOWEST.", tl: "Ang manipis na linyang nakausli ay ang WICKS. Ang pinakatuktok ay ang PINAKATAAS na price; ang pinakailalim ay ang PINAKABABA." }, revealCandles: 1 },
          { caption: { en: "Colour shows direction. This first candle is GREEN: it CLOSED HIGHER than it opened (price went up). The next one is RED: it closed LOWER (price went down).", tl: "Ang kulay ay direksyon. GREEN ang unang candle: NAG-CLOSE itong MAS MATAAS kaysa open (umakyat). Ang sunod ay RED: nag-close nang MAS MABABA (bumaba)." }, revealCandles: 2 },
          { caption: { en: "We read candles left to right, oldest to newest. Together they tell price's story. In our charts, a shaded BOX marks an area we care about, and a dashed LINE marks a key price level.", tl: "Binabasa natin ang candles mula kaliwa pakanan, pinakaluma hanggang pinakabago. Sama-sama, kwento ng price ang dala nila. Sa charts natin, ang naka-shade na BOX ay area na binabantayan, at ang putol-putol na LINYA ay key price level." }, revealCandles: 6 },
        ],
        caption: {
          en: "Body = open to close. Wicks = the highest and lowest price. Green = closed up, red = closed down. Boxes mark zones; dashed lines mark levels.",
          tl: "Body = open hanggang close. Wicks = pinakataas at pinakababang price. Green = nag-close pataas, red = pababa. Box = zone; putol-putol na linya = level.",
        },
      },
    },
    {
      kind: "callout",
      tone: "tip",
      title: { en: "The one rule to remember", tl: "Ang isang rule na tandaan" },
      text: {
        en: "Green candle = price closed higher than it opened. Red candle = price closed lower. The body shows open-to-close; the wicks show how far price stretched up and down before settling.",
        tl: "Green candle = nag-close nang mas mataas kaysa open. Red candle = mas mababa. Ang body ang open-to-close; ang wicks ang abot ng price pataas at pababa bago tumigil.",
      },
    },
    {
      kind: "paragraph",
      text: {
        en: "That's everything you need to start. From here on, when you see a tall green candle you know price pushed up strongly; a long lower wick means price dipped then got bought back up. Every lesson will point at the exact candles and explain what they mean, step by step.",
        tl: "Iyon na ang kailangan mo para magsimula. Mula ngayon, kapag may mataas na green candle, alam mong malakas na umakyat ang price; ang mahabang lower wick ay ibig sabihin bumaba tapos binili pabalik. Bawat lesson ay ituturo ang eksaktong candles at ipapaliwanag kung ano ang ibig sabihin, hakbang-hakbang.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      type: "mcq",
      prompt: { en: "A single candlestick shows price for…", tl: "Ang isang candlestick ay nagpapakita ng price para sa…" },
      options: [
        { id: "a", text: { en: "One slice of time", tl: "Isang piraso ng oras" } },
        { id: "b", text: { en: "A whole year", tl: "Isang buong taon" } },
        { id: "c", text: { en: "Only the news", tl: "Balita lang" } },
        { id: "d", text: { en: "Nothing useful", tl: "Walang silbi" } },
      ],
      correctOptionId: "a",
      explanation: { en: "Each candle covers one slice of time (e.g. an hour or a day).", tl: "Bawat candle ay isang piraso ng oras (hal. isang oras o isang araw)." },
    },
    {
      id: "q2",
      type: "mcq",
      prompt: { en: "The fat middle part of a candle is called the…", tl: "Ang matabang gitna ng candle ay tinatawag na…" },
      options: [
        { id: "a", text: { en: "Wick", tl: "Wick" } },
        { id: "b", text: { en: "Body", tl: "Body" } },
        { id: "c", text: { en: "Level", tl: "Level" } },
        { id: "d", text: { en: "Zone", tl: "Zone" } },
      ],
      correctOptionId: "b",
      explanation: { en: "The body is the fat part, from open to close.", tl: "Ang body ang matabang bahagi, open hanggang close." },
    },
    {
      id: "q3",
      type: "mcq",
      prompt: { en: "The body of a candle runs from…", tl: "Ang body ng candle ay mula…" },
      options: [
        { id: "a", text: { en: "High to low", tl: "High papuntang low" } },
        { id: "b", text: { en: "Open to close", tl: "Open papuntang close" } },
        { id: "c", text: { en: "Left to right", tl: "Kaliwa pakanan" } },
        { id: "d", text: { en: "Top to bottom of the screen", tl: "Taas papuntang baba ng screen" } },
      ],
      correctOptionId: "b",
      explanation: { en: "Body = open price to close price.", tl: "Body = open price hanggang close price." },
    },
    {
      id: "q4",
      type: "mcq",
      prompt: { en: "The thin lines sticking out of the body are the…", tl: "Ang manipis na linyang nakausli sa body ay ang…" },
      options: [
        { id: "a", text: { en: "Wicks (shadows)", tl: "Wicks (shadows)" } },
        { id: "b", text: { en: "Bodies", tl: "Bodies" } },
        { id: "c", text: { en: "Trendlines", tl: "Trendlines" } },
        { id: "d", text: { en: "Order blocks", tl: "Order blocks" } },
      ],
      correctOptionId: "a",
      explanation: { en: "Wicks (also called shadows) reach the highest and lowest prices.", tl: "Ang wicks (o shadows) ay umaabot sa pinakataas at pinakababang price." },
    },
    {
      id: "q5",
      type: "mcq",
      prompt: { en: "A GREEN candle means price closed…", tl: "Ang GREEN candle ay nangangahulugang nag-close ang price nang…" },
      options: [
        { id: "a", text: { en: "Lower than it opened", tl: "Mas mababa kaysa open" } },
        { id: "b", text: { en: "Higher than it opened", tl: "Mas mataas kaysa open" } },
        { id: "c", text: { en: "Exactly at the open", tl: "Eksakto sa open" } },
        { id: "d", text: { en: "It is random", tl: "Random lang" } },
      ],
      correctOptionId: "b",
      explanation: { en: "Green = closed higher than open (price went up).", tl: "Green = nag-close nang mas mataas kaysa open (umakyat)." },
    },
    {
      id: "q6",
      type: "mcq",
      prompt: { en: "A RED candle means price closed…", tl: "Ang RED candle ay nangangahulugang nag-close ang price nang…" },
      options: [
        { id: "a", text: { en: "Higher than it opened", tl: "Mas mataas kaysa open" } },
        { id: "b", text: { en: "Lower than it opened", tl: "Mas mababa kaysa open" } },
        { id: "c", text: { en: "On a weekend only", tl: "Tuwing weekend lang" } },
        { id: "d", text: { en: "At the highest price", tl: "Sa pinakataas na price" } },
      ],
      correctOptionId: "b",
      explanation: { en: "Red = closed lower than open (price went down).", tl: "Red = nag-close nang mas mababa kaysa open (bumaba)." },
    },
    {
      id: "q7",
      type: "mcq",
      prompt: { en: "The very top of the upper wick shows the…", tl: "Ang pinakatuktok ng upper wick ay nagpapakita ng…" },
      options: [
        { id: "a", text: { en: "Highest price reached", tl: "Pinakataas na price na naabot" } },
        { id: "b", text: { en: "Closing price", tl: "Closing price" } },
        { id: "c", text: { en: "Opening price", tl: "Opening price" } },
        { id: "d", text: { en: "Average price", tl: "Average price" } },
      ],
      correctOptionId: "a",
      explanation: { en: "The top of the wick is the highest price in that period.", tl: "Ang tuktok ng wick ang pinakataas na price sa period na iyon." },
    },
    {
      id: "q8",
      type: "mcq",
      prompt: { en: "In our charts, a shaded box marks…", tl: "Sa charts natin, ang naka-shade na box ay…" },
      options: [
        { id: "a", text: { en: "An area or zone we care about", tl: "Area o zone na binabantayan" } },
        { id: "b", text: { en: "A mistake", tl: "Pagkakamali" } },
        { id: "c", text: { en: "The volume", tl: "Ang volume" } },
        { id: "d", text: { en: "A single candle's color", tl: "Kulay ng isang candle" } },
      ],
      correctOptionId: "a",
      explanation: { en: "A shaded box highlights a zone or area we are watching.", tl: "Ang naka-shade na box ay zone o area na binabantayan natin." },
    },
    {
      id: "q9",
      type: "mcq",
      prompt: { en: "A dashed horizontal line in our charts marks…", tl: "Ang putol-putol na pahalang na linya sa charts natin ay…" },
      options: [
        { id: "a", text: { en: "A key price level", tl: "Isang key price level" } },
        { id: "b", text: { en: "The time of day", tl: "Oras ng araw" } },
        { id: "c", text: { en: "A green candle", tl: "Isang green candle" } },
        { id: "d", text: { en: "Nothing", tl: "Wala" } },
      ],
      correctOptionId: "a",
      explanation: { en: "A dashed line marks a key price level we are tracking.", tl: "Ang putol-putol na linya ay key price level na sinusubaybayan." },
    },
    {
      id: "q10",
      type: "truefalse",
      prompt: { en: "We read a chart from left to right, oldest candle to newest.", tl: "Binabasa ang chart mula kaliwa pakanan, pinakalumang candle hanggang pinakabago." },
      options: [
        { id: "t", text: { en: "True", tl: "Tama" } },
        { id: "f", text: { en: "False", tl: "Mali" } },
      ],
      correctOptionId: "t",
      explanation: { en: "Time moves left to right; the newest candle is on the right.", tl: "Pakanan ang daloy ng oras; nasa kanan ang pinakabagong candle." },
    },
  ],
};
