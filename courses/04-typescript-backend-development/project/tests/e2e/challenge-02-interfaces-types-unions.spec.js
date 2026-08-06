import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_02_interfaces_types_unions } from '../../src/challenges/02-interfaces-types-unions/index.ts';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 02-interfaces-types-unions returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_02_interfaces_types_unions());
  assert.ok(result !== undefined && result !== null);
});
