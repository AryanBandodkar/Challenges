import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_10_transaction_acid_n_plus_one_fix } from '../../src/challenges/10-transaction-acid-n-plus-one-fix/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 10-transaction-acid-n-plus-one-fix returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_10_transaction_acid_n_plus_one_fix());
  assert.ok(result !== undefined && result !== null);
});
