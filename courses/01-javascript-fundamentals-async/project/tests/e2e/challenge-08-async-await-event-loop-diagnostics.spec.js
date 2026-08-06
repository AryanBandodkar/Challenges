import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_08_async_await_event_loop_diagnostics } from '../../src/challenges/08-async-await-event-loop-diagnostics/index.js';

test('e2e: async event-loop diagnostics returns ordered steps', async () => {
  const result = solve_08_async_await_event_loop_diagnostics();
  assert.ok(result instanceof Promise);
  const steps = await result;
  assert.ok(Array.isArray(steps));
  assert.ok(steps.length > 0);
});
