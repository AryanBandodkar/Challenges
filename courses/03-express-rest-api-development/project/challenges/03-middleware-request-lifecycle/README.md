# 03-middleware-request-lifecycle: Middleware Request Lifecycle

## Goal

Demonstrate practical understanding of **Express.js Fundamentals** concepts through implementation-level work.

## Concepts Covered

- middleware
- request/response cycle

## Files In Scope

- `src/challenges/03-middleware-request-lifecycle/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/03-middleware-request-lifecycle/index.js`.
2. Export function `solve_03_middleware_request_lifecycle` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Implement middleware that calls `next()` correctly. (`middlewareNext`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-03-middleware-request-lifecycle.test.js` or `tests/challenge-03-middleware-request-lifecycle.test.ts`
  - `tests/e2e/challenge-03-middleware-request-lifecycle.spec.js` or `tests/e2e/challenge-03-middleware-request-lifecycle.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_03_middleware_request_lifecycle` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=03-express-rest-api-development --challenge=03-middleware-request-lifecycle`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
