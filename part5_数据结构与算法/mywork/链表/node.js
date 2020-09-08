function Node(data) {
    this.data = data
    this.next = null
}

let node1 = new Node(1)
let node2 = new Node(2)
let node3 = new Node(5)

node1.next = node2
node2.next = node3

console.log(node1.data);
console.log(node1.next.data);
console.log(node1.next.next.data);
console.log('----------------------------------------------------------');


// 定义链表类
function LinkList() {
    // 定义节点
    let Node = function(data) {
        this.data = data
        this.next = null
    }

    let length = 0  // 长度
    let head = null  // 头节点
    let tail = null  // 尾节点

    // 在尾部添加一个节点
    this.append = function(data) {
        // 创建新节点
        let newNode = new Node(data)
        if(head == null) {
            head = newNode
            tail = newNode            
        }else {
            tail.next = newNode
            tail = newNode
        }
        length++
    }

    // 在指定位置插入节点
    this.insert = function(index, data) {
        if(index < 0 && index > length) {
            console.log('输入不合法');
        }else if(index === length) {
            this.append(data)
        }else if(index === 0){
            let newNode = new Node(data)
            newNode.next = head
            head = newNode
            length++
        }else {
            let newNode = new Node(data)
            let curNode = head
            let num = 1
            while(num < index) {
                curNode = curNode.next
                num++
            }
            newNode.next = curNode.next
            curNode.next = newNode
            length++
        }
    }

    // 删除指定位置的节点
    this.remove = function(index) {}

    // 删除头部节点
    this.remove_head = function() {}

    // 删除尾部节点
    this.remove_tail = function() {}

    // 返回指定元素的索引
    this.indexOf = function() {}

    // 返回指定索引位置的元素
    this.get = function() {}

    // 返回头部节点
    this.head = function() {}

    // 返回尾部节点
    this.tail = function() {}

    // 返回链表长度
    this.length = function() {}

    // 判断链表是否为空
    this.isEmpty = function() {}

    // 清空链表
    this.clear = function() {}

    this.print = function() {
        let curNode = head
        while(curNode) {
            console.log(curNode.data);
            curNode = curNode.next
        }
    }
}

let link = new LinkList()
link.append(2)
link.append(4)
link.append(8)
link.print()
console.log('-------------------------------------------------------');
link.insert(2, 9)
link.print()