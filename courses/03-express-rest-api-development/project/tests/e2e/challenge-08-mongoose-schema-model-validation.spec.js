import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_08_mongoose_schema_model_validation } from '../../src/challenges/08-mongoose-schema-model-validation/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 08-mongoose-schema-model-validation returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_08_mongoose_schema_model_validation());
  assert.ok(result !== undefined && result !== null);
});
