import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_19_https_tls_api_hardening } from '../src/challenges/19-https-tls-api-hardening/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '19-https-tls-api-hardening';
const sourceFile = 'src/challenges/19-https-tls-api-hardening/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['httpsServer'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('creates an HTTPS server for TLS API hardening', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_19_https_tls_api_hardening', () => {
  assert.equal(typeof solve_19_https_tls_api_hardening, 'function');
});

test('returns HTTPS TLS API hardening configuration', async () => {
  await assertReturnProfile('meaningfulResult', solve_19_https_tls_api_hardening());
});
