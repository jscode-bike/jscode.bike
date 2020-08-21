const submitCode = (code, tests, variableName) => {
  return runTestsInWorker(code, tests, variableName);
};

const runTestsInWorker = (code, tests, variableName) => {
  if (!window.Worker) throw new Error("please enable web workers");

  return new Promise((resolve, reject) => {
    const myWorker = new Worker("/worker.js");
    let timer = setTimeout(() => {
      console.warn("worker didnt respond...");
      myWorker.terminate();
      reject({
        error: "code took too long to run",
        rawError: String(new Error("worker timed out")),
      });
    }, 10000);

    const message = { code, tests, variableName };
    myWorker.postMessage(message);
    myWorker.onmessage = (e) => {
      clearTimeout(timer);
      if (e.data.error) {
        reject(e.data);
      } else {
        resolve(e.data);
      }
      console.info("terminating worker...");
      myWorker.terminate();
    };
  });
};

export default submitCode;
