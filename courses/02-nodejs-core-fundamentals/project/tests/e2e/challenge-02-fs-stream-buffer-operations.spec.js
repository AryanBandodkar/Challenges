import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_02_fs_stream_buffer_operations } from '../../src/challenges/02-fs-stream-buffer-operations/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 02-fs-stream-buffer-operations returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_02_fs_stream_buffer_operations());
  assert.ok(result !== undefined && result !== null);
});
