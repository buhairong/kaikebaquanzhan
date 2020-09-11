// 实现双向链表
function DoubleLinkList() {
    // 定义节点
    var Node = function (data) {
        this.data = data; // 数据
        this.next = null; // 后继指针
        this.pre = null; // 前驱指针
    }

    var length = 0; // ⻓长度
    var head = null; // 头节点
    var tail = null; // 尾节点

    this.append = function(data){
        // 在这⾥里里实现append⽅方法
        let new_node = new Node(data)
        if(head == null) {
            head = new_node
            tail = new_node
        }else {
            tail.next = new_node
            new_node.pre = tail
            tail = new_node
        }
        length++
    };

    this.getNode = function(index) {
        if(index < 0 && index > length) {
            return
        }else if(index === 0) {
            return head
        }else if(index === length) {
            return tail
        }else {
            let find_index = 0
            let find_node = head
            while(find_index < index) {
                find_node = find_node.next
                find_index++
            }
            return find_node
        }
    }

    this.insert = function(index, data){
        // 在这⾥里里实现insert⽅方法
        if(index < 0 && index > length) {
            return
        }else {
            let newNode = new Node(data)

            // 头部
            if(index == 0) {
                newNode.next = head
                head.pre = newNode
                head = newNode
            }else if(index == length) {
                // 尾部
                this.append(data)
            }else {
                let preNode = this.getNode(index-1)                
                
                newNode.pre = preNode
                newNode.next = preNode.next
                preNode.next = newNode
            }

            length++
        }
    };

    this.remove = function(index){
        // 在这⾥里里实现remove⽅方法
        if(index < 0 && index >= length) {
            return
        }else {
            // 头部
            if(index == 0) {
                head = head.next
                head.pre = null
            }else if(index == length) {
                // 尾部
                tail = tail.pre
                tail.next = null
            }else {
                let preNode = this.getNode(index-1)
                preNode.next = preNode.next.next
                preNode.next.pre = preNode
            }

            length--
        }
    };

    this.print = function() {
        let curNode = head
        while(curNode) {
            console.log(curNode.data);
            curNode = curNode.next
        }
    }

};

let node = new DoubleLinkList()
node.append(1)
node.append(5)
node.append(8)

//node.insert(1, 9)
node.remove(1)

node.print()
