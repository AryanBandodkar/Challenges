# Challenge 02: Template Literal String Lab

**Work on this challenge only.** After you finish and run the review, move on to the next challenge. You don't need to read other challenge READMEs yet.

**Difficulty:** Beginner | **Estimated time:** 2 hours

## Goal

Practice using template literals by creating formatted strings without using string concatenation.

## What to do

1. Open `src/challenges/02-template-literal-string-lab/index.js`.
2. Implement and export the function:
   ```js
   solve_02_template_literal_string_lab
   ```
3. Inside the function:
   - Create one or more variables containing sample values (such as a name, age, course, score, or any other data).
   - Use template literals (`` ` ` ``) to build a formatted string.
   - Include labels, summaries, or a multi-line message instead of concatenating strings with `+`.
4. Return the formatted string from your function.

   Example:

   ```js
   Name: Alex
   Course: JavaScript
   Score: 95
   ```

5. Remove all placeholder code such as:
   - `TODO`
   - `throw new Error("Not implemented")`

## Code

- Use JavaScript.
- Edit only:
  ```
  src/challenges/02-template-literal-string-lab/index.js
  ```
- Export `solve_02_template_literal_string_lab`.
- Use template literals instead of string concatenation.
- Avoid using `var`.
- Avoid unnecessary `console.log()` statements.
- Write clean, readable, and modular code.

## Review

Your solution will be checked for:

- Correct implementation of the exported function.
- No remaining placeholder code.
- Proper use of template literals for string construction.
- Returning a formatted string.
- Code quality and best practices.
- Optional unit/E2E tests (if provided).
- AI code review (if enabled).

**Passing score:** **80% or higher**

> **Note:** If the required file is missing or still contains placeholder code, the challenge will receive a **0% score**.

## Verify

Run either of the following:

```bash
npm run review:challenge -- --course=01-javascript-fundamentals-async --challenge=02-template-literal-string-lab
```

or

```bash
npm run dashboard:dev
```

Then open the dashboard and click **Run Review** for this challenge.

### Optional

To test your solution locally:

1. Import `solve_02_template_literal_string_lab` in `src/main.js`.
2. From `courses/01-javascript-fundamentals-async/project`, run:

```bash
npm run dev
```