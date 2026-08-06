import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_05_package_json_governance } from '../../src/challenges/05-package-json-governance/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 05-package-json-governance returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_05_package_json_governance());
  assert.ok(result !== undefined && result !== null);
});
