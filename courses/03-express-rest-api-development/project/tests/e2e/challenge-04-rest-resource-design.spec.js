import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_04_rest_resource_design } from '../../src/challenges/04-rest-resource-design/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 04-rest-resource-design returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_04_rest_resource_design());
  assert.ok(result !== undefined && result !== null);
});
