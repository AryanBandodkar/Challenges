# 02-routing-params-query-handlers: Routing Params Query Handlers

## Goal

Demonstrate practical understanding of **Express.js Fundamentals** concepts through implementation-level work.

## Concepts Covered

- route params
- query strings
- route handlers

## Files In Scope

- `src/challenges/02-routing-params-query-handlers/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/02-routing-params-query-handlers/index.js`.
2. Export function `solve_02_routing_params_query_handlers` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Define routing with `express.Router()` or router methods. (`expressRouter`)
- Use route params (`:id`) and consume `req.params`. (`routeParamUsage`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-02-routing-params-query-handlers.test.js` or `tests/challenge-02-routing-params-query-handlers.test.ts`
  - `tests/e2e/challenge-02-routing-params-query-handlers.spec.js` or `tests/e2e/challenge-02-routing-params-query-handlers.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_02_routing_params_query_handlers` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=03-express-rest-api-development --challenge=02-routing-params-query-handlers`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
