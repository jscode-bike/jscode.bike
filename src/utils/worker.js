/* eslint-disable no-restricted-globals */

export default () => {
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
    if (result === expected) {
      return { passed: true, outputs: [...spy.console.outputs], error: null };
    } else {
      return {
        passed: false,
        outputs: [...spy.console.outputs],
        error: { message: `expected ${expected} but got ${result}` },
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
      const fn = fnMaker(code, variableName);
      const results = tests.map((t) => runTest(fn, t));
      self.postMessage(results);
    },
    false
  );
};
