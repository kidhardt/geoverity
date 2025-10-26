# GeoVerity 2026 — Deployment Posture (Phase 8)

Target hosting model:
- Static build output is published from /public and /public/es.
- The build must preserve canonical + hreflang links between English and Spanish routes.
- HTTP responses must serve correct language variants without rewriting URLs or removing /es/.
- GZIP or Brotli compression should be enabled.
- Caching headers should not cache outdated high-sensitivity content forever; max-age and revalidation should respect lastReviewed.

Security / trust posture requirements:
- React islands load with client:idle and must not block initial HTML render.
- No island is allowed to directly claim compliance, accreditation, or legal certification.
- High-sensitivity surfaces MUST display disclaimer text and lastReviewed.
- Lighthouse mobile performance score target: >= 90 on representative public pages.
- WCAG AA baseline is required; tap targets must remain >=44px and language switcher must remain accessible on mobile.

Operational note:
- Branch `main` is treated as production. Only audited, reviewed changes land there.
