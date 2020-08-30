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
      .map((_) => {
        return randomValidSegment();
      })
      .join("")
  );
};

const shuffleStr = (str) => [...str].sort(() => 0.5 - Math.random()).join("");

const breakValidSegment = (str) => {
  if (str.length < 4) return "[](}{)";
  let o = str.slice();
  while (matchingBrackets(o)) {
    o = shuffleStr(o);
    console.log(o);
  }
  return o;
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

const isOpeningBrace = (c) => "{([".includes(c);
const isClosingBrace = (c) => "})]".includes(c);

function matchingBrackets(str) {
  // code here...
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (isOpeningBrace(c)) {
      stack.push(c);
    } else if (isClosingBrace(c)) {
      const n = stack.pop();
      if (c !== matches[n]) return false;
    }
  }
  return stack.length === 0;
}

const arr = Array.from({ length: 100 }).map((_) => createSingleTest());
const path = require("path");
const fs = require("fs");

const filename = path.join(
  __dirname,
  "..",
  "src",
  "exercises",
  "matchingBrackets",
  "fixed_tests.json"
);

fs.writeFileSync(filename, JSON.stringify(arr));
