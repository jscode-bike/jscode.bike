---
name: FizzBuzz
variableName: fizzBuzz
tags:
  - conditionals
  - fundamentals
  - numbers
---

# FizzBuzz

Write a function `fizzBuzz` that accepts an integer `n` and returns `"fizz"` if `n` is divisible by 3 and `"buzz"` if `n` is divisible by 5 and `"fizzBuzz"` if `n` is divisible by 3 and 5. If `n` is neither divisible by 3 nor 5, return `n`.

### Answer

```javascript
const fizzBuzz = (n) =>
  n % 15 ? (n % 5 ? (n % 3 ? n : "fizz") : "buzz") : "fizzBuzz";
```