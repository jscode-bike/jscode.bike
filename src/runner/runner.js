import getMobileOperatingSystem from "../utils/getMobileOS";

const isMobileOS = getMobileOperatingSystem() !== "other";

const submitCode = (...args) => {
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
