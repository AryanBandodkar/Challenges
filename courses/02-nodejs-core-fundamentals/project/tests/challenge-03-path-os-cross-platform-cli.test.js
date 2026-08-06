import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_03_path_os_cross_platform_cli } from '../src/challenges/03-path-os-cross-platform-cli/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeForbiddenPatterns,
  getChallengeRequiredPatterns,
  assertReturnProfile
} from '../../../../shared/challenge-test-helpers/index.js';

const challengeId = '03-path-os-cross-platform-cli';
const sourceFile = 'src/challenges/03-path-os-cross-platform-cli/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');
const patternsRequired = ['pathModuleImport', 'osModuleImport'];

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses path and os modules for cross-platform CLI output', () => {
  assertCommonSourceRules(source, sourceFile);
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns(challengeId), sourceFile);
  assertRequiredPatterns(
    source,
    getChallengeRequiredPatterns(challengeId, patternsRequired),
    sourceFile
  );
});

test('exports solve_03_path_os_cross_platform_cli', () => {
  assert.equal(typeof solve_03_path_os_cross_platform_cli, 'function');
});

test('returns cross-platform path and OS information', async () => {
  await assertReturnProfile('meaningfulResult', solve_03_path_os_cross_platform_cli());
});
