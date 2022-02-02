---
name: Covid Office
variableName: covidOffice
tags:
  - iteration
  - recursion
difficulty: 4
---

# Covid Office ☠️

A company decided to open their offices and force their developers to work in cubicles arranged in a `m x n` `grid` where each cell represents a cubicle. Each cell contains one of three values:

- `0` represents an empty cubicle
- `1` represents a healthy developer working in the cubicle
- `2` represents a covid positive developer working in the cubicle

Every hour, any healthy developer who is **4-directionally adjacent** to a covid positive developer, is also infected with covid.

Return the minimum number of hours that must pass until all the devs in the office have covid. If a healthy developer is social-distancing, and is not adjacent to anyone who is or will become infected, return `-1`.

For example:

```javascript
// Examples
console.log("hello owrld");
```
