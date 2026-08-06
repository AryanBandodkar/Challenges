import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_15_graceful_shutdown_signal_handling } from '../src/challenges/15-graceful-shutdown-signal-handling/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '15-graceful-shutdown-signal-handling';
const sourceFile = 'src/challenges/15-graceful-shutdown-signal-handling/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['signalHandler', 'gracefulShutdown'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('handles SIGINT/SIGTERM and performs graceful shutdown', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_15_graceful_shutdown_signal_handling', () => {
  assert.equal(typeof solve_15_graceful_shutdown_signal_handling, 'function');
});

test('returns graceful shutdown and signal handling result', async () => {
  await assertReturnProfile('meaningfulResult', solve_15_graceful_shutdown_signal_handling());
});
