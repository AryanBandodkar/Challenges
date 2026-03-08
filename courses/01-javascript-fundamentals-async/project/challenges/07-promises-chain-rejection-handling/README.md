# 07-promises-chain-rejection-handling: Promises Chain Rejection Handling

## Goal

Demonstrate practical understanding of **Asynchronous JavaScript Mastery** concepts through implementation-level work.

## Concepts Covered

- Promises
- chaining
- error handling

## Files In Scope

- `src/challenges/07-promises-chain-rejection-handling/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/07-promises-chain-rejection-handling/index.js`.
2. Export function `solve_07_promises_chain_rejection_handling` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use Promise-based async logic (`new Promise` or `Promise.*`). (`promiseUsage`)
- Handle Promise errors with `.catch()`. (`promiseCatch`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-07-promises-chain-rejection-handling.test.js` or `tests/challenge-07-promises-chain-rejection-handling.test.ts`
  - `tests/e2e/challenge-07-promises-chain-rejection-handling.spec.js` or `tests/e2e/challenge-07-promises-chain-rejection-handling.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_07_promises_chain_rejection_handling` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=01-javascript-fundamentals-async --challenge=07-promises-chain-rejection-handling`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
