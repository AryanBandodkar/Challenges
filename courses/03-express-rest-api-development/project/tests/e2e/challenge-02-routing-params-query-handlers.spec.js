import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_02_routing_params_query_handlers } from '../../src/challenges/02-routing-params-query-handlers/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 02-routing-params-query-handlers returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_02_routing_params_query_handlers());
  assert.ok(result !== undefined && result !== null);
});
