# GeoVerity 2026 — Governance Operations (Phase 8)

This document defines how we keep GeoVerity credible, bilingual, and aligned with our stated trust posture after launch.

1. Localization aging / translation debt
   - Every public English surface MUST have a Spanish counterpart.
   - Each surface tracks translationStatus (up-to-date / placeholder / needs-review).
   - If any Spanish surface remains "placeholder" or "needs-review" for >30 days, that is considered localization debt.
   - Localization debt blocks marketing of new features or service announcements until resolved.

2. High-sensitivity review cadence
   - Any surface marked legalSensitivity=true MUST:
     - Show disclaimer text in both EN/ES.
     - Carry a lastReviewed timestamp.
   - These timestamps MUST be updated at least once per quarter.
   - The governance scan in CI will eventually warn if lastReviewed is older than 90 days.

3. Beads traceability
   - All governance-relevant changes (new surfaces, updated disclaimers, review timestamp updates, etc.) MUST create or update a beads issue.
   - Beads is the audit trail: who changed trust-critical messaging and why.
   - The beads validator (`scripts/beads/validate.js`) MUST remain green in CI.

4. React island compliance
   - All React islands MUST:
     - Live under src/apps/*
     - Export a manifest with sensitivity and bilingual strings
     - Render only with client:idle or similar non-blocking hydration
   - No island may silently expand scope (e.g. start generating prescriptive research evaluation) without a new review pass and updated disclaimers.

5. Blockers for release
   The following conditions MUST be green before deploying updates to production:
   - TypeScript strict mode check
   - Astro/Vite build success
   - Localization parity validator
   - Accessibility scan baseline
   - Governance scan for high-sensitivity content
   - Lighthouse mobile performance audit target >= 90
   - Beads validator (issues.jsonl integrity and daemon health)

In plain terms:
If we cannot prove that pages are bilingual, reviewed, accessible, performant on mobile, and disclaim their limitations — we do not ship them.
