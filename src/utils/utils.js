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

export function debounce(fn, ms = 350) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export function uuid() {
  var dt = new Date().getTime();
  var output = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return output;
}
