const testTemplate = ([input, expected]) =>
  `(fnToTest => chai.expect(fnToTest(${JSON.stringify(
    input
  )})).to.equal(${expected}))`;

const sample = {
  startingCode: "function trapWater(heights) {\n  // code here...\n}",
  tests: [
    {
      description: "sample tests",
      unitTests: [
        [[1, 0, 2, 1, 3, 1, 2, 1, 4, 2, 3, 0, 2], 10],
        [[5, 4, 1, 2, 1, 3, 1, 4], 12],
        [[3, 0, 0, 2, 0, 4], 10],
        [[1, 2, 3, 4, 3, 2, 1], 0],
      ],
    },
  ].map((suite) => ({
    ...suite,
    unitTests: suite.unitTests.map(testTemplate),
  })),
};

export default sample;
