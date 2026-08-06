import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_11_operational_vs_programmer_errors } from '../src/challenges/11-operational-vs-programmer-errors/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '11-operational-vs-programmer-errors';
const sourceFile = 'src/challenges/11-operational-vs-programmer-errors/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['tryCatch'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('classifies operational and programmer errors with try/catch', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_11_operational_vs_programmer_errors', () => {
  assert.equal(typeof solve_11_operational_vs_programmer_errors, 'function');
});

test('returns error classification and handling result', async () => {
  await assertReturnProfile('meaningfulResult', solve_11_operational_vs_programmer_errors());
});
