import instructionsMd from "./instructions.md";
import startingCode from "./artifacts/startingCode.js";

const {
  attributes: { name, variableName, tags, difficulty },
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
