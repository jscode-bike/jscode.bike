/// not complete;

// medium.com/building-ibotta/testing-arrays-and-objects-with-chai-js-4b372310fe6d
const testTemplate = ([input, expected]) =>
  `(fnToTest => chai.expect(fnToTest(...${JSON.stringify(
    input
  )})).to.eql(${JSON.stringify(expected)}))`;

const sample = {
  startingCode: "function twoSum(nums, target) {\n  // code here...\n}",
  tests: [
    {
      description: "sample tests",
      unitTests: [
        [
          [[2, 7, 11, 15], 9],
          [0, 1],
        ],
        [
          [[1, 3, 5, 7, 9, 11], 18],
          [3, 5],
        ],
        [
          [[10, 15, 25, 100, 40, 65], 55],
          [1, 4],
        ],
      ],
    },
  ].map((suite) => ({
    ...suite,
    unitTests: suite.unitTests.map(testTemplate),
  })),
};

export default sample;
