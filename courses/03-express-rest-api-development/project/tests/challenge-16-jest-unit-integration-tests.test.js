import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_16_jest_unit_integration_tests } from '../src/challenges/16-jest-unit-integration-tests/index.js';
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

const challengeId = '16-jest-unit-integration-tests';
const sourceFile = 'src/challenges/16-jest-unit-integration-tests/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['jestDescribeIt'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('includes Jest describe() and it() unit and integration tests', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
  assertSourceProfile('jestTestsPresent', source);
});

test('exports solve_16_jest_unit_integration_tests', () => {
  assert.equal(typeof solve_16_jest_unit_integration_tests, 'function');
});

test('returns Jest test suite demonstrating unit and integration coverage', async () => {
  await assertReturnProfile('jestTestsPresent', solve_16_jest_unit_integration_tests());
});
