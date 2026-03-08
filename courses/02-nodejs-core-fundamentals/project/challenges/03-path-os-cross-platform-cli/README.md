# 03-path-os-cross-platform-cli: Path OS Cross Platform CLI

## Goal

Demonstrate practical understanding of **Node.js Architecture & Core APIs** concepts through implementation-level work.

## Concepts Covered

- path
- os
- cross-platform compatibility

## Files In Scope

- `src/challenges/03-path-os-cross-platform-cli/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/03-path-os-cross-platform-cli/index.js`.
2. Export function `solve_03_path_os_cross_platform_cli` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Import and use Node `path`/`node:path`. (`pathModuleImport`)
- Import and use Node `os`/`node:os`. (`osModuleImport`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-03-path-os-cross-platform-cli.test.js` or `tests/challenge-03-path-os-cross-platform-cli.test.ts`
  - `tests/e2e/challenge-03-path-os-cross-platform-cli.spec.js` or `tests/e2e/challenge-03-path-os-cross-platform-cli.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_03_path_os_cross_platform_cli` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=02-nodejs-core-fundamentals --challenge=03-path-os-cross-platform-cli`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
