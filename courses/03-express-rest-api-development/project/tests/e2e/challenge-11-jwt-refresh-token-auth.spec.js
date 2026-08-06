import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_11_jwt_refresh_token_auth } from '../../src/challenges/11-jwt-refresh-token-auth/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 11-jwt-refresh-token-auth returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_11_jwt_refresh_token_auth());
  assert.ok(result !== undefined && result !== null);
});
