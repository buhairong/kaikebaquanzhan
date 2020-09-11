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
            let preNode = this.get(index-1)
            newNode.next = preNode.next
            preNode.next = newNode
            length++
        }
    }

    // 删除指定位置的节点
    this.remove = function(index) {
        let del_node
        if(index < 0 || index >= length) {
            console.log('输入不合法');
            return
        }else if(index === 0) { 
            // 删除的是头部        
            del_node = head
            head = head.next

            // 如果head为null,则表示原链表只有一个节点
            if(!head) {
                tail = null
            }
            length--
        }else {
            let pre_node = this.get(index - 1) 
            del_node = pre_node.next           
            
            pre_node.next = del_node.next
            // 删除的是尾部，尾部的next指向一定是null
            if(del_node.next === null) {
                tail = pre_node
            }
            
            length--
        }

        // 将被删除项的next指针指向null
        del_node.next = null
        return del_node.data
    }

    // 删除头部节点
    this.remove_head = function() {
        return this.remove(0)
    }

    // 删除尾部节点
    this.remove_tail = function() {
        return this.remove(length - 1)
    }

    // 返回指定元素的索引  有多个相同的元素，返回第一个
    this.indexOf = function(data) {        
        let cur_node = head
        let index = -1
        while(cur_node) {
            index++            
            if(cur_node.data == data) {
                find_node = cur_node
                return index
            }
            cur_node = cur_node.next
        }        

        return -1
    }

    // 返回指定索引位置的元素
    this.get = function(index) {
        if(index < 0 || index > length - 1) {
            console.log('输入不合法');
            return
        }else {
            let cur_index = 0
            let cur_node = head
            while(cur_index < index){
                cur_node = cur_node.next
                cur_index++
            }
            return cur_node
        }
    }

    // 返回头部节点
    this.head = function() {}

    // 返回尾部节点
    this.tail = function() {}

    // 返回链表长度
    this.length = function() {
        return length
    }

    // 判断链表是否为空
    this.isEmpty = function() {
        return length == 0
    }

    // 清空链表
    this.clear = function() {
        head = null
        tail = null
        length = 0
    }

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
//link.print()
link.insert(2, 9)
link.print()
//console.log(link.remove(1))
//console.log(link.get(1))
//console.log(link.indexOf(8))
// console.log(link.length())
// console.log(link.remove_tail())
// console.log(link.remove_tail())
// console.log(link.length())