import num2rom from "./artifacts/num2rom.json";
import rom2num from "./artifacts/rom2num.json";

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
  // {
  //   description: "exhaustive: numbers 1 through 5000",
  //   unitTests: Object.entries(num2rom).map(([key, val]) => [
  //     `.numberToRoman(${key})`,
  //     val,
  //   ]),
  // },
  // {
  //   description: "exhaustive: roman numerals I through MMMMM",
  //   unitTests: Object.entries(rom2num).map(([key, val]) => [
  //     `.romanToNumber("${key}")`,
  //     val,
  //   ]),
  // },
].map((suite) => ({
  ...suite,
  unitTests: suite.unitTests.map(testTemplate),
}));

export default tests;
