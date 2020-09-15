/* eslint-disable no-restricted-globals */

self.importScripts("chai.min.js");

self.addEventListener("message", messageCallback);

function messageCallback(messageEvent) {
  const { code, unitTestString, variableName, unitTestId } = messageEvent.data;
  const unitTestResult = runUnitTest({ code, unitTestString, variableName });
  self.postMessage({ ...unitTestResult, unitTestId });
}

function runUnitTest({ code, unitTestString, variableName }) {
  let injectableFunction;

  try {
    injectableFunction = packageCodeIntoInjectableFunction(code, variableName);
  } catch (e) {
    return {
      passed: false,
      outputs: [],
      error: new Error(`Problem with submitted code: ${e}`),
    };
  }
  const outputs = [];
  const spy = new Console(outputs);
  const fnToTest = injectableFunction(spy);
  try {
    // eslint-disable-next-line no-eval
    eval(unitTestString)(fnToTest);
    return {
      passed: true,
      outputs: [...outputs],
      error: null,
    };
  } catch (e) {
    return {
      passed: false,
      outputs: [...outputs],
      error: e,
    };
  }
}

function packageCodeIntoInjectableFunction(code, variableName) {
  // eslint-disable-next-line no-eval
  return eval(`console => {"use strict"\n${code}\nreturn ${variableName}}`);
}

class Console {
  constructor(outputs) {
    Object.keys(console).forEach((key) => {
      this[key] = (...args) => {
        outputs.push({
          key,
          args: args.map((a) => {
            // eslint-disable-next-line no-undef
            if (a === this || a === globalThis)
              throw new Error("illegal console operation");
            const type = typeof a;
            const text = type === "function" ? String(a) : JSON.stringify(a);
            return { type, text };
          }),
        });
      };
      this[key].toString = () => "[internal code]";
    });

    return Object.freeze(this);
  }
}
