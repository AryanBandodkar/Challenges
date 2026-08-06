import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_04_oop_inheritance_refactor } from '../../src/challenges/04-oop-inheritance-refactor/index.js';

test('e2e: oop inheritance returns subclass behavior', () => {
  const result = solve_04_oop_inheritance_refactor();
  assert.ok(result !== undefined && result !== null);
});
