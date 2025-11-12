/**
 * Replace imports in src/ from "@/components/ui/..." to "@repo/ui/..."
 *
 * Safe usage:
 * - Commit or stash changes before running.
 * - Run `node scripts/replace-imports.js --dry-run` to preview diffs.
 *
 * Behavior:
 * - Replaces import source strings only.
 * - Preserves subpaths: '@/components/ui/button' -> '@repo/ui/button'
 * - Replaces root '@/components/ui' -> '@repo/ui'
 */

import fs from "fs";
import path from "path";
import { globSync } from "glob";

const ROOT = process.cwd();
const SRC_GLOB = "src/**/*.@(ts|tsx|js|jsx)";
const DRY_RUN = process.argv.includes("--dry-run") || process.env.DRY_RUN === "1";

function transform(contents) {
  let changed = false;
  const re1 = /(['"])@\/components\/ui\/([^'"]+)\1/g;
  const re2 = /(['"])@\/components\/ui\1/g;

  const newContents = contents
    .replace(re1, (m, q, rest) => {
      changed = true;
      return `${q}@repo/ui/${rest}${q}`;
    })
    .replace(re2, (m, q) => {
      changed = true;
      return `${q}@repo/ui${q}`;
    });

  return { newContents, changed };
}

function run() {
  console.log("Searching files:", SRC_GLOB);
  const files = globSync(SRC_GLOB, { nodir: true, absolute: true });
  if (!files.length) {
    console.log("No files found. Exiting.");
    return;
  }
  const modified = [];
  files.forEach((f) => {
    const raw = fs.readFileSync(f, "utf8");
    const { newContents, changed } = transform(raw);
    if (changed) {
      modified.push(path.relative(ROOT, f));
      if (!DRY_RUN) {
        fs.writeFileSync(f, newContents, "utf8");
      }
    }
  });

  if (!modified.length) {
    console.log("No imports to update.");
    return;
  }

  console.log(`${modified.length} file(s) updated:`);
  modified.forEach((m) => console.log(" -", m));

  if (DRY_RUN) {
    console.log("\nDry-run complete. No files modified. Re-run without --dry-run to apply changes.");
  } else {
    console.log("\nApplied changes. Please run TypeScript build and tests, review, then commit.");
  }
}

run();
