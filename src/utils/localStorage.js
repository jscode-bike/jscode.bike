export const saveToLocalStorage = (variableName, code, submissionResults) => {
  console.log(submissionResults);
  const fetched = JSON.parse(window.localStorage.getItem(variableName));

  const { total, passed: p } = submissionResults.summary;
  const passed = total === p;

  if (fetched?.passed && !passed) return;
  const o = JSON.stringify({ code, passed });
  window.localStorage.setItem(variableName, o);
};

export const fetchFromLocalStorage = (variableName) => {
  const fetchedObj = JSON.parse(window.localStorage.getItem(variableName));

  return fetchedObj?.code;
};
