import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_04_oop_inheritance_refactor } from '../src/challenges/04-oop-inheritance-refactor/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns
} from '../../../../shared/challenge-test-helpers/index.js';

const sourceFile = 'src/challenges/04-oop-inheritance-refactor/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('defines classes and uses extends for inheritance', () => {
  assertCommonSourceRules(source, sourceFile);
  assertRequiredPatterns(source, ['classSyntax', 'extendsKeyword'], sourceFile);
});

test('exports solve_04_oop_inheritance_refactor', () => {
  assert.equal(typeof solve_04_oop_inheritance_refactor, 'function');
});

test('demonstrates subclass behavior through inheritance', () => {
  const result = solve_04_oop_inheritance_refactor();

  assert.ok(result !== undefined && result !== null);

  if (typeof result === 'string') {
    assert.ok(result.length > 0);
    return;
  }

  if (typeof result === 'object') {
    assert.ok(Object.keys(result).length > 0);
    return;
  }

  assert.ok(typeof result === 'number' || typeof result === 'boolean');
});
