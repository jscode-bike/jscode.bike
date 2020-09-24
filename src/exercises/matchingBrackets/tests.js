import fixedTests from "./fixed_tests.json";
const rand = (n) => (Math.random() * n) | 0;
const matches = {
  "{": "}",
  "[": "]",
  "(": ")",
};
const openingBraces = `[({`;

const createOpeningSequence = () => {
  let output = "";
  for (let i = 0; i < 5; i++) {
    const idx = rand(3);
    output += openingBraces[idx];
  }
  return output;
};

const createClosingSequence = (openingSequence) => {
  return [...openingSequence]
    .reverse()
    .map((c) => matches[c])
    .join("");
};

const generateValidUnit = () => {
  const o = createOpeningSequence();
  const c = createClosingSequence(o);
  return o + c;
};

const wrapValidUnit = (str) => {
  if (randBool()) return str;
  const o = createOpeningSequence();
  const c = createClosingSequence(o);
  return o + str + c;
};

const randBool = () => Math.random() > 0.5;

const randomValidSegment = () => {
  let output = "";
  const k = rand(5);
  for (let i = 0; i < k; i++) {
    output += generateValidUnit();
  }
  return randBool() ? wrapValidUnit(output) : output;
};

const generateValidSegment = () => {
  return (
    wrapValidUnit(randomValidSegment()) +
    Array.from({ length: rand(3) })
      .map((_) => randomValidSegment())
      .join("")
  );
};

const allBraces = "({[]})";

const findMismatch = (c) => {
  const l = allBraces.replace(c, "");
  const k = rand(l.length);
  return l[k];
};

const breakValidSegment = (str) => {
  const idx = rand(str.length - 1);
  const replacement = findMismatch(str[idx]);
  const arr = [...str];
  arr[idx] = replacement;
  return arr.join("");
};

const w = (s) => `"${s}"`;

const createSingleTest = () => {
  const validSegment = generateValidSegment();
  if (randBool()) {
    return [w(validSegment), true];
  } else {
    return [w(breakValidSegment(validSegment)), false];
  }
};

const generateRandomTests = () => {
  return Array.from({ length: 100 }).map((_) => createSingleTest());
};

const testTemplate = ([input, expected]) =>
  `(fnToTest => chai.expect(fnToTest(${input})).to.equal(${expected}))`;

const sample = {
  startingCode: "function matchingBrackets(str) {\n  // code here...\n}",
  tests: [
    {
      description: "sample tests",
      unitTests: [
        ['"()[]{}"', true],
        ['"({[]})"', true],
        ['"(][){}"', false],
        ['"()[]{}[]([]}"', false],
        ['"((({{{[[[[]({}){}]]]}}})))"', true],
      ],
    },
    {
      description: "fixed tests",
      unitTests: fixedTests,
    },
    {
      description: "random tests",
      unitTests: generateRandomTests(),
    },
  ].map((suite) => ({
    ...suite,
    unitTests: suite.unitTests.map(testTemplate),
  })),
};

export default sample.tests;
