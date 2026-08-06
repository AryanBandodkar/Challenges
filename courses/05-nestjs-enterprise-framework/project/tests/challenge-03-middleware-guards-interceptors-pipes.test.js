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
  solverImportUrl
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '03-middleware-guards-interceptors-pipes';
const sourceFile = 'src/challenges/03-middleware-guards-interceptors-pipes/index.ts';
const solverName = 'solve_03_middleware_guards_interceptors_pipes';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['nestjsGuard', 'nestjsPipe'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('implements NestJS guards and pipes in the request pipeline', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_03_middleware_guards_interceptors_pipes from scoped source', () => {
  assert.match(
    source,
    /export\s+(async\s+)?function\s+solve_03_middleware_guards_interceptors_pipes\b/,
    'expected exported solver function in scoped source'
  );
});

test('returns middleware, guards, interceptors, and pipes implementation', async () => {
  const projectDir = dirname(dirname(fileURLToPath(import.meta.url)));
  const solverModule = await import(solverImportUrl(projectDir, sourceFile));
  const solver = solverModule[solverName];
  assert.equal(typeof solver, 'function');
  await assertReturnProfile('meaningfulResult', solver());
});
