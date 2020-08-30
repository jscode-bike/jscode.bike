import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import trap from "../src/exercises/trapWater/solution.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rand = (max) => (Math.random() * max) | 0;

const generateArr = (len = 100, max = 20) =>
  Array.from({ length: len }).map((_) => rand(max));

const arr = Array.from({ length: 100 }).map((_) => {
  const a = generateArr(20 + rand(40), 100);
  return [a, trap(a)];
});

const arr2 = Array.from({ length: 100 }).map((_) => {
  const a = generateArr(10_000 + rand(10_000), 20 + rand(1000));
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
