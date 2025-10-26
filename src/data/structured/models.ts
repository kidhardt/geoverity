/**
 * GeoVerity 2026 Data Models (Structured)
 * These interfaces define how we represent consulting pillars,
 * deliverables, and focus areas in both English and Spanish.
 *
 * Rules:
 * - Fields that are human-readable must have *_en and *_es variants.
 * - Shared factual fields (ids, slugs, flags) are language-agnostic.
 */

export interface Deliverable {
  id: string; // stable key, e.g. "authorized-llm"
  title_en: string;
  title_es: string;
  summary_en: string;
  summary_es: string;
  sensitivityLevel: "normal" | "high-sensitivity";
}

export interface Pillar {
  id: string; // e.g. "higher-education-consulting"
  slug_en: string; // e.g. "/higher-education-consulting/"
  slug_es: string; // e.g. "/es/consultoria-academica/"
  name_en: string;
  name_es: string;
  description_en: string;
  description_es: string;
  deliverables: Deliverable[];
  // In future we may attach governance flags, accreditation relevance, etc.
}
