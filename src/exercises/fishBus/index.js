import fishBusMd from "./fishBus.md";

const {
  attributes: { name, variableName, tags, difficulty },
  react,
  startingCode,
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
