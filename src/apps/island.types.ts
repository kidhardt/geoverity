/**
 * GeoVerity 2026
 * Contract for React "islands"
 *
 * Each island:
 * - is self-contained
 * - can be mounted into Astro pages
 * - must expose bilingual UI strings
 * - must declare sensitivity level for governance
 */

export type SensitivityLevel = "normal" | "high-sensitivity";

export interface IslandStrings {
  heading: string;
  subheading: string;
  ctaLabel?: string;
  disclaimer?: string;
}

export interface IslandBilingualStrings {
  en: IslandStrings;
  es: IslandStrings;
}

export interface IslandManifest {
  id: string; // internal stable id like "research-integrity-tools"
  sensitivity: SensitivityLevel;
  purpose: string; // factual, internal description
  strings: IslandBilingualStrings;
}
