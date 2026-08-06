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

const challengeId = '02-dependency-injection-providers';
const sourceFile = 'src/challenges/02-dependency-injection-providers/index.ts';
const solverName = 'solve_02_dependency_injection_providers';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['nestjsInjectable'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses @Injectable providers for dependency injection', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_02_dependency_injection_providers from scoped source', () => {
  assert.match(
    source,
    /export\s+(async\s+)?function\s+solve_02_dependency_injection_providers\b/,
    'expected exported solver function in scoped source'
  );
});

test('returns dependency injection providers implementation', async () => {
  const projectDir = dirname(dirname(fileURLToPath(import.meta.url)));
  const solverModule = await import(solverImportUrl(projectDir, sourceFile));
  const solver = solverModule[solverName];
  assert.equal(typeof solver, 'function');
  await assertReturnProfile('meaningfulResult', solver());
});
