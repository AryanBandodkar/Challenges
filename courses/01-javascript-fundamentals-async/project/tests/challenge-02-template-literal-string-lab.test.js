import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_02_template_literal_string_lab } from '../src/challenges/02-template-literal-string-lab/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns
} from '../../../../shared/challenge-test-helpers/index.js';

const sourceFile = 'src/challenges/02-template-literal-string-lab/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses template literals instead of string concatenation', () => {
  assertCommonSourceRules(source, sourceFile);
  assertRequiredPatterns(source, ['templateLiteral'], sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns('02-template-literal-string-lab'), sourceFile);
});

test('exports solve_02_template_literal_string_lab', () => {
  assert.equal(typeof solve_02_template_literal_string_lab, 'function');
});

test('returns a formatted string built with template literals', () => {
  const result = solve_02_template_literal_string_lab();

  assert.equal(typeof result, 'string');
  assert.ok(result.trim().length > 0, 'formatted string should not be empty');
  assert.ok(result.includes('\n') || /[A-Za-z]/.test(result), 'expected labels or readable text');
});
