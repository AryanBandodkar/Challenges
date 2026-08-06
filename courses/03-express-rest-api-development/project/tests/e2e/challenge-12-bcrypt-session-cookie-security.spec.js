import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_12_bcrypt_session_cookie_security } from '../../src/challenges/12-bcrypt-session-cookie-security/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 12-bcrypt-session-cookie-security returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_12_bcrypt_session_cookie_security());
  assert.ok(result !== undefined && result !== null);
});
