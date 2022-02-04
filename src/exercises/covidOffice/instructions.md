---
name: Covid Office
variableName: covidOffice
tags:
  - iteration
  - recursion
difficulty: 4
startingCode: "function covidOffice(grid) {\n  // code here...\n}"
---

# Covid Office ☠️

A company decided to open their offices and force their developers to work in cubicles arranged in a `m x n` `grid` where each cell represents a cubicle. Each cell contains one of three values:

- `0` represents an empty cubicle
- `1` represents a healthy developer working in the cubicle
- `2` represents a covid positive developer working in the cubicle

Every hour, any healthy developer who is **4-directionally adjacent** to a covid positive developer, is also infected with the virus.

Write a function `covidOffice`, which given a 2 dimensional array representing the `m` x `n` `grid`, returns the minimum number of hours that must pass until all the devs in the office have covid. If a healthy developer is social-distancing, and is not adjacent to anyone who is or will become infected, return `-1`.

For example, the following input...

```javascript
[
  [1, 1, 2],
  [1, 1, 0],
  [0, 1, 1],
];
```

...would yeild `4`, as it would take 4 hours for the whole office to get infected:

<br/>

<img src="/assets/covid_office_diagram.svg" width="100%" alt="covid office diagram"/>

```javascript
// Examples

covidOffice([
  [1, 1, 2],
  [1, 1, 0],
  [0, 1, 1],
]); // should return 4

covidOffice([
  [1, 2, 1],
  [0, 1, 0],
  [0, 0, 1],
]); // -1

covidOffice([[0, 2]]); // 0
```
