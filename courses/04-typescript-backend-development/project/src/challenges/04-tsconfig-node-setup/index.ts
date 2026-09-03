export function solve_04_tsconfig_node_setup(): string {
  const config: string = `{
    "compilerOptions": {
      "target": "ES2022",
      "module": "NodeNext",
      "moduleResolution": "NodeNext",
      "strict": true
    }
  }`;

  return config;
}