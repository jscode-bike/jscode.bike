const testTemplate = ([input, expected]) =>
  `(fnToTest => chai.expect(fnToTest(${input})).to.equal(${expected}))`;

const sample = {
  startingCode: "function fishBus(n) {\n  // code here...\n}",
  tests: [
    {
      description: 'should return "fish" for multiples of 3',
      unitTests: [
        [3, '"fish"'],
        [99, '"fish"'],
      ],
    },
    {
      description: 'should return "bus" for multiples of 5',
      unitTests: [
        [5, '"bus"'],
        [25, '"bus"'],
      ],
    },
    {
      description: 'should return "fishBus" for multiples of both 3 and 5',
      unitTests: [
        [15, '"fishBus"'],
        [60, '"fishBus"'],
      ],
    },
    {
      description: "should return input if neither divisible by 3 nor 5",
      unitTests: [
        [7, 7],
        [29, 29],
        [31, 31],
      ],
    },
  ].map((suite) => ({
    ...suite,
    unitTests: suite.unitTests.map(testTemplate),
  })),
};

export default sample.tests;
