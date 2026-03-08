# 18-static-files-template-engines: Static Files and Template Engines

## Goal

Demonstrate practical understanding of **Express.js Fundamentals** concepts through implementation-level work.

## Concepts Covered

- static file serving
- template engine setup

## Files In Scope

- `src/challenges/18-static-files-template-engines/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/18-static-files-template-engines/index.js`.
2. Export function `solve_18_static_files_template_engines` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Serve static assets with `express.static(...)`. (`expressStaticServing`)
- Configure a template engine (`app.set("view engine", ...)`). (`templateEngineSetup`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-18-static-files-template-engines.test.js` or `tests/challenge-18-static-files-template-engines.test.ts`
  - `tests/e2e/challenge-18-static-files-template-engines.spec.js` or `tests/e2e/challenge-18-static-files-template-engines.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_18_static_files_template_engines` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=03-express-rest-api-development --challenge=18-static-files-template-engines`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
