/**
 * Coverage smoke test. Every lesson file MUST carry a `// COVERAGE` checklist that maps each
 * transcript point/tip/example to where it is taught. Fails (exit 1) if any lesson is missing
 * the block, has no items, or still has unchecked `// [ ]` items. Run: npm run check:coverage
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "src", "content", "lessons");
const files = readdirSync(dir).filter((f) => f.endsWith(".ts") && f !== "index.ts");

let failing = 0;
for (const f of files.sort()) {
  const text = readFileSync(join(dir, f), "utf8");
  const hasBlock = /\/\/\s*COVERAGE/i.test(text);
  const items = text.match(/^\s*\/\/\s*\[[ xX]\]/gm) ?? [];
  const unchecked = text.match(/^\s*\/\/\s*\[ \]/gm) ?? [];
  const ok = hasBlock && items.length > 0 && unchecked.length === 0;
  if (!ok) failing++;
  let reason = "";
  if (!hasBlock) reason = " — missing `// COVERAGE` block";
  else if (items.length === 0) reason = " — COVERAGE block has no `// [x]` items";
  else if (unchecked.length) reason = ` — ${unchecked.length} unchecked \`// [ ]\` item(s)`;
  console.log(`  ${ok ? "OK  " : "FAIL"} ${f}  (${items.length} items)${reason}`);
}

console.log(
  `\n${"-".repeat(60)}\nChecked ${files.length} lessons → ${failing} failing.`,
);
process.exit(failing ? 1 : 0);
