# 14-utility-libraries-and-package-publishing: Utility Libraries and Package Publishing

## Goal

Demonstrate practical understanding of **NPM & Package Management** concepts through implementation-level work.

## Concepts Covered

- lodash/dayjs usage
- package exports
- npm publish workflow

## Files In Scope

- `src/challenges/14-utility-libraries-and-package-publishing/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/14-utility-libraries-and-package-publishing/index.js`.
2. Export function `solve_14_utility_libraries_and_package_publishing` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Define/consume script automation through a `scripts` section in package config. (`npmScript`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-14-utility-libraries-and-package-publishing.test.js` or `tests/challenge-14-utility-libraries-and-package-publishing.test.ts`
  - `tests/e2e/challenge-14-utility-libraries-and-package-publishing.spec.js` or `tests/e2e/challenge-14-utility-libraries-and-package-publishing.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_14_utility_libraries_and_package_publishing` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=02-nodejs-core-fundamentals --challenge=14-utility-libraries-and-package-publishing`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
