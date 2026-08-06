import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_14_utility_libraries_and_package_publishing } from '../src/challenges/14-utility-libraries-and-package-publishing/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '14-utility-libraries-and-package-publishing';
const sourceFile = 'src/challenges/14-utility-libraries-and-package-publishing/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['npmScript'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('defines npm scripts for utility libraries and package publishing', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_14_utility_libraries_and_package_publishing', () => {
  assert.equal(typeof solve_14_utility_libraries_and_package_publishing, 'function');
});

test('returns utility library and publishing workflow result', async () => {
  await assertReturnProfile('meaningfulResult', solve_14_utility_libraries_and_package_publishing());
});
