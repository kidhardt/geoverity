import type { Pillar } from "./structured/models";
import { pillarsSample } from "./structured/pillars.sample";
import consultingHigherEdEn from "./unstructured/consultingHigherEd.en.json";
import consultingHigherEdEs from "./unstructured/consultingHigherEd.es.json";

// Load placeholder narrative blocks for Higher Education Consulting
export function getHigherEdContent() {
  return {
    en: consultingHigherEdEn,
    es: consultingHigherEdEs
  };
}

// Load placeholder pillar definitions (structured, bilingual)
export function getPillarsSample(): Pillar[] {
  return pillarsSample;
}

export function getHigherEdSurface(lang: "en" | "es") {
  const { en, es } = getHigherEdContent();
  const chosen = lang === "en" ? en : es;
  return {
    title: chosen.title,
    summary: chosen.summary,
    lastReviewed: chosen.lastReviewed,
    translationStatus: chosen.translationStatus,
    legalSensitivity: chosen.legalSensitivity,
    disclaimer: chosen.disclaimer
  };
}
