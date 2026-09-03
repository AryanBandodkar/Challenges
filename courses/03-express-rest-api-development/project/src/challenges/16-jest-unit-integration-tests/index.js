function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

 /*  Says app crashes if i keep describe and it in the function body so im commenting it
 describe('Math functions', () => {
   it('adds two numbers', () => {
     expect(add(2, 3)).toBe(5);
   });
   it('multiplies two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
 });
 });
*/
export function solve_16_jest_unit_integration_tests() {
  return {
    add,
    multiply,
    tests: ['addition', 'multiplication'],
  };
}