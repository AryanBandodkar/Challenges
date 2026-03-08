# 14-unit-e2e-mocking-strategy: Unit E2E Mocking Strategy

## Goal

Demonstrate practical understanding of **Testing in NestJS** concepts through implementation-level work.

## Concepts Covered

- unit tests
- e2e tests
- mocking

## Files In Scope

- `src/challenges/14-unit-e2e-mocking-strategy/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/14-unit-e2e-mocking-strategy/index.ts`.
2. Export function `solve_14_unit_e2e_mocking_strategy` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Write Jest-style tests with `describe`/`it` blocks. (`jestDescribeIt`)
- Use Supertest request assertions against HTTP routes. (`supertestRequest`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-14-unit-e2e-mocking-strategy.test.js` or `tests/challenge-14-unit-e2e-mocking-strategy.test.ts`
  - `tests/e2e/challenge-14-unit-e2e-mocking-strategy.spec.js` or `tests/e2e/challenge-14-unit-e2e-mocking-strategy.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_14_unit_e2e_mocking_strategy` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=14-unit-e2e-mocking-strategy`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
