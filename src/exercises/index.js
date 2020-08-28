// import fishBus from "./fishBus/index.js";
import findOdd from "./findOdd/index.js";
import twoSum from "./twoSum/index.js";
// import LinkedList from "./LinkedList/index.js";

const fishBus = () => import("./fishBus/index.js");
export const arr = [fishBus, findOdd, twoSum];

export const obj = arr.reduce((a, b) => ({ ...a, [b.variableName]: b }), {});
