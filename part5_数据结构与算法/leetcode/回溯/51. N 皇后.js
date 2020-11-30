/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  // 皇后攻击方式：
  //   不能处于同一行
  //   不能处于同一列
  //   不能处于同一斜线上

  // [1,  2,  3,  4]
  // [5,  6,  7,  8]
  // [9,  10, 11, 12]
  // [13, 14, 15, 16]

  // 1的坐标是 0,0, 
  // 6的坐标是 1,1, 
  // 11的坐标是 2,2,
  // 行-列的值是一样的

  // 3的坐标是 0,2, 
  // 6的坐标是 1,1, 
  // 9的坐标是 2,0,
  // 行+列的值是一样的

  // 判定条件
  // 1. 行不能一样
  // 2. 列不能一样
  // 3. 行-列不能一样
  // 4. 行+列不能一样

  let res = []

  find(0)

  return res

  // temp 存储每一行拜访的列的位置
  function find(row, temp=[]) {
    if(row === n) {
      res.push(temp.map(c => {
        let arr = new Array(n).fill('.')
        arr[c] = 'Q'
        return arr.join('')
      }))
      return 
    }

    for (let col = 0; col < n; col++) {
      let canSet = temp.some((colIndex, rowIndex) => {
        return col === colIndex || 
               row-col === rowIndex-colIndex ||
               row+col === rowIndex+colIndex
      })
      if(canSet) continue
      find(row+1, [...temp, col])
    }
  }

};