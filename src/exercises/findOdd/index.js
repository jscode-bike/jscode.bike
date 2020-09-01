import findOddMd from "./findOdd.md";

const {
  attributes: { name, variableName, tags, difficulty, startingCode },
  react,
} = findOddMd;

const output = {
  name,
  difficulty,
  variableName,
  instructionComponent: react,
  startingCode,
  tags,
};

export default output;
