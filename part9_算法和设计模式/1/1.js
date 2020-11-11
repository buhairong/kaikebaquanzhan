// 今天天气真不错
// 1
var twoSum = function(nums, target) {  
  let obj = {}
  for (let index = 0; index < nums.length; index++) {
    if(nums[index] in obj) {      
      return [obj[nums[index]], index]
    }else{
      obj[target-nums[index]] = index
    }  
  }
};

var nums = [2, 7, 11, 15], x = 9
console.log(twoSum(nums, x));

