import findOdd from "./findOdd/meta.json";
import fishBus from "./fishBus/meta.json";
import twoSum from "./twoSum/meta.json";
import trapWater from "./trapWater/meta.json";
import matchingBrackets from "./matchingBrackets/meta.json";
import RomanNumeralConverter from "./RomanNumeralConverter/meta.json";
// import rottenLimes from "./rottenLimes/meta.json";

export const arr = [
  fishBus,
  findOdd,
  twoSum,
  trapWater,
  matchingBrackets,
  RomanNumeralConverter,
  // rottenLimes,
].map(([n, v, d]) => ({
  name: n,
  variableName: v,
  difficulty: d,
}));

export default {
  get(exerciseVariableName) {
    return new Promise((resolve, reject) => {
      import(`./${exerciseVariableName}/index.js`)
        .then((exerciseData) => {
          resolve(exerciseData.default);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getTests(exerciseVariableName) {
    return new Promise((resolve, reject) => {
      import(`./${exerciseVariableName}/tests.js`)
        .then((exerciseData) => {
          resolve(exerciseData.default);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
