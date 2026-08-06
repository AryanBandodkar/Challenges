import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_17_coverage_mocking_versioned_api_tests } from '../src/challenges/17-coverage-mocking-versioned-api-tests/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile,
  assertSourceProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '17-coverage-mocking-versioned-api-tests';
const sourceFile = 'src/challenges/17-coverage-mocking-versioned-api-tests/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['supertestRequest'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('includes Supertest HTTP request assertions for versioned API tests', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
  assertSourceProfile('supertestTestsPresent', source);
});

test('exports solve_17_coverage_mocking_versioned_api_tests', () => {
  assert.equal(typeof solve_17_coverage_mocking_versioned_api_tests, 'function');
});

test('returns versioned API test suite with Supertest coverage and mocking', async () => {
  await assertReturnProfile('supertestTestsPresent', solve_17_coverage_mocking_versioned_api_tests());
});
