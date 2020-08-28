import findOdd from "./findOdd/meta.json";
import fishBus from "./fishBus/meta.json";
import twoSum from "./twoSum/meta.json";

export const arr = [fishBus, findOdd, twoSum].map(([n, v, d]) => ({
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
};
