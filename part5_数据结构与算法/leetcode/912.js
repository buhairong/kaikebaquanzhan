/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 冒泡
var sortArray = function(nums) {    
    const len = nums.length
    for(let i=0; i<len; i++) {
        for(let j=0; j<len-i-1; j++) {
            if(nums[j] > nums[j+1]) {
                let temp = nums[j]
                nums[j] = nums[j+1]
                nums[j+1] =temp
            }
        }
    }

    return nums
};

// 快排
var sortArray1 = function(nums) {    
    if(nums.length <= 1) return nums
    
    const pivotIndex = Math.floor(nums.length/2)
    const pivot = nums.splice(pivotIndex, 1)[0]

    const left = []
    const right = []

    for (let i = 0; i < nums.length; i++) {
        if(nums[i] < pivot) {
            left.push(nums[i])
        }else {
            right.push(nums[i])
        }        
    }

    return [...sortArray1(left), pivot, ...sortArray1(right)]
};

console.log(sortArray1([5,2,3,1]))