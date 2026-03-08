# 01-nest-modules-controllers-services: Nest Modules Controllers Services

## Goal

Demonstrate practical understanding of **NestJS Architecture & Core Concepts** concepts through implementation-level work.

## Concepts Covered

- modules
- controllers
- services

## Files In Scope

- `src/challenges/01-nest-modules-controllers-services/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/01-nest-modules-controllers-services/index.ts`.
2. Export function `solve_01_nest_modules_controllers_services` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use NestJS module decorators (`@Module(...)`). (`nestjsModule`)
- Use NestJS controller decorators (`@Controller(...)`). (`nestjsController`)
- Use NestJS DI decorators (`@Injectable(...)`). (`nestjsInjectable`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-01-nest-modules-controllers-services.test.js` or `tests/challenge-01-nest-modules-controllers-services.test.ts`
  - `tests/e2e/challenge-01-nest-modules-controllers-services.spec.js` or `tests/e2e/challenge-01-nest-modules-controllers-services.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_01_nest_modules_controllers_services` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=01-nest-modules-controllers-services`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
