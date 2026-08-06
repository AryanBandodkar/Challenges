import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_04_process_worker_lifecycle } from '../src/challenges/04-process-worker-lifecycle/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '04-process-worker-lifecycle';
const sourceFile = 'src/challenges/04-process-worker-lifecycle/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['processUsage', 'childProcessUsage'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses process APIs and child process or worker threads', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_04_process_worker_lifecycle', () => {
  assert.equal(typeof solve_04_process_worker_lifecycle, 'function');
});

test('returns process and worker lifecycle diagnostics', async () => {
  await assertReturnProfile('meaningfulResult', solve_04_process_worker_lifecycle());
});
