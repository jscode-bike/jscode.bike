export const submitCode = (code, tests, variableName) => {
  return runTestsInWorker(code, tests, variableName);
};

export const codeErrorMessage = (variableName, error) =>
  `there is an issue with your ${variableName} function: ${error}`;

const runTestsInWorker = (code, tests, variableName) => {
  if (!window.Worker) throw new Error("please enable web workers");

  return new Promise((resolve, reject) => {
    const myWorker = new Worker("worker.js");
    let timer = setTimeout(() => {
      console.log("worker didnt respond...");
      myWorker.terminate();
      reject(new Error("code timed out"));
    }, 10000);

    const message = { code, tests, variableName };
    myWorker.postMessage(message);
    myWorker.onmessage = (e) => {
      clearTimeout(timer);
      if (e.data.error) {
        reject(e.data.error);
      } else {
        resolve(e.data);
      }
      console.log("terminating worker...");
      myWorker.terminate();
    };
  });
};
