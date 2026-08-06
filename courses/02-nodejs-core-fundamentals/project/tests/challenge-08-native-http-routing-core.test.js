import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_08_native_http_routing_core } from '../src/challenges/08-native-http-routing-core/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '08-native-http-routing-core';
const sourceFile = 'src/challenges/08-native-http-routing-core/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['httpCreateServer'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('creates a native HTTP server with routing', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_08_native_http_routing_core', () => {
  assert.equal(typeof solve_08_native_http_routing_core, 'function');
});

test('returns native HTTP routing implementation details', async () => {
  await assertReturnProfile('meaningfulResult', solve_08_native_http_routing_core());
});
