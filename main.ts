// main.ts copies the one-sentence entry from entry.txt to MAKEFUN_OUTPUT_DIR/entry.txt.
// It validates length (max 240 code points) and rejects empty or whitespace-only entries.
// The entry is copied byte-for-byte: no characters are added, removed, or re-encoded.
// The output path comes from MAKEFUN_OUTPUT_DIR, so the script works from any cwd.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const entryPath = join(dirname(fileURLToPath(import.meta.url)), "entry.txt");
const text = readFileSync(entryPath, "utf-8");

if (text.trim().length === 0) {
  console.error("entry.txt is empty or whitespace-only");
  process.exit(1);
}

if (Array.from(text).length > 240) {
  console.error(`entry.txt exceeds 240 code points (${Array.from(text).length})`);
  process.exit(1);
}

writeFileSync(join(outDir, "entry.txt"), text, "utf-8");
