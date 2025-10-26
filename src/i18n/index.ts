/**
 * GeoVerity 2026 i18n helpers.
 * Central source of truth for bilingual routing and labels.
 * DO NOT hardcode English/Spanish paths elsewhere.
 */

export function getPaths(slug: string) {
  // slug: "placeholder" -> { en: "/placeholder/", es: "/es/placeholder/" }
  const norm = slug.replace(/^\/+|\/+$/g, "");
  return {
    en: `/${norm}/`,
    es: `/es/${norm}/`
  };
}

export function languageSwitcherLabels() {
  return {
    en: "English",
    es: "Español"
  };
}
