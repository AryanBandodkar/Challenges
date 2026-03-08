# 05-typed-express-request-response: Typed Express Request Response

## Goal

Demonstrate practical understanding of **TypeScript with Node.js & Express** concepts through implementation-level work.

## Concepts Covered

- Request typing
- Response typing
- middleware typing

## Files In Scope

- `src/challenges/05-typed-express-request-response/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/05-typed-express-request-response/index.ts`.
2. Export function `solve_05_typed_express_request_response` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use typed Express imports (`Request`, `Response`, `NextFunction`). (`expressTypeImport`)
- Use explicit TypeScript type annotations. (`typeAnnotation`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-05-typed-express-request-response.test.js` or `tests/challenge-05-typed-express-request-response.test.ts`
  - `tests/e2e/challenge-05-typed-express-request-response.spec.js` or `tests/e2e/challenge-05-typed-express-request-response.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_05_typed_express_request_response` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=04-typescript-backend-development --challenge=05-typed-express-request-response`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
