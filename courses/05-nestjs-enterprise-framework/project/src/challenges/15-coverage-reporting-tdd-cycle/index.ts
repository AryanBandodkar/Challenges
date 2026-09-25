function add(a: number, b: number): number {
  return a + b;
}

function isEven(value: number): boolean {
  return value % 2 === 0;
}

function describe(name: string, testSuite: () => void): void {
  if (name.length > 0) {
    testSuite();
  }
}

function it(name: string, testCase: () => boolean): boolean {
  return name.length > 0 && testCase();
}

export function solve_15_coverage_reporting_tdd_cycle(): string {
  let passed = 0;

  describe('add tests', () => {
    if (it('adds two numbers', () => add(2, 3) === 5)) {
      passed++;
    }

    if (it('handles negative numbers', () => add(-2, 1) === -1)) {
      passed++;
    }
  });

  describe('isEven tests', () => {
    if (it('detects even numbers', () => isEven(4))) {
      passed++;
    }

    if (it('detects odd numbers', () => !isEven(5))) {
      passed++;
    }
  });

  return `TDD checks passed: ${passed}/4`;
}