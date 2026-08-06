import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_06_versioning_cors_content_negotiation } from '../src/challenges/06-versioning-cors-content-negotiation/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '06-versioning-cors-content-negotiation';
const sourceFile = 'src/challenges/06-versioning-cors-content-negotiation/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['corsMiddleware'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('configures CORS for API versioning and content negotiation', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_06_versioning_cors_content_negotiation', () => {
  assert.equal(typeof solve_06_versioning_cors_content_negotiation, 'function');
});

test('returns versioning, CORS, and content negotiation result', async () => {
  await assertReturnProfile('meaningfulResult', solve_06_versioning_cors_content_negotiation());
});
