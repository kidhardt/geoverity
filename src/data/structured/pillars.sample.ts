import type { Pillar } from "./models";

/**
 * SAMPLE ONLY.
 * Placeholder factual scaffold for one pillar.
 * This is NOT marketing text.
 */

export const pillarsSample: Pillar[] = [
  {
    id: "higher-education-consulting",
    slug_en: "/higher-education-consulting/",
    slug_es: "/es/consultoria-academica/",
    name_en: "Higher Education Consulting (Placeholder)",
    name_es: "Consultoría Académica (Placeholder)",
    description_en: "Advisory work for academic institutions. This placeholder entry is here only to prove data structures.",
    description_es: "Trabajo asesor para instituciones académicas. Esta entrada placeholder existe solo para probar las estructuras de datos.",
    deliverables: [
      {
        id: "authorized-llm",
        title_en: "Authorized Departmental LLMs (Placeholder)",
        title_es: "LLM Departamental Autorizado (Placeholder)",
        summary_en: "Scoped and supervised language model access for specific departments. Placeholder summary.",
        summary_es: "Acceso supervisado a modelos de lenguaje para departamentos específicos. Resumen placeholder.",
        sensitivityLevel: "high-sensitivity"
      },
      {
        id: "research-integrity-tools",
        title_en: "Research Integrity Tools (Placeholder)",
        title_es: "Herramientas de Integridad de Investigación (Placeholder)",
        summary_en: "Tools intended to monitor statistical misuse and documentation quality. Placeholder summary.",
        summary_es: "Herramientas destinadas a monitorear el mal uso estadístico y la calidad de la documentación. Resumen placeholder.",
        sensitivityLevel: "high-sensitivity"
      }
    ]
  }
];
