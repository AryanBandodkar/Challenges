import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_10_stream_based_transfer_service } from '../src/challenges/10-stream-based-transfer-service/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '10-stream-based-transfer-service';
const sourceFile = 'src/challenges/10-stream-based-transfer-service/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['streamPipeline'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('pipes streams for large data transfer', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_10_stream_based_transfer_service', () => {
  assert.equal(typeof solve_10_stream_based_transfer_service, 'function');
});

test('returns stream-based transfer service result', async () => {
  await assertReturnProfile('meaningfulResult', solve_10_stream_based_transfer_service());
});
