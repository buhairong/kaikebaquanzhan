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

class findPath {
    constructor(maze_array, startPos, endPos) {
        this.maze_array = maze_array
        this.startPos = startPos
        this.endPos = endPos
        this.rowLen = this.maze_array.length
        this.colLen = this.maze_array[0].length
        this.step = 0
        this.queue[this.step] = [this.startPos]

        this.createQueue()
        
    }

    createQueue() {
        this.findNextNode()
    }

    // 根据每个节点上下左右寻找可以通行的下一个节点
    findNextNode() {
        let step = this.step++        

        for (let i = 0; i < this.queue[this.step].length; i++) {
            let node = this.queue[this.step][i];

            // 上边的节点
            if(node.y > 0 && this.maze_array[node.y - 1][node.x] === 0) {
                let nextNode = new Position(node.x, node.y-1)
                this.queue[step].push({nextNode})
            }

            // 下边的节点
            if(node.y < this.rowLen-1 && this.maze_array[node.y + 1][node.x] === 0) {
                let nextNode = new Position(node.x, node.y+1)
                this.queue[step].push({nextNode})
            }

            // 左边的节点
            if(node.y > 0 && this.maze_array[node.y - 1][node.x] === 0) {
                let nextNode = new Position(node.x, node.y+1)
                this.queue[step].push({nextNode})
            }
            
        }              
    }    
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