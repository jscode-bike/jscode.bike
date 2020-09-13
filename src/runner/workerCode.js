/* eslint-disable no-restricted-globals */
// this should be the main worker
// spawns other workers for individual tests
// recieves an array of test suites

// test runner worker accepts a test (thru postMessage)
// returns the result (thru onMessage)
// result shape : {passed, outputs, error}
// if the test times out, we pre-fill and load a failed result
// would have to micro manage testRunner worker life cycle

class TestRunner {
  constructor() {
    this.worker = new Worker("testRunner.js");
  }

  timeoutTest() {
    this.worker.terminate();
    this.worker = new Worker("testRunner.js");
    return {
      passed: false,
      outputs: [
        "your console outputs weren't loaded because the test timed out.",
      ],
      error: new Error("code timed out: took longer than 5 seconds"),
    };
  }

  runUnitTest({ code, unitTestString, variableName }) {
    // accepts code, test, varName and runs the test in the worker
    // times out after 5 seconds, returns failed test
    // returns the result of the test as object (shape subject to change)
    // tentative shape: {passed, outputs, error}
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        console.warn("test runner worker didn't respond...");
        this.worker.removeEventListener("message", processUnitTestMessage);
        resolve(this.timeoutTest());
      }, 5000);

      const message = { code, unitTestString, variableName };
      function processUnitTestMessage(messageEvent) {
        clearTimeout(timer);
        this.worker.removeEventListener("message", processUnitTestMessage);
        const unitTestResult = messageEvent.data;
        resolve(unitTestResult);
      }
      this.worker.addEventListener("message", processUnitTestMessage);
      this.worker.postMessage(message);
    });
  }

  async runTestGroup({ description, unitTests }, code, variableName) {
    const promises = unitTests.map((ut) =>
      this.runUnitTest({ code, unitTestString: ut, variableName })
    );
    const unitTestResults = await Promise.all(promises);
    const testSummary = generateTestGroupSummary(unitTestResults);
    const testGroupResult = {
      description,
      unitTestResults,
      testSummary,
    };
    return testGroupResult;
  }
}

self.addEventListener(
  "message",

  messageCallback,
  false
);

const testRunner = new TestRunner();

// messageCallback: so this is where a lot of management happens
// this recieves the message from the main thread
// message shape:
/*
{
  code (str), 
  tests [{description, unitTests}], 
  variableName(str)
}
*/
// returns full testResults and summary

function messageCallback(e) {
  const { code, tests, variableName } = e.data;
  const testResultsPromises = tests.map((testGroup) =>
    testRunner.runTestGroup(testGroup, code, variableName)
  );
  Promise.all(testResultsPromises).then((testResults) => {
    self.postMessage({
      testResults,
      summary: generateOverallSummary(testResults),
    });
  });
}

function generateTestGroupSummary(unitTestResults) {
  return unitTestResults.reduce(
    (a, r) => ({
      passed: a.passed + (r.passed ? 1 : 0),
      failed: a.failed + (r.passed ? 0 : 1),
      total: a.total + 1,
    }),
    {
      passed: 0,
      failed: 0,
      total: 0,
    }
  );
}

function generateOverallSummary(testGroupResultsArray) {
  return testGroupResultsArray.reduce(
    (a, { testSummary: ts }) => {
      return {
        total: a.total + ts.passed + ts.failed,
        passed: a.passed + ts.passed,
        failed: a.failed + ts.failed,
      };
    },
    {
      total: 0,
      passed: 0,
      failed: 0,
    }
  );
}
