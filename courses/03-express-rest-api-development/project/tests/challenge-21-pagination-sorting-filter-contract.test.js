import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_21_pagination_sorting_filter_contract } from '../src/challenges/21-pagination-sorting-filter-contract/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '21-pagination-sorting-filter-contract';
const sourceFile = 'src/challenges/21-pagination-sorting-filter-contract/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['paginationQueryHandling'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('handles pagination, sorting, and filter query parameters', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_21_pagination_sorting_filter_contract', () => {
  assert.equal(typeof solve_21_pagination_sorting_filter_contract, 'function');
});

test('returns pagination, sorting, and filter contract implementation', async () => {
  await assertReturnProfile('meaningfulResult', solve_21_pagination_sorting_filter_contract());
});
