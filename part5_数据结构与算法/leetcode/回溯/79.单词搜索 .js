// 79
var exist = function(board, word) {
  if(!board || !board.length|| !word) {
    return false
  }

  let row = board.length
  let col = board[0].length
  if(row*col < word.length) {
    return false
  }

  for(let i=0;i<row;i++){
    for(let j=0;j<col;j++){
      const ret = find(i,j,0)
      if(ret) return true
    }
  }
  return false

  function find(i,j,cur){
    //越界
    if(i>=row || i<0) return false
    if(j>=col || j<0) return false
    const letter = board[i][j]
    // 终⽌条件
    if(letter!==word[cur]) return false
    // 找到最后⼀个了
    if(cur==word.length-1) return true
    // 找下⼀步 ！！！！！
    // 设置标记
    board[i][j] = null
    // 递归 怎么找下⼀步
    const ret = find(i+1,j,cur+1) ||
    find(i-1,j,cur+1) ||
    find(i,j+1,cur+1) ||
    find(i,j-1,cur+1)
    // 取消标记 进⾏别的路线查找
    board[i][j] = letter
    return ret
  }
};

board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
]

let word = "SEE"

console.log(exist(board, word));