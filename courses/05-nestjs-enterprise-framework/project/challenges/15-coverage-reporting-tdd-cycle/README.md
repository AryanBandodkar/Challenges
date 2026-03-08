# 15-coverage-reporting-tdd-cycle: Coverage Reporting TDD Cycle

## Goal

Demonstrate practical understanding of **Testing in NestJS** concepts through implementation-level work.

## Concepts Covered

- coverage reporting
- TDD workflow

## Files In Scope

- `src/challenges/15-coverage-reporting-tdd-cycle/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/15-coverage-reporting-tdd-cycle/index.ts`.
2. Export function `solve_15_coverage_reporting_tdd_cycle` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Write Jest-style tests with `describe`/`it` blocks. (`jestDescribeIt`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-15-coverage-reporting-tdd-cycle.test.js` or `tests/challenge-15-coverage-reporting-tdd-cycle.test.ts`
  - `tests/e2e/challenge-15-coverage-reporting-tdd-cycle.spec.js` or `tests/e2e/challenge-15-coverage-reporting-tdd-cycle.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_15_coverage_reporting_tdd_cycle` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=15-coverage-reporting-tdd-cycle`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
