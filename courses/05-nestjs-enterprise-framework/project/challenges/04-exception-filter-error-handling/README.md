# 04-exception-filter-error-handling: Exception Filter Error Handling

## Goal

Demonstrate practical understanding of **NestJS Architecture & Core Concepts** concepts through implementation-level work.

## Concepts Covered

- exception filters
- error flow

## Files In Scope

- `src/challenges/04-exception-filter-error-handling/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/04-exception-filter-error-handling/index.ts`.
2. Export function `solve_04_exception_filter_error_handling` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Implement exception filtering (`@Catch` / `ExceptionFilter`). (`nestjsExceptionFilter`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-04-exception-filter-error-handling.test.js` or `tests/challenge-04-exception-filter-error-handling.test.ts`
  - `tests/e2e/challenge-04-exception-filter-error-handling.spec.js` or `tests/e2e/challenge-04-exception-filter-error-handling.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_04_exception_filter_error_handling` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=04-exception-filter-error-handling`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
