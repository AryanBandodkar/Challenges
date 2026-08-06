import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_09_query_headers_status_contract } from '../src/challenges/09-query-headers-status-contract/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '09-query-headers-status-contract';
const sourceFile = 'src/challenges/09-query-headers-status-contract/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['urlClassUsage', 'httpStatusUsage'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('parses URLs and sets HTTP status codes on responses', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_09_query_headers_status_contract', () => {
  assert.equal(typeof solve_09_query_headers_status_contract, 'function');
});

test('returns query, header, and status contract handling result', async () => {
  await assertReturnProfile('meaningfulResult', solve_09_query_headers_status_contract());
});
