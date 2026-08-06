import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_06_callback_hell_rescue } from '../src/challenges/06-callback-hell-rescue/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  resolveSolverResult
} from '../../../../shared/challenge-test-helpers/index.js';

const sourceFile = 'src/challenges/06-callback-hell-rescue/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses callback-based async control flow without Promises or async/await', () => {
  assertCommonSourceRules(source, sourceFile);
  assertRequiredPatterns(source, ['callbackFunction'], sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns('06-callback-hell-rescue'), sourceFile);
});

test('exports solve_06_callback_hell_rescue', () => {
  assert.equal(typeof solve_06_callback_hell_rescue, 'function');
});

test('coordinates asynchronous work through callbacks', async () => {
  const value = await resolveSolverResult(solve_06_callback_hell_rescue());
  assert.ok(value !== undefined && value !== null);
});
