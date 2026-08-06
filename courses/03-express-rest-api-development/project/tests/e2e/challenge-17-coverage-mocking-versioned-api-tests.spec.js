import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_17_coverage_mocking_versioned_api_tests } from '../../src/challenges/17-coverage-mocking-versioned-api-tests/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 17-coverage-mocking-versioned-api-tests returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_17_coverage_mocking_versioned_api_tests());
  assert.ok(result !== undefined && result !== null);
});
