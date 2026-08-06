import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_09_sql_vs_nosql_design_review } from '../../src/challenges/09-sql-vs-nosql-design-review/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 09-sql-vs-nosql-design-review returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_09_sql_vs_nosql_design_review());
  assert.ok(result !== undefined && result !== null);
});
