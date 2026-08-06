import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_01_express_app_bootstrap } from '../src/challenges/01-express-app-bootstrap/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '01-express-app-bootstrap';
const sourceFile = 'src/challenges/01-express-app-bootstrap/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['expressApp'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('bootstraps an Express application instance', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_01_express_app_bootstrap', () => {
  assert.equal(typeof solve_01_express_app_bootstrap, 'function');
});

test('returns Express app bootstrap configuration', async () => {
  await assertReturnProfile('meaningfulResult', solve_01_express_app_bootstrap());
});
