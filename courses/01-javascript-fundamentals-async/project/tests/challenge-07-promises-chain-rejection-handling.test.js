import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_07_promises_chain_rejection_handling } from '../src/challenges/07-promises-chain-rejection-handling/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns
} from '../../../../shared/challenge-test-helpers/index.js';

const sourceFile = 'src/challenges/07-promises-chain-rejection-handling/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('chains promises with .then() and handles errors with .catch()', () => {
  assertCommonSourceRules(source, sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns('07-promises-chain-rejection-handling', ['promiseUsage', 'promiseCatch']),
    sourceFile
  );
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns('07-promises-chain-rejection-handling'), sourceFile);
});

test('exports solve_07_promises_chain_rejection_handling', () => {
  assert.equal(typeof solve_07_promises_chain_rejection_handling, 'function');
});

test('returns a Promise with a resolved or handled error result', async () => {
  const result = solve_07_promises_chain_rejection_handling();
  assert.ok(result instanceof Promise, 'solver should return a Promise');

  const value = await result;
  assert.ok(value !== undefined && value !== null);
});
