# 08-environment-schema-validation: Environment Schema Validation

## Goal

Demonstrate practical understanding of **TypeScript with Node.js & Express** concepts through implementation-level work.

## Concepts Covered

- runtime env validation
- zod/joi schema
- fail-fast configuration

## Files In Scope

- `src/challenges/08-environment-schema-validation/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/08-environment-schema-validation/index.ts`.
2. Export function `solve_08_environment_schema_validation` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Validate environment config against a schema at startup. (`envSchemaValidation`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-08-environment-schema-validation.test.js` or `tests/challenge-08-environment-schema-validation.test.ts`
  - `tests/e2e/challenge-08-environment-schema-validation.spec.js` or `tests/e2e/challenge-08-environment-schema-validation.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_08_environment_schema_validation` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=04-typescript-backend-development --challenge=08-environment-schema-validation`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
