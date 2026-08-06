import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_01_express_app_bootstrap } from '../../src/challenges/01-express-app-bootstrap/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 01-express-app-bootstrap returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_01_express_app_bootstrap());
  assert.ok(result !== undefined && result !== null);
});
