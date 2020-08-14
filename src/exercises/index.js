import fishBus from "./fishBus/index.js";
import findOdd from "./findOdd/index.js";

export const arr = [fishBus, findOdd];

export const obj = arr.reduce((a, b) => ({ ...a, [b.variableName]: b }), {});
