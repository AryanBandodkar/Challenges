import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_01_runtime_event_loop_visualizer } from '../../src/challenges/01-runtime-event-loop-visualizer/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 01-runtime-event-loop-visualizer returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_01_runtime_event_loop_visualizer());
  assert.ok(result !== undefined && result !== null);
});
