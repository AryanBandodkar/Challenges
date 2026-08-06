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

const challengeId = '01-nest-modules-controllers-services';
const sourceFile = 'src/challenges/01-nest-modules-controllers-services/index.ts';
const solverName = 'solve_01_nest_modules_controllers_services';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['nestjsModule', 'nestjsController', 'nestjsInjectable'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('defines NestJS modules, controllers, and injectable services', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_01_nest_modules_controllers_services from scoped source', () => {
  assert.match(
    source,
    /export\s+(async\s+)?function\s+solve_01_nest_modules_controllers_services\b/,
    'expected exported solver function in scoped source'
  );
});

test('returns NestJS module, controller, and service structure', async () => {
  const projectDir = dirname(dirname(fileURLToPath(import.meta.url)));
  const solverModule = await import(solverImportUrl(projectDir, sourceFile));
  const solver = solverModule[solverName];
  assert.equal(typeof solver, 'function');
  await assertReturnProfile('meaningfulResult', solver());
});
