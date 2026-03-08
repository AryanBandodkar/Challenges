# 02-fs-stream-buffer-operations: FS Stream Buffer Operations

## Goal

Demonstrate practical understanding of **Node.js Architecture & Core APIs** concepts through implementation-level work.

## Concepts Covered

- fs
- streams
- buffers

## Files In Scope

- `src/challenges/02-fs-stream-buffer-operations/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/02-fs-stream-buffer-operations/index.js`.
2. Export function `solve_02_fs_stream_buffer_operations` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Import Node `fs`/`node:fs` and use it meaningfully. (`fsModuleImport`)
- Use streaming (`pipeline`, read/write streams) for data flow. (`streamPipeline`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-02-fs-stream-buffer-operations.test.js` or `tests/challenge-02-fs-stream-buffer-operations.test.ts`
  - `tests/e2e/challenge-02-fs-stream-buffer-operations.spec.js` or `tests/e2e/challenge-02-fs-stream-buffer-operations.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_02_fs_stream_buffer_operations` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=02-nodejs-core-fundamentals --challenge=02-fs-stream-buffer-operations`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
