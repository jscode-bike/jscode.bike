import instructionsMd from "./instructions.md";
import startingCode from "./artifacts/startingCode.js";

const {
  attributes: { name, variableName, tags, difficulty },
  react: instructionComponent,
} = instructionsMd;

export default {
  name,
  difficulty,
  variableName,
  instructionComponent,
  startingCode,
  tags,
};
