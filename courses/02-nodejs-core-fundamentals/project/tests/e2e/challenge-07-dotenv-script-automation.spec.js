import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_07_dotenv_script_automation } from '../../src/challenges/07-dotenv-script-automation/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 07-dotenv-script-automation returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_07_dotenv_script_automation());
  assert.ok(result !== undefined && result !== null);
});
