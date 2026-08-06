import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_05_module_system_conversion } from '../../src/challenges/05-module-system-conversion/index.js';

test('e2e: module conversion returns imported-module result', () => {
  const result = solve_05_module_system_conversion();
  assert.ok(result !== undefined && result !== null);
});
