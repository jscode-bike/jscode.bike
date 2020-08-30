/*
// naive, On^2 solution
function trapWater(h) {
  let total = 0;
  for (let i = 0; i < h.length; i++) {
    const leftMax = Math.max(...h.slice(0, i));
    const rightMax = Math.max(...h.slice(i));
    console.log(leftMax, rightMax);
    const th = Math.min(leftMax, rightMax);
    total += Math.max(0, th - h[i]);
  }
  return total;
}
*/

const trapWater = (h) => {
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

export default trapWater;
