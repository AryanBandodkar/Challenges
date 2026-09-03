export function solve_01_typed_primitives_functions(): string {
  const name: string = "Aryan";

  function greet(person: string): string {
    return `Hello ${person}`;
  }

  return greet(name);
}
