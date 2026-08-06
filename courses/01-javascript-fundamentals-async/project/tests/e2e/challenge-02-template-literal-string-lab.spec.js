import test from 'node:test';
import assert from 'node:assert/strict';
import { solve_02_template_literal_string_lab } from '../../src/challenges/02-template-literal-string-lab/index.js';

test('e2e: template literal lab returns a formatted string', () => {
  const result = solve_02_template_literal_string_lab();
  assert.equal(typeof result, 'string');
  assert.ok(result.trim().length > 0);
});
