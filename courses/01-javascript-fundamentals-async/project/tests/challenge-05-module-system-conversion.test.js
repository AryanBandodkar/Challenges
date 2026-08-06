import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_05_module_system_conversion } from '../src/challenges/05-module-system-conversion/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns
} from '../../../../shared/challenge-test-helpers/index.js';

const sourceFile = 'src/challenges/05-module-system-conversion/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses ES module import/export and avoids CommonJS', () => {
  assertCommonSourceRules(source, sourceFile);
  assertRequiredPatterns(source, ['importStatement', 'exportStatement'], sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns('05-module-system-conversion'), sourceFile);
});

test('exports solve_05_module_system_conversion', () => {
  assert.equal(typeof solve_05_module_system_conversion, 'function');
});

test('returns a meaningful result demonstrating imported module usage', () => {
  const result = solve_05_module_system_conversion();
  assert.ok(result !== undefined && result !== null);
});
