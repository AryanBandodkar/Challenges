# 07-dotenv-script-automation: Dotenv Script Automation

## Goal

Demonstrate practical understanding of **NPM & Package Management** concepts through implementation-level work.

## Concepts Covered

- dotenv
- npm scripts

## Files In Scope

- `src/challenges/07-dotenv-script-automation/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/07-dotenv-script-automation/index.js`.
2. Export function `solve_07_dotenv_script_automation` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Load env values with `dotenv.config()` or equivalent startup config. (`dotenvConfig`)
- Use `process.env`, `process.argv`, or `process.exit`. (`processUsage`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-07-dotenv-script-automation.test.js` or `tests/challenge-07-dotenv-script-automation.test.ts`
  - `tests/e2e/challenge-07-dotenv-script-automation.spec.js` or `tests/e2e/challenge-07-dotenv-script-automation.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_07_dotenv_script_automation` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=02-nodejs-core-fundamentals --challenge=07-dotenv-script-automation`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
