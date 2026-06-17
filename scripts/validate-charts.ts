/**
 * Runs the chart validator over every lesson + quiz chart and prints a report.
 * Usage: npm run validate:charts   (exits non-zero if any errors — usable in CI)
 */
import { lessons } from "../src/content/lessons";
import { validateChart } from "../src/content/chart-validate";
import type { ChartSpec } from "../src/content/schema";

let errors = 0;
let warns = 0;
let charts = 0;

for (const lesson of lessons) {
  const specs: { where: string; spec: ChartSpec }[] = [];
  lesson.blocks.forEach((b, i) => {
    if (b.kind === "chart") specs.push({ where: `block #${i} (${b.spec.id})`, spec: b.spec });
  });
  lesson.quiz.forEach((q) => {
    if (q.chart) specs.push({ where: `quiz ${q.id} (${q.chart.id})`, spec: q.chart });
  });

  for (const { where, spec } of specs) {
    charts++;
    const findings = validateChart(spec);
    if (findings.length) {
      console.log(`\n${lesson.slug} → ${where}`);
      for (const f of findings) {
        console.log(`  ${f.level === "error" ? "✗ ERROR" : "⚠ warn "}  ${f.msg}`);
        if (f.level === "error") errors++;
        else warns++;
      }
    }
  }
}

console.log(`\n${"─".repeat(60)}`);
console.log(`Checked ${charts} charts → ${errors} errors, ${warns} warnings.`);
process.exit(errors ? 1 : 0);
