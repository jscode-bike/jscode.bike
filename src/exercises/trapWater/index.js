import trapWaterMd from "./trapWater.md";

const {
  attributes: { name, variableName, tags, difficulty },
  react,
  startingCode,
} = trapWaterMd;

const output = {
  name,
  difficulty,
  variableName,
  instructionComponent: react,
  startingCode,
  tags,
};
export default output;
