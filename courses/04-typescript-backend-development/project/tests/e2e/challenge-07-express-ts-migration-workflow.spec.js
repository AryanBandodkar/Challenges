import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_07_express_ts_migration_workflow } from '../../src/challenges/07-express-ts-migration-workflow/index.ts';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 07-express-ts-migration-workflow returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_07_express_ts_migration_workflow());
  assert.ok(result !== undefined && result !== null);
});
