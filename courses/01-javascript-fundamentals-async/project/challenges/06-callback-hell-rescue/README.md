# Challenge 06: Callback Hell Rescue

**Work on this challenge only.** After you finish and run the review, move on to the next challenge. You don't need to read other challenge READMEs yet.

**Difficulty:** Intermediate | **Estimated time:** 3 hours

## Goal

Practice asynchronous programming by coordinating multiple operations using callback functions and handling errors through callback-based control flow.

## What to do

1. Open `src/challenges/06-callback-hell-rescue/index.js`.
2. Implement and export the function:
   ```js
   solve_06_callback_hell_rescue
   ```
3. Inside the function:
   - Create two or more asynchronous operations that use callbacks.
   - Execute the operations sequentially or with nested callbacks.
   - Pass the result of one callback to the next operation where appropriate.
   - Handle and propagate errors through the callback chain.
4. Return the final result (or error) through the callback flow.

   Example:

   ```js
   function fetchData(callback) {
     setTimeout(() => callback(null, "Data"), 500);
   }

   function processData(data, callback) {
     setTimeout(() => callback(null, `${data} Processed`), 500);
   }

   fetchData((err, data) => {
     if (err) return callback(err);

     processData(data, (err, result) => {
       if (err) return callback(err);

       callback(null, result);
     });
   });
   ```

5. Remove all placeholder code such as:
   - `TODO`
   - `throw new Error("Not implemented")`

## Code

- Use JavaScript.
- Edit only:
  ```
  src/challenges/06-callback-hell-rescue/index.js
  ```
- Export `solve_06_callback_hell_rescue`.
- Use callback functions to coordinate asynchronous operations.
- Handle and propagate errors through callbacks.
- Avoid using Promises or `async/await` unless explicitly instructed.
- Avoid using `var`.
- Avoid unnecessary `console.log()` statements.
- Write clean, readable, and modular code.

## Review

Your solution will be checked for:

- Correct implementation of the exported function.
- No remaining placeholder code.
- Proper use of callback-based asynchronous control flow.
- Correct error handling and propagation through callbacks.
- Returning or passing the final result correctly.
- Code quality and best practices.
- Optional unit/E2E tests (if provided).
- AI code review (if enabled).

**Passing score:** **80% or higher**

> **Note:** If the required file is missing or still contains placeholder code, the challenge will receive a **0% score**.

## Verify

Run either of the following:

```bash
npm run review:challenge -- --course=01-javascript-fundamentals-async --challenge=06-callback-hell-rescue
```

or

```bash
npm run dashboard:dev
```

Then open the dashboard and click **Run Review** for this challenge.

### Optional

To test your solution locally:

1. Import `solve_06_callback_hell_rescue` in `src/main.js`.
2. From `courses/01-javascript-fundamentals-async/project`, run:

```bash
npm run dev
```