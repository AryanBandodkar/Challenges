# 07-express-ts-migration-workflow: Express TS Migration Workflow

## Goal

Demonstrate practical understanding of **TypeScript with Node.js & Express** concepts through implementation-level work.

## Concepts Covered

- Express to TypeScript migration
- ts-node
- nodemon workflow

## Files In Scope

- `src/challenges/07-express-ts-migration-workflow/index.ts`
- `package.json`

## Implementation Contract

1. Implement the solution in `src/challenges/07-express-ts-migration-workflow/index.ts`.
2. Export function `solve_07_express_ts_migration_workflow` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Configure or reference `ts-node` workflow commands. (`tsNodeScript`)
- Configure or reference `nodemon` workflow commands. (`nodemonScript`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-07-express-ts-migration-workflow.test.js` or `tests/challenge-07-express-ts-migration-workflow.test.ts`
  - `tests/e2e/challenge-07-express-ts-migration-workflow.spec.js` or `tests/e2e/challenge-07-express-ts-migration-workflow.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_07_express_ts_migration_workflow` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=04-typescript-backend-development --challenge=07-express-ts-migration-workflow`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
