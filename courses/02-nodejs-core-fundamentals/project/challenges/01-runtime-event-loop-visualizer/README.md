# 01-runtime-event-loop-visualizer: Runtime Event Loop Visualizer

## Goal

Demonstrate practical understanding of **Node.js Architecture & Core APIs** concepts through implementation-level work.

## Concepts Covered

- V8 runtime
- event loop phases
- microtasks/macrotasks

## Files In Scope

- `src/challenges/01-runtime-event-loop-visualizer/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/01-runtime-event-loop-visualizer/index.js`.
2. Export function `solve_01_runtime_event_loop_visualizer` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use Promise-based async logic (`new Promise` or `Promise.*`). (`promiseUsage`)
- Use `setTimeout` to model async scheduling behavior. (`setTimeoutUsage`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-01-runtime-event-loop-visualizer.test.js` or `tests/challenge-01-runtime-event-loop-visualizer.test.ts`
  - `tests/e2e/challenge-01-runtime-event-loop-visualizer.spec.js` or `tests/e2e/challenge-01-runtime-event-loop-visualizer.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_01_runtime_event_loop_visualizer` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=02-nodejs-core-fundamentals --challenge=01-runtime-event-loop-visualizer`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
