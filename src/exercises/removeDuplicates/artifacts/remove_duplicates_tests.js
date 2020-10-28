const fs = require("fs");

const removeDuplicates = (string) => {
  let result = "";
  const duplicates = new Set();
  for (const char of string) {
    if (!duplicates.has(char.toLowerCase())) {
      duplicates.add(char.toLowerCase());
      result += char;
    }
  }
  return result;
};

const generateFixedTests = () => {
  return Array.from({ length: 100 }).map(() => generateSingleTest());
};

const generateSingleTest = () => {
  const input = generateRandomString();
  const output = removeDuplicates(input);
  return [`${input}`, `${output}`];
};

const generateRandomString = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const options = [...(letters + letters.toUpperCase() + numbers)];
  let randomString = "";
  let randomLength = generateRandomNumFromRange(100, 1000);
  while (randomLength) {
    randomString += options[Math.floor(Math.random() * options.length)];
    randomLength--;
  }
  return randomString;
};

const generateRandomNumFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

fs.writeFileSync("./random_inputs.json", JSON.stringify(generateFixedTests()));
