import chai from "chai";

export const submitCode = (code, tests, variableName) => {
  return runTests(fnMaker(code, variableName), tests);
};

const runTests = (fn, tests) => {
  const results = tests.map((t) => runTest(fn, t));
  return results;
};

const fnMaker = (code, variableName) => {
  // eslint-disable-next-line no-eval
  return eval(`console => {${code}\nreturn ${variableName}}`);
};

class Spy {
  constructor() {
    Object.keys(console).forEach((key) => {
      this[key] = (...args) => {
        this.outputs.push({
          key,
          args,
        });
      };
    });
  }
  outputs = [];
}

export const runTest = (fn, test) => {
  const [inputs, expected] = test;
  const o = { inputs, expected };
  const spy = new Spy();
  const fnToTest = fn(spy);
  try {
    chai.expect(fnToTest(...inputs)).to.equal(expected);
    return { ...o, passed: true, outputs: [...spy.outputs], error: null };
  } catch (e) {
    return { ...o, passed: false, outputs: [...spy.outputs], error: e };
  }
};
