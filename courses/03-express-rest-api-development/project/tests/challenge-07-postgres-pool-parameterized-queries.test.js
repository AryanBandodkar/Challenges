import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_07_postgres_pool_parameterized_queries } from '../src/challenges/07-postgres-pool-parameterized-queries/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '07-postgres-pool-parameterized-queries';
const sourceFile = 'src/challenges/07-postgres-pool-parameterized-queries/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['parameterizedQuery'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses parameterized queries with a Postgres connection pool', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_07_postgres_pool_parameterized_queries', () => {
  assert.equal(typeof solve_07_postgres_pool_parameterized_queries, 'function');
});

test('returns Postgres pool and parameterized query implementation', async () => {
  await assertReturnProfile('meaningfulResult', solve_07_postgres_pool_parameterized_queries());
});
