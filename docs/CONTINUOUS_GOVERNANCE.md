# GeoVerity 2026 — Continuous Governance (Phase 10)

Purpose:
Maintain long-term epistemic integrity, localization parity, and transparency.

## Monitoring Cadence
- **Weekly:** Run `scripts/governance-loop.sh` to confirm all validators pass.
- **Monthly:** Review beads issues tagged "governance" and "localization".
- **Quarterly:** Update lastReviewed timestamps on all high-sensitivity surfaces.
- **Annually:** Re-run full pre-production compliance suite and regenerate Prelaunch-Compliance-Report.txt.

## Localization Debt Policy
- Any surface with `translationStatus = placeholder` or `needs-review` older than 30 days = localization debt.
- Localization debt must be cleared before launching new pages or announcements.

## Governance Reporting
- Each quarterly review produces a file named `Quarterly-Governance-Report-Q<quarter>-<year>.md`.
- Reports summarize review timestamps, governance scanner status, and localization parity metrics.

## Enforcement
- CI blocks merges if governance-loop fails.
- High-sensitivity surfaces without disclaimers or review timestamps cannot deploy.
- React islands remain sensitivity-declared and bilingual.

## Outcome
GeoVerity's credibility is maintained not through one-time audits but through sustained, visible compliance with its own epistemic integrity framework.
