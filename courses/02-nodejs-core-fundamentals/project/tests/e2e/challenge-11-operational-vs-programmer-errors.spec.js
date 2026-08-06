import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_11_operational_vs_programmer_errors } from '../../src/challenges/11-operational-vs-programmer-errors/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 11-operational-vs-programmer-errors returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_11_operational_vs_programmer_errors());
  assert.ok(result !== undefined && result !== null);
});
