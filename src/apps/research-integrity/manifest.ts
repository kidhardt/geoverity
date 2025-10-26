import type { IslandManifest } from "../island.types";

/**
 * research-integrity island
 * This island will eventually surface tools that help evaluate research integrity
 * (example: p-value misuse awareness, disclosure tracking, etc.).
 *
 * This is designated high-sensitivity because it touches on research ethics and claims
 * about study validity.
 */

export const researchIntegrityManifest: IslandManifest = {
  id: "research-integrity-tools",
  sensitivity: "high-sensitivity",
  purpose:
    "Interactive surfaces for research integrity review. Placeholder only. Not providing statistical guidance yet.",
  strings: {
    en: {
      heading: "Research Integrity Tools (Placeholder)",
      subheading:
        "This interactive module will surface integrity checks for study methods and reporting. This is not active functionality.",
      ctaLabel: "Future: Open Integrity Module",
      disclaimer:
        "This placeholder does not provide methodological advice or compliance guidance."
    },
    es: {
      heading: "Herramientas de Integridad de Investigación (Placeholder)",
      subheading:
        "Este módulo interactivo mostrará verificaciones de integridad sobre métodos y reporte. No es funcional todavía.",
      ctaLabel: "Futuro: Abrir Módulo de Integridad",
      disclaimer:
        "Este placeholder no ofrece asesoramiento metodológico ni de cumplimiento."
    }
  }
};
