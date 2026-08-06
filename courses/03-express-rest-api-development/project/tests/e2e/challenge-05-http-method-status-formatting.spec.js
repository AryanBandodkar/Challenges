import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_05_http_method_status_formatting } from '../../src/challenges/05-http-method-status-formatting/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 05-http-method-status-formatting returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_05_http_method_status_formatting());
  assert.ok(result !== undefined && result !== null);
});
