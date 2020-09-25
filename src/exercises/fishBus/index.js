import instructionsMd from "./instructions.md";

const {
  attributes: { name, variableName, tags, difficulty, startingCode },
  react: instructionComponent,
} = instructionsMd;

const output = {
  name,
  difficulty,
  variableName,
  instructionComponent,
  startingCode,
  tags,
};

export default output;
