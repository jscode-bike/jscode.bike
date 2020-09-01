import trapWaterMd from "./trapWater.md";

const {
  attributes: { name, variableName, tags, difficulty, startingCode },
  react,
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
