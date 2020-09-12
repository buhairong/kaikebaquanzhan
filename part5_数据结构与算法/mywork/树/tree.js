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

    // 中序遍历
    this.in_order = function(node) {
        if(node == null) {
            return
        }
        
        this.in_order(node.leftChild)
        console.log(node.data)

        this.in_order(node.rightChild)
    }

    // 前序遍历
    this.pre_node = function(node) {
        if(node == null) {
            return
        }

        console.log(node.data)

        this.pre_node(node.leftChild) 
        this.pre_node(node.rightChild)
    }

    // 后序遍历
    this.post_node = function(node) {
        if(node == null) {
            return
        }

        this.post_node(node.leftChild) 
        this.post_node(node.rightChild)
        console.log(node.data)
    }

    let tree_node_count = function(node) {
        // 左子树的节点数量 + 右子树的节点数量 + 当前节点(1)
        if(node == null) {
            return 0
        }

        let left_node_count = tree_node_count(node.leftChild)
        let right_node_count = tree_node_count(node.rightChild)

        return left_node_count + right_node_count + 1
    }

    // 返回节点数量
    this.size = function() {
        return tree_node_count(root)
    }

    let tree_height = function(node) {
        if(node == null) {
            return 0
        }

        // 先计算左子树的高度
        let left_child_height = tree_height(node.leftChild)

        // 再计算右子树的高度
        let right_child_height = tree_height(node.rightChild)

        // 左子树和右子树比较高度，返回高的那个
        return left_child_height > right_child_height ? left_child_height + 1 : right_child_height + 1
    }

    // 返回高度
    this.height = function() {
        return tree_height(root)        
    }
}



let bt = new BinaryTree()
bt.init_tree("A(B(D,E(G,)),C(,F))#")

console.log('中序遍历------------------------------------------------------------------------')
let root_node = bt.get_root()
bt.in_order(root_node)

console.log('前序遍历------------------------------------------------------------------------')
bt.pre_node(root_node)


console.log('后序遍历------------------------------------------------------------------------')
bt.post_node(root_node)

console.log('节点数量：', bt.size())
console.log('高度：', bt.height())
