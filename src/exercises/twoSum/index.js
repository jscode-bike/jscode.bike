import twoSumMd from "./twoSum.md";
import twoSum from "./twoSum.js";

const {
  attributes: { name, variableName, tags, difficulty },
  react,
} = twoSumMd;
const { startingCode, tests } = twoSum;

const output = {
  name,
  difficulty,
  variableName,
  instructionComponent: react,
  startingCode,
  tests,
  tags,
};
export default output;
