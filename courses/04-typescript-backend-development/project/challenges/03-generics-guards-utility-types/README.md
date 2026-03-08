# 03-generics-guards-utility-types: Generics Guards Utility Types

## Goal

Demonstrate practical understanding of **TypeScript Essentials** concepts through implementation-level work.

## Concepts Covered

- generics
- type guards
- utility types

## Files In Scope

- `src/challenges/03-generics-guards-utility-types/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/03-generics-guards-utility-types/index.ts`.
2. Export function `solve_03_generics_guards_utility_types` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use generic type parameters in reusable code. (`genericType`)
- Implement a type guard (`value is SomeType`). (`typeGuard`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-03-generics-guards-utility-types.test.js` or `tests/challenge-03-generics-guards-utility-types.test.ts`
  - `tests/e2e/challenge-03-generics-guards-utility-types.spec.js` or `tests/e2e/challenge-03-generics-guards-utility-types.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_03_generics_guards_utility_types` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=04-typescript-backend-development --challenge=03-generics-guards-utility-types`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
