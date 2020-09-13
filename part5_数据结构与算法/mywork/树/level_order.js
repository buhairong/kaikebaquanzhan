function Stack() {
    let items = []  // 存储数据

    this.show = function() {
        return items
    }
    // 从栈顶添加元素，也叫压栈
    this.push = function(item) {
        items.push(item)
    }

    // 弹出栈顶元素
    this.pop = function() {
        return items.pop()
    }

    // 返回栈顶元素
    this.top = function() {
        return items[items.length - 1]
    }

    // 判断栈是否为空
    this.isEmpty = function() {
        return items.length === 0
    }

    // 返回栈的大小
    this.size = function() {
        return items.length
    }

    // 清空栈
    this.clear = function() {
        items = []
    }
}

// 二叉树
let BinTreeNode = function(data) {
    this.data = data   // 数据
    this.leftChild = null  // 左子节点
    this.rightChild = null // 右子节点
    this.parentNode = null // 父节点
}

function BinaryTree() {
    let root = null   // 根节点
    
    // 采用广义表表示的建立的二叉树的方法
    this.init_tree = function(string) {
        let stack = new Stack()
        let k = 0  // 标识识别的是左子树还是右子树
        let new_node = null        

        for (let i = 0; i < string.length; i++) {
            let item = string[i]   
            if(item == '#') {
                break
            }   

            if(item=="("){
                stack.push(new_node);
                k = 1;
            }else if(item==")"){
                stack.pop();
            }else if(item==","){
                k = 2;
            }else {
                new_node = new BinTreeNode(item)  // 创建节点

                if(root == null) {
                    root = new_node
                }else {
                    // 说明 new_node 是左子节点
                    if(k == 1) {
                        let top_item = stack.top()
                        top_item.leftChild = new_node
                        new_node.parentNode = top_item
                    }else if(k == 2) {
                        // 说明 new_node 是右子节点
                        let top_item = stack.top()
                        top_item.rightChild = new_node
                        new_node.parentNode = top_item
                    }
                }
            }                  
        }
    }

    // 返回根节点
    this.get_root = function() {
        return root
    }
}


// 分层打印二叉树
/*
实现函数level_order ，程序最终输出结果为
A  
B  C  
D  E  F  
G  
*/


var bt = new BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();

// 层次遍历
var level_order = function(node){    
    let queue = []
    queue.push(node)
    queue.push(0)

    let str = ""

    while(queue.length) {
        let del_item = queue.shift()

        if(del_item == 0) {
            console.log(str)
            str = ""

            if(!queue.length) {
                break
            }else {
                queue.push(0)
            }

            continue
        }

        str += del_item.data + " "
        
        if(del_item.leftChild) {
            queue.push(del_item.leftChild)
        }

        if(del_item.rightChild) {
            queue.push(del_item.rightChild)
        }
    }
};

level_order(root_node);

// A 0          
// 0 B  C
