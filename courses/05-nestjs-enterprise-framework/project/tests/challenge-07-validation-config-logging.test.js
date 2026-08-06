import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile,
  solverImportUrl
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '07-validation-config-logging';
const sourceFile = 'src/challenges/07-validation-config-logging/index.ts';
const solverName = 'solve_07_validation_config_logging';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['classValidatorUsage'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses class-validator for DTO validation with config and logging', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_07_validation_config_logging from scoped source', () => {
  assert.match(
    source,
    /export\s+(async\s+)?function\s+solve_07_validation_config_logging\b/,
    'expected exported solver function in scoped source'
  );
});

test('returns validation, configuration, and logging implementation', async () => {
  const projectDir = dirname(dirname(fileURLToPath(import.meta.url)));
  const solverModule = await import(solverImportUrl(projectDir, sourceFile));
  const solver = solverModule[solverName];
  assert.equal(typeof solver, 'function');
  await assertReturnProfile('meaningfulResult', solver());
});
