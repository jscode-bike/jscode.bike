/* eslint-disable no-restricted-globals */
// this should be the main worker
// spawns other workers for individual tests
// recieves an array of test suites

self.addEventListener(
  "message",
  function messageCallback(e) {
    const { code, tests, variableName } = e.data;

    tests.forEach((t) => {
      const testRunner = new Worker("testRunner.js");
      testRunner.postMessage(t);
    });
  },
  false
);
