import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_03_array_methods_data_pipeline } from '../../src/challenges/03-array-methods-data-pipeline/index.js';

test('e2e: array pipeline returns a finite numeric aggregate', () => {
  const result = solve_03_array_methods_data_pipeline();
  const value = typeof result === 'number' ? result : result.total ?? result.sum ?? result.value ?? result.result;
  assert.equal(typeof value, 'number');
  assert.ok(Number.isFinite(value));
});
