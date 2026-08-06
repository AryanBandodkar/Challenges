import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_03_path_os_cross_platform_cli } from '../../src/challenges/03-path-os-cross-platform-cli/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 03-path-os-cross-platform-cli returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_03_path_os_cross_platform_cli());
  assert.ok(result !== undefined && result !== null);
});
