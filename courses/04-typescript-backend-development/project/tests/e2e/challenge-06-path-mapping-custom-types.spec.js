import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_06_path_mapping_custom_types } from '../../src/challenges/06-path-mapping-custom-types/index.ts';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 06-path-mapping-custom-types returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_06_path_mapping_custom_types());
  assert.ok(result !== undefined && result !== null);
});
