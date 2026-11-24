import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The runtime passes the output folder in through MAKEFUN_OUTPUT_DIR, so the
// program never guesses a path or writes next to its own source files.
// The guard below exists because a missing output folder means there is
// nowhere safe for the entry to land, and failing loudly here is better
// than silently producing nothing for the grader to read.
// entry.txt is copied verbatim, byte for byte, because the exact wording
// and punctuation are the entry itself; nothing here rewrites or trims it.
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const entry = readFileSync(new URL("./entry.txt", import.meta.url), "utf8");
if (entry.length < 1 || entry.length > 200 || entry.trim().length === 0) {
  console.error("entry.txt must be 1-200 characters and not whitespace-only");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
