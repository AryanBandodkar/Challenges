import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_11_jwt_refresh_token_auth } from '../src/challenges/11-jwt-refresh-token-auth/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '11-jwt-refresh-token-auth';
const sourceFile = 'src/challenges/11-jwt-refresh-token-auth/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['jwtSignVerify'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('signs and verifies JWT access and refresh tokens', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_11_jwt_refresh_token_auth', () => {
  assert.equal(typeof solve_11_jwt_refresh_token_auth, 'function');
});

test('returns JWT refresh token authentication result', async () => {
  await assertReturnProfile('meaningfulResult', solve_11_jwt_refresh_token_auth());
});
