import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_05_http_method_status_formatting } from '../src/challenges/05-http-method-status-formatting/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '05-http-method-status-formatting';
const sourceFile = 'src/challenges/05-http-method-status-formatting/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['httpStatusUsage'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('formats HTTP responses with appropriate status codes', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_05_http_method_status_formatting', () => {
  assert.equal(typeof solve_05_http_method_status_formatting, 'function');
});

test('returns HTTP method and status formatting result', async () => {
  await assertReturnProfile('meaningfulResult', solve_05_http_method_status_formatting());
});
