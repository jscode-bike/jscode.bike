import instructionsMd from "./instructions.md";
import solutionMd from "./solution.md";

const {
  attributes: { name, variableName, tags, difficulty, startingCode },
  react: instructionComponent,
} = instructionsMd;

const { react: solutionComponent } = solutionMd;

const output = {
  name,
  difficulty,
  variableName,
  instructionComponent,
  solutionComponent,
  startingCode,
  tags,
};

export default output;
