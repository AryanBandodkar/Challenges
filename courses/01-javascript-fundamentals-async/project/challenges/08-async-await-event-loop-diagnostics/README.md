# 08-async-await-event-loop-diagnostics: Async Await Event Loop Diagnostics

## Goal

Demonstrate practical understanding of **Asynchronous JavaScript Mastery** concepts through implementation-level work.

## Concepts Covered

- async/await
- try/catch
- event loop
- non-blocking I/O

## Files In Scope

- `src/challenges/08-async-await-event-loop-diagnostics/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/08-async-await-event-loop-diagnostics/index.js`.
2. Export function `solve_08_async_await_event_loop_diagnostics` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Mark at least one function as `async`. (`asyncFunction`)
- Use `await` with async work. (`awaitExpression`)
- Handle runtime errors with `try/catch`. (`tryCatch`)
- Use `setTimeout` to model async scheduling behavior. (`setTimeoutUsage`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-08-async-await-event-loop-diagnostics.test.js` or `tests/challenge-08-async-await-event-loop-diagnostics.test.ts`
  - `tests/e2e/challenge-08-async-await-event-loop-diagnostics.spec.js` or `tests/e2e/challenge-08-async-await-event-loop-diagnostics.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_08_async_await_event_loop_diagnostics` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=01-javascript-fundamentals-async --challenge=08-async-await-event-loop-diagnostics`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
