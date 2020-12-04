/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber1 = function(nums) {
  for(let i=0;i<nums.length;i++) {
      let flag = false
      for(let j=0;j<nums.length;j++){          
          if(nums[i] === nums[j] && i !== j) { 
              flag = true
              break
          }
          
      }
      
      if(!flag) {
        return nums[i]
      }
  }

  return null
};


// 位运算
var singleNumber = function(nums) {
    let single_number = 0
    for(let i=0; i<nums.length; i++) {
        single_number ^= nums[i]
    }

    return single_number
};

  

console.log(singleNumber([4,1,2,1,2]))