# problems

## info

each exercise should contain at least 4 files:

1. index.js - all of the index.js files are almost identical; just exporting all necessary UI fixtures: `name`, `difficulty`, `variableName`, `instructionComponent`, `solutionComponent`, `startingCode`, and `tags`
2. instructions.md - contains the markup necessary for rendering instructions; surfaces as `solutionComponent` in index.js
3. meta.json - has metadata about problem to populate the problems list; consumed by `exerciseList` for Home.js. This file contains an array with exactly 3 elements: 0) the exercise name: used to populate the name in the ui and thus should be treated as a proper noun and capitalized, 1) the variable name, as it is used in the problem and tests, usually camel cased (or pascal cased if it is a class), and 2) the difficulty of the problem, expressed as a number from 1 (easiest) to 5 (hardest)
4. tests.js - contains an array export of test objects, each with shape: `{description: string, unitTests: []string}`; details about the strings in the `unitTests` array are described below.
5. (optional) artifacts directory - containing anything needed to populate above files

## unit test structure

each unit test is a stringified function, which accepts the function being tested, and runs a chai test with that function:

```text
((functionToTest) => chai.expect(fnToTest(/*input*/)).to.equal(/*output*/))
```

the reason for this is so we can take the test string and `eval` it to turn it into a function that accepts the function being tested, and pass in the user's submitted code as that function (for more details about implementation, see `src/runner/standard/worker/unitTestRunner.js`)

## todos

### make more tests

- fishbus
- roman numarals

### create new problems

- num steps

  - [yt video](https://www.youtube.com/watch?v=5o-kdjv7FD0)

- max subarray (kadane's algorithm)

  - [yt video](https://www.youtube.com/watch?v=86CQq3pKSUw)

- spiral matrix
  - [link](https://practice.geeksforgeeks.org/problems/spirally-traversing-a-matrix/0)

### problems to add

- remove duplicates

  - [link](https://practice.geeksforgeeks.org/problems/remove-duplicates3034/1)

- count the triplets

  - [link](https://practice.geeksforgeeks.org/problems/count-the-triplets4615/1)

- longest common prefix in an array

  - [link](https://practice.geeksforgeeks.org/problems/longest-common-prefix-in-an-array/0)

## good resources for ideas

[geeks4geeks](https://www.geeksforgeeks.org/must-do-coding-questions-for-companies-like-amazon-microsoft-adobe/)
leetcode
codewars
