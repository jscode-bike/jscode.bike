---
name: Trapping Rain Water
variableName: trapWater
startingCode: function trapWater(heights) {\n  // code here...\n}
tags:
  - optimization
  - iteration
difficulty: 5
---

# Trapping Rain Water ☔️

Given an array `heights` of positive integers representing heights of blocks on a flat 2d plane, calculate how much rain water can be trapped between blocks:

<br />

<img src="/assets/trap_water_diagram.svg" width="100%" alt="trapping water diagram"/>

```javascript
// Examples
const blocks = [1, 0, 2, 1, 3, 1, 2, 1, 4, 2, 3, 0, 1];
trapWater(blocks); // should return 10

const blocks2 = [5, 4, 1, 2, 1, 3, 1, 4];
trapWater(blocks2); // 12

trapWater([3, 0, 0, 2, 0, 4]); // 10
trapWater([1, 2, 3, 4, 3, 2, 1]); // 0
```
