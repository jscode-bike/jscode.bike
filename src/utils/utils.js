// const add = eval(`() => {${code}\nreturn add}`)();
//     const passedTest = runTest(() => chai.expect(add(2, 2)).to.equal(4));

import chai from "chai";

export const submitCode = (code, tests, variableName) => {
  const o = {};
  // do a try/catch here to validate input using babel or soemthing
  o[variableName] = eval(`() => {${code}\nreturn ${variableName}}`)();
  // debugger;
  return runTests(o[variableName], tests);
};

const runTests = (fn, tests) => {
  const results = tests.map((t) => runTest(fn, t));
  return results
};

export const runTest = (fn, test) => {
  const [input, expected] = test;
  const o = { input, expected };
  try {
    chai.expect(fn(input)).to.equal(expected);
    return { ...o, passed: true, outputs: [] };
  } catch (e) {
    console.log("got error!!", e);
    return { ...o, passed: false, outputs: [e] };
  }
};
