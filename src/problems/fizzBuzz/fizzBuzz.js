const testTemplate = ([input, expected]) =>
  `(fnToTest => chai.expect(fnToTest(${input})).to.equal(${expected}))`;

const sample = {
  startingCode: "function fizzBuzz(n) {\n  // code here...\n}",
  tests: [
    {
      description: 'should return "fizz" for multiples of 3',
      unitTests: [
        [3, '"fizz"'],
        [99, '"fizz"'],
      ],
    },
    {
      description: 'should return "buzz" for multiples of 5',
      unitTests: [
        [5, '"buzz"'],
        [25, '"buzz"'],
      ],
    },
    {
      description: 'should return "fizzBuzz" for multiples of both 3 and 5',
      unitTests: [
        [15, '"fizzBuzz"'],
        [60, '"fizzBuzz"'],
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

export default sample;
