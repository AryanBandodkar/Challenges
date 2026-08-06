import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_06_versioning_cors_content_negotiation } from '../../src/challenges/06-versioning-cors-content-negotiation/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 06-versioning-cors-content-negotiation returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_06_versioning_cors_content_negotiation());
  assert.ok(result !== undefined && result !== null);
});
