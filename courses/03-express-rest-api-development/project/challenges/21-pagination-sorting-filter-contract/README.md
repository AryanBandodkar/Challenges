# 21-pagination-sorting-filter-contract: Pagination Sorting Filter Contract

## Goal

Demonstrate practical understanding of **REST API Design & Implementation** concepts through implementation-level work.

## Concepts Covered

- pagination
- sorting
- filter query contracts
- response metadata

## Files In Scope

- `src/challenges/21-pagination-sorting-filter-contract/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/21-pagination-sorting-filter-contract/index.js`.
2. Export function `solve_21_pagination_sorting_filter_contract` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Read and apply pagination/sorting/filter query params from `req.query`. (`paginationQueryHandling`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-21-pagination-sorting-filter-contract.test.js` or `tests/challenge-21-pagination-sorting-filter-contract.test.ts`
  - `tests/e2e/challenge-21-pagination-sorting-filter-contract.spec.js` or `tests/e2e/challenge-21-pagination-sorting-filter-contract.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_21_pagination_sorting_filter_contract` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=03-express-rest-api-development --challenge=21-pagination-sorting-filter-contract`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
