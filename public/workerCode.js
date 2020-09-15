/* eslint-disable no-restricted-globals */

const createNewWorker = () => new Worker("unitTestRunner.js");
class TestRunner {
  constructor() {
    this.worker = createNewWorker();
  }

  timeoutTest() {
    this.worker.terminate();
    this.worker = createNewWorker();
    return makeErrorObj();
  }

  runUnitTest({ code, unitTestString, variableName }) {
    const unitTestId = uuid();
    console.info(`test ${variableName} (${unitTestId}): ${unitTestString} ...`);
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        console.warn("test runner worker didn't respond...");
        this.worker.removeEventListener("message", processUnitTestMessage);
        resolve(this.timeoutTest());
      }, 5000);

      const message = {
        code,
        unitTestString,
        variableName,
        unitTestId,
      };
      const processUnitTestMessage = (messageEvent) => {
        if (messageEvent?.data?.unitTestId !== message.unitTestId) return;
        clearTimeout(timer);
        this.worker.removeEventListener("message", processUnitTestMessage);
        const unitTestResult = messageEvent.data;
        resolve(unitTestResult);
      };
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

function messageCallback(e) {
  const { code, tests, variableName, submissionId } = e.data;
  const testResultsPromises = tests.map((testGroup) =>
    testRunner.runTestGroup(testGroup, code, variableName)
  );
  Promise.all(testResultsPromises).then((testResults) => {
    self.postMessage({
      testResults,
      summary: generateOverallSummary(testResults),
      submissionId,
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

function uuid() {
  var dt = new Date().getTime();
  var output = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return output;
}

function makeErrorObj() {
  return {
    passed: false,
    outputs: [
      {
        key: "error",
        type: "error",
        args: [
          {
            type: "error",
            text:
              "your console outputs weren't loaded because the test timed out.",
          },
        ],
      },
    ],
    error: new Error("code timed out: took longer than 5 seconds"),
  };
}
