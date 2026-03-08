# 01-express-app-bootstrap: Express App Bootstrap

## Goal

Demonstrate practical understanding of **Express.js Fundamentals** concepts through implementation-level work.

## Concepts Covered

- Express setup
- app configuration

## Files In Scope

- `src/challenges/01-express-app-bootstrap/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/01-express-app-bootstrap/index.js`.
2. Export function `solve_01_express_app_bootstrap` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Initialize an Express app instance (`express()`). (`expressApp`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-01-express-app-bootstrap.test.js` or `tests/challenge-01-express-app-bootstrap.test.ts`
  - `tests/e2e/challenge-01-express-app-bootstrap.spec.js` or `tests/e2e/challenge-01-express-app-bootstrap.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_01_express_app_bootstrap` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=03-express-rest-api-development --challenge=01-express-app-bootstrap`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
