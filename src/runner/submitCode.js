let mainWorker = new Worker("workerCode.js");

const submitCode = (code, tests, variableName, submissionId) => {
  return runTestsInWorker(code, tests, variableName, submissionId);
};

export const refreshWorker = () => {
  mainWorker.terminate();
  mainWorker = new Worker("workerCode.js");
};

const runTestsInWorker = (code, tests, variableName, submissionId) => {
  return new Promise((resolve, reject) => {
    mainWorker.postMessage({ code, tests, variableName, submissionId });
    mainWorker.onmessage = (e) => {
      if (e.data.submissionId !== submissionId) return;
      const output = { ...e.data };
      if (output.error) {
        reject(output);
      } else {
        resolve(output);
      }
    };
  });
};

export default submitCode;
