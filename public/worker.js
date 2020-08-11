/* eslint-disable no-restricted-globals */
self.importScripts("/chai.min.js");
class Spy {
  constructor() {
    this.console = { outputs: [] };
    Object.keys(console).forEach((key) => {
      this.console[key] = (...args) => {
        this.console.outputs.push({
          key,
          // change the line below for improved syntax highlighting on UI-side
          // return an object with type and string
          // (would require work on UI side also)
          args: args.map(String),
        });
      };
    });
  }
}

const runTest = (fn, test) => {
  const result = {
    description: test.description,
    unitTestResults: test.unitTests.map(runUnitTest(fn)),
  };
  return result;
};

const runUnitTest = (fn) => (test) => {
  const spy = new Spy();
  const fnToTest = fn(spy.console);
  try {
    // eslint-disable-next-line no-eval
    eval(test)(fnToTest);
    return {
      passed: true,
      outputs: [...spy.console.outputs],
      error: null,
    };
  } catch (e) {
    return {
      passed: false,
      outputs: [...spy.console.outputs],
      error: e,
    };
  }
};

const fnMaker = (code, variableName) => {
  // eslint-disable-next-line no-eval
  return eval(`console => {${code}\nreturn ${variableName}}`);
};

self.addEventListener(
  "message",
  function (e) {
    const { code, tests, variableName } = e.data;
    try {
      const fn = fnMaker(code, variableName);
      const results = tests.map((t) => runTest(fn, t));
      // do a summary calculation and return {summary, results}
      self.postMessage(results);
    } catch (error) {
      console.error(error);
      // return the plain text error also for use in the frontend
      self.postMessage({ error: "problem with submitted code" });
    }
  },
  false
);
