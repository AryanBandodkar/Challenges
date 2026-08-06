# Challenge 01: ES6 Syntax Foundations

**Work on this challenge only.** After you finish and run the review, move on to the next challenge. You don't need to read other challenge READMEs yet.

**Difficulty:** Beginner | **Estimated time:** 2 hours

## Goal

Practice modern JavaScript by implementing a function that transforms a list of numbers using ES6 features.

## What to do

1. Open `src/challenges/01-es6-syntax-foundations/index.js`.
2. Implement and export the function:
   ```js
   solve_01_es6_syntax_foundations
   ```
3. Inside the function:
   - Create or work with a list of numbers.
   - Use `const` and/or `let` for variable declarations.
   - Use array destructuring to extract values from the list.
   - Use an arrow function to transform the numbers.
   - Use spread or rest syntax (`...`) in your implementation.
4. Return a meaningful result object, for example:

   ```js
   {
     original: [1, 2, 3],
     transformed: [2, 4, 6]
   }
   ```

5. Remove all placeholder code such as:
   - `TODO`
   - `throw new Error("Not implemented")`

## Code

- Use JavaScript.
- Edit only:
  ```
  src/challenges/01-es6-syntax-foundations/index.js
  ```
- Export `solve_01_es6_syntax_foundations`.
- Avoid using `var`.
- Avoid unnecessary `console.log()` statements.
- Write clean, readable, and modular code.

## Review

Your solution will be checked for:

- Correct implementation of the exported function.
- No remaining placeholder code.
- Use of `const`/`let`.
- Use of at least one arrow function.
- Use of array or object destructuring.
- Use of spread or rest syntax (`...`) in real logic.
- Returning a meaningful result object.
- Code quality and best practices.
- Optional unit/E2E tests (if provided).
- AI code review (if enabled).

**Passing score:** **80% or higher**

> **Note:** If the required file is missing or still contains placeholder code, the challenge will receive a **0% score**.

## Verify

Run either of the following:

```bash
npm run review:challenge -- --course=01-javascript-fundamentals-async --challenge=01-es6-syntax-foundations
```

or

```bash
npm run dashboard:dev
```

Then open the dashboard and click **Run Review** for this challenge.

### Optional

To test your solution locally:

1. Import `solve_01_es6_syntax_foundations` in `src/main.js`.
2. From `courses/01-javascript-fundamentals-async/project`, run:

```bash
npm run dev
```