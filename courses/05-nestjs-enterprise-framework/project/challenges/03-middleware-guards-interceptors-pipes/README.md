# 03-middleware-guards-interceptors-pipes: Middleware Guards Interceptors Pipes

## Goal

Demonstrate practical understanding of **NestJS Architecture & Core Concepts** concepts through implementation-level work.

## Concepts Covered

- middleware
- guards
- interceptors
- pipes

## Files In Scope

- `src/challenges/03-middleware-guards-interceptors-pipes/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/03-middleware-guards-interceptors-pipes/index.ts`.
2. Export function `solve_03_middleware_guards_interceptors_pipes` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Implement route protection with guards (`@UseGuards` / `CanActivate`). (`nestjsGuard`)
- Implement or apply a Nest pipe (`PipeTransform` / `@UsePipes`). (`nestjsPipe`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-03-middleware-guards-interceptors-pipes.test.js` or `tests/challenge-03-middleware-guards-interceptors-pipes.test.ts`
  - `tests/e2e/challenge-03-middleware-guards-interceptors-pipes.spec.js` or `tests/e2e/challenge-03-middleware-guards-interceptors-pipes.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_03_middleware_guards_interceptors_pipes` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=03-middleware-guards-interceptors-pipes`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
