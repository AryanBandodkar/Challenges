import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_03_array_methods_data_pipeline } from '../src/challenges/03-array-methods-data-pipeline/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns
} from '../../../../shared/challenge-test-helpers/index.js';

const sourceFile = 'src/challenges/03-array-methods-data-pipeline/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses map, filter, and reduce in a single pipeline', () => {
  assertCommonSourceRules(source, sourceFile);
  assertRequiredPatterns(source, ['arrayMap', 'arrayFilter', 'arrayReduce'], sourceFile);
});

test('exports solve_03_array_methods_data_pipeline', () => {
  assert.equal(typeof solve_03_array_methods_data_pipeline, 'function');
});

test('returns an aggregated numeric result from the pipeline', () => {
  const result = solve_03_array_methods_data_pipeline();

  if (typeof result === 'number') {
    assert.ok(Number.isFinite(result));
    return;
  }

  assert.equal(typeof result, 'object');
  const aggregate = result.total ?? result.sum ?? result.value ?? result.result;
  assert.equal(typeof aggregate, 'number');
  assert.ok(Number.isFinite(aggregate));
});
