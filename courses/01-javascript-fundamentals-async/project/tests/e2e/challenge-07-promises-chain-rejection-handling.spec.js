import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_07_promises_chain_rejection_handling } from '../../src/challenges/07-promises-chain-rejection-handling/index.js';

test('e2e: promise chain resolves or handles rejection', async () => {
  const result = solve_07_promises_chain_rejection_handling();
  assert.ok(result instanceof Promise);
  const value = await result;
  assert.ok(value !== undefined && value !== null);
});
