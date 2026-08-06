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

const challengeId = '06-path-mapping-custom-types';
const sourceFile = 'src/challenges/06-path-mapping-custom-types/index.ts';
const solverName = 'solve_06_path_mapping_custom_types';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['pathAliasImport'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses path alias imports and custom type definitions', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_06_path_mapping_custom_types from scoped source', () => {
  assert.match(
    source,
    /export\s+(async\s+)?function\s+solve_06_path_mapping_custom_types\b/,
    'expected exported solver function in scoped source'
  );
});

test('returns path mapping and custom types demonstration output', async () => {
  const projectDir = dirname(dirname(fileURLToPath(import.meta.url)));
  const solverModule = await import(solverImportUrl(projectDir, sourceFile));
  const solver = solverModule[solverName];
  assert.equal(typeof solver, 'function');
  await assertReturnProfile('meaningfulResult', solver());
});
