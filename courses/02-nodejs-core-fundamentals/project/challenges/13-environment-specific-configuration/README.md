# 13-environment-specific-configuration: Environment Specific Configuration

## Goal

Demonstrate practical understanding of **Error Handling & Debugging** concepts through implementation-level work.

## Concepts Covered

- dotenv
- environment-based behavior

## Files In Scope

- `src/challenges/13-environment-specific-configuration/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/13-environment-specific-configuration/index.js`.
2. Export function `solve_13_environment_specific_configuration` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Load env values with `dotenv.config()` or equivalent startup config. (`dotenvConfig`)
- Use `process.env`, `process.argv`, or `process.exit`. (`processUsage`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-13-environment-specific-configuration.test.js` or `tests/challenge-13-environment-specific-configuration.test.ts`
  - `tests/e2e/challenge-13-environment-specific-configuration.spec.js` or `tests/e2e/challenge-13-environment-specific-configuration.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_13_environment_specific_configuration` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=02-nodejs-core-fundamentals --challenge=13-environment-specific-configuration`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
