const testTemplate = (input, output) => {
  return `((functionToTest) => chai.expect(fnToTest(${input})).to.equal(${output}))`;
};

const generateRandomTests = () => {
  return Array.from({ length: 100 }).map(() => generateSingleTest());
};

const generateSingleTest = () => {
  const num1 = generateRandomNumber(100);
  const num2 = generateRandomNumber(100);
  const sum = num1 + num2;
  return [`${num1}, ${num2}`, `${sum}`];
};

const generateRandomNumber = (max) => {
  const coefficient = Math.random() > 0.5 ? 1 : -1;
  return Math.floor(Math.random() * max) * coefficient;
};

export default [
  {
    description: "sample tests",
    unitTests: [
      ["3,5", "8"],
      ["100,-5", "95"],
      ["987,1", "988"],
    ],
  },
  {
    description: "should add two positive integers correctly",
    unitTests: [
      ["3,4", "7"],
      ["10,1", "11"],
      ["999,2", "1001"],
      ["88,2", "90"],
      ["1,9", "10"],
    ],
  },
  {
    description: "should add two negative integers correctly",
    unitTests: [
      ["-4,-1", "-5"],
      ["-9, -3", "-12"],
      ["-1,-10", "-11"],
      ["-83,-8", "-91"],
      ["-1000,-1000", "-2000"],
    ],
  },
  {
    description: "should add positive and negative integers correctly",
    unitTests: [
      ["-10,10", "0"],
      ["-888, 1", "-887"],
      ["42, -3", "39"],
    ],
  },
  {
    description: "random tests",
    unitTests: generateRandomTests(),
  },
].map(({ unitTests, description }) => ({
  description,
  unitTests: unitTests.map(([i, o]) => testTemplate(i, o)),
}));
