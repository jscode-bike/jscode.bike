import fizzBuzzMd from "./fizzBuzz.md";
import fizzBuzz from "./fizzBuzz.js";

const {
  attributes: { name, variableName, tags },
  react,
} = fizzBuzzMd;
const { startingCode, tests } = fizzBuzz;

const output = {
  name,
  variableName,
  instructionComponent: react,
  startingCode,
  tests,
  tags,
};
export default output;
