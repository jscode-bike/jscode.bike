## Fishbus Solution

To solve this problem, we must return a value based on a condition, namely whether the input value is divisible by 3, 5, or both 3 and 5. The most straightforward approach would be to check for those 3 conditions, making sure to check for the most specific condition first, so we do not to return the incorrect output from a more general condition. So we should check the `fishBus` condition first.

In order to check for divisibility, we can use the modulus operator (`%`), which gives us the remainder when divided by the operand (i. e. `5 % 4 === 1 // true`);

```javascript
function fishBus(n) {
  if (n % 3 === 0 && n % 5 === 0) {
    return "fishBus";
  }

  if (n % 3 === 0) {
    return "fish";
  }

  if (n % 5 === 0) {
    return "bus";
  }

  return n;
}
```

### Alternative Solutions

Since all numbers that are both divisible by 3 and 5 are divisible by 15, we can change the condition in the first `if` block to `n % 15 === 0`. And since the body of the `if` conditionals are all only one line, we can improve readability by compressing the code:

```javascript
function fishBus(n) {
  if (n % 15 === 0) return "fishBus";
  if (n % 5 === 0) return "bus";
  if (n % 3 === 0) return "fish";
  return n;
}
```

If we wanted to refactor this into a one-liner using ES6 syntax, and leveraging JavaScript's type coercion properties, we could re-write the solution with a ternary chain:

```javascript
const fishBus = (n) =>
  n % 15 ? (n % 5 ? (n % 3 ? n : "fish") : "bus") : "fishBus";
```

### Analysis

The above solutions are all the same in time and space complexity; since no matter what the input is, only one operation is required to return the correct output, the solution is constant `O(1)` time.

The interesting aspect of the final solution presented above is the use of JavaScript's [type coercion for booleans](https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/#boolean-conversion); since `0`'s coerce to `false` in JavaScript, we were able to use this for our one line solution by inverting the necessary logic to avoid checking `=== 0` for every condition. Not all developers will appreciate ternary chaining or inverted logic, but this solution definitely wins the code golf tournament.
