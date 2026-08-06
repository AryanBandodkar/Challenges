import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_14_rate_limiting_ddos_protection } from '../src/challenges/14-rate-limiting-ddos-protection/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '14-rate-limiting-ddos-protection';
const sourceFile = 'src/challenges/14-rate-limiting-ddos-protection/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['rateLimitMiddleware'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('applies rate limiting middleware for DDoS protection', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_14_rate_limiting_ddos_protection', () => {
  assert.equal(typeof solve_14_rate_limiting_ddos_protection, 'function');
});

test('returns rate limiting and DDoS protection result', async () => {
  await assertReturnProfile('meaningfulResult', solve_14_rate_limiting_ddos_protection());
});
