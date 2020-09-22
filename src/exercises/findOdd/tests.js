import { shuffleInPlace } from "../../utils/utils";

const testTemplate = ([input, expected]) =>
  `(fnToTest => chai.expect(fnToTest(${JSON.stringify(
    input
  )})).to.equal(${expected}))`;

const findOddData = {
  startingCode: "function findOdd(arr) {\n  // code here...\n}",
  tests: [
    {
      description: "sample tests",
      unitTests: [
        [[1, 1, 2, 2, 3], 3],
        [[5, 4, 3, 2, 1, 2, 3, 4, 5], 1],
        [[10, 15, 100, 10, 20, 15, 100], 20],
      ],
    },
    {
      description: "random tests",
      unitTests: Array.from({ length: 100 }).map((_) => {
        const len = ((Math.random() * 100) | 0) + 1;
        const arr = shuffleInPlace(
          Array.from({ length: len }).map((_, i) => i + 1)
        );
        const testArr = [];

        for (let i = 0; i < len - 1; i++) {
          const num = arr.pop();
          testArr.push(num, num);
        }

        const oddInt = arr.pop();
        testArr.push(oddInt);
        return [shuffleInPlace(testArr), oddInt];
      }),
    },
  ].map((suite) => ({
    ...suite,
    unitTests: suite.unitTests.map(testTemplate),
  })),
};

export default findOddData.tests;
