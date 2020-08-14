import findOddMd from "./findOdd.md";
import findOdd from "./findOdd.js";

const {
  attributes: { name, variableName, tags },
  react,
} = findOddMd;
const { startingCode, tests } = findOdd;

const output = {
  name,
  variableName,
  instructionComponent: react,
  startingCode,
  tests,
  tags,
};

export default output;
