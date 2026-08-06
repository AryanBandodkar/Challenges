import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_03_generics_guards_utility_types } from '../../src/challenges/03-generics-guards-utility-types/index.ts';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 03-generics-guards-utility-types returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_03_generics_guards_utility_types());
  assert.ok(result !== undefined && result !== null);
});
