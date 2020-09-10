---
name: Roman Numeral Converter
variableName: RomanNumeralConverder
tags:
  - strings
  - numbers
startingCode: "class RomanNumeralConverter {\n\n  static numberToRoman(num) {\n    // code here...\n  }\n\n  static romanToNumber(str) {\n    // ...and here\n  }\n\n}"
difficulty: 4
---

# Roman Numeral Converter

Create a class `RomanNumeralConverter` which contains two static methods: `numberToRoman`, which accepts a positive integer and returns a string representing the number as a roman numeral, and `romanToNumber`, which accepts a roman numeral as a string and returns the corresponding integer as a number. Note: the inputs to either method will not be greater than five thousand.

```javascript
// Examples
RomanNumeralConverter.numberToRoman(3); // "III"
RomanNumeralConverter.numberToRoman(14); // "XIV"
RomanNumeralConverter.numberToRoman(37); // "XXXVII"
RomanNumeralConverter.romanToNumber("IX"); // 9
RomanNumeralConverter.romanToNumber("CXC"); // 190
RomanNumeralConverter.romanToNumber("MMIV"); // 2004
```
