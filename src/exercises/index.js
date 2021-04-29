import findOdd from "./findOdd/meta.json";
import fishBus from "./fishBus/meta.json";
import twoSum from "./twoSum/meta.json";
import trapWater from "./trapWater/meta.json";
import matchingBrackets from "./matchingBrackets/meta.json";
import RomanNumeralConverter from "./RomanNumeralConverter/meta.json";
import removeDuplicates from "./removeDuplicates/meta.json";
// import rottenLimes from "./rottenLimes/meta.json";

export const arr = [
  fishBus,
  findOdd,
  twoSum,
  trapWater,
  matchingBrackets,
  RomanNumeralConverter,
  removeDuplicates,
  // rottenLimes,
].map(([n, v, d]) => ({
  name: n,
  variableName: v,
  difficulty: d,
}));

const exercisesObj = {
  get(exerciseVariableName) {
    return new Promise((resolve, reject) => {
      import(`./${exerciseVariableName}/index.js`)
        .then((exerciseData) => {
          resolve(exerciseData.default);
        })
        .catch(reject);
    });
  },
  getTests(exerciseVariableName) {
    return new Promise((resolve, reject) => {
      import(`./${exerciseVariableName}/tests.js`)
        .then((exerciseData) => {
          resolve(exerciseData.default);
        })
        .catch(reject);
    });
  },
  getSolutionComponent(exerciseVariableName) {
    return new Promise((resolve, reject) => {
      import(`./${exerciseVariableName}/solution.js`)
        .then((solutionData) => {
          resolve(solutionData.default);
        })
        .catch(reject);
    });
  },
};

export default exercisesObj;
