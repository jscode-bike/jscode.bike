const isOpeningBrace = (c) => "{([".includes(c);
const isClosingBrace = (c) => "})]".includes(c);
const matches = {
  "{": "}",
  "[": "]",
  "(": ")",
};

function matchingBrackets(str) {
  // code here...
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (isOpeningBrace(c)) {
      stack.push(c);
    } else if (isClosingBrace(c)) {
      const n = stack.pop();
      if (c !== matches[n]) return false;
    }
  }
  return stack.length === 0;
}
