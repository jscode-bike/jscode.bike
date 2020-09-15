import workerScript from "./workerCode.js";

const submitCode = (code, tests, variableName, submissionId) => {
  return runTestsInWorker(code, tests, variableName, submissionId);
};

/// TODO: abstract worker into more efficient singleton instance

const runTestsInWorker = (code, tests, variableName, submissionId) => {
  if (!window.Worker) throw new Error("please enable web workers");

  return new Promise((resolve, reject) => {
    const myWorker = new Worker(workerScript);
    let timer = setTimeout(() => {
      console.warn("worker didnt respond...");
      myWorker.terminate();
      reject({
        error: "code took too long to run",
        rawError: String(new Error("worker timed out")),
      });
    }, 5000);

    const message = { code, tests, variableName };
    myWorker.postMessage(message);
    myWorker.onmessage = (e) => {
      clearTimeout(timer);
      const output = { ...e.data, submissionId };
      if (output.error) {
        reject(output);
      } else {
        resolve(output);
      }
      console.info("terminating worker...");
      myWorker.terminate();
    };
  });
};

export const refreshWorker = () => Promise.resolve();

export default submitCode;
