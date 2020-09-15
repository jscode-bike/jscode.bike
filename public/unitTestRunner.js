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
      runtime: null,
    };
  }
  const outputs = [];
  const spy = new Console(outputs);
  const fnToTest = injectableFunction(spy);
  const startTime = getCurrentTime();
  try {
    // eslint-disable-next-line no-eval
    eval(unitTestString)(fnToTest);
    return {
      passed: true,
      outputs: [...outputs],
      error: null,
      runtime: getFormattedRuntime(startTime, getCurrentTime()),
    };
  } catch (e) {
    return {
      passed: false,
      outputs: [...outputs],
      error: e,
      runtime: getFormattedRuntime(startTime, getCurrentTime()),
    };
  }
}

function packageCodeIntoInjectableFunction(code, variableName) {
  // eslint-disable-next-line no-eval
  return eval(`console => {"use strict"\n${code}\nreturn ${variableName}}`);
}

function getCurrentTime() {
  if (performance) {
    return performance.now();
  } else {
    return Date.now();
  }
}

function getFormattedRuntime(startTime, endTime) {
  const diff = endTime - startTime;
  return diff.toFixed(2);
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
