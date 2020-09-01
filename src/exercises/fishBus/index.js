import fishBusMd from "./fishBus.md";

const {
  attributes: { name, variableName, tags, difficulty, startingCode },
  react,
} = fishBusMd;

const output = {
  name,
  difficulty,
  variableName,
  instructionComponent: react,
  startingCode,
  tags,
};
export default output;
