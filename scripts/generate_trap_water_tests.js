const fs = require("fs");
const path = require("path");

const trap = (h) => {
  const n = h.length;
  if (n < 3) return 0;
  let total = 0;
  let leftIdx = 0;
  let rightIdx = n - 1;
  let leftMax = h[leftIdx];
  let rightMax = h[rightIdx];
  while (leftIdx <= rightIdx) {
    leftMax = Math.max(leftMax, h[leftIdx]);
    rightMax = Math.max(rightMax, h[rightIdx]);
    if (leftMax <= rightMax) {
      total += leftMax - h[leftIdx];
      leftIdx++;
    } else if (rightMax <= leftMax) {
      total += rightMax - h[rightIdx];
      rightIdx--;
    }
  }
  return total;
};

const rand = (max) => (Math.random() * max) | 0;

const generateArr = (len = 100, max = 20) =>
  Array.from({ length: len }).map((_) => rand(max));

const arr = Array.from({ length: 100 }).map((_) => {
  const a = generateArr(20 + rand(40), 100);
  return [a, trap(a)];
});

const arr2 = Array.from({ length: 5 }).map((_) => {
  const a = generateArr(10_000 + rand(10_000), 20 + rand(100));
  return [a, trap(a)];
});

const shortFilename = path.join(
  __dirname,
  "..",
  "src",
  "exercises",
  "trapWater",
  "short_inputs.json"
);

const longFilename = path.join(
  __dirname,
  "..",
  "src",
  "exercises",
  "trapWater",
  "long_inputs.json"
);

fs.writeFileSync(shortFilename, JSON.stringify(arr));
fs.writeFileSync(longFilename, JSON.stringify(arr2));
