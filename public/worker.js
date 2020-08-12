/* eslint-disable no-restricted-globals */
self.importScripts("/chai.min.js");
class Spy {
  constructor() {
    this.console = { outputs: [] };
    Object.keys(console).forEach((key) => {
      this.console[key] = (...args) => {
        this.console.outputs.push({
          key,
          args: args.map((a) => {
            const type = typeof a;
            const text = type === "function" ? String(a) : JSON.stringify(a);
            return { type, text };
          }),
        });
      };
    });
  }
}

const runTest = (fn, test) => {
  const unitTestResults = test.unitTests.map(runUnitTest(fn));
  const testSummary = unitTestResults.reduce(
    (a, r) => ({
      passed: a.passed + (r.passed ? 1 : 0),
      failed: a.failed + (r.passed ? 0 : 1),
      total: a.total + 1,
    }),
    { passed: 0, failed: 0, total: 0 }
  );
  const result = {
    description: test.description,
    unitTestResults,
    testSummary,
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
      const fn = fnMaker(code, variableName),
        testResults = tests.map((t) => runTest(fn, t)),
        summary = testResults.reduce(
          (a, { testSummary: ts }) => ({
            total: a.total + ts.passed + ts.failed,
            passed: a.passed + ts.passed,
            failed: a.failed + ts.failed,
          }),
          {
            total: 0,
            passed: 0,
            failed: 0,
          }
        );
      self.postMessage({ testResults, summary });
    } catch (error) {
      console.error(error);
      self.postMessage({
        error: "problem with submitted code",
        rawError: String(error),
      });
    }
  },
  false
);
