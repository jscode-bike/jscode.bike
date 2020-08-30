import matchingBracketsMd from "./matchingBrackets.md";
import matchingBrackets from "./matchingBrackets.js";

const {
  attributes: { name, variableName, tags, difficulty },
  react,
} = matchingBracketsMd;
const { startingCode, tests } = matchingBrackets;

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
