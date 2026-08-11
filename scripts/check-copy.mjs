#!/usr/bin/env node
/**
 * Copy guard.
 *
 * Hard fail: em dashes in anything that renders. ATALNT's house style has no
 * em dashes on the site. Code comments are stripped before checking, since
 * those never reach a reader.
 *
 * Warning: phrases that make copy read like it was generated rather than
 * written. Not failures, just worth a second look.
 *
 * Run: npm run check:copy
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const DIRS = ["app", "components", "lib"];
const EXT = /\.(tsx?|mdx?)$/;

/** Phrases that read as machine-written. Warn only. */
const TELLS = [
  "delve",
  "seamless",
  "seamlessly",
  "leverage the",
  "unlock the power",
  "elevate your",
  "in today's fast-paced",
  "it's not just",
  "it's not merely",
  "more than just a",
  "revolutionize",
  "game-changer",
  "cutting-edge",
  "robust solution",
  "tapestry",
  "testament to",
  "navigate the complexities",
  "at the end of the day",
  "supercharge",
  "empower your team",
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (EXT.test(name)) out.push(p);
  }
  return out;
}

/** Blank out comments so we only inspect text that can render. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) =>
      p1 + " ".repeat(m.length - p1.length)
    );
}

const emDashHits = [];
const tellHits = [];

for (const dir of DIRS) {
  let files;
  try {
    files = walk(join(ROOT, dir));
  } catch {
    continue;
  }

  for (const file of files) {
    const raw = readFileSync(file, "utf8");
    const code = stripComments(raw);
    const rel = relative(ROOT, file);

    code.split("\n").forEach((line, i) => {
      if (line.includes("—")) {
        emDashHits.push(`${rel}:${i + 1}  ${line.trim().slice(0, 100)}`);
      }
      const lower = line.toLowerCase();
      for (const t of TELLS) {
        if (lower.includes(t)) {
          tellHits.push(`${rel}:${i + 1}  "${t}"`);
        }
      }
    });
  }
}

if (tellHits.length) {
  console.warn(`\n⚠  ${tellHits.length} phrase(s) that read as AI-written:`);
  tellHits.forEach((h) => console.warn("   " + h));
}

if (emDashHits.length) {
  console.error(`\n✗ ${emDashHits.length} em dash(es) in rendered copy:`);
  emDashHits.forEach((h) => console.error("   " + h));
  console.error("\nUse a comma, a period, or a colon instead.\n");
  process.exit(1);
}

console.log("✓ No em dashes in rendered copy.");
if (!tellHits.length) console.log("✓ No AI-tell phrases found.");
