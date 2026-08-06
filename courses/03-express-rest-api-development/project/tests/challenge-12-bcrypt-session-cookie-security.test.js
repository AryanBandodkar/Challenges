import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_12_bcrypt_session_cookie_security } from '../src/challenges/12-bcrypt-session-cookie-security/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '12-bcrypt-session-cookie-security';
const sourceFile = 'src/challenges/12-bcrypt-session-cookie-security/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['bcryptUsage'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('hashes passwords with bcrypt and secures session cookies', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_12_bcrypt_session_cookie_security', () => {
  assert.equal(typeof solve_12_bcrypt_session_cookie_security, 'function');
});

test('returns bcrypt session and cookie security result', async () => {
  await assertReturnProfile('meaningfulResult', solve_12_bcrypt_session_cookie_security());
});
