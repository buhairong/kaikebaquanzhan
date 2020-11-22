// 今天天气真不错
// 1
var twoSum = function(nums, target) {  
  let temp = {}
  for(let i = 0; i< nums.length; i++) {
      let num = nums[i]
      if(num in temp){
          return [temp[num], i]
      }else {
          temp[target-num] = i
      }
  }
};

var nums = [2, 7, 11, 15], x = 9
console.log(twoSum(nums, x));

