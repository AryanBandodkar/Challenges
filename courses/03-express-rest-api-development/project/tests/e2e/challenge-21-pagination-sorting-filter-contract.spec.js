import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_21_pagination_sorting_filter_contract } from '../../src/challenges/21-pagination-sorting-filter-contract/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 21-pagination-sorting-filter-contract returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_21_pagination_sorting_filter_contract());
  assert.ok(result !== undefined && result !== null);
});
