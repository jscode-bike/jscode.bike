export const prettifyErrorMessage = (variableName, error) =>
  `can't format your code: ${error}`;

export const getCssVariableNumberValue = (key) => {
  const html = document.querySelector("html");
  const str = window.getComputedStyle(html).getPropertyValue(key);
  return +str.replace("px", "").trim();
};

export const shuffleInPlace = (arr) => {
  for (let i = arr.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
  return arr;
};
