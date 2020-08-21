import fishBus from "./fishBus/index.js";
import findOdd from "./findOdd/index.js";
import twoSum from "./twoSum/index.js";
// import LinkedList from "./LinkedList/index.js";

export const arr = [fishBus, findOdd, twoSum];

//fundamentals

// const sections = {
//   fundamentals: {
//     title: "Fundamentals",
//     problems: {
//       LinkedList,
//     },
//   },
//   challenges: {
//     title: "Challenges",
//     problems: {
//       fishBus,
//       findOdd,
//     },
//   },
// };

export const obj = arr.reduce((a, b) => ({ ...a, [b.variableName]: b }), {});
