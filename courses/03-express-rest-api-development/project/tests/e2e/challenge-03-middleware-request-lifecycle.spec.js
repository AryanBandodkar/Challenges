import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_03_middleware_request_lifecycle } from '../../src/challenges/03-middleware-request-lifecycle/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 03-middleware-request-lifecycle returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_03_middleware_request_lifecycle());
  assert.ok(result !== undefined && result !== null);
});
