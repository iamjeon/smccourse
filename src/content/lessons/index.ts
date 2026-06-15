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

import { lesson as marketStructure1 } from "./market-structure-1";
import { lesson as marketStructure2 } from "./market-structure-2";
import { lesson as msbMss } from "./msb-mss";
import { lesson as liquidity } from "./liquidity";
import { lesson as fairValueGap } from "./fair-value-gap";
import { lesson as orderBlocks } from "./order-blocks";

export const lessons: Lesson[] = [
  // ── Module 0 · Basic Trading Course ──
  marketStructure1,
  marketStructure2,
  msbMss,
  liquidity,
  fairValueGap,
  orderBlocks,
];
