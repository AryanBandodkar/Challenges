# 17-request-id-logging-interceptor: Request ID Logging Interceptor

## Goal

Demonstrate practical understanding of **Advanced NestJS Features** concepts through implementation-level work.

## Concepts Covered

- request correlation id
- structured logging context
- interceptors

## Files In Scope

- `src/challenges/17-request-id-logging-interceptor/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/17-request-id-logging-interceptor/index.ts`.
2. Export function `solve_17_request_id_logging_interceptor` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Propagate request/correlation ID in interceptor/logging flow. (`requestIdInterceptor`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-17-request-id-logging-interceptor.test.js` or `tests/challenge-17-request-id-logging-interceptor.test.ts`
  - `tests/e2e/challenge-17-request-id-logging-interceptor.spec.js` or `tests/e2e/challenge-17-request-id-logging-interceptor.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_17_request_id_logging_interceptor` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=17-request-id-logging-interceptor`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
