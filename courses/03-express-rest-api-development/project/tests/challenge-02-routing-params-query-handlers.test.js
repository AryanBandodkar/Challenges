import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_02_routing_params_query_handlers } from '../src/challenges/02-routing-params-query-handlers/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '02-routing-params-query-handlers';
const sourceFile = 'src/challenges/02-routing-params-query-handlers/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['expressRouter', 'routeParamUsage'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('defines Express routes with params and query handlers', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_02_routing_params_query_handlers', () => {
  assert.equal(typeof solve_02_routing_params_query_handlers, 'function');
});

test('returns routing params and query handler implementation', async () => {
  await assertReturnProfile('meaningfulResult', solve_02_routing_params_query_handlers());
});
