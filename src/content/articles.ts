/**
 * Cornerstone SEO articles ("guides"). English, beginner-first, and FAITHFUL to the
 * course lessons + glossary (no invented SMC rules). These are top-of-funnel pages that
 * target high-intent searches and funnel readers into the free course.
 *
 * Typed TS objects (same convention as lessons/glossary), not MDX.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string };

export type Article = {
  slug: string;
  title: string; // H1 + <title>
  description: string; // meta description (~150 chars)
  excerpt: string; // shown on the index card
  updated: string; // ISO date
  readMinutes: number;
  /** Internal links rendered at the foot of the article. */
  lessonSlug?: string;
  glossarySlugs?: string[];
  relatedGuides?: string[];
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "what-is-smart-money-concepts",
    title: "What Is Smart Money Concepts (SMC) Trading? A Beginner's Guide",
    description:
      "Smart Money Concepts (SMC) is a way of reading charts based on how large institutions move price through structure, liquidity, and imbalance. Learn the basics, free.",
    excerpt:
      "A plain-English introduction to SMC: what it is, why it's different from indicator trading, and the core ideas (structure, liquidity, order blocks, FVGs).",
    updated: "2026-06-18",
    readMinutes: 7,
    lessonSlug: "how-to-read-charts",
    glossarySlugs: ["smart-money-concepts", "market-structure", "liquidity", "order-block", "fair-value-gap"],
    relatedGuides: ["order-blocks-explained", "fair-value-gaps-explained", "liquidity-in-trading"],
    body: [
      {
        type: "p",
        text: "Smart Money Concepts (SMC) is a way of reading price charts that follows how large institutions move the market, rather than relying on classic retail indicators like moving averages or RSI. Instead of asking \"what is this indicator telling me?\", SMC asks \"where is price likely to go to fill large orders, and how can I read that on the chart?\"",
      },
      {
        type: "callout",
        text: "In short: SMC reads charts through market structure, liquidity, and imbalance — the footprints big players leave behind.",
      },
      {
        type: "h2",
        text: "Why traders move from indicators to SMC",
      },
      {
        type: "p",
        text: "Indicators are calculated from past price, so they always lag. SMC focuses on price itself: the highs and lows, the impulsive moves, and the areas where orders are resting. The goal is to understand the intent behind a move, not to react to a lagging signal.",
      },
      {
        type: "h2",
        text: "The core building blocks of SMC",
      },
      {
        type: "p",
        text: "You don't need everything at once. SMC is built from a small set of ideas that stack together:",
      },
      {
        type: "list",
        items: [
          "Market structure — the sequence of swing highs and lows. Higher highs and higher lows is bullish; lower highs and lower lows is bearish.",
          "Liquidity — resting orders (stop losses and pending orders) clustered above highs and below lows, which price is often drawn toward.",
          "Order blocks — the last opposite-color candle before a strong move, marking a zone price often returns to.",
          "Fair value gaps (FVGs) — gaps left by fast, one-sided moves that price tends to come back and rebalance.",
          "Premium and discount — splitting a range at its 50% midpoint to judge whether price is expensive (premium) or cheap (discount).",
        ],
      },
      {
        type: "h2",
        text: "How a typical SMC idea reads",
      },
      {
        type: "p",
        text: "A common sequence: price runs above an obvious high to grab liquidity (a sweep), then shifts structure in the other direction, then returns to an order block or fair value gap before continuing. Each of those steps is a concept you can learn and practice one at a time.",
      },
      {
        type: "p",
        text: "None of this is a guarantee — SMC is a framework for reading probability, not certainty. Risk management (knowing your risk-to-reward before you enter) matters just as much as the chart reading.",
      },
      {
        type: "h2",
        text: "How to start learning SMC for free",
      },
      {
        type: "p",
        text: "The fastest way to learn is one concept at a time, with charts you can step through. Start with how to read a candle and basic market structure, then add liquidity, order blocks, and fair value gaps. The free course below walks through each with interactive charts and a short quiz, in English and Taglish.",
      },
    ],
  },
  {
    slug: "order-blocks-explained",
    title: "Order Blocks Explained: What They Are and How to Spot Them",
    description:
      "An order block is the last opposite-color candle before a strong impulse move. Learn what order blocks are, how to identify them, and how price reacts to them.",
    excerpt:
      "What an order block is, how to find it on any chart, and why price so often returns to it before continuing.",
    updated: "2026-06-18",
    readMinutes: 6,
    lessonSlug: "order-blocks",
    glossarySlugs: ["order-block", "fair-value-gap", "mitigation", "displacement"],
    relatedGuides: ["what-is-smart-money-concepts", "fair-value-gaps-explained"],
    body: [
      {
        type: "p",
        text: "An order block is one of the most useful zones in Smart Money Concepts. It marks an area where a strong move began — and price often returns to that area before continuing in the same direction.",
      },
      {
        type: "callout",
        text: "Definition: an order block is the last opposite-color candle before a strong impulsive move. Its body marks the zone.",
      },
      {
        type: "h2",
        text: "How to identify an order block",
      },
      {
        type: "list",
        items: [
          "Find a strong, impulsive move (a sharp push in one direction).",
          "Look at the candle right before that move started.",
          "For a bullish order block, it's the last down-close (red) candle before price rallied up.",
          "For a bearish order block, it's the last up-close (green) candle before price dropped.",
          "The body of that candle is the order block zone.",
        ],
      },
      {
        type: "h2",
        text: "Why price returns to order blocks",
      },
      {
        type: "p",
        text: "A strong move often leaves orders unfilled. Price coming back to the order block lets those orders get filled — this return is called mitigation. After mitigating, price frequently continues in the direction of the original impulse.",
      },
      {
        type: "h2",
        text: "Order blocks and fair value gaps work together",
      },
      {
        type: "p",
        text: "An impulsive move that creates an order block usually also leaves a fair value gap (an imbalance). When an order block and a fair value gap line up, you have a stronger, higher-probability zone. That overlap is one of the cleaner setups in SMC.",
      },
      {
        type: "p",
        text: "Remember: an order block is a zone of interest, not an automatic trade. Traders wait for price to reach the zone and then look for confirmation, always with a planned risk-to-reward.",
      },
      {
        type: "h2",
        text: "Practice spotting order blocks",
      },
      {
        type: "p",
        text: "The skill is pattern recognition, and it comes from repetition. The free lesson below lets you step through annotated charts that mark the order block, the impulse, and the return, so you can train your eye.",
      },
    ],
  },
  {
    slug: "fair-value-gaps-explained",
    title: "Fair Value Gaps (FVG) Explained for Beginners",
    description:
      "A fair value gap is a three-candle imbalance left by a fast move. Learn how to spot an FVG, why price returns to rebalance it, and how it fits the SMC method.",
    excerpt:
      "What a fair value gap is, the simple three-candle rule to spot one, and why price keeps coming back to fill it.",
    updated: "2026-06-18",
    readMinutes: 6,
    lessonSlug: "fair-value-gap",
    glossarySlugs: ["fair-value-gap", "displacement", "order-block", "mitigation"],
    relatedGuides: ["what-is-smart-money-concepts", "order-blocks-explained"],
    body: [
      {
        type: "p",
        text: "A fair value gap (FVG), sometimes called an imbalance, is a small gap left behind by a fast, one-sided move. It's one of the first SMC concepts beginners can spot reliably because it has a clear, mechanical rule.",
      },
      {
        type: "callout",
        text: "Definition: a fair value gap is a three-candle gap where the first and third candles do not overlap, leaving a gap on the middle candle.",
      },
      {
        type: "h2",
        text: "The three-candle rule",
      },
      {
        type: "list",
        items: [
          "Look at three candles in a row during a strong move.",
          "Check the wick of the first candle and the wick of the third candle.",
          "If they do not overlap, the empty space on the middle candle is the fair value gap.",
          "A bullish FVG forms on the way up; a bearish FVG forms on the way down.",
        ],
      },
      {
        type: "h2",
        text: "Why fair value gaps get filled",
      },
      {
        type: "p",
        text: "A fast move can leave price 'unbalanced' — it moved so quickly that not everyone who wanted to trade got filled. Price often returns to rebalance that gap before continuing. That return is what traders watch for.",
      },
      {
        type: "h2",
        text: "Displacement: the move that creates an FVG",
      },
      {
        type: "p",
        text: "Fair value gaps are created by displacement — a strong, one-sided move that usually breaks structure. When you see displacement that breaks structure and leaves an FVG, it signals aggressive intent and gives you a zone to watch on the pullback.",
      },
      {
        type: "p",
        text: "As always, the gap is a zone of interest, not a guaranteed entry. Combine it with structure and a clear risk-to-reward plan.",
      },
      {
        type: "h2",
        text: "See fair value gaps on real charts",
      },
      {
        type: "p",
        text: "The free lesson below animates the three-candle rule so you can see exactly where the gap forms and how price reacts when it returns. It's available in English and Taglish.",
      },
    ],
  },
  {
    slug: "liquidity-in-trading",
    title: "Liquidity in Trading: Buy-Side, Sell-Side, and Liquidity Sweeps",
    description:
      "Liquidity is the resting orders above highs and below lows that price is drawn toward. Learn buy-side vs sell-side liquidity and how liquidity sweeps work in SMC.",
    excerpt:
      "Where liquidity sits, the difference between buy-side and sell-side, and why price so often sweeps a high or low before reversing.",
    updated: "2026-06-18",
    readMinutes: 7,
    lessonSlug: "liquidity",
    glossarySlugs: ["liquidity", "buy-side-liquidity", "sell-side-liquidity", "liquidity-pool", "liquidity-sweep", "inducement"],
    relatedGuides: ["what-is-smart-money-concepts", "order-blocks-explained"],
    body: [
      {
        type: "p",
        text: "Liquidity is one of the ideas that makes Smart Money Concepts 'click' for a lot of traders. Once you can see where liquidity rests, a lot of seemingly random price moves start to make sense.",
      },
      {
        type: "callout",
        text: "Definition: liquidity is resting orders that price can fill — usually clustered above highs and below lows, where stop losses and pending orders sit.",
      },
      {
        type: "h2",
        text: "Buy-side vs sell-side liquidity",
      },
      {
        type: "list",
        items: [
          "Buy-side liquidity (BSL) rests above a high — buy stops and breakout buy orders. Price often runs up into it before reversing.",
          "Sell-side liquidity (SSL) rests below a low — sell stops and breakout sell orders. Price often dips down into it before reversing.",
        ],
      },
      {
        type: "p",
        text: "When you see two or more equal highs or equal lows, orders pile up there and it becomes an obvious target — this is a liquidity pool.",
      },
      {
        type: "h2",
        text: "What is a liquidity sweep?",
      },
      {
        type: "p",
        text: "A liquidity sweep (also called a stop hunt or liquidity grab) is a quick push beyond a high or low that grabs the resting orders there, then reverses. It's how large positions get filled: by pushing into the orders waiting just beyond an obvious level.",
      },
      {
        type: "h2",
        text: "Inducement: the trap before the move",
      },
      {
        type: "p",
        text: "Inducement is an obvious-looking high or low that tempts traders to enter early. That early entry creates the very liquidity price then sweeps before making the real move. Recognising inducement helps you avoid getting trapped on the wrong side.",
      },
      {
        type: "p",
        text: "Liquidity tells you where price may be drawn; it doesn't replace structure or risk management. The strongest reads combine a liquidity sweep with a structure shift and a clean zone to react from.",
      },
      {
        type: "h2",
        text: "Learn to read liquidity for free",
      },
      {
        type: "p",
        text: "The free lesson below shows liquidity above highs and below lows on annotated charts, then walks through a sweep step by step — in English and Taglish.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
