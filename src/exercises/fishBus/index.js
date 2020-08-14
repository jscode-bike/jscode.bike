import fishBusMd from "./fishBus.md";
import fishBus from "./fishBus.js";

const {
  attributes: { name, variableName, tags },
  react,
} = fishBusMd;
const { startingCode, tests } = fishBus;

const output = {
  name,
  variableName,
  instructionComponent: react,
  startingCode,
  tests,
  tags,
};
export default output;
