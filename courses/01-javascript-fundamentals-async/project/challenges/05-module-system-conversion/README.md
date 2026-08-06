# Challenge 05: Module System Conversion

**Work on this challenge only.** After you finish and run the review, move on to the next challenge. You don't need to read other challenge READMEs yet.

**Difficulty:** Intermediate | **Estimated time:** 2 hours

## Goal

Practice using ES Modules by importing functionality from another module and exporting your solver function using modern JavaScript syntax.

## What to do

1. Open `src/challenges/05-module-system-conversion/index.js`.
2. Implement and export the function:
   ```js
   solve_05_module_system_conversion
   ```
3. Inside the challenge:
   - Use the ES module `import` syntax to import a value, function, or module.
   - Use the ES module `export` syntax to export your solver function.
   - Do **not** use CommonJS syntax (`require` or `module.exports`).
4. Return a meaningful result from your solver function to demonstrate that the imported value or function is being used.

   Example:

   ```js
   import { add } from "./math.js";

   export function solve_05_module_system_conversion() {
     return add(5, 3);
   }
   ```

5. Remove all placeholder code such as:
   - `TODO`
   - `throw new Error("Not implemented")`

## Code

- Use JavaScript.
- Edit only:
  ```
  src/challenges/05-module-system-conversion/index.js
  ```
- Export `solve_05_module_system_conversion`.
- Use ES module `import` and `export` syntax.
- Do **not** use `require` or `module.exports`.
- Avoid using `var`.
- Avoid unnecessary `console.log()` statements.
- Write clean, readable, and modular code.

## Review

Your solution will be checked for:

- Correct implementation of the exported function.
- No remaining placeholder code.
- Proper use of ES module `import` syntax.
- Proper use of ES module `export` syntax.
- No use of CommonJS (`require` or `module.exports`).
- Returning a meaningful result.
- Code quality and best practices.
- Optional unit/E2E tests (if provided).
- AI code review (if enabled).

**Passing score:** **80% or higher**

> **Note:** If the required file is missing or still contains placeholder code, the challenge will receive a **0% score**.

## Verify

Run either of the following:

```bash
npm run review:challenge -- --course=01-javascript-fundamentals-async --challenge=05-module-system-conversion
```

or

```bash
npm run dashboard:dev
```

Then open the dashboard and click **Run Review** for this challenge.

### Optional

To test your solution locally:

1. Import `solve_05_module_system_conversion` in `src/main.js`.
2. From `courses/01-javascript-fundamentals-async/project`, run:

```bash
npm run dev
```