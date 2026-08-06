import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_13_environment_specific_configuration } from '../../src/challenges/13-environment-specific-configuration/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 13-environment-specific-configuration returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_13_environment_specific_configuration());
  assert.ok(result !== undefined && result !== null);
});
