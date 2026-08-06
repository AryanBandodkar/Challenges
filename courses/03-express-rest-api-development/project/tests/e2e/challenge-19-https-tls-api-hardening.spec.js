import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_19_https_tls_api_hardening } from '../../src/challenges/19-https-tls-api-hardening/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 19-https-tls-api-hardening returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_19_https_tls_api_hardening());
  assert.ok(result !== undefined && result !== null);
});
