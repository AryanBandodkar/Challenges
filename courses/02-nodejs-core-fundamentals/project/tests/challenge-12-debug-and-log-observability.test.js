import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_12_debug_and_log_observability } from '../src/challenges/12-debug-and-log-observability/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '12-debug-and-log-observability';
const sourceFile = 'src/challenges/12-debug-and-log-observability/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['loggerPattern'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses structured logging via logger or console.info/warn/error', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_12_debug_and_log_observability', () => {
  assert.equal(typeof solve_12_debug_and_log_observability, 'function');
});

test('returns observability output while using structured logging', async () => {
  await assertReturnProfile('meaningfulResultAllowLogger', solve_12_debug_and_log_observability());
});
