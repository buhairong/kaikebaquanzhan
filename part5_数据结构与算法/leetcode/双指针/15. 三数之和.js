/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  // 思路：
  // 当遍历的第一个数字如果是-4，
  // 找到2个数字，看看是不是4
  // 排序 +  双指针

  const len = nums.length
  if(len < 3) return []

  const list = []

  // 将数字从小到大进行排序
  nums.sort((a, b) => a-b)

  for (let i = 0; i < len; i++) {
    const num = nums[i];

    // 由于题目要求不能包含重复的三元组，
    // 因此如果和前面一个数字相同的话
    // 继续向后遍历
    if(num === nums[i-1]) continue

    let left = i+1
    let right = len-1

    while(left < right) {      
      if(num + nums[left] + nums[right] === 0) {
        // 找到了
        list.push([num, nums[left], nums[right]])
        
        // 由于题目要求不能包含重复的三元组，
        // 因此如果后面或前面一位数字相同的话
        // 指针继续向后或向前移动
        while(nums[left] === nums[left+1]) {
          left++
        }
        left++
        while(nums[right] === nums[right-1]){
          right--
        }
        right--
      }else if(num + nums[left] + nums[right] < 0) {
        // 数字小了，left指针向后移动一位
        left++
      }else{
        // 数字大了，right指针向前移动一位
        right--
      }
    }
  }

  return list
};