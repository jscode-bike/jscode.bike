/// incomplete
const tests = [
  {
    description: "sample tests",
    unitTests: [
      {
        input: [
          [1, 1, 2],
          [1, 1, 0],
          [0, 1, 1],
        ],
        output: 4,
      },
      {
        input: [
          [1, 1, 2],
          [0, 1, 1],
          [1, 0, 1],
        ],
        output: -1,
      },
      { input: [[0, 2]], output: 0 },
    ].map(
      (o) =>
        `(fnToTest=>chai.expect(fnToTest(${JSON.stringify(
          o.input
        )})).to.equal(${o.output}))`
    ),
  },
];

export default tests;
