const romansFromNums = {}

const numsFromRoms = {}

const obj = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

function num2roman(n) {
  let output = '';

  for (let k in obj) {
    output += k.repeat(n / obj[k] | 0);
    n %= obj[k];

    if (n === 0) return output
  }

  return output
}

function roman2num(s) {
  let output = 0;

  for (let i = 0; i < s.length; i++) {
    const c = s[i], n = s[i + 1];
    if (obj[n] > obj[c]) {
      output += obj[c + n];
      i++
      continue
    }
    output += obj[c]
  }

  return output
}

for (let i = 1; i <= 5000; i++) {
  const r = num2roman(i)
  romansFromNums[i] = r;
  numsFromRoms[r] = i
}