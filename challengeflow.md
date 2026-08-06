# Running Challenge Code Locally

Use this guide when you want to **see your challenge output in the terminal** while you work.

This is separate from the dashboard UI (`npm run dashboard`), which shows scores and progress in the browser.

---

## Install nodemon in each course project

Each course has its own `project` folder with its own `package.json`. You must install dependencies (including `nodemon`) **inside that course project**, not only at the repository root.

From the repository root, go into the course project you are working on:

```bash
cd courses/01-javascript-fundamentals-async/project
npm install --save-dev nodemon
```

Repeat for any other course you work on, for example:

```bash
cd courses/02-nodejs-core-fundamentals/project
npm install --save-dev nodemon
```

`nodemon` watches your files and restarts `src/main.js` when you save changes. The `npm run dev` script in each course project depends on it.

If `nodemon` is missing, `npm run dev` will fail.

---

## Print challenge results with `src/main.js`

Challenge solutions live under:

```text
courses/<course-id>/project/src/challenges/<challenge-id>/index.js
```

To run them locally and print output:

1. Open that course project's `src/main.js`.
2. Import the solver function(s) you want to try.
3. Call them and `console.log` the result.
4. From that course's `project` folder, run:

```bash
npm run dev
```

### Example (Course 01)

```js
import { solve_01_es6_syntax_foundations } from './challenges/01-es6-syntax-foundations/index.js';
import { solve_02_template_literal_string_lab } from './challenges/02-template-literal-string-lab/index.js';
import { solve_03_array_methods_data_pipeline } from './challenges/03-array-methods-data-pipeline/index.js';

console.log('Challenge 01:', solve_01_es6_syntax_foundations());
console.log('Challenge 02:', solve_02_template_literal_string_lab());
console.log('Challenge 03:', solve_03_array_methods_data_pipeline());
```

### Async challenges

Some solvers return a `Promise` (for example promises or async/await challenges). Use `await` for those:

```js
import { solve_07_promises_chain_rejection_handling } from './challenges/07-promises-chain-rejection-handling/index.js';
import { solve_08_async_await_event_loop_diagnostics } from './challenges/08-async-await-event-loop-diagnostics/index.js';

console.log('Challenge 07:', await solve_07_promises_chain_rejection_handling());
console.log('Challenge 08:', await solve_08_async_await_event_loop_diagnostics());
```

Because the project uses ES modules (`"type": "module"`), top-level `await` is allowed in `main.js`.

---

## Quick checklist

| Goal | What to run | Where |
|---|---|---|
| See challenge `console.log` output | `npm run dev` | `courses/<course-id>/project` |
| Install nodemon for that course | `npm install --save-dev nodemon` | `courses/<course-id>/project` |
| Browse scores / progress in the UI | `npm run dashboard:dev` | repository root |

---

## Tips

- Edit only the challenge files listed in each challenge README. Use `main.js` only as a local playground.
- You do not need to import every challenge at once. Import and run one challenge at a time while debugging.
- Official scoring still comes from review commands or the dashboard **Run Review** button, not from `npm run dev`.
