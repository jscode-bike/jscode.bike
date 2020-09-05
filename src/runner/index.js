import workerScript from "./generated.js";

const submitCode = (code, tests, variableName) => {
  return runTestsInWorker(code, tests, variableName);
};

/// TODO: abstract worker into more efficient singleton instance

class CodeRunner {
  constructor() {
    this.worker = new Worker(workerScript);
  }

  // this should return a subscribable
  // should update results on each emit
  submitCode(code, tests, variableName) {
    this.worker.postMessage({ code, tests, variableName });
  }
}

const runTestsInWorker = (code, tests, variableName) => {
  if (!window.Worker) throw new Error("please enable web workers");
};

export default submitCode;
