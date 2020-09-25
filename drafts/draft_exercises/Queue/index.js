import QueueMd from "./Queue.md";
import Queue from "./Queue.js";

const {
  attributes: { name, variableName, tags },
  react,
} = QueueMd;
const { startingCode, tests } = Queue;

const output = {
  name,
  variableName,
  instructionComponent: react,
  startingCode,
  tests,
  tags,
};
export default output;
