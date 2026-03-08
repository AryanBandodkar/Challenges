# Original System Alignment (React Reference -> Node Backend Engine)

This file tracks alignment with the original challenge-engine system documentation and records intentional differences for this Node/Express/Nest variant.

## Aligned Now

- Config-driven multi-course architecture (`courses/*`, `pathway-review/pathway-config.json`).
- Challenge metadata and learner stubs (`project/challenges/*/README.md`, `metadata.json`, `src/challenges/*`).
- 6-layer scoring pipeline in shared review engine.
- Challenge/course/pathway result outputs:
  - `courses/*/results/challenge-results.json`
  - `courses/*/results/course-summary.json`
  - `pathway-review/pathway-summary.json`
  - `learner-results/progress.json`
- Smart changed-only review (`scripts/get-changed-challenges.js`, `scripts/run-review-changed.js`).
- README evidence updates via progress pipeline.
- Strict structural validation and pattern-key integrity checks.
- CI validation script and GitHub Actions workflow:
  - `scripts/ci-validate.js`
  - `.github/workflows/solo-skill-review.yml`
- Skill-level aggregation output:
  - `pathway-review/skill-breakdown.json`
- Dashboard app/server for learner progress and review orchestration:
  - `dashboard/server.js`
  - `dashboard/app/*`

## Hardening Added

- `scripts/validate-structure.js` now validates:
  - course/module/challenge ID integrity
  - scoring + requirements + badge ranges
  - metadata/config consistency
  - known architecture pattern key usage
- `shared/review-engine/index.js` exports available pattern keys for deterministic validation.
- E2E layer behavior improved:
  - if no challenge test files are configured, layer is neutral (not a learner penalty).
- README contract + scoring notes refreshed for all challenges.
- `.env.example` added for safe environment setup.

## Intentional Differences from Original React-Centric Doc

- No standalone `global-review/` directory:
  - equivalent functionality is in `scripts/run-review-all.js` + `scripts/update-progress.js`.
- No per-course split runners (`test-runner.js`, `e2e-runner.js`, `linter.js`, etc.):
  - current architecture centralizes logic in `shared/review-engine/index.js`.

These differences are by design for a lighter backend-focused engine while preserving the same workflow and evidence model.
