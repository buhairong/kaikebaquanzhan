/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    if(nums.length === 0) return [[]]
    if(nums.length === 1) return [[], nums]

    let list = [[]]
    
    function find(index, temp) {
        if(temp.length === nums.length) return

        for (let i = index; i < nums.length; i++) {
            temp.push(nums[i])
            console.log(temp, list)
            list.push([...temp])
            
            find(i+1, temp)
            temp.pop()
        }
    }

    find(0, [])
    
    return list
};

subsets([1,2,3])