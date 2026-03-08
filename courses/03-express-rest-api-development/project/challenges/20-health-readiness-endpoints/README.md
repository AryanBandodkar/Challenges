# 20-health-readiness-endpoints: Health and Readiness Endpoints

## Goal

Demonstrate practical understanding of **Express.js Fundamentals** concepts through implementation-level work.

## Concepts Covered

- health checks
- readiness probes
- operational endpoints

## Files In Scope

- `src/challenges/20-health-readiness-endpoints/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/20-health-readiness-endpoints/index.js`.
2. Export function `solve_20_health_readiness_endpoints` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Expose health/readiness style GET endpoint(s) such as `/health` or `/ready`. (`healthEndpoint`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-20-health-readiness-endpoints.test.js` or `tests/challenge-20-health-readiness-endpoints.test.ts`
  - `tests/e2e/challenge-20-health-readiness-endpoints.spec.js` or `tests/e2e/challenge-20-health-readiness-endpoints.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_20_health_readiness_endpoints` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=03-express-rest-api-development --challenge=20-health-readiness-endpoints`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
