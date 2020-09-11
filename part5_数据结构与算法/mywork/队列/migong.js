/*
var maze_array = [[0, 0, 1, 0, 0, 0, 0],
                    [0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 0],
                    [1, 1, 1, 0, 0, 0, 0],
                    [1, 1, 1, 0, 0, 0, 0]
                 ];

元素为0表示可以通行，元素为1表示不可以通行
设置起点 [2][1]  终点[3][5]
计算两个点是否相通，相通则计算最短路径
*/

// 存储坐标
let Position = function(x, y) {
    this.x = x
    this.y = y
}

function findPath(maze_array, startPos, endPos) {

}


// 迷宫数组
let maze_array = [[0, 0, 1, 0, 0, 0, 0],
                    [0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 0],
                    [1, 1, 1, 0, 0, 0, 0],
                    [1, 1, 1, 0, 0, 0, 0]
                 ]

let startPos = new Position(2, 1)   // 起点坐标
let endPos = new Position(3, 5)   // 终点坐标

findPath(maze_array, startPos, endPos)