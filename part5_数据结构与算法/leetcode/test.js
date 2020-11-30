let arr = [[3],[2]]
let sub = [3, 2]


let res = arr.find(item => item.sort((a,b) => a-b).join('') === sub.sort((a,b) => a-b).join(''))

console.log(res)

