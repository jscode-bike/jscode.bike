import num2rom from "./num2rom.json";
import { rand } from "../../../utils/utils";

const distributedRands = () =>
  Array.from({ length: 50 }).map((_, i) => i * 100 + rand(50));

const generateRandomTests = () => [
  ...distributedRands().map((n) => [`.numberToRoman(${n})`, `"${num2rom[n]}"`]),
  ...distributedRands().map((n) => [`.romanToNumber("${num2rom[n]}")`, n]),
];

export default generateRandomTests;
