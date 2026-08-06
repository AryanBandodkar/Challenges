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

const challengeId = '15-coverage-reporting-tdd-cycle';
const sourceFile = 'src/challenges/15-coverage-reporting-tdd-cycle/index.ts';
const solverName = 'solve_15_coverage_reporting_tdd_cycle';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['jestDescribeIt'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('includes Jest describe() and it() blocks for TDD coverage reporting', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
  assertSourceProfile('jestTestsPresent', source);
});

test('exports solve_15_coverage_reporting_tdd_cycle from scoped source', () => {
  assert.match(
    source,
    /export\s+(async\s+)?function\s+solve_15_coverage_reporting_tdd_cycle\b/,
    'expected exported solver function in scoped source'
  );
});

test('returns coverage reporting and TDD cycle test suite', async () => {
  const projectDir = dirname(dirname(fileURLToPath(import.meta.url)));
  const solverModule = await import(solverImportUrl(projectDir, sourceFile));
  const solver = solverModule[solverName];
  assert.equal(typeof solver, 'function');
  await assertReturnProfile('jestTestsPresent', solver());
});
