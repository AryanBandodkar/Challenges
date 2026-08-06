import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_15_openapi_contract_documentation } from '../../src/challenges/15-openapi-contract-documentation/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 15-openapi-contract-documentation returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_15_openapi_contract_documentation());
  assert.ok(result !== undefined && result !== null);
});
