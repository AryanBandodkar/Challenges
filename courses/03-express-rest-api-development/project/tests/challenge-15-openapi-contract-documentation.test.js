import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_15_openapi_contract_documentation } from '../src/challenges/15-openapi-contract-documentation/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '15-openapi-contract-documentation';
const sourceFile = 'src/challenges/15-openapi-contract-documentation/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['openApiDoc'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('documents API contract with OpenAPI or Swagger', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_15_openapi_contract_documentation', () => {
  assert.equal(typeof solve_15_openapi_contract_documentation, 'function');
});

test('returns OpenAPI contract documentation result', async () => {
  await assertReturnProfile('meaningfulResult', solve_15_openapi_contract_documentation());
});
