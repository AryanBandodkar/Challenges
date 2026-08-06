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
  assertSourceProfile,
  solverImportUrl
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '14-unit-e2e-mocking-strategy';
const sourceFile = 'src/challenges/14-unit-e2e-mocking-strategy/index.ts';
const solverName = 'solve_14_unit_e2e_mocking_strategy';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['jestDescribeIt', 'supertestRequest'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('includes Jest describe/it blocks and Supertest HTTP request tests', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
  assertSourceProfile('jestTestsPresent', source);
});

test('exports solve_14_unit_e2e_mocking_strategy from scoped source', () => {
  assert.match(
    source,
    /export\s+(async\s+)?function\s+solve_14_unit_e2e_mocking_strategy\b/,
    'expected exported solver function in scoped source'
  );
});

test('returns unit and e2e mocking strategy test suite', async () => {
  const projectDir = dirname(dirname(fileURLToPath(import.meta.url)));
  const solverModule = await import(solverImportUrl(projectDir, sourceFile));
  const solver = solverModule[solverName];
  assert.equal(typeof solver, 'function');
  await assertReturnProfile('jestTestsPresent', solver());
});
