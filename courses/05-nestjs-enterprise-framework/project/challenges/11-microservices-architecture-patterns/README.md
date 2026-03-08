# 11-microservices-architecture-patterns: Microservices Architecture Patterns

## Goal

Demonstrate practical understanding of **Microservices & Communication** concepts through implementation-level work.

## Concepts Covered

- microservices architecture
- service boundaries

## Files In Scope

- `src/challenges/11-microservices-architecture-patterns/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/11-microservices-architecture-patterns/index.ts`.
2. Export function `solve_11_microservices_architecture_patterns` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use NestJS module decorators (`@Module(...)`). (`nestjsModule`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-11-microservices-architecture-patterns.test.js` or `tests/challenge-11-microservices-architecture-patterns.test.ts`
  - `tests/e2e/challenge-11-microservices-architecture-patterns.spec.js` or `tests/e2e/challenge-11-microservices-architecture-patterns.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_11_microservices_architecture_patterns` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=11-microservices-architecture-patterns`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
