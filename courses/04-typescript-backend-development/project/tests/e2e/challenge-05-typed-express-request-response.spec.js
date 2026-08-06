import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_05_typed_express_request_response } from '../../src/challenges/05-typed-express-request-response/index.ts';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 05-typed-express-request-response returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_05_typed_express_request_response());
  assert.ok(result !== undefined && result !== null);
});
