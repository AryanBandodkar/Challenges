# 10-transaction-acid-n-plus-one-fix: Transaction ACID N Plus One Fix

## Goal

Demonstrate practical understanding of **Database Integration** concepts through implementation-level work.

## Concepts Covered

- transactions
- ACID
- query optimization
- N+1 mitigation

## Files In Scope

- `src/challenges/10-transaction-acid-n-plus-one-fix/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/10-transaction-acid-n-plus-one-fix/index.js`.
2. Export function `solve_10_transaction_acid_n_plus_one_fix` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Model transaction control (`BEGIN/COMMIT/ROLLBACK` or transaction wrapper). (`transactionUsage`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-10-transaction-acid-n-plus-one-fix.test.js` or `tests/challenge-10-transaction-acid-n-plus-one-fix.test.ts`
  - `tests/e2e/challenge-10-transaction-acid-n-plus-one-fix.spec.js` or `tests/e2e/challenge-10-transaction-acid-n-plus-one-fix.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_10_transaction_acid_n_plus_one_fix` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=03-express-rest-api-development --challenge=10-transaction-acid-n-plus-one-fix`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
