# Challenge 07: Promises Chain Rejection Handling

**Work on this challenge only.** After you finish and run the review, move on to the next challenge. You don't need to read other challenge READMEs yet.

**Difficulty:** Intermediate | **Estimated time:** 3 hours

## Goal

Practice asynchronous programming by chaining Promises to execute tasks sequentially and handling errors using `.catch()`.

## What to do

1. Open `src/challenges/07-promises-chain-rejection-handling/index.js`.
2. Implement and export the function:
   ```js
   solve_07_promises_chain_rejection_handling
   ```
3. Inside the function:
   - Create one or more asynchronous operations using Promises.
   - Chain the operations using `.then()` so they execute in sequence.
   - Handle any errors using `.catch()`.
   - Return the final resolved value or an appropriate error message.
4. Demonstrate both successful execution and error handling through your Promise chain.

   Example:

   ```js
   function fetchData() {
     return Promise.resolve("Data");
   }

   function processData(data) {
     return Promise.resolve(`${data} Processed`);
   }

   export function solve_07_promises_chain_rejection_handling() {
     return fetchData()
       .then(processData)
       .then((result) => result)
       .catch((error) => `Error: ${error.message}`);
   }
   ```

5. Remove all placeholder code such as:
   - `TODO`
   - `throw new Error("Not implemented")`

## Code

- Use JavaScript.
- Edit only:
  ```
  src/challenges/07-promises-chain-rejection-handling/index.js
  ```
- Export `solve_07_promises_chain_rejection_handling`.
- Use Promise chaining with `.then()`.
- Handle errors using `.catch()`.
- Avoid using `async`/`await` unless explicitly instructed.
- Avoid using `var`.
- Avoid unnecessary `console.log()` statements.
- Write clean, readable, and modular code.

## Review

Your solution will be checked for:

- Correct implementation of the exported function.
- No remaining placeholder code.
- Proper use of Promise-based asynchronous logic.
- Sequential execution using `.then()`.
- Proper error handling with `.catch()`.
- Returning the final resolved value or an appropriate error result.
- Code quality and best practices.
- Optional unit/E2E tests (if provided).
- AI code review (if enabled).

**Passing score:** **80% or higher**

> **Note:** If the required file is missing or still contains placeholder code, the challenge will receive a **0% score**.

## Verify

Run either of the following:

```bash
npm run review:challenge -- --course=01-javascript-fundamentals-async --challenge=07-promises-chain-rejection-handling
```

or

```bash
npm run dashboard:dev
```

Then open the dashboard and click **Run Review** for this challenge.

### Optional

To test your solution locally:

1. Import `solve_07_promises_chain_rejection_handling` in `src/main.js`.
2. From `courses/01-javascript-fundamentals-async/project`, run:

```bash
npm run dev
```