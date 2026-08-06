import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_18_static_files_template_engines } from '../../src/challenges/18-static-files-template-engines/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 18-static-files-template-engines returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_18_static_files_template_engines());
  assert.ok(result !== undefined && result !== null);
});
