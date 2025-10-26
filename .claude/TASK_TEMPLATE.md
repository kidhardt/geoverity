# TASK_TEMPLATE (GeoVerity 2026)

When requesting new work (page, tool, or island), provide:

- route_en: string (e.g., "/higher-education-consulting/")
- route_es: string (e.g., "/es/consultoria-academica/")
- pagePurpose: one-sentence description
- sensitivityLevel: "normal" | "high-sensitivity"
- needsReactIsland: yes/no and island name under src/apps/*
- requiredMetadata:
  - translationStatus for EN and ES
  - lastReviewed timestamp
  - hreflang and canonical requirements

Rules:
- Always create EN + ES stubs, even if ES is a placeholder.
- Always create JSON twins for both EN + ES stubs.
- Update sitemap/category indexes after new routes.
- Never insert real marketing copy unless explicitly provided.
