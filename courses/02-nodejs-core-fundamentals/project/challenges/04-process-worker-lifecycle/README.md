# 04-process-worker-lifecycle: Process Worker Lifecycle

## Goal

Demonstrate practical understanding of **Node.js Architecture & Core APIs** concepts through implementation-level work.

## Concepts Covered

- process.env
- argv
- exit codes
- worker threads
- child processes

## Files In Scope

- `src/challenges/04-process-worker-lifecycle/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/04-process-worker-lifecycle/index.js`.
2. Export function `solve_04_process_worker_lifecycle` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use `process.env`, `process.argv`, or `process.exit`. (`processUsage`)
- Use Node child-process APIs (`spawn`, `fork`, `execFile`, or import child_process). (`childProcessUsage`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-04-process-worker-lifecycle.test.js` or `tests/challenge-04-process-worker-lifecycle.test.ts`
  - `tests/e2e/challenge-04-process-worker-lifecycle.spec.js` or `tests/e2e/challenge-04-process-worker-lifecycle.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_04_process_worker_lifecycle` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=02-nodejs-core-fundamentals --challenge=04-process-worker-lifecycle`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
