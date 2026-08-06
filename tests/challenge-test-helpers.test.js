import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { matchRequiredPatterns, isPlaceholder } from '../shared/challenge-patterns.js';
import { resolveRepoRoot } from '../shared/utils/root.js';
import {
  assertNoPlaceholder,
  assertRequiredPatterns,
  assertForbiddenPatterns,
  getChallengeRequiredPatterns,
  getChallengeForbiddenPatterns
} from '../shared/challenge-test-helpers/index.js';

test('isPlaceholder detects TODO and Not implemented stubs', () => {
  assert.equal(isPlaceholder("throw new Error('Not implemented');"), true);
  assert.equal(isPlaceholder('// TODO: Implement challenge'), true);
  assert.equal(isPlaceholder('export function solve() { return 1; }'), false);
});

test('matchRequiredPatterns reports missing README pattern keys', () => {
  const source = 'const fn = (value) => value; const [first] = [1]; return [...first];';
  const { missing } = matchRequiredPatterns(source, ['arrowFunction', 'destructuring', 'spreadOperator']);
  assert.deepEqual(missing, []);
});

test('challenge-specific forbidden patterns align with README constraints', () => {
  const source = `
    export function solve_07_promises_chain_rejection_handling() {
      return Promise.resolve('ok').then((value) => value).catch(() => 'err');
    }
  `;

  assertNoPlaceholder(source);
  assertRequiredPatterns(source, getChallengeRequiredPatterns('07-promises-chain-rejection-handling', [
    'promiseUsage',
    'promiseCatch'
  ]));
  assertForbiddenPatterns(source, getChallengeForbiddenPatterns('07-promises-chain-rejection-handling'));

  const asyncSource = 'export async function solve_07_promises_chain_rejection_handling() { return 1; }';
  assert.throws(
    () => assertForbiddenPatterns(asyncSource, getChallengeForbiddenPatterns('07-promises-chain-rejection-handling')),
    /Avoid async\/await/
  );
});

test('every course challenge has a generated functional test file', () => {
  const root = resolveRepoRoot(import.meta.url);
  const pathway = JSON.parse(
    readFileSync(join(root, 'pathway-review', 'pathway-config.json'), 'utf-8').replace(/^\uFEFF/, '')
  );

  for (const course of pathway.courses) {
    const courseConfig = JSON.parse(
      readFileSync(join(root, 'courses', course.id, 'course-config.json'), 'utf-8').replace(/^\uFEFF/, '')
    );

    for (const challenge of courseConfig.challenges) {
      const testPath = join(
        root,
        'courses',
        course.id,
        'project',
        'tests',
        `challenge-${challenge.id}.test.js`
      );
      assert.ok(existsSync(testPath), `missing functional test for ${course.id}/${challenge.id}`);
    }
  }
});
