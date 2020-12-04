/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
  for(let i=0; i<9;i++) {
    for(let j=0; j<9;j++) {
      if(board[i][j] !== '.') continue
      
      // 先放一个数字试试，数字为1~9
      for (let k = 1; k <=9; k++) {
        if(isVaild(board, i, j, k.toString())) {
          // 能放
          board[i][j] = k.toString()
          // 回溯
          if(solveSudoku(board)) return true

          board[i][j] = '.'
        }
      }
      return false
    }
  }

  return true

  function isVaild(board, row,col,k) {
    const x = Math.floor(row/3)*3
    const y = Math.floor(col/3)*3

    // 大方格查找是否有重复数字
    for(let i=0; i<9; i++) {
      if(board[row][i] === k || board[i][col] === k) {
        return false
      }
    }

    // 查找当前的小方格是否有重复数字
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {      
        if(board[x+i][y+j] === k) {
          return false
        }
      }      
    }

    return true
  }
};