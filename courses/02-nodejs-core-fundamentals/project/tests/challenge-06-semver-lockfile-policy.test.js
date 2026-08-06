import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_06_semver_lockfile_policy } from '../src/challenges/06-semver-lockfile-policy/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '06-semver-lockfile-policy';
const sourceFile = 'src/challenges/06-semver-lockfile-policy/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = [];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('implements semver and lockfile policy guidance', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_06_semver_lockfile_policy', () => {
  assert.equal(typeof solve_06_semver_lockfile_policy, 'function');
});

test('returns semver and lockfile policy output', async () => {
  await assertReturnProfile('meaningfulResult', solve_06_semver_lockfile_policy());
});
