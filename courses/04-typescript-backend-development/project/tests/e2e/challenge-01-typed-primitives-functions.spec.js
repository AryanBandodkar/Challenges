import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_01_typed_primitives_functions } from '../../src/challenges/01-typed-primitives-functions/index.ts';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 01-typed-primitives-functions returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_01_typed_primitives_functions());
  assert.ok(result !== undefined && result !== null);
});
