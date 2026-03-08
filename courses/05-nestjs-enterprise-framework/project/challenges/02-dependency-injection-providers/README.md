# 02-dependency-injection-providers: Dependency Injection Providers

## Goal

Demonstrate practical understanding of **NestJS Architecture & Core Concepts** concepts through implementation-level work.

## Concepts Covered

- providers
- dependency injection

## Files In Scope

- `src/challenges/02-dependency-injection-providers/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/02-dependency-injection-providers/index.ts`.
2. Export function `solve_02_dependency_injection_providers` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use NestJS DI decorators (`@Injectable(...)`). (`nestjsInjectable`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-02-dependency-injection-providers.test.js` or `tests/challenge-02-dependency-injection-providers.test.ts`
  - `tests/e2e/challenge-02-dependency-injection-providers.spec.js` or `tests/e2e/challenge-02-dependency-injection-providers.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_02_dependency_injection_providers` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=02-dependency-injection-providers`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
