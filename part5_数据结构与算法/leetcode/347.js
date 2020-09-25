/*
    给定一个非空的整数数组，返回其中出现频率前 k 高的元素。 

    示例 1:

    输入: nums = [1,1,1,2,2,3], k = 2
    输出: [1,2]


    示例 2:

    输入: nums = [1], k = 1
    输出: [1]



    堆
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let obj = {}
    let arr = []
    nums.forEach(item => {
        let count = obj[item] ? obj[item] + 1 : 1
        obj[item] = count
    })

    let index = 0

    while(index < k) {
        let maxItem = null
        for (const key in obj) {
            if(!maxItem || obj[key] > obj[maxItem]) {
                maxItem = key
            }
        }

        arr.push(maxItem)
        delete obj[maxItem]

        index++
    }

    return arr
};

//console.log(topKFrequent([1,1,1,2,2,3], 2))
//console.log(topKFrequent([1], 1))


//  最小堆
var topKFrequent1 = function(nums, k) {
    let obj = {}
    let heap = []
    let res = []
    nums.forEach(item => {
        let count = obj[item] ? obj[item] + 1 : 1
        obj[item] = count
    })

    

    for (const key in obj) {
        heap.push({
            num: parseInt(key),
            total: obj[key]
        })           
    }

    heap.sort((a, b) => b.total - a.total)

    for (let i = 0; i < k; i++) {
       res.push(heap[i].num)       
   }

    return res
};


console.log(topKFrequent1([2,3,4,1,4,0,4,-1,-2,-1], 2))
//console.log(topKFrequent1([1], 1))