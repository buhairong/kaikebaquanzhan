/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let p1 = 0  // 写指针
  let p2 = 0  // 读指针

  while(p2 < nums.length) {
      if(nums[p1] !== nums[p2]) {
          p1++
          nums[p1] = nums[p2]
      }
      p2++
  }

  return p1 + 1
};