# 15-graceful-shutdown-signal-handling: Graceful Shutdown Signal Handling

## Goal

Demonstrate practical understanding of **Error Handling & Debugging** concepts through implementation-level work.

## Concepts Covered

- SIGTERM/SIGINT handling
- graceful shutdown
- resource cleanup

## Files In Scope

- `src/challenges/15-graceful-shutdown-signal-handling/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/15-graceful-shutdown-signal-handling/index.js`.
2. Export function `solve_15_graceful_shutdown_signal_handling` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Handle shutdown signals (`SIGINT` and/or `SIGTERM`) via `process.on`. (`signalHandler`)
- Implement graceful shutdown behavior (for example `server.close()` and cleanup). (`gracefulShutdown`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-15-graceful-shutdown-signal-handling.test.js` or `tests/challenge-15-graceful-shutdown-signal-handling.test.ts`
  - `tests/e2e/challenge-15-graceful-shutdown-signal-handling.spec.js` or `tests/e2e/challenge-15-graceful-shutdown-signal-handling.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_15_graceful_shutdown_signal_handling` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=02-nodejs-core-fundamentals --challenge=15-graceful-shutdown-signal-handling`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
