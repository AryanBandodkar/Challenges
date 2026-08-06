import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_09_sql_vs_nosql_design_review } from '../src/challenges/09-sql-vs-nosql-design-review/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '09-sql-vs-nosql-design-review';
const sourceFile = 'src/challenges/09-sql-vs-nosql-design-review/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = [];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('documents SQL vs NoSQL design trade-offs', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_09_sql_vs_nosql_design_review', () => {
  assert.equal(typeof solve_09_sql_vs_nosql_design_review, 'function');
});

test('returns SQL vs NoSQL design review output', async () => {
  await assertReturnProfile('meaningfulResult', solve_09_sql_vs_nosql_design_review());
});
