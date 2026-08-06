import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_01_es6_syntax_foundations } from '../../src/challenges/01-es6-syntax-foundations/index.js';

test('e2e: es6 syntax foundations returns transformed numbers', () => {
  const result = solve_01_es6_syntax_foundations();
  assert.ok(Array.isArray(result.original));
  assert.ok(Array.isArray(result.transformed ?? result.doubled));
});
