# Challenge 04: OOP Inheritance Refactor

**Work on this challenge only.** After you finish and run the review, move on to the next challenge. You don't need to read other challenge READMEs yet.

**Difficulty:** Intermediate | **Estimated time:** 3 hours

## Goal

Practice Object-Oriented Programming (OOP) by creating a base class and a subclass using inheritance in JavaScript.

## What to do

1. Open `src/challenges/04-oop-inheritance-refactor/index.js`.
2. Implement and export the function:
   ```js
   solve_04_oop_inheritance_refactor
   ```
3. Inside the function:
   - Create a base class using the `class` keyword.
   - Create a subclass that extends the base class using `extends`.
   - Override or extend at least one method or property in the subclass.
   - Create an instance of the subclass and demonstrate how inheritance works.
4. Return a meaningful result that shows the subclass behavior.

   Example:

   ```js
   class Animal {
     speak() {
       return "Animal sound";
     }
   }

   class Dog extends Animal {
     speak() {
       return "Woof!";
     }
   }

   return new Dog().speak(); // "Woof!"
   ```

5. Remove all placeholder code such as:
   - `TODO`
   - `throw new Error("Not implemented")`

## Code

- Use JavaScript.
- Edit only:
  ```
  src/challenges/04-oop-inheritance-refactor/index.js
  ```
- Export `solve_04_oop_inheritance_refactor`.
- Use `class` and `extends` to implement inheritance.
- Override or extend behavior in the subclass.
- Avoid using `var`.
- Avoid unnecessary `console.log()` statements.
- Write clean, readable, and modular code.

## Review

Your solution will be checked for:

- Correct implementation of the exported function.
- No remaining placeholder code.
- Definition of at least one base class.
- Proper use of `extends` for inheritance.
- Demonstration of subclass behavior by overriding or extending functionality.
- Returning a meaningful result.
- Code quality and best practices.
- Optional unit/E2E tests (if provided).
- AI code review (if enabled).

**Passing score:** **80% or higher**

> **Note:** If the required file is missing or still contains placeholder code, the challenge will receive a **0% score**.

## Verify

Run either of the following:

```bash
npm run review:challenge -- --course=01-javascript-fundamentals-async --challenge=04-oop-inheritance-refactor
```

or

```bash
npm run dashboard:dev
```

Then open the dashboard and click **Run Review** for this challenge.

### Optional

To test your solution locally:

1. Import `solve_04_oop_inheritance_refactor` in `src/main.js`.
2. From `courses/01-javascript-fundamentals-async/project`, run:

```bash
npm run dev
```