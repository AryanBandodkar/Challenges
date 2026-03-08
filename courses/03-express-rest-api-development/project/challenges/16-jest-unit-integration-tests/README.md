# 16-jest-unit-integration-tests: Jest Unit Integration Tests

## Goal

Demonstrate practical understanding of **API Documentation & Testing** concepts through implementation-level work.

## Concepts Covered

- Jest
- unit tests
- integration tests

## Files In Scope

- `src/challenges/16-jest-unit-integration-tests/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/16-jest-unit-integration-tests/index.js`.
2. Export function `solve_16_jest_unit_integration_tests` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Write Jest-style tests with `describe`/`it` blocks. (`jestDescribeIt`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-16-jest-unit-integration-tests.test.js` or `tests/challenge-16-jest-unit-integration-tests.test.ts`
  - `tests/e2e/challenge-16-jest-unit-integration-tests.spec.js` or `tests/e2e/challenge-16-jest-unit-integration-tests.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_16_jest_unit_integration_tests` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=03-express-rest-api-development --challenge=16-jest-unit-integration-tests`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
