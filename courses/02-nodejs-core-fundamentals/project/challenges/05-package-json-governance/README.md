# 05-package-json-governance: Package JSON Governance

## Goal

Demonstrate practical understanding of **NPM & Package Management** concepts through implementation-level work.

## Concepts Covered

- package.json
- dependencies
- devDependencies
- npm/yarn fundamentals

## Files In Scope

- `src/challenges/05-package-json-governance/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/05-package-json-governance/index.js`.
2. Export function `solve_05_package_json_governance` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Define/consume script automation through a `scripts` section in package config. (`npmScript`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-05-package-json-governance.test.js` or `tests/challenge-05-package-json-governance.test.ts`
  - `tests/e2e/challenge-05-package-json-governance.spec.js` or `tests/e2e/challenge-05-package-json-governance.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_05_package_json_governance` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=02-nodejs-core-fundamentals --challenge=05-package-json-governance`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
