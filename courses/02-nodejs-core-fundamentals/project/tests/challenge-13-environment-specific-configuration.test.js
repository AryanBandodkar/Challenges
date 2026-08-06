import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_13_environment_specific_configuration } from '../src/challenges/13-environment-specific-configuration/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '13-environment-specific-configuration';
const sourceFile = 'src/challenges/13-environment-specific-configuration/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['dotenvConfig', 'processUsage'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('loads environment-specific configuration with dotenv and process.env', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_13_environment_specific_configuration', () => {
  assert.equal(typeof solve_13_environment_specific_configuration, 'function');
});

test('returns environment-specific configuration result', async () => {
  await assertReturnProfile('meaningfulResult', solve_13_environment_specific_configuration());
});
