const rand = (n) => (Math.random() * n) | 0;
const matches = {
  "{": "}",
  "[": "]",
  "(": ")",
};
const openingBraces = `[({`;

const generateValidUnit = () => {
  let initHalf = "";
  for (let i = 0; i < 5; i++) {
    const idx = (Math.random() * 3) | 0;
    initHalf += openingBraces[idx];
  }
  return (
    initHalf +
    [...initHalf]
      .reverse()
      .map((c) => matches[c])
      .join("")
  );
};

const wrapValidUnit = (str) => {
  if (randBool()) return str;
  let initHalf = "";
  for (let i = 0; i < 5; i++) {
    const idx = rand(3);
    initHalf += openingBraces[idx];
  }
  return (
    initHalf +
    str +
    [...initHalf]
      .reverse()
      .map((c) => matches[c])
      .join("")
  );
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
    Array.from({ length: rand(5) })
      .map((_) => {
        return randomValidSegment();
      })
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
  const idx = rand(str.length);
  const replacement = findMismatch(str[idx]);
  const arr = [...str];
  arr[idx] = replacement;
  return arr.join("");
};

const createSingleTest = () => {
  const validSegment = `"${generateValidSegment()}"`;
  if (randBool()) {
    return [validSegment, true];
  } else {
    return [breakValidSegment(validSegment), false];
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
      description: "random tests",
      unitTests: generateRandomTests(),
    },
  ].map((suite) => ({
    ...suite,
    unitTests: suite.unitTests.map(testTemplate),
  })),
};

export default sample;
