# Challenge 08: Async Await Event Loop Diagnostics

**Work on this challenge only.** After you finish and run the review, move on to the next challenge. You don't need to read other challenge READMEs yet.

**Difficulty:** Intermediate | **Estimated time:** 4 hours

## Goal

Practice asynchronous programming by using `async`/`await`, `try/catch`, and `setTimeout` to demonstrate how the JavaScript event loop executes synchronous code, microtasks, and macrotasks.

## What to do

1. Open `src/challenges/08-async-await-event-loop-diagnostics/index.js`.
2. Implement and export the function:
   ```js
   solve_08_async_await_event_loop_diagnostics
   ```
3. Inside the function:
   - Create at least one `async` function.
   - Use `await` to wait for an asynchronous operation.
   - Handle errors using `try/catch`.
   - Use `setTimeout()` to simulate a macrotask.
   - Demonstrate the execution order of synchronous code, microtasks (`await`/Promises), and macrotasks (`setTimeout`).
4. Return diagnostics that clearly show the execution order.

   Example:

   ```js
   async function demo() {
     const steps = [];

     try {
       steps.push("Start");

       setTimeout(() => {
         steps.push("Macrotask");
       }, 0);

       await Promise.resolve();

       steps.push("Microtask");
       steps.push("End");

       return steps;
     } catch (error) {
       return [`Error: ${error.message}`];
     }
   }

   return demo();
   ```

5. Remove all placeholder code such as:
   - `TODO`
   - `throw new Error("Not implemented")`

## Code

- Use JavaScript.
- Edit only:
  ```
  src/challenges/08-async-await-event-loop-diagnostics/index.js
  ```
- Export `solve_08_async_await_event_loop_diagnostics`.
- Use at least one `async` function.
- Use `await` with asynchronous work.
- Handle errors using `try/catch`.
- Use `setTimeout()` to demonstrate event loop scheduling.
- Avoid using `var`.
- Avoid unnecessary `console.log()` statements.
- Write clean, readable, and modular code.

## Review

Your solution will be checked for:

- Correct implementation of the exported function.
- No remaining placeholder code.
- Proper use of `async` and `await`.
- Correct error handling using `try/catch`.
- Proper use of `setTimeout()` to model asynchronous scheduling.
- Returning diagnostics that demonstrate execution order.
- Code quality and best practices.
- Optional unit/E2E tests (if provided).
- AI code review (if enabled).

**Passing score:** **80% or higher**

> **Note:** If the required file is missing or still contains placeholder code, the challenge will receive a **0% score**.

## Verify

Run either of the following:

```bash
npm run review:challenge -- --course=01-javascript-fundamentals-async --challenge=08-async-await-event-loop-diagnostics
```

or

```bash
npm run dashboard:dev
```

Then open the dashboard and click **Run Review** for this challenge.

### Optional

To test your solution locally:

1. Import `solve_08_async_await_event_loop_diagnostics` in `src/main.js`.
2. From `courses/01-javascript-fundamentals-async/project`, run:

```bash
npm run dev
```