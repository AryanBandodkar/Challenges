import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_15_graceful_shutdown_signal_handling } from '../../src/challenges/15-graceful-shutdown-signal-handling/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 15-graceful-shutdown-signal-handling returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_15_graceful_shutdown_signal_handling());
  assert.ok(result !== undefined && result !== null);
});
