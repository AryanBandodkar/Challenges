import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_14_utility_libraries_and_package_publishing } from '../../src/challenges/14-utility-libraries-and-package-publishing/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 14-utility-libraries-and-package-publishing returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_14_utility_libraries_and_package_publishing());
  assert.ok(result !== undefined && result !== null);
});
