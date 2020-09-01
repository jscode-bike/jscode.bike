import matchingBracketsMd from "./matchingBrackets.md";

const {
  attributes: { name, variableName, tags, difficulty },
  react,
  startingCode,
} = matchingBracketsMd;

const output = {
  name,
  difficulty,
  variableName,
  instructionComponent: react,
  startingCode,
  tags,
};
export default output;
