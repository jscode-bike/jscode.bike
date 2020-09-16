import fullWorkerDataURL from "./fullWorkerDataURL";

let mainWorker = getNewWorker();

/// figure out way to stream output in real time... hashes/keys/updates etc
export const submitCode = (code, tests, variableName, submissionId) => {
  return runTestsInWorker(code, tests, variableName, submissionId);
};

export const refreshWorker = () => {
  mainWorker.terminate();
  mainWorker = getNewWorker();
  return Promise.resolve();
};

const runTestsInWorker = (code, tests, variableName, submissionId) => {
  return new Promise((resolve, reject) => {
    mainWorker.postMessage({ code, tests, variableName, submissionId });
    /// see if below onmessage call causes memory leak- consider adding/removing eventListener
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
  return new Worker(fullWorkerDataURL);
}
