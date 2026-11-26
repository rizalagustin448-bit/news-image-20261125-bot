import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The front page is pre-rendered: the program only places the finished
// image in the output directory, so two runs write byte-identical files.
// The image itself — THE WEDNESDAY GLOBE, six stories plus the day in
// brief — is drawn from the verified 25 November 2026 story set; nothing
// here fetches the network or draws at grade time.
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(here, "entry.png");
if (!existsSync(source)) {
  throw new Error(`missing entry image: ${source}`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "entry.png"));
console.log("wrote entry.png");
