import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_02_fs_stream_buffer_operations } from '../src/challenges/02-fs-stream-buffer-operations/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '02-fs-stream-buffer-operations';
const sourceFile = 'src/challenges/02-fs-stream-buffer-operations/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['fsModuleImport', 'streamPipeline'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('imports fs and uses stream pipeline or read/write streams', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_02_fs_stream_buffer_operations', () => {
  assert.equal(typeof solve_02_fs_stream_buffer_operations, 'function');
});

test('returns a meaningful result demonstrating fs stream and buffer operations', async () => {
  await assertReturnProfile('meaningfulResult', solve_02_fs_stream_buffer_operations());
});
