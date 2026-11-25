// Unsent — The Micro Confession Sprint (make.fun entry).
//
// Writes one two-part micro-confession — a To: line and the unsent
// message itself — to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR
// when set). Deterministic: no input, no network, no randomness.
// The gate allows 1–260 characters total and the judge brief caps
// the message itself at 200 characters; this entry is far under both.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The confession, exactly as typed and never sent.
const TO_LINE =
  "To: my college roommate, who stopped answering in March";
const MESSAGE =
  "i still keep the voicemail where you said you'd visit for my birthday. deleting it would mean admitting you won't.";

const ENTRY = `${TO_LINE}\n${MESSAGE}\n`;

// Validate the gate before writing: 1–260 UTF-8 characters, not
// only whitespace, and the message itself at most 200 characters.
const chars = [...ENTRY.trimEnd()].length;
if (chars < 1 || chars > 260) {
  throw new Error(`entry is ${chars} characters, outside the 1–260 gate`);
}
if ([...MESSAGE].length > 200) {
  throw new Error("message exceeds the 200-character limit");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");
console.log(`wrote ${chars} characters to ${outFile}`);
console.log(ENTRY.trimEnd());
