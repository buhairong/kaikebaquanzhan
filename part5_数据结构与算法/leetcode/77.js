/*
给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

示例:
输入: n = 4, k = 2
输出:
    [
        [2,4],
        [3,4],
        [2,3],
        [1,2],
        [1,3],
        [1,4],
    ]

    1.递归
    2.字典
*/

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    let arr = []
    if(k === 1 && n === 1) {
        arr.push([1])
        return arr
    }
    for (let i = 0; i < n; i++) {    
        if(k === 1) {
            let sub = i+1
            arr.push([sub])
            continue
        }   
        for (let j = i+1; j < n; j++) {
            let subArr = []
            subArr.push(i+1)      
            let index = 1
            let item = j+1
            while(index < k && item <=n) {
                subArr.push(item)
                item++
                index++
            }  
            if(subArr.length === k) {
                arr.push(subArr)  
            }                       
        }  
    }    
    
    return arr
};

var step = 1

var combine1 = function(n, k) {
    const ans = [];
    const dfs = (cur, n, k, temp, note) => {
        console.log(step++, 'main', cur, n, k, temp, note)
        // 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 temp
        if (temp.length + (n - cur + 1) < k) {
            console.log(step++, 'temp1', temp, note)
            return;
        }
        // 记录合法的答案
        if (temp.length == k) {
            console.log(step++, 'temp2', temp, note)
            ans.push(temp);
            console.log(ans)
            return;
        }
        // 考虑选择当前位置
        dfs(cur + 1, n, k, [...temp, cur], 'a');
        // 考虑不选择当前位置
        dfs(cur + 1, n, k, temp, 'b');
    }
    dfs(1, n, k, []);
    return ans;
};


//console.log(combine(4, 3));
console.log(combine1(4, 3));

