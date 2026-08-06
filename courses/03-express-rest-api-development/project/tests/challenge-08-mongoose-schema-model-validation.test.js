import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_08_mongoose_schema_model_validation } from '../src/challenges/08-mongoose-schema-model-validation/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '08-mongoose-schema-model-validation';
const sourceFile = 'src/challenges/08-mongoose-schema-model-validation/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['mongooseSchema'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('defines Mongoose schema and model with validation', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_08_mongoose_schema_model_validation', () => {
  assert.equal(typeof solve_08_mongoose_schema_model_validation, 'function');
});

test('returns Mongoose schema and model validation result', async () => {
  await assertReturnProfile('meaningfulResult', solve_08_mongoose_schema_model_validation());
});
