/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let list = []

  function backtrack(level,list, temp) {
    if(temp.length === nums.length) {
      return list.push([...temp])
    }
    
    for (let i = 0; i < nums.length; i++) {
      if(temp.includes(nums[i])) {
        continue
      }
      temp.push(nums[i])
      backtrack(level+1,list, temp)
      temp.pop()      
    }
  }

  backtrack(1, list, [])

  return list
};

console.log(permute([1,2,3]))