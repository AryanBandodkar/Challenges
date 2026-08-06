import assert from 'node:assert/strict';

export async function resolveSolverResult(result) {
  return result instanceof Promise ? await result : result;
}

export async function assertReturnProfile(profile, result) {
  const value = await resolveSolverResult(result);

  switch (profile) {
    case 'es6NumberTransform': {
      assert.equal(typeof value, 'object');
      assert.ok(Array.isArray(value.original), 'expected original array');
      assert.ok(value.original.length > 0, 'original array should not be empty');

      const transformed = value.transformed ?? value.doubled;
      assert.ok(Array.isArray(transformed), 'expected transformed or doubled array');
      assert.equal(transformed.length, value.original.length);

      for (let index = 0; index < value.original.length; index += 1) {
        assert.equal(typeof value.original[index], 'number');
        assert.equal(typeof transformed[index], 'number');
      }
      break;
    }

    case 'formattedString': {
      assert.equal(typeof value, 'string');
      assert.ok(value.trim().length > 0, 'formatted string should not be empty');
      assert.ok(
        value.includes('\n') || /[A-Za-z]/.test(value),
        'expected labels or readable text in the formatted string'
      );
      break;
    }

    case 'numericAggregate': {
      if (typeof value === 'number') {
        assert.ok(Number.isFinite(value));
        break;
      }

      assert.equal(typeof value, 'object');
      const aggregate = value.total ?? value.sum ?? value.value ?? value.result;
      assert.equal(typeof aggregate, 'number');
      assert.ok(Number.isFinite(aggregate));
      break;
    }

    case 'inheritanceResult': {
      assert.ok(value !== undefined && value !== null);

      if (typeof value === 'string') {
        assert.ok(value.length > 0);
        break;
      }

      if (typeof value === 'object') {
        assert.ok(Object.keys(value).length > 0);
        break;
      }

      assert.ok(typeof value === 'number' || typeof value === 'boolean');
      break;
    }

    case 'promiseResult': {
      assert.ok(result instanceof Promise, 'solver should return a Promise');
      assert.ok(value !== undefined && value !== null);
      break;
    }

    case 'eventLoopDiagnostics':
    case 'orderedSteps': {
      assert.ok(result instanceof Promise, 'solver should return a Promise');
      assert.ok(Array.isArray(value), 'expected diagnostics or ordered steps array');
      assert.ok(value.length > 0, 'diagnostics should list execution steps');
      break;
    }

    case 'asyncResolvable': {
      assert.ok(value !== undefined && value !== null);
      break;
    }

    case 'meaningfulResultAllowLogger':
    case 'meaningfulResult':
    default: {
      assert.ok(value !== undefined && value !== null);

      if (typeof value === 'string') {
        assert.ok(value.length > 0);
      } else if (typeof value === 'number') {
        assert.ok(Number.isFinite(value));
      } else if (Array.isArray(value)) {
        assert.ok(value.length > 0);
      } else if (typeof value === 'object') {
        assert.ok(Object.keys(value).length > 0);
      }
      break;
    }
  }
}

export function assertSourceProfile(profile, source) {
  switch (profile) {
    case 'jestTestsPresent':
      assert.match(source, /describe\s*\(/, 'expected Jest describe() blocks');
      assert.match(source, /\bit\s*\(/, 'expected Jest it() blocks');
      break;
    case 'supertestTestsPresent':
      assert.match(source, /describe\s*\(/, 'expected Jest describe() blocks');
      assert.match(
        source,
        /request\s*\([^)]*\)\.(get|post|put|patch|delete)\s*\(/,
        'expected Supertest HTTP request assertions'
      );
      break;
    default:
      break;
  }
}
