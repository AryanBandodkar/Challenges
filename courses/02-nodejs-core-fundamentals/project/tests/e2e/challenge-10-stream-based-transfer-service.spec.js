import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_10_stream_based_transfer_service } from '../../src/challenges/10-stream-based-transfer-service/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 10-stream-based-transfer-service returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_10_stream_based_transfer_service());
  assert.ok(result !== undefined && result !== null);
});
