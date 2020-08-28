/* eslint-disable no-unused-expressions */ // for string literal replacers
/* eslint-disable no-eval */ // for evals
/* eslint-disable no-undef */ // for globalThis conditional
/* eslint-disable no-restricted-globals */ // for selfs in worker code
import chaiStr from "./chaiVar.js";

const codeMaker = () => {
  "START";
  "REPLACE_THIS";

  class Console {
    constructor(outputs) {
      Object.keys(console).forEach((key) => {
        this[key] = (...args) => {
          outputs.push({
            key,
            args: args.map((a) => {
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
    const outputs = [];
    const spy = new Console(outputs);
    const fnToTest = fn(spy);
    try {
      eval(test)(fnToTest);
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
  };

  const fnMaker = (code, variableName) => {
    return eval(`console => {"use strict"\n${code}\nreturn ${variableName}}`);
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

  ("END");
};

let codeString = codeMaker.toString();
codeString = codeString.replace('"REPLACE_THIS";', chaiStr);
codeString = codeString.substring(
  codeString.indexOf('"START"') + 8,
  codeString.lastIndexOf('"END"')
);

const y = new Blob([codeString], { type: "application/javascript" });

const x = URL.createObjectURL(y);

export default x;
