import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_13_oauth_validation_sanitization } from '../src/challenges/13-oauth-validation-sanitization/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '13-oauth-validation-sanitization';
const sourceFile = 'src/challenges/13-oauth-validation-sanitization/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['inputValidation'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('validates and sanitizes OAuth input with Joi or Zod', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_13_oauth_validation_sanitization', () => {
  assert.equal(typeof solve_13_oauth_validation_sanitization, 'function');
});

test('returns OAuth validation and sanitization result', async () => {
  await assertReturnProfile('meaningfulResult', solve_13_oauth_validation_sanitization());
});
