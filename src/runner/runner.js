// import submitCode from "./standard/submitCodeStandard.js";
// import { refreshWorker as rw } from "./standard/submitCodeStandard.js";

import submitCode from "./mobile/submitCodeMobile.js";
import { refreshWorker as rw } from "./mobile/submitCodeMobile.js";

// import submitCode from "./blob/submitCodeBlob.js";
// import { refreshWorker as rw } from "./blob/submitCodeBlob.js";

/// both methods in runner return promises
// find a way to feature detect and code split based on OS
const runner = {
  submitCode,
  refreshWorker: rw,
};

export default runner;

/// TODO:

// feature detection for mobile OS
// code splitting
// write script for building public/worker
