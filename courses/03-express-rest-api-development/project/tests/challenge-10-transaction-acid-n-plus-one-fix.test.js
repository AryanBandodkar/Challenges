import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_10_transaction_acid_n_plus_one_fix } from '../src/challenges/10-transaction-acid-n-plus-one-fix/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '10-transaction-acid-n-plus-one-fix';
const sourceFile = 'src/challenges/10-transaction-acid-n-plus-one-fix/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['transactionUsage'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses database transactions and fixes N+1 query patterns', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_10_transaction_acid_n_plus_one_fix', () => {
  assert.equal(typeof solve_10_transaction_acid_n_plus_one_fix, 'function');
});

test('returns transaction and query optimization result', async () => {
  await assertReturnProfile('meaningfulResult', solve_10_transaction_acid_n_plus_one_fix());
});
