let mainWorker = getNewWorker();

const submitCode = (code, tests, variableName, submissionId) => {
  return runTestsInWorker(code, tests, variableName, submissionId);
};

export const refreshWorker = () => {
  mainWorker.terminate();
  mainWorker = getNewWorker();
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

function getNewWorker() {
  if (!Worker) throw new Error("Please enable web workers.");
  return new Worker("workerCode.js");
}

export default submitCode;
