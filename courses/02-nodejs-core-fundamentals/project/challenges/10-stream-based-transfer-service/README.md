# 10-stream-based-transfer-service: Stream Based Transfer Service

## Goal

Demonstrate practical understanding of **HTTP & Network Programming** concepts through implementation-level work.

## Concepts Covered

- streaming
- large transfer handling

## Files In Scope

- `src/challenges/10-stream-based-transfer-service/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/10-stream-based-transfer-service/index.js`.
2. Export function `solve_10_stream_based_transfer_service` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use streaming (`pipeline`, read/write streams) for data flow. (`streamPipeline`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-10-stream-based-transfer-service.test.js` or `tests/challenge-10-stream-based-transfer-service.test.ts`
  - `tests/e2e/challenge-10-stream-based-transfer-service.spec.js` or `tests/e2e/challenge-10-stream-based-transfer-service.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_10_stream_based_transfer_service` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=02-nodejs-core-fundamentals --challenge=10-stream-based-transfer-service`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
