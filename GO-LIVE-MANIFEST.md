# GeoVerity 2026 — Go-Live Manifest (Phase 9)

## Timestamp
2025-10-26T22:52:17Z

## Commit Reference
This release is built from the following commit on main:
52689cc59d18ccc5e388123ad661710db22a16de

## High-Sensitivity Surfaces Included
- Higher Education Consulting (EN+ES surfaced content via getHigherEdSurface)
  - legalSensitivity: true
  - disclaimer present in both EN and ES
  - lastReviewed populated in both EN and ES (2025-10-26T22:22:12Z)
  - translationStatus: "up-to-date"
  - Accessible in placeholder routes (English + Spanish)

## React Islands Deployed
- research-integrity island
  - sensitivity: high-sensitivity
  - mounted client:idle
  - bilingual strings present
  - explicitly marked as non-functional / informational-only
  - does NOT provide compliance, accreditation, or methodological guarantees

## Governance & Compliance Controls Active
- TypeScript strict mode enforced
- Astro static-first rendering with bilingual parity
- hreflang + canonical pairing in BasePageEn.astro and BasePageEs.astro
- Mobile-first policies in effect:
  - 320px single-column baseline
  - Tap targets >=44px
  - Language switcher visible/usable on mobile
- Accessibility scan executed (Phase 2 scanner)
- Governance scan executed:
  - Sensitive content includes lastReviewed + disclaimer
- Localization validator executed:
  - EN/ES page parity present with translationStatus

## CI / Branch Protection Expectations
- main branch requires checks for:
  - type-check
  - localization-validate
  - accessibility-scan
  - governance-scan
  - lighthouse-mobile
  - sitemap-build
  - beads-validation
- Force pushes: disabled
- PR review: required

## Operational Monitoring
- scripts/monitor-once.sh is the canonical post-deploy trust posture check.
- Beads CLI (issues.jsonl) remains the audit log of changes to sensitive messaging.
- Governance Operations policy (docs/GOVERNANCE_OPERATIONS.md) defines:
  - 30-day localization debt budget
  - Quarterly review requirement for lastReviewed on legalSensitivity=true surfaces
  - Required disclaimer presence in EN+ES

## Distribution Artifact
See dist-build-inventory.txt for a snapshot of built file names, sizes, and timestamps for this release.
