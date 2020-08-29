import trapWaterMd from "./trapWater.md";
import trapWater from "./trapWater.js";

const {
  attributes: { name, variableName, tags, difficulty },
  react,
} = trapWaterMd;
const { startingCode, tests } = trapWater;

const output = {
  name,
  difficulty,
  variableName,
  instructionComponent: react,
  startingCode,
  tests,
  tags,
};
export default output;
