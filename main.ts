import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

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
