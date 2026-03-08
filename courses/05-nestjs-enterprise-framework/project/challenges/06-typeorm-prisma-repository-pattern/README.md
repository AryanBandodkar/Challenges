# 06-typeorm-prisma-repository-pattern: TypeORM Prisma Repository Pattern

## Goal

Demonstrate practical understanding of **Advanced NestJS Features** concepts through implementation-level work.

## Concepts Covered

- TypeORM/Prisma
- repository pattern

## Files In Scope

- `src/challenges/06-typeorm-prisma-repository-pattern/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/06-typeorm-prisma-repository-pattern/index.ts`.
2. Export function `solve_06_typeorm_prisma_repository_pattern` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use repository-style data access boundaries. (`repositoryPattern`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-06-typeorm-prisma-repository-pattern.test.js` or `tests/challenge-06-typeorm-prisma-repository-pattern.test.ts`
  - `tests/e2e/challenge-06-typeorm-prisma-repository-pattern.spec.js` or `tests/e2e/challenge-06-typeorm-prisma-repository-pattern.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_06_typeorm_prisma_repository_pattern` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=06-typeorm-prisma-repository-pattern`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
