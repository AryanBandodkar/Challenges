import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_18_static_files_template_engines } from '../src/challenges/18-static-files-template-engines/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '18-static-files-template-engines';
const sourceFile = 'src/challenges/18-static-files-template-engines/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['expressStaticServing', 'templateEngineSetup'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('serves static files and configures a template engine', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_18_static_files_template_engines', () => {
  assert.equal(typeof solve_18_static_files_template_engines, 'function');
});

test('returns static file and template engine configuration', async () => {
  await assertReturnProfile('meaningfulResult', solve_18_static_files_template_engines());
});
