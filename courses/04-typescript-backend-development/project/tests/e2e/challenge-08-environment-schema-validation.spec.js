import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_08_environment_schema_validation } from '../../src/challenges/08-environment-schema-validation/index.ts';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 08-environment-schema-validation returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_08_environment_schema_validation());
  assert.ok(result !== undefined && result !== null);
});
