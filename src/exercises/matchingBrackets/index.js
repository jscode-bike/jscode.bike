import matchingBracketsMd from "./matchingBrackets.md";

const {
  attributes: { name, variableName, tags, difficulty, startingCode },
  react,
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
