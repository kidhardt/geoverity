import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Pillar } from "./structured/models";
import { pillarsSample } from "./structured/pillars.sample";

// __dirname polyfill for ESM/TS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJSON(relPath: string) {
  const full = path.join(__dirname, relPath);
  const raw = readFileSync(full, "utf8");
  return JSON.parse(raw);
}

// Load placeholder narrative blocks for Higher Education Consulting
export function getHigherEdContent() {
  const en = loadJSON("../data/unstructured/consultingHigherEd.en.json");
  const es = loadJSON("../data/unstructured/consultingHigherEd.es.json");
  return { en, es };
}

// Load placeholder pillar definitions (structured, bilingual)
export function getPillarsSample(): Pillar[] {
  return pillarsSample;
}
