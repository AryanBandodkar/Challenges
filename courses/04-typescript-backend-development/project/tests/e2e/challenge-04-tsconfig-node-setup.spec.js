import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_04_tsconfig_node_setup } from '../../src/challenges/04-tsconfig-node-setup/index.ts';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 04-tsconfig-node-setup returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_04_tsconfig_node_setup());
  assert.ok(result !== undefined && result !== null);
});
