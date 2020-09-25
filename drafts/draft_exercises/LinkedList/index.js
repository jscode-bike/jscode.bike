import LinkedListMd from "./LinkedList.md";
import LinkedList from "./LinkedList.js";

const {
  attributes: { name, variableName, tags },
  react,
} = LinkedListMd;
const { startingCode, tests } = LinkedList;

const output = {
  name,
  variableName,
  instructionComponent: react,
  startingCode,
  tests,
  tags,
};
export default output;
