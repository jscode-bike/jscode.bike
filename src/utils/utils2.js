import worker from "./worker.js";

class WebWorker {
  constructor(worker) {
    const code = worker.toString();
    const blob = new Blob(["(" + code + ")()"]);
    return new Worker(URL.createObjectURL(blob));
  }
}

export const submitCode = (code, tests, variableName) => {
  runWorker();
};

export const codeErrorMessage = (e) => "hey you got an error:" + e;

const runWorker = () => {
  if (!window.Worker) throw new Error("please enable web workers");
  const myWorker = new WebWorker(worker);

  const message = { hello: "world", thing: 123 };

  myWorker.postMessage(message);

  myWorker.onmessage = (e) => {
    console.log("worker responded!!:>", e);
  };
};
