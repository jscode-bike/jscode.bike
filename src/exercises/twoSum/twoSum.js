/// not complete;

import { shuffleInPlace } from "../../utils/utils";

// medium.com/building-ibotta/testing-arrays-and-objects-with-chai-js-4b372310fe6d
const testTemplate = ([input, expected]) =>
  `(fnToTest => chai.expect(fnToTest(...${JSON.stringify(
    input
  )})).to.eql(${JSON.stringify(expected)}))`;

const rand = (max) => (Math.random() * max) | 0;
const rand10to1000 = () => 10 + rand(990);
const rand1000 = () => rand(1000);

const rand2btn = (max) => {
  const output = [];
  while (output.length < 2) {
    const r = rand(max);
    if (output.includes(r)) continue;
    output.push(r);
  }
  return output.sort((a, b) => a - b);
};

const singleTest = () => {
  const arr = [];
  const len = rand10to1000();
  const [num1, num2] = shuffleInPlace(rand2btn(1000));
  const target = num1 + num2;
  const dontAdd = {};
  while (arr.length < len) {
    const cand = rand1000();
    if ([num1, num2].includes(cand)) continue;
    const key = target - cand;
    if (dontAdd[key]) continue;
    dontAdd[cand] = true;
    arr.push(cand);
  }

  const coords = rand2btn(len);
  const [idx1, idx2] = coords;

  arr[idx1] = num1;
  arr[idx2] = num2;

  return [[arr, target], coords];
};

const generateTwoSumRandomTests = () => {
  return Array.from({ length: 100 }).map((_) => singleTest());
};

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
    {
      description: "random tests",
      unitTests: generateTwoSumRandomTests(),
    },
  ].map((suite) => ({
    ...suite,
    unitTests: suite.unitTests.map(testTemplate),
  })),
};

export default sample;
