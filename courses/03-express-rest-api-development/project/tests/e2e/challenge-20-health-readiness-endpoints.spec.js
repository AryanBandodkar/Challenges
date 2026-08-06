import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_20_health_readiness_endpoints } from '../../src/challenges/20-health-readiness-endpoints/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 20-health-readiness-endpoints returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_20_health_readiness_endpoints());
  assert.ok(result !== undefined && result !== null);
});
