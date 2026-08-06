import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_07_dotenv_script_automation } from '../src/challenges/07-dotenv-script-automation/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '07-dotenv-script-automation';
const sourceFile = 'src/challenges/07-dotenv-script-automation/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['dotenvConfig', 'processUsage'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('loads environment variables with dotenv and process.env', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_07_dotenv_script_automation', () => {
  assert.equal(typeof solve_07_dotenv_script_automation, 'function');
});

test('returns dotenv automation configuration result', async () => {
  await assertReturnProfile('meaningfulResult', solve_07_dotenv_script_automation());
});
