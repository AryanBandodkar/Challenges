import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_14_rate_limiting_ddos_protection } from '../../src/challenges/14-rate-limiting-ddos-protection/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 14-rate-limiting-ddos-protection returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_14_rate_limiting_ddos_protection());
  assert.ok(result !== undefined && result !== null);
});
