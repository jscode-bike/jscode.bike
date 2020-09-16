import getMobileOperatingSystem from "../utils/getMobileOS";

const isMobileOS = getMobileOperatingSystem() !== "other";
class Runner {
  constructor() {
    this._fetched = false;
    this._submitCode = null;
    this._refreshWorker = null;
  }

  async _fetchEngine() {
    if (!this._fetched) {
      const promise = isMobileOS
        ? import("./mobile/submitCodeMobile.js")
        : import("./blob/submitCodeBlob.js");
      const engine = await promise;
      const { default: submitCode, refreshWorker } = engine;
      this._submitCode = submitCode;
      this._refreshWorker = refreshWorker;
      this.fetched = true;
      return { submitCode, refreshWorker };
    } else {
      return Promise.resolve({
        submitCode: this._submitCode,
        refreshWorker: this._refreshWorker,
      });
    }
  }

  async submitCode(...args) {
    const engine = await this._fetchEngine();
    const val = await engine.submitCode(...args);
    return val;
  }
  async refreshWorker() {
    const engine = await this._fetchEngine();
    await engine.refreshWorker();
    return;
  }
}

const runner = new Runner();
const { submitCode, refreshWorker } = runner;

const output = {
  submitCode: submitCode.bind(runner),
  refreshWorker: refreshWorker.bind(runner),
};

export default output;

/// TODO:

// feature detection for mobile OS -X
// code splitting -X
// write script for building public/worker
