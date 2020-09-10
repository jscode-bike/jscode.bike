const testTemplate = ([input, expected]) =>
  `(classToTest=> chai.expect(classToTest${input}).to.equal(${expected}))`;

const tests = [
  {
    description: "should convert from number to roman numeral",
    unitTests: [
      [".numberToRoman(3)", '"III"'],
      [".numberToRoman(14)", '"XIV"'],
      [".numberToRoman(37)", '"XXXVII"'],
    ],
  },
  {
    description: "should convert from roman numeral to number",
    unitTests: [
      ['.romanToNumber("IX")', 9],
      ['.romanToNumber("CXC")', 190],
      ['.romanToNumber("MMIV")', 2004],
    ],
  },
].map((suite) => ({
  ...suite,
  unitTests: suite.unitTests.map(testTemplate),
}));

export default tests;
