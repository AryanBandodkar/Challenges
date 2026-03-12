import { solve_03_array_methods_data_pipeline } from './challenges/03-array-methods-data-pipeline/index.js';
const testData = [
  { id: 1, name: "Laptop", total: 1500, isActive: true },
  { id: 2, name: "Mouse", total: 200, isActive: true },
  { id: 3, name: "Keyboard", total: 100, isActive: false },
];

const result = solve_03_array_methods_data_pipeline(testData);
console.log(result);