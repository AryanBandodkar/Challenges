import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_12_debug_and_log_observability } from '../../src/challenges/12-debug-and-log-observability/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 12-debug-and-log-observability returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_12_debug_and_log_observability());
  assert.ok(result !== undefined && result !== null);
});
