/**
 * Per-challenge functional test extensions beyond metadata patternsRequired.
 * Keys match challenge ids from course-config.json.
 *
 * Review pipeline only (not duplicated in functional tests):
 * - Subjective code quality / readability scoring
 * - Line length and trailing-whitespace linting
 * - AI code review layer
 */

/** @typedef {{ patternKey?: string, pattern?: RegExp, message: string }} ForbiddenPattern */

/** @type {Record<string, ForbiddenPattern[]>} */
export const CHALLENGE_FORBIDDEN_PATTERNS = {
  '02-template-literal-string-lab': [
    {
      patternKey: 'stringConcatenation',
      message: 'Use template literals instead of string concatenation with +'
    }
  ],
  '05-module-system-conversion': [
    { patternKey: 'commonJsRequire', message: 'Do not use CommonJS require()' },
    { patternKey: 'commonJsExports', message: 'Do not use module.exports' }
  ],
  '06-callback-hell-rescue': [
    { pattern: /\basync\b/, message: 'Avoid async/await unless explicitly instructed' },
    { pattern: /\bawait\b/, message: 'Avoid async/await unless explicitly instructed' },
    {
      pattern: /new\s+Promise|Promise\.(resolve|reject|all|race|any)/,
      message: 'Avoid Promises unless explicitly instructed'
    }
  ],
  '07-promises-chain-rejection-handling': [
    { pattern: /\basync\b/, message: 'Avoid async/await unless explicitly instructed' },
    { pattern: /\bawait\b/, message: 'Avoid async/await unless explicitly instructed' }
  ]
};

/** Extra required source patterns not always listed in metadata. */
/** @type {Record<string, string[]>} */
export const CHALLENGE_EXTRA_REQUIRED_PATTERNS = {
  '01-es6-syntax-foundations': ['constLetUsage'],
  '07-promises-chain-rejection-handling': ['promiseThen']
};

/**
 * Behavioral assertion profile used by generated challenge tests.
 * @type {Record<string, string>}
 */
export const CHALLENGE_RETURN_PROFILES = {
  '01-es6-syntax-foundations': 'es6NumberTransform',
  '02-template-literal-string-lab': 'formattedString',
  '03-array-methods-data-pipeline': 'numericAggregate',
  '04-oop-inheritance-refactor': 'inheritanceResult',
  '05-module-system-conversion': 'meaningfulResult',
  '06-callback-hell-rescue': 'asyncResolvable',
  '07-promises-chain-rejection-handling': 'promiseResult',
  '08-async-await-event-loop-diagnostics': 'eventLoopDiagnostics',
  '01-runtime-event-loop-visualizer': 'orderedSteps',
  '12-debug-and-log-observability': 'meaningfulResultAllowLogger',
  '16-jest-unit-integration-tests': 'jestTestsPresent',
  '17-coverage-mocking-versioned-api-tests': 'supertestTestsPresent',
  '14-unit-e2e-mocking-strategy': 'jestTestsPresent',
  '15-coverage-reporting-tdd-cycle': 'jestTestsPresent'
};

export const DEFAULT_RETURN_PROFILE = 'meaningfulResult';
