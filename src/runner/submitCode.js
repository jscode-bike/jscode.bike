const submitCode = (code, tests, variableName) => {
  return runTestsInWorker(code, tests, variableName);
};

export default submitCode;
