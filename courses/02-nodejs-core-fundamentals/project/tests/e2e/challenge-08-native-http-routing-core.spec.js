import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_08_native_http_routing_core } from '../../src/challenges/08-native-http-routing-core/index.js';
import { resolveSolverResult } from '../../../../../shared/challenge-test-helpers/index.js';

test('e2e: 08-native-http-routing-core returns a meaningful result', async () => {
  const result = await resolveSolverResult(solve_08_native_http_routing_core());
  assert.ok(result !== undefined && result !== null);
});
