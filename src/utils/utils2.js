import worker from "./worker.js";

class WebWorker {
  constructor(worker) {
    const code = worker.toString();
    const blob = new Blob(["(" + code + ")()"]);
    return new Worker(URL.createObjectURL(blob));
  }
}

export const submitCode = (code, tests, variableName) => {
  return runTestsInWorker(code, tests, variableName);
};

export const codeErrorMessage = (e) => "hey you got an error:" + e;

const runTestsInWorker = (code, tests, variableName) => {
  if (!window.Worker) throw new Error("please enable web workers");

  return new Promise((resolve, reject) => {
    const myWorker = new WebWorker(worker);
    let timer = setTimeout(() => {
      console.log("worker didnt respond...");
      myWorker.terminate();
      reject("code timed out");
    }, 10000);

    const message = { code, tests, variableName };
    myWorker.postMessage(message);
    myWorker.onmessage = (e) => {
      clearTimeout(timer);
      resolve(e.data);
      console.log("terminating worker...");
      myWorker.terminate();
    };
  });
};
