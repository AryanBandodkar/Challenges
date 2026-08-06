import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_06_callback_hell_rescue } from '../../src/challenges/06-callback-hell-rescue/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: callback hell rescue resolves through callbacks', async () => {
  const result = await resolveSolverResult(solve_06_callback_hell_rescue());
  assert.ok(result !== undefined && result !== null);
});
