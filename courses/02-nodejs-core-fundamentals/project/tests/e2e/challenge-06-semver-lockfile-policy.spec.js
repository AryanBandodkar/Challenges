import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_06_semver_lockfile_policy } from '../../src/challenges/06-semver-lockfile-policy/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 06-semver-lockfile-policy returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_06_semver_lockfile_policy());
  assert.ok(result !== undefined && result !== null);
});
