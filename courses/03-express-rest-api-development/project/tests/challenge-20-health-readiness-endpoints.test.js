import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_20_health_readiness_endpoints } from '../src/challenges/20-health-readiness-endpoints/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '20-health-readiness-endpoints';
const sourceFile = 'src/challenges/20-health-readiness-endpoints/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['healthEndpoint'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('exposes health and readiness probe endpoints', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_20_health_readiness_endpoints', () => {
  assert.equal(typeof solve_20_health_readiness_endpoints, 'function');
});

test('returns health and readiness endpoint implementation', async () => {
  await assertReturnProfile('meaningfulResult', solve_20_health_readiness_endpoints());
});
