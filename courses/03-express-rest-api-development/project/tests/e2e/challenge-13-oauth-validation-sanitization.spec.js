import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_13_oauth_validation_sanitization } from '../../src/challenges/13-oauth-validation-sanitization/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 13-oauth-validation-sanitization returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_13_oauth_validation_sanitization());
  assert.ok(result !== undefined && result !== null);
});
