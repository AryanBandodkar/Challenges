# 11-operational-vs-programmer-errors: Operational vs Programmer Errors

## Goal

Demonstrate practical understanding of **Error Handling & Debugging** concepts through implementation-level work.

## Concepts Covered

- error classification
- global handlers

## Files In Scope

- `src/challenges/11-operational-vs-programmer-errors/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/11-operational-vs-programmer-errors/index.js`.
2. Export function `solve_11_operational_vs_programmer_errors` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Handle runtime errors with `try/catch`. (`tryCatch`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-11-operational-vs-programmer-errors.test.js` or `tests/challenge-11-operational-vs-programmer-errors.test.ts`
  - `tests/e2e/challenge-11-operational-vs-programmer-errors.spec.js` or `tests/e2e/challenge-11-operational-vs-programmer-errors.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_11_operational_vs_programmer_errors` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=02-nodejs-core-fundamentals --challenge=11-operational-vs-programmer-errors`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
