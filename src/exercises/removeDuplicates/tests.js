import fixedInputTests from "./artifacts/fixed_inputs.json";

const testTemplate = (input, output) => {
  return `((functionToTest) => chai.expect(fnToTest('${input}')).to.equal('${output}'))`;
};

export default [
  {
    description: "sample tests",
    unitTests: [
      ["helloworLd", "helowrd"],
      ["abbcccddddeeeeeffffffggggggg", "abcdefg"],
      ["theFatCatSatOnTheRat", "theFaCSOnR"],
      ["r3m0v3Dupl1c4te5", "r3m0vDupl1c4te5"],
    ],
  },
  {
    description:
      "should remove duplicates correctly when given an input with both lowercase and uppercase letters",
    unitTests: [
      ["gReeNEggSandSpaM", "gReNSadpM"],
      ["BREADcheeseBREAD", "BREADchs"],
      ["aAabBc", "abc"],
      ["bamboozledBABOON", "bamozledN"],
    ],
  },
  {
    description:
      "should remove duplicates correctly when given an input with numbers",
    unitTests: [
      ["leet1337", "let137"],
      ["0110110101100001011011100110011101101111", "01"],
      ["123454321", "12345"],
      ["password123", "pasword123"],
      ["c00lC0l0r", "c0lr"],
    ],
  },
  {
    description: "fixed tests",
    unitTests: fixedInputTests,
  },
].map(({ unitTests, description }) => ({
  description,
  unitTests: unitTests.map(([i, o]) => testTemplate(i, o)),
}));
