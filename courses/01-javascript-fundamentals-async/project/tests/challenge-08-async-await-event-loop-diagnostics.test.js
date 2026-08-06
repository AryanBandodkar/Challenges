import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { solve_08_async_await_event_loop_diagnostics } from '../src/challenges/08-async-await-event-loop-diagnostics/index.js';
import {
  assertNoPlaceholder,
  assertCommonSourceRules,
  assertRequiredPatterns
} from '../../../../shared/challenge-test-helpers/index.js';

const sourceFile = 'src/challenges/08-async-await-event-loop-diagnostics/index.js';
const source = readFileSync(new URL(`../${sourceFile}`, import.meta.url), 'utf-8');

test('no placeholder code remains in scoped source', () => {
  assertNoPlaceholder(source, sourceFile);
});

test('uses async/await, try/catch, and setTimeout for event-loop diagnostics', () => {
  assertCommonSourceRules(source, sourceFile);
  assertRequiredPatterns(
    source,
    ['asyncFunction', 'awaitExpression', 'tryCatch', 'setTimeoutUsage'],
    sourceFile
  );
});

test('exports solve_08_async_await_event_loop_diagnostics', () => {
  assert.equal(typeof solve_08_async_await_event_loop_diagnostics, 'function');
});

test('returns event-loop diagnostics using async/await', async () => {
  const result = solve_08_async_await_event_loop_diagnostics();
  assert.ok(result instanceof Promise, 'solver should return a Promise');

  const diagnostics = await result;
  assert.ok(Array.isArray(diagnostics), 'expected diagnostics array');
  assert.ok(diagnostics.length > 0, 'diagnostics should list execution steps');
});
