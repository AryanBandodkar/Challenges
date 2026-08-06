import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_01_runtime_event_loop_visualizer } from '../src/challenges/01-runtime-event-loop-visualizer/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '01-runtime-event-loop-visualizer';
const sourceFile = 'src/challenges/01-runtime-event-loop-visualizer/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['promiseUsage', 'setTimeoutUsage'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses Promises and setTimeout to visualize event-loop execution order', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_01_runtime_event_loop_visualizer', () => {
  assert.equal(typeof solve_01_runtime_event_loop_visualizer, 'function');
});

test('returns ordered event-loop steps as a Promise', async () => {
  await assertReturnProfile('orderedSteps', solve_01_runtime_event_loop_visualizer());
});
