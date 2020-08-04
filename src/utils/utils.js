// const add = eval(`() => {${code}\nreturn add}`)();
//     const passedTest = runTest(() => chai.expect(add(2, 2)).to.equal(4));

import chai from "chai";

export const submitCode = (code, tests, variableName) => {
  const o = {};
  // do a try/catch here to validate input using babel or soemthing
  // o[variableName] = eval(`() => {${code}\nreturn ${variableName}}`)();
  // debugger;
  o[variableName] = fnMaker(code, variableName);
  return runTests(o[variableName], tests);
};

const runTests = (fn, tests) => {
  const results = tests.map((t) => runTest(fn, t));
  return results;
};

const fnMaker = (code, variableName) => {
  // code = code.replaceAll("console.log", "spy.log");
  return eval(`() => console => {${code}\nreturn ${variableName}}`)();
};

class Spy {
  constructor() {
    Object.keys(console).forEach((key) => {
      this[key] = (...args) => {
        this.unknowns.push({
          key,
          args,
        });
      };
    });
    this.log = (...vals) => {
      this.logs.push(vals);
    };
    this.warn = (...vals) => {
      this.warns.push(vals);
    };
  }
  warns = [];
  logs = [];
  unknowns = [];
}

export const runTest = (fn, test) => {
  const [inputs, expected] = test;
  const o = { inputs, expected };
  const spy = new Spy();
  const fnToTest = fn(spy);
  try {
    chai.expect(fnToTest(...inputs)).to.equal(expected);
    console.log(spy);
    return { ...o, passed: true, outputs: [...spy.logs] };
  } catch (e) {
    console.log("got error!!", e);
    console.log(spy);
    return { ...o, passed: false, outputs: [...spy.logs, e] };
  }
};
