# Challenge 03: Array Methods Data Pipeline

**Work on this challenge only.** After you finish and run the review, move on to the next challenge. You don't need to read other challenge READMEs yet.

**Difficulty:** Beginner | **Estimated time:** 3 hours

## Goal

Practice using JavaScript array methods by transforming and processing a dataset through a `.map()` → `.filter()` → `.reduce()` pipeline.

## What to do

1. Open `src/challenges/03-array-methods-data-pipeline/index.js`.
2. Implement and export the function:
   ```js
   solve_03_array_methods_data_pipeline
   ```
3. Inside the function:
   - Create or work with a dataset (such as an array of numbers or objects).
   - Use `.map()` to transform each item.
   - Use `.filter()` to keep only the items that meet a condition.
   - Use `.reduce()` to aggregate the filtered data into a single value (such as a sum, average, or total).
4. Return the final aggregated result.

   Example:

   ```js
   const numbers = [1, 2, 3, 4, 5];

   // map -> [2, 4, 6, 8, 10]
   // filter -> [6, 8, 10]
   // reduce -> 24

   return 24;
   ```

5. Remove all placeholder code such as:
   - `TODO`
   - `throw new Error("Not implemented")`

## Code

- Use JavaScript.
- Edit only:
  ```
  src/challenges/03-array-methods-data-pipeline/index.js
  ```
- Export `solve_03_array_methods_data_pipeline`.
- Use `.map()`, `.filter()`, and `.reduce()` in a single processing pipeline.
- Avoid using `var`.
- Avoid unnecessary `console.log()` statements.
- Write clean, readable, and modular code.

## Review

Your solution will be checked for:

- Correct implementation of the exported function.
- No remaining placeholder code.
- Proper use of `.map()` for data transformation.
- Proper use of `.filter()` to narrow the dataset.
- Proper use of `.reduce()` to aggregate the final result.
- Returning the aggregated result.
- Code quality and best practices.
- Optional unit/E2E tests (if provided).
- AI code review (if enabled).

**Passing score:** **80% or higher**

> **Note:** If the required file is missing or still contains placeholder code, the challenge will receive a **0% score**.

## Verify

Run either of the following:

```bash
npm run review:challenge -- --course=01-javascript-fundamentals-async --challenge=03-array-methods-data-pipeline
```

or

```bash
npm run dashboard:dev
```

Then open the dashboard and click **Run Review** for this challenge.

### Optional

To test your solution locally:

1. Import `solve_03_array_methods_data_pipeline` in `src/main.js`.
2. From `courses/01-javascript-fundamentals-async/project`, run:

```bash
npm run dev
```