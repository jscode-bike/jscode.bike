import { num2roman } from "./roman.mjs";
import fs from "node:fs";

const num2rom = {},
  rom2num = {};

for (let i = 1; i < 5001; i++) {
  const r = num2roman(i);
  num2rom[i] = r;
  rom2num[r] = i;
}

fs.writeFileSync("num2rom.json", JSON.stringify(num2rom));
fs.writeFileSync("rom2num.json", JSON.stringify(rom2num));
