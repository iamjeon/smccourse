/**
 * Lesson registry — the single ordered list of all lessons in the course.
 * Order here = curriculum order (drives prev/next nav and module grouping).
 *
 * To add a lesson: author `./<slug>.ts` (use the smc-lesson-builder agent /
 * smc-content skill), import it here, and place it in the right position.
 *
 * Module 0 (Basic Trading Course) is fully authored. Parts 1–4 are produced via the
 * content pipeline and registered here as each is completed.
 */
import type { Lesson } from "../schema";

import { lesson as howToReadCharts } from "./how-to-read-charts";
import { lesson as marketStructure1 } from "./market-structure-1";
import { lesson as marketStructure2 } from "./market-structure-2";
import { lesson as msbMss } from "./msb-mss";
import { lesson as liquidity } from "./liquidity";
import { lesson as fairValueGap } from "./fair-value-gap";
import { lesson as orderBlocks } from "./order-blocks";

// ── Part 1 · Market Foundations ──
import { lesson as statesOfTheMarket } from "./states-of-the-market";
import { lesson as ohlcOlhc } from "./ohlc-olhc";
import { lesson as liquidityPools } from "./liquidity-pools";

// ── Part 2 · Order Flow & Structure ──
import { lesson as orderFlow } from "./order-flow";
import { lesson as generatedLiquidity } from "./generated-liquidity";
import { lesson as erlIrl } from "./erl-irl";
import { lesson as marketStructureP2 } from "./market-structure-p2";
import { lesson as smtDivergence } from "./smt-divergence";
import { lesson as standardDeviationProjection } from "./standard-deviation-projection";

// ── Part 3 · Models & Entries ──
import { lesson as mmxms } from "./mmxms";
import { lesson as catchingExpansions } from "./catching-expansions";
import { lesson as entryPatterns } from "./entry-patterns";
import { lesson as combiningEverything } from "./combining-everything";

// ── Part 4 · Trade Models & Sessions ──
import { lesson as asianSession } from "./asian-session";
import { lesson as mainModel } from "./main-model";
import { lesson as previousDayModel } from "./previous-day-model";

export const lessons: Lesson[] = [
  // ── Module 0 · Basic Trading Course ──
  howToReadCharts,
  marketStructure1,
  marketStructure2,
  msbMss,
  liquidity,
  fairValueGap,
  orderBlocks,
  // ── Part 1 · Market Foundations ──
  statesOfTheMarket,
  ohlcOlhc,
  liquidityPools,
  // ── Part 2 · Order Flow & Structure ──
  orderFlow,
  generatedLiquidity,
  erlIrl,
  marketStructureP2,
  smtDivergence,
  standardDeviationProjection,
  // ── Part 3 · Models & Entries ──
  mmxms,
  catchingExpansions,
  entryPatterns,
  combiningEverything,
  // ── Part 4 · Trade Models & Sessions ──
  asianSession,
  mainModel,
  previousDayModel,
];
