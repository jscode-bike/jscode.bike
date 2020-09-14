function twoSum(nums, target) {
  // code here...
  const hash = {};
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (n in hash) {
      return [hash[n], i];
    } else {
      const key = target - n;
      hash[key] = i;
    }
  }
}
