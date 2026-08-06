import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_03_middleware_request_lifecycle } from '../src/challenges/03-middleware-request-lifecycle/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '03-middleware-request-lifecycle';
const sourceFile = 'src/challenges/03-middleware-request-lifecycle/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['middlewareNext'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('implements middleware that calls next() in the request lifecycle', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_03_middleware_request_lifecycle', () => {
  assert.equal(typeof solve_03_middleware_request_lifecycle, 'function');
});

test('returns middleware request lifecycle implementation', async () => {
  await assertReturnProfile('meaningfulResult', solve_03_middleware_request_lifecycle());
});
