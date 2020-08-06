/* eslint-disable no-restricted-globals */
self.importScripts("/chai.min.js");
class Spy {
  constructor() {
    this.console = { outputs: [] };
    Object.keys(console).forEach((key) => {
      this.console[key] = (...args) => {
        this.console.outputs.push({
          key,
          args,
        });
      };
    });
  }
}

const runTest = (fn, test) => {
  const [inputs, expected] = test;
  const spy = new Spy();
  const fnToTest = fn(spy.console);
  const result = fnToTest(...inputs);
  try {
    // eslint-disable-next-line no-undef
    chai.expect(result).to.equal(expected);
    return { passed: true, outputs: [...spy.console.outputs], error: null };
  } catch (e) {
    return { passed: false, outputs: [...spy.console.outputs], error: e };
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
      self.postMessage(results);
    } catch (error) {
      self.postMessage({ error: 'problem with submitted code' });
    }
  },
  false
);
