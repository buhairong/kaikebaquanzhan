/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea1 = function(height) {
  const len = height.length
  let max = 0
  for (let i = 0; i < len; i++) {
    for (let j = i+1; j < len; j++) {
        let h = Math.min(height[i], height[j])
        let cur = (j-i)*h
        if(cur > max) {
          max = cur          
        }
    }
  }

  return max
};

// 双指针解法
var maxArea = function(height) {
  let max = 0
  let left = 0
  let right = height.length-1

  while(left < right) {
    const leftNum = height[left]
    const rightNum = height[right]
    const cur = (right-left)*Math.min(leftNum, rightNum)
    max = Math.max(max, cur)
    if(leftNum < rightNum) {
      left++
    }else {
      right--
    }
  }

  return max
};