# 03-array-methods-data-pipeline: Array Methods Data Pipeline

## Goal

Demonstrate practical understanding of **Modern JavaScript Essentials** concepts through implementation-level work.

## Concepts Covered

- map
- filter
- reduce
- forEach
- find

## Files In Scope

- `src/challenges/03-array-methods-data-pipeline/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/03-array-methods-data-pipeline/index.js`.
2. Export function `solve_03_array_methods_data_pipeline` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use `.map()` in your transformation flow. (`arrayMap`)
- Use `.filter()` to narrow data. (`arrayFilter`)
- Use `.reduce()` for aggregation. (`arrayReduce`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-03-array-methods-data-pipeline.test.js` or `tests/challenge-03-array-methods-data-pipeline.test.ts`
  - `tests/e2e/challenge-03-array-methods-data-pipeline.spec.js` or `tests/e2e/challenge-03-array-methods-data-pipeline.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_03_array_methods_data_pipeline` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=01-javascript-fundamentals-async --challenge=03-array-methods-data-pipeline`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
