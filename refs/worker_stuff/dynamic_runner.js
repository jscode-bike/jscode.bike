// import submitCode from "./standard/submitCodeStandard.js";
// import { refreshWorker as rw } from "./standard/submitCodeStandard.js";

import getMobileOperatingSystem from "../utils/getMobileOS";

// import submitCode from "./mobile/submitCodeMobile.js";
// import { refreshWorker as rw } from "./mobile/submitCodeMobile.js";

// import submitCode from "./blob/submitCodeBlob.js";
// import { refreshWorker as rw } from "./blob/submitCodeBlob.js";

/// both methods in runner return promises
// find a way to feature detect and code split based on OS

const isMobileOS = getMobileOperatingSystem() !== "other";

console.log("is this a mobile OS?", isMobileOS);

const submitCode = (...args) => {
  console.log(args);
  return new Promise((resolve, reject) => {
    if (isMobileOS) {
      import("./mobile/submitCodeMobile.js")
        .then((submitCodeMobileData) => {
          resolve(submitCodeMobileData.default(...args));
        })
        .catch((e) => {
          reject(e);
        });
    } else {
      import("./blob/submitCodeBlob.js")
        .then(async (submitCodeBlobData) => {
          const val = await submitCodeBlobData.default(...args);
          resolve(val);
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
};

const refreshWorker = () => {
  return new Promise((resolve, reject) => {
    if (isMobileOS) {
      import("./mobile/submitCodeMobile.js")
        .then((submitCodeMobileData) => {
          resolve(submitCodeMobileData.refreshWorker());
        })
        .catch((e) => {
          reject(e);
        });
    } else {
      import("./blob/submitCodeBlob.js")
        .then((submitCodeBlobData) => {
          resolve(submitCodeBlobData.refreshWorker());
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
};

const runner = {
  submitCode,
  refreshWorker,
};

export default runner;

/// TODO:

// feature detection for mobile OS
// code splitting
// write script for building public/worker
