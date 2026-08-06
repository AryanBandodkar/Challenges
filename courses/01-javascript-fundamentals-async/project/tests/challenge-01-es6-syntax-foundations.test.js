import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_01_es6_syntax_foundations } from '../src/challenges/01-es6-syntax-foundations/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns
} from '../../../../shared/challenge-test-helpers/index.js';

const sourceFile = 'src/challenges/01-es6-syntax-foundations/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses const/let and avoids var', () => {
  assertCommonSourceRules(source, sourceFile);
  assert.match(source, /\b(const|let)\b/, 'expected const or let declarations');
});

test('uses arrow functions, destructuring, and spread/rest syntax', () => {
  assertRequiredPatterns(
    source,
    ['arrowFunction', 'destructuring', 'spreadOperator', 'constLetUsage'],
    sourceFile
  );
});

test('exports solve_01_es6_syntax_foundations', () => {
  assert.equal(typeof solve_01_es6_syntax_foundations, 'function');
});

test('returns a meaningful result object with original and transformed number arrays', () => {
  const result = solve_01_es6_syntax_foundations();

  assert.equal(typeof result, 'object');
  assert.ok(Array.isArray(result.original), 'expected original array');
  assert.ok(result.original.length > 0, 'original array should not be empty');

  const transformed = result.transformed ?? result.doubled;
  assert.ok(Array.isArray(transformed), 'expected transformed or doubled array');
  assert.equal(transformed.length, result.original.length);

  for (let index = 0; index < result.original.length; index += 1) {
    assert.equal(typeof result.original[index], 'number');
    assert.equal(typeof transformed[index], 'number');
  }
});
